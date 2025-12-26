use axum::{
    routing::{get, post},
    Json, Router,
};
use csv::{ReaderBuilder, Writer};
use serde::{Deserialize, Serialize};
use std::env;
use std::fs::{self, File, OpenOptions};
use std::io::{BufReader, Write};
use std::net::SocketAddr;
use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;
use tower_http::services::ServeDir;
use tracing::{debug, error, info, warn, Level};
use tracing_subscriber::EnvFilter;

mod config;
mod detector;
mod error;

use config::AppConfig;
use detector::AnomalyDetector;
use error::{Result, SilentEarError};

#[derive(Clone, Serialize, Deserialize)]
struct SystemState {
    current_file: String,
    health_score: f64,
    status: String,
    latest_readings: Vec<f64>,
    is_training: bool,
    is_running: bool,
    reset_requested: bool,
    threshold: f64,
    train_limit: usize,
    system_logs: Vec<String>,
}

#[derive(Deserialize)]
struct ControlCommand {
    action: String,
}

#[derive(Deserialize)]
struct SettingsCommand {
    threshold: f64,
    train_limit: usize,
}

fn init_tracing(config: &AppConfig) {
    let level = match config.logging.level.to_lowercase().as_str() {
        "trace" => Level::TRACE,
        "debug" => Level::DEBUG,
        "info" => Level::INFO,
        "warn" => Level::WARN,
        "error" => Level::ERROR,
        _ => Level::INFO,
    };

    let filter = EnvFilter::from_default_env()
        .add_directive(level.into());

    if config.logging.json {
        tracing_subscriber::fmt()
            .with_env_filter(filter)
            .json()
            .init();
    } else {
        tracing_subscriber::fmt()
            .with_env_filter(filter)
            .with_target(true)
            .with_thread_ids(false)
            .init();
    }
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Load configuration
    let config = AppConfig::load().unwrap_or_else(|e| {
        eprintln!("Config warning: {}. Using defaults.", e);
        AppConfig::default()
    });

    // Initialize tracing
    init_tracing(&config);

    info!(
        version = env!("CARGO_PKG_VERSION"),
        "Silent-Ear starting"
    );

    let args: Vec<String> = env::args().collect();
    let simulate_mode = args.contains(&"--simulate".to_string());

    if simulate_mode {
        info!("Running in simulation mode");
    }

    // Shared State
    let state = Arc::new(Mutex::new(SystemState {
        current_file: "Ready".to_string(),
        health_score: 1.0,
        status: "IDLE".to_string(),
        latest_readings: vec![0.0; 8],
        is_training: true,
        is_running: false,
        reset_requested: false,
        threshold: config.detector.threshold,
        train_limit: config.detector.train_limit,
        system_logs: vec![],
    }));

    let api_state = state.clone();
    let server_config = config.server.clone();

    // Spawn API Server
    tokio::spawn(async move {
        if let Err(e) = run_api_server(api_state, server_config).await {
            error!(error = %e, "API server failed");
        }
    });

    // Run processing loop
    let process_state = state.clone();
    let data_config = config.data.clone();

    tokio::task::spawn_blocking(move || {
        if let Err(e) = run_processing_loop(process_state, simulate_mode, data_config) {
            error!(error = %e, "Processing loop error");
        }
    })
    .await?;

    Ok(())
}

async fn run_api_server(
    state: Arc<Mutex<SystemState>>,
    config: config::ServerConfig,
) -> Result<()> {
    let serve_dir = ServeDir::new("static");

    let app = Router::new()
        .route(
            "/api/status",
            get({
                let s = state.clone();
                move || async move {
                    let data = s.lock().unwrap();
                    Json(data.clone())
                }
            }),
        )
        .route(
            "/api/control",
            post({
                let s = state.clone();
                move |Json(payload): Json<ControlCommand>| async move {
                    let mut data = s.lock().unwrap();
                    match payload.action.as_str() {
                        "start" => {
                            info!("System started via API");
                            data.is_running = true;
                            data.status = "STARTING".to_string();
                            add_log(&mut data, "System started manually.");
                        }
                        "stop" => {
                            info!("System paused via API");
                            data.is_running = false;
                            data.status = "PAUSED".to_string();
                            add_log(&mut data, "System paused manually.");
                        }
                        "reset" => {
                            info!("System reset requested via API");
                            data.reset_requested = true;
                            data.is_running = false;
                            data.status = "RESETTING".to_string();
                            add_log(&mut data, "System reset requested.");
                        }
                        action => {
                            warn!(action = %action, "Unknown control action");
                        }
                    }
                    Json("OK")
                }
            }),
        )
        .route(
            "/api/settings",
            post({
                let s = state.clone();
                move |Json(payload): Json<SettingsCommand>| async move {
                    let mut data = s.lock().unwrap();
                    data.threshold = payload.threshold;
                    data.train_limit = payload.train_limit;
                    info!(
                        threshold = payload.threshold,
                        train_limit = payload.train_limit,
                        "Settings updated"
                    );
                    add_log(
                        &mut data,
                        &format!(
                            "Settings updated: Threshold={}, TrainLimit={}",
                            payload.threshold, payload.train_limit
                        ),
                    );
                    Json("OK")
                }
            }),
        )
        .nest_service("/", serve_dir);

    let addr: SocketAddr = format!("{}:{}", config.host, config.port)
        .parse()
        .map_err(|_| SilentEarError::Config {
            message: format!("Invalid address: {}:{}", config.host, config.port),
        })?;

    info!(address = %addr, "API server starting");

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .map_err(|e| SilentEarError::ServerBind {
            address: addr.to_string(),
            source: e,
        })?;

    axum::serve(listener, app)
        .await
        .map_err(SilentEarError::Io)?;

    Ok(())
}

