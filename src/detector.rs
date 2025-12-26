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
            if self.std_dev[i] == 0.0 {
                continue;
            }

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new_detector() {
        let detector = AnomalyDetector::new(3.0);
        assert_eq!(detector.threshold_multiplier, 3.0);
        assert!(!detector.is_trained);
        assert!(detector.mean.is_empty());
    }

    #[test]
    fn test_train_detector() {
        let mut detector = AnomalyDetector::new(3.0);
        let data = vec![vec![1.0, 2.0], vec![1.0, 2.0], vec![1.0, 2.0]];
        detector.train(&data);

        assert!(detector.is_trained);
        assert_eq!(detector.mean, vec![1.0, 2.0]);
        assert_eq!(detector.std_dev, vec![0.0, 0.0]); // No variance
    }

    #[test]
    fn test_anomaly_detection() {
        let mut detector = AnomalyDetector::new(2.0);
        let data = vec![
            vec![10.0, 20.0],
            vec![11.0, 21.0],
            vec![9.0, 19.0],
            vec![10.0, 20.0],
        ];
        detector.train(&data);

        // Normal sample - within 2 std devs
        let normal = vec![10.5, 20.5];
        let result = detector.is_anomaly(&normal);
        assert!(!result[0] && !result[1]);

        // Anomalous sample - way outside normal range
        let anomaly = vec![50.0, 20.0];
        let result = detector.is_anomaly(&anomaly);
        assert!(result[0]); // First value is anomaly
    }

    #[test]
    fn test_health_score() {
        let mut detector = AnomalyDetector::new(3.0);
        let data = vec![vec![10.0], vec![10.0], vec![10.0], vec![11.0], vec![9.0]];
        detector.train(&data);

        // Perfect health - exactly at mean
        let score = detector.calculate_health_score(&vec![10.0]);
        assert_eq!(score, 1.0);

        // Untrained detector returns 1.0
        let untrained = AnomalyDetector::new(3.0);
        assert_eq!(untrained.calculate_health_score(&vec![100.0]), 1.0);
    }

    #[test]
    fn test_set_threshold() {
        let mut detector = AnomalyDetector::new(3.0);
        detector.set_threshold(5.0);
        assert_eq!(detector.threshold_multiplier, 5.0);
    }
}
