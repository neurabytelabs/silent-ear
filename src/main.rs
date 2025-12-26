use std::fs::{self, File, OpenOptions};
use std::path::{Path, PathBuf};
use anyhow::{Result, Context};
use csv::{ReaderBuilder, Writer};
use std::io::{BufReader, Write};
use std::env;
use std::thread;
use std::time::Duration;
use std::sync::{Arc, Mutex};
use axum::{
    routing::{get, post},
    Router,
    Json,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use tower_http::services::ServeDir;

mod detector;
use detector::AnomalyDetector;

#[derive(Clone, Serialize, Deserialize)]
struct SystemState {
    current_file: String,
    health_score: f64,
    status: String,
    latest_readings: Vec<f64>,
    is_training: bool,
    // Control flags
    is_running: bool,
    reset_requested: bool,
    threshold: f64,
    train_limit: usize,
    system_logs: Vec<String>, // Stores last N logs
}

#[derive(Deserialize)]
struct ControlCommand {
    action: String, // "start", "stop", "reset"
}

#[derive(Deserialize)]
struct SettingsCommand {
    threshold: f64,
    train_limit: usize,
}

#[tokio::main]
async fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let simulate_mode = args.contains(&"--simulate".to_string());
    
    // Shared State for API and Processing Loop
    let state = Arc::new(Mutex::new(SystemState {
        current_file: "Ready".to_string(),
        health_score: 1.0,
        status: "IDLE".to_string(),
        latest_readings: vec![0.0; 8],
        is_training: true,
        is_running: false,
        reset_requested: false,
        threshold: 3.0,
        train_limit: 500,
        system_logs: vec![],
    }));

    // Clone state for the API thread
    let api_state = state.clone();

    // Spawn API Server
    tokio::spawn(async move {
        // Serve static files from the "static" directory
        let serve_dir = ServeDir::new("static");

        let app = Router::new()
            .route("/api/status", get({
                let s = api_state.clone();
                move || async move {
                    let data = s.lock().unwrap();
                    Json(data.clone())
                }
            }))
            .route("/api/control", post({
                let s = api_state.clone();
                move |Json(payload): Json<ControlCommand>| async move {
                    let mut data = s.lock().unwrap();
                    match payload.action.as_str() {
                        "start" => {
                            data.is_running = true;
                            data.status = "STARTING".to_string();
                            add_log(&mut data, "System started manually.");
                        },
                        "stop" => {
                            data.is_running = false;
                            data.status = "PAUSED".to_string();
                            add_log(&mut data, "System paused manually.");
                        },
                        "reset" => {
                            data.reset_requested = true;
                            data.is_running = false;
                            data.status = "RESETTING".to_string();
                            add_log(&mut data, "System reset requested.");
                        },
                        _ => {}
                    }
                    Json("OK")
                }
            }))
            .route("/api/settings", post({
                let s = api_state.clone();
                move |Json(payload): Json<SettingsCommand>| async move {
                    let mut data = s.lock().unwrap();
                    data.threshold = payload.threshold;
                    data.train_limit = payload.train_limit;
                    add_log(&mut data, &format!("Settings updated: Threshold={}, TrainLimit={}", payload.threshold, payload.train_limit));
                    Json("OK")
                }
            }))
            .nest_service("/", serve_dir); // Mount static file server at root

        let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
        println!("API Server running on http://localhost:3000");
        let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
        axum::serve(listener, app).await.unwrap();
    });

    // Run the main processing loop in a separate blocking task (since file I/O is blocking)
    // We use tokio::task::spawn_blocking so we don't block the async runtime
    let process_state = state.clone();
    tokio::task::spawn_blocking(move || {
        if let Err(e) = run_processing_loop(process_state, simulate_mode) {
            eprintln!("Processing Loop Error: {}", e);
        }
    }).await?;

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

fn run_processing_loop(state: Arc<Mutex<SystemState>>, simulate_mode: bool) -> Result<()> {
    let data_dir = "data/ims/1st_test/1st_test";
    let output_file = "bearing_rms_results.csv";
    let alarm_file = "alarms.log";
    
    // Initial Setup
    let mut files: Vec<PathBuf> = fs::read_dir(data_dir)?
        .filter_map(|entry| entry.ok())
        .map(|entry| entry.path())
        .filter(|path| path.is_file())
        .filter(|path| path.file_name().and_then(|n| n.to_str()).map(|s| !s.starts_with(".")).unwrap_or(false)) 
        .collect();
    files.sort();

    let total_files = files.len();
    let mut current_idx = 0;
    
    // We'll init detector with defaults, but update it inside loop from state
    let mut detector = AnomalyDetector::new(3.0);
    let mut training_data: Vec<Vec<f64>> = Vec::new();
    
    // CSV Writer
    let mut wtr = Writer::from_path(output_file)?;
    let headers = [
        "Timestamp", "B1_X", "B1_Y", "B2_X", "B2_Y", "B3_X", "B3_Y", "B4_X", "B4_Y"
    ];
    wtr.write_record(&headers)?;
    wtr.flush()?;

    loop {
        // 1. Check Control State
        let (is_running, reset_req, threshold, train_limit) = {
            let s = state.lock().unwrap();
            (s.is_running, s.reset_requested, s.threshold, s.train_limit)
        };

        if reset_req {
            println!("Resetting simulation...");
            current_idx = 0;
            training_data.clear();
            detector = AnomalyDetector::new(threshold);
            
            // Reset state flags
            {
                let mut s = state.lock().unwrap();
                s.reset_requested = false;
                s.is_running = false; // Stay paused after reset
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
            // End of simulation
             {
                let mut s = state.lock().unwrap();
                s.is_running = false;
                s.status = "COMPLETED".to_string();
                add_log(&mut s, "Simulation finished.");
            }
            thread::sleep(Duration::from_millis(1000));
            continue;
        }

        // Update detector threshold dynamically
        detector.set_threshold(threshold);

        let file_path = &files[current_idx];
        let filename = file_path.file_name().and_then(|f| f.to_str()).unwrap_or("unknown");

        match calculate_rms(file_path) {
            Ok(rms_values) => {
                // Write to CSV
                let mut record = vec![filename.to_string()];
                for val in &rms_values { record.push(format!("{:.6}", val)); }
                wtr.write_record(&record)?;
                wtr.flush()?;

                // Logic Phase
                if current_idx < train_limit {
                    // TRAINING
                    training_data.push(rms_values.clone());
                    
                    {
                        let mut s = state.lock().unwrap();
                        s.current_file = filename.to_string();
                        s.status = "TRAINING".to_string();
                        s.is_training = true;
                        s.latest_readings = rms_values.clone();
                    }
                    
                    if simulate_mode {
                       print_live_status(filename, 1.0, &[], &[], true);
                    }
                } else if current_idx == train_limit {
                    // TRANSITION TO INFERENCE
                    detector.train(&training_data);
                    training_data.clear();
                    
                    {
                         let mut s = state.lock().unwrap();
                         add_log(&mut s, "Training complete. Switching to monitoring mode.");
                    }

                    process_inference(&detector, &rms_values, filename, alarm_file, &headers, simulate_mode, &state)?;
                } else {
                    // INFERENCE
                    process_inference(&detector, &rms_values, filename, alarm_file, &headers, simulate_mode, &state)?;
                }

                current_idx += 1;
                
                // Simulation Delay
                if simulate_mode {
                    thread::sleep(Duration::from_millis(100)); 
                }
            },
            Err(e) => {
                eprintln!("Error processing {:?}: {}", file_path, e);
                current_idx += 1; // Skip bad file
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
    state: &Arc<Mutex<SystemState>>
) -> Result<()> {
    let anomalies = detector.is_anomaly(sample);
    let health_score = detector.calculate_health_score(sample);
    let is_critical = anomalies.iter().any(|&x| x);

    let status_str = if health_score > 0.9 { "NORMAL" } else if health_score > 0.5 { "WARNING" } else { "CRITICAL" };

    // Update Global State
    {
        let mut s = state.lock().unwrap();
        s.current_file = timestamp.to_string();
        s.health_score = health_score;
        s.status = status_str.to_string();
        s.latest_readings = sample.to_vec();
        s.is_training = false;
        
        if is_critical {
             let msg = format!("CRITICAL: Health {:.1}%", health_score * 100.0);
             // Avoid spamming logs every millisecond, check if last log is same? (Skipped for simplicity)
             add_log(&mut s, &msg);
        }
    }

    if simulate_mode {
        print_live_status(timestamp, health_score, sample, &anomalies, false);
    }

    if is_critical {
        let mut msg = format!("[CRITICAL ALARM] Timestamp: {} -> Health: {:.1}% -> ", timestamp, health_score * 100.0);
        let mut detected = false;
        for (i, &is_anom) in anomalies.iter().enumerate() {
            if is_anom {
                if detected { msg.push_str(", "); }
                msg.push_str(&format!("{} (Val: {:.4})", headers[i+1], sample[i]));
                detected = true;
            }
        }
        
        let mut file = OpenOptions::new().create(true).append(true).open(log_path)?;
        writeln!(file, "{}", msg)?;
    }
    Ok(())
}

fn print_live_status(timestamp: &str, health: f64, _sample: &[f64], _anomalies: &[bool], training: bool) {
    let bar_len = 20;
    let filled = (health * bar_len as f64).round() as usize;
    let empty = bar_len - filled;
    let bar = format!("{}{}", "█".repeat(filled), "░".repeat(empty));
    
    let status = if training { "TRAINING".to_string() } else if health > 0.9 { "NORMAL  ".to_string() } else if health > 0.5 { "WARNING ".to_string() } else { "CRITICAL".to_string() };

    let color = if training { "\x1b[34m" } else if health > 0.9 { "\x1b[32m" } else if health > 0.5 { "\x1b[33m" } else { "\x1b[31m" };
    print!("\r{} [{}] {}% | {} | {}", color, bar, (health * 100.0) as u32, status, timestamp);
    std::io::stdout().flush().unwrap();
    print!("\x1b[0m");
}

fn calculate_rms<P: AsRef<Path>>(path: P) -> Result<Vec<f64>> {
    let file = File::open(path)?;
    let buf_reader = BufReader::new(file);

    let mut rdr = ReaderBuilder::new()
        .delimiter(b'\t')
        .has_headers(false)
        .flexible(true)
        .from_reader(buf_reader);

    let mut sum_squares = vec![0.0; 8];
    let mut count = 0;

    for result in rdr.records() {
        let record = result?; 
        for i in 0..8 {
            if let Some(field) = record.get(i) {
                if let Ok(val) = field.trim().parse::<f64>() {
                    sum_squares[i] += val * val;
                }
            }
        }
        count += 1;
    }
    
    if count == 0 { return Ok(vec![0.0; 8]); }

    let rms: Vec<f64> = sum_squares.iter().map(|&sum| (sum / count as f64).sqrt()).collect();
    Ok(rms)
}