fn add_log(state: &mut SystemState, msg: &str) {
    let timestamp = chrono::Local::now().format("%H:%M:%S").to_string();
    let log_entry = format!("[{}] {}", timestamp, msg);
    state.system_logs.insert(0, log_entry);
    if state.system_logs.len() > 50 {
        state.system_logs.pop();
    }
}

fn run_processing_loop(
    state: Arc<Mutex<SystemState>>,
    simulate_mode: bool,
    config: config::DataConfig,
) -> Result<()> {
    let data_dir = &config.directory;
    let output_file = &config.output_file;
    let alarm_file = &config.alarm_file;

    // Validate data directory
    if !Path::new(data_dir).exists() {
        return Err(SilentEarError::DataDirNotFound {
            path: data_dir.to_string(),
        });
    }

    let mut files: Vec<PathBuf> = fs::read_dir(data_dir)?
        .filter_map(|entry| entry.ok())
        .map(|entry| entry.path())
        .filter(|path| path.is_file())
        .filter(|path| {
            path.file_name()
                .and_then(|n| n.to_str())
                .map(|s| !s.starts_with('.'))
                .unwrap_or(false)
        })
        .collect();

    if files.is_empty() {
        return Err(SilentEarError::NoDataFiles {
            path: data_dir.to_string(),
        });
    }

    files.sort();
    let total_files = files.len();
    info!(total_files = total_files, "Data files loaded");

    let mut current_idx = 0;
    let mut detector = AnomalyDetector::new(3.0);
    let mut training_data: Vec<Vec<f64>> = Vec::new();

    // CSV Writer
    let mut wtr = Writer::from_path(output_file)?;
    let headers = [
        "Timestamp", "B1_X", "B1_Y", "B2_X", "B2_Y",
        "B3_X", "B3_Y", "B4_X", "B4_Y",
    ];
    wtr.write_record(headers)?;
    wtr.flush()?;

    loop {
        let (is_running, reset_req, threshold, train_limit) = {
            let s = state.lock().unwrap();
            (s.is_running, s.reset_requested, s.threshold, s.train_limit)
        };

        if reset_req {
            info!("Resetting simulation");
            current_idx = 0;
            training_data.clear();
            detector = AnomalyDetector::new(threshold);

            {
                let mut s = state.lock().unwrap();
                s.reset_requested = false;
                s.is_running = false;
                s.current_file = "Ready".to_string();
                s.health_score = 1.0;
                s.status = "IDLE".to_string();
                s.is_training = true;
                add_log(&mut s, "System reset complete.");
            }
            thread::sleep(Duration::from_millis(500));
            continue;
        }

        if !is_running {
            thread::sleep(Duration::from_millis(200));
            continue;
        }

        if current_idx >= total_files {
            info!("Simulation completed");
            {
                let mut s = state.lock().unwrap();
                s.is_running = false;
                s.status = "COMPLETED".to_string();
                add_log(&mut s, "Simulation finished.");
            }
            thread::sleep(Duration::from_millis(1000));
            continue;
        }

        detector.set_threshold(threshold);

        let file_path = &files[current_idx];
        let filename = file_path
            .file_name()
            .and_then(|f| f.to_str())
            .unwrap_or("unknown");

        match calculate_rms(file_path) {
            Ok(rms_values) => {
                let mut record = vec![filename.to_string()];
                for val in &rms_values {
                    record.push(format!("{:.6}", val));
                }
                wtr.write_record(&record)?;
                wtr.flush()?;

                if current_idx < train_limit {
                    training_data.push(rms_values.clone());
                    debug!(file = %filename, idx = current_idx, "Training sample");

                    {
                        let mut s = state.lock().unwrap();
                        s.current_file = filename.to_string();
                        s.status = "TRAINING".to_string();
                        s.is_training = true;
                        s.latest_readings = rms_values.clone();
                    }

                    if simulate_mode {
                        print_live_status(filename, 1.0, true);
                    }
                } else if current_idx == train_limit {
                    info!(samples = training_data.len(), "Training complete");
                    detector.train(&training_data);
                    training_data.clear();

                    {
                        let mut s = state.lock().unwrap();
                        add_log(&mut s, "Training complete. Switching to monitoring mode.");
                    }

                    process_inference(
                        &detector,
                        &rms_values,
                        filename,
                        alarm_file,
                        &headers,
                        simulate_mode,
                        &state,
                    )?;
                } else {
                    process_inference(
                        &detector,
                        &rms_values,
                        filename,
                        alarm_file,
                        &headers,
                        simulate_mode,
                        &state,
                    )?;
                }

                current_idx += 1;

                if simulate_mode {
                    thread::sleep(Duration::from_millis(100));
                }
            }
            Err(e) => {
                warn!(file = %filename, error = %e, "Error processing file, skipping");
                current_idx += 1;
            }
        }
    }
}

