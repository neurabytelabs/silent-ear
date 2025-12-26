pub struct AnomalyDetector {
    pub mean: Vec<f64>,
    pub std_dev: Vec<f64>,
    pub threshold_multiplier: f64,
    pub is_trained: bool,
}

impl AnomalyDetector {
    pub fn new(threshold_multiplier: f64) -> Self {
        Self {
            mean: Vec::new(),
            std_dev: Vec::new(),
            threshold_multiplier,
            is_trained: false,
        }
    }

    /// Sağlıklı veriyi kullanarak modeli eğitir (Kalibrasyon)
    pub fn train(&mut self, healthy_data: &[Vec<f64>]) {
        if healthy_data.is_empty() {
            return;
        }

        let num_features = healthy_data[0].len();
        let num_samples = healthy_data.len() as f64;

        let mut sums = vec![0.0; num_features];
        for sample in healthy_data {
            for (i, val) in sample.iter().enumerate() {
                sums[i] += val;
            }
        }

        self.mean = sums.iter().map(|s| s / num_samples).collect();

        let mut sum_squared_diffs = vec![0.0; num_features];
        for sample in healthy_data {
            for (i, val) in sample.iter().enumerate() {
                let diff = val - self.mean[i];
                sum_squared_diffs[i] += diff * diff;
            }
        }

        self.std_dev = sum_squared_diffs
            .iter()
            .map(|s| (s / num_samples).sqrt())
            .collect();

        self.is_trained = true;
        println!("Model Trained. Baselines: {:?}", self.mean);
    }

    pub fn set_threshold(&mut self, new_threshold: f64) {
        self.threshold_multiplier = new_threshold;
    }

    /// Yeni gelen veriyi kontrol eder. Normalden sapma varsa true döner.
    pub fn is_anomaly(&self, sample: &[f64]) -> Vec<bool> {
        if !self.is_trained {
            return vec![false; sample.len()];
        }

        sample
            .iter()
            .enumerate()
            .map(|(i, val)| {
                let limit = self.mean[i] + (self.std_dev[i] * self.threshold_multiplier);
                *val > limit
            })
            .collect()
    }

    /// Calculates a unified "Health Score" (0.0 to 1.0)
    /// 1.0 = Perfect Health
    /// 0.0 = Critical Failure (Fatal)
    pub fn calculate_health_score(&self, sample: &[f64]) -> f64 {
        if !self.is_trained {
            return 1.0;
        }

        let mut max_z_score = 0.0;

        for (i, val) in sample.iter().enumerate() {
            if self.std_dev[i] == 0.0 { continue; }
            
            // Z-Score: How many standard deviations away is this value?
            let z = (val - self.mean[i]).abs() / self.std_dev[i];
            if z > max_z_score {
                max_z_score = z;
            }
        }

        // Logic:
        // Z-Score <= Threshold (e.g., 3.0) -> 100% Health
        // Z-Score >= Fatal Limit (e.g., 10.0) -> 0% Health
        // In between -> Linear Drop
        
        let threshold = self.threshold_multiplier;
        let fatal_limit = 15.0; // 15 StdDevs is massive, considered total failure

        if max_z_score <= threshold {
            1.0
        } else if max_z_score >= fatal_limit {
            0.0
        } else {
            1.0 - ((max_z_score - threshold) / (fatal_limit - threshold))
        }
    }
}
