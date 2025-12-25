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
    routing::get,
    Router,
    Json,
};
use serde::Serialize;
use std::net::SocketAddr;
use tower_http::services::ServeDir;

mod detector;
use detector::AnomalyDetector;

#[derive(Clone, Serialize)]
struct SystemState {
    current_file: String,
    health_score: f64,
    status: String,
    latest_readings: Vec<f64>,
    is_training: bool,
}

#[tokio::main]
async fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let simulate_mode = args.contains(&"--simulate".to_string());
    
    // Shared State for API and Processing Loop
    let state = Arc::new(Mutex::new(SystemState {
        current_file: "Initializing...".to_string(),
        health_score: 1.0,
        status: "STARTING".to_string(),
        latest_readings: vec![],
        is_training: true,
    }));

    // Clone state for the API thread
    let api_state = state.clone();

    // Spawn API Server
    tokio::spawn(async move {
        // Serve static files from the "static" directory
        let serve_dir = ServeDir::new("static");

        let app = Router::new()
            .route("/api/status", get(move || async move {
                let data = api_state.lock().unwrap();
                Json(data.clone())
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

fn run_processing_loop(state: Arc<Mutex<SystemState>>, simulate_mode: bool) -> Result<()> {
    let data_dir = "data/ims/1st_test/1st_test";
    let output_file = "bearing_rms_results.csv";
    let alarm_file = "alarms.log";
    
    if Path::new(alarm_file).exists() {
        fs::remove_file(alarm_file)?;
    }

    if !simulate_mode {
        println!("Scanning directory: {}", data_dir);
    }
    
    let mut files: Vec<PathBuf> = fs::read_dir(data_dir)?
        .filter_map(|entry| entry.ok())
        .map(|entry| entry.path())
        .filter(|path| path.is_file())
        .filter(|path| path.file_name().and_then(|n| n.to_str()).map(|s| !s.starts_with(".")).unwrap_or(false)) 
        .collect();
        
    files.sort();
    
    let total_files = files.len();
    if !simulate_mode {
        println!("Found {} files. Processing full dataset...", total_files);
    } else {
        println!("\n--- LIVE MONITORING SIMULATION STARTED ---\n");
    }

    let mut wtr = Writer::from_path(output_file)?;
    let headers = [
        "Timestamp", 
        "B1_X", "B1_Y", 
        "B2_X", "B2_Y", 
        "B3_X", "B3_Y", 
        "B4_X", "B4_Y"
    ];
    wtr.write_record(&headers)?;

    let mut detector = AnomalyDetector::new(3.0);
    let mut training_data: Vec<Vec<f64>> = Vec::new();
    let train_limit = 500;

    for (idx, file_path) in files.iter().enumerate() {
        if !simulate_mode && idx % 100 == 0 {
            println!("Processing... [{}/{}]", idx, total_files);
        }

        let filename = file_path.file_name()
            .and_then(|f| f.to_str())
            .unwrap_or("unknown");

        match calculate_rms(file_path) {
            Ok(rms_values) => {
                let mut record = vec![filename.to_string()];
                for val in &rms_values {
                    record.push(format!("{:.6}", val));
                }
                wtr.write_record(&record)?;

                if idx < train_limit {
                    training_data.push(rms_values.clone());
                    
                    // Update State (Training)
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
                } else if idx == train_limit {
                    if !simulate_mode {
                        println!("\n--- Training Phase Complete ({}/{} files) ---", train_limit, total_files);
                    }
                    detector.train(&training_data);
                    if !simulate_mode {
                        println!("--- Inference Phase Started ---\n");
                    }
                    training_data.clear();
                    
                    process_inference(&detector, &rms_values, filename, alarm_file, &headers, simulate_mode, &state)?;
                } else {
                    process_inference(&detector, &rms_values, filename, alarm_file, &headers, simulate_mode, &state)?;
                }

                if simulate_mode {
                    // Loop continuously for demo purposes? No, just finish the dataset.
                    thread::sleep(Duration::from_millis(100)); // Slower for API to catch up
                }
            },
            Err(e) => {
                eprintln!("Warning: Skipping {:?}: {}", file_path, e);
            }
        }
    }
    
    wtr.flush()?;
    if !simulate_mode {
        println!("Analysis Complete! Data saved to '{}'. Check '{}' for alerts.", output_file, alarm_file);
    }
    
    Ok(())
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

    // Determine status string
    let status_str = if health_score > 0.9 {
        "NORMAL"
    } else if health_score > 0.5 {
        "WARNING"
    } else {
        "CRITICAL"
    };

    // Update Global State
    {
        let mut s = state.lock().unwrap();
        s.current_file = timestamp.to_string();
        s.health_score = health_score;
        s.status = status_str.to_string();
        s.latest_readings = sample.to_vec();
        s.is_training = false;
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
        
        if !simulate_mode {
            println!("{}", msg);
        }

        let mut file = OpenOptions::new()
            .create(true)
            .append(true)
            .open(log_path)?;
        writeln!(file, "{}", msg)?;
    }
    Ok(())
}

fn print_live_status(timestamp: &str, health: f64, _sample: &[f64], _anomalies: &[bool], training: bool) {
    // Clear line: \r
    let bar_len = 20;
    let filled = (health * bar_len as f64).round() as usize;
    let empty = bar_len - filled;
    
    let bar = format!("{}{}", "█".repeat(filled), "░".repeat(empty));
    
    let status = if training {
        "TRAINING".to_string()
    } else if health > 0.9 {
        "NORMAL  ".to_string()
    } else if health > 0.5 {
        "WARNING ".to_string()
    } else {
        "CRITICAL".to_string()
    };

    // ANSI Colors
    // Green: \x1b[32m, Yellow: \x1b[33m, Red: \x1b[31m, Reset: \x1b[0m
    let color = if training {
        "\x1b[34m" // Blue
    } else if health > 0.9 {
        "\x1b[32m" // Green
    } else if health > 0.5 {
        "\x1b[33m" // Yellow
    } else {
        "\x1b[31m" // Red
    };

    print!("\r{} [{}] {}% | {} | {}", color, bar, (health * 100.0) as u32, status, timestamp);
    std::io::stdout().flush().unwrap();
    
    // Reset color at the end of line is safer
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
        let record = result?; // Hata varsa loop dışına çıkar
        for i in 0..8 {
            if let Some(field) = record.get(i) {
                if let Ok(val) = field.trim().parse::<f64>() {
                    sum_squares[i] += val * val;
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