fn process_inference(
    detector: &AnomalyDetector,
    sample: &[f64],
    timestamp: &str,
    log_path: &str,
    headers: &[&str],
    simulate_mode: bool,
    state: &Arc<Mutex<SystemState>>,
) -> Result<()> {
    let anomalies = detector.is_anomaly(sample);
    let health_score = detector.calculate_health_score(sample);
    let is_critical = anomalies.iter().any(|&x| x);

    let status_str = if health_score > 0.9 {
        "NORMAL"
    } else if health_score > 0.5 {
        "WARNING"
    } else {
        "CRITICAL"
    };

    {
        let mut s = state.lock().unwrap();
        s.current_file = timestamp.to_string();
        s.health_score = health_score;
        s.status = status_str.to_string();
        s.latest_readings = sample.to_vec();
        s.is_training = false;

        if is_critical {
            let msg = format!("CRITICAL: Health {:.1}%", health_score * 100.0);
            add_log(&mut s, &msg);
        }
    }

    if simulate_mode {
        print_live_status(timestamp, health_score, false);
    }

    if is_critical {
        warn!(
            timestamp = %timestamp,
            health = health_score * 100.0,
            "Critical anomaly detected"
        );

        let mut msg = format!(
            "[CRITICAL ALARM] Timestamp: {} -> Health: {:.1}% -> ",
            timestamp,
            health_score * 100.0
        );
        let mut detected = false;
        for (i, &is_anom) in anomalies.iter().enumerate() {
            if is_anom {
                if detected {
                    msg.push_str(", ");
                }
                msg.push_str(&format!("{} (Val: {:.4})", headers[i + 1], sample[i]));
                detected = true;
            }
        }

        let mut file = OpenOptions::new()
            .create(true)
            .append(true)
            .open(log_path)?;
        writeln!(file, "{}", msg)?;
    }
    Ok(())
}

fn print_live_status(timestamp: &str, health: f64, training: bool) {
    let bar_len = 20;
    let filled = (health * bar_len as f64).round() as usize;
    let empty = bar_len - filled;
    let bar = format!("{}{}", "█".repeat(filled), "░".repeat(empty));

    let status = if training {
        "TRAINING"
    } else if health > 0.9 {
        "NORMAL  "
    } else if health > 0.5 {
        "WARNING "
    } else {
        "CRITICAL"
    };

    let color = if training {
        "\x1b[34m"
    } else if health > 0.9 {
        "\x1b[32m"
    } else if health > 0.5 {
        "\x1b[33m"
    } else {
        "\x1b[31m"
    };

    print!(
        "\r{} [{}] {}% | {} | {}",
        color,
        bar,
        (health * 100.0) as u32,
        status,
        timestamp
    );
    std::io::stdout().flush().unwrap();
    print!("\x1b[0m");
}

fn calculate_rms<P: AsRef<Path>>(path: P) -> Result<Vec<f64>> {
    let file = File::open(&path).map_err(|e| SilentEarError::DataFileRead {
        path: path.as_ref().display().to_string(),
        source: e,
    })?;
    let buf_reader = BufReader::new(file);

    let mut rdr = ReaderBuilder::new()
        .delimiter(b'\t')
        .has_headers(false)
        .flexible(true)
        .from_reader(buf_reader);

    let mut sum_squares = [0.0; 8];
    let mut count = 0;

    for (line_num, result) in rdr.records().enumerate() {
        let record = result.map_err(|e| SilentEarError::CsvParse {
            line: line_num + 1,
            source: e,
        })?;

        for (i, sum) in sum_squares.iter_mut().enumerate() {
            if let Some(field) = record.get(i) {
                if let Ok(val) = field.trim().parse::<f64>() {
                    *sum += val * val;
                }
            }
        }
        count += 1;
    }

    if count == 0 {
        return Ok(vec![0.0; 8]);
    }

    let rms: Vec<f64> = sum_squares
        .iter()
        .map(|&sum| (sum / count as f64).sqrt())
        .collect();
    Ok(rms)
}
