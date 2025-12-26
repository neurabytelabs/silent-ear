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

    // ==================== INITIALIZATION TESTS ====================

    #[test]
    fn test_new_detector() {
        let detector = AnomalyDetector::new(3.0);
        assert_eq!(detector.threshold_multiplier, 3.0);
        assert!(!detector.is_trained);
        assert!(detector.mean.is_empty());
    }

    #[test]
    fn test_new_detector_various_thresholds() {
        for threshold in [0.5, 1.0, 2.0, 5.0, 10.0] {
            let detector = AnomalyDetector::new(threshold);
            assert_eq!(detector.threshold_multiplier, threshold);
        }
    }

    #[test]
    fn test_set_threshold() {
        let mut detector = AnomalyDetector::new(3.0);
        detector.set_threshold(5.0);
        assert_eq!(detector.threshold_multiplier, 5.0);

        detector.set_threshold(0.1);
        assert_eq!(detector.threshold_multiplier, 0.1);
    }

    // ==================== TRAINING TESTS ====================

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
    fn test_train_empty_data() {
        let mut detector = AnomalyDetector::new(3.0);
        detector.train(&[]);

        assert!(!detector.is_trained);
        assert!(detector.mean.is_empty());
        assert!(detector.std_dev.is_empty());
    }

    #[test]
    fn test_train_single_sample() {
        let mut detector = AnomalyDetector::new(3.0);
        detector.train(&[vec![5.0, 10.0, 15.0]]);

        assert!(detector.is_trained);
        assert_eq!(detector.mean, vec![5.0, 10.0, 15.0]);
        assert_eq!(detector.std_dev, vec![0.0, 0.0, 0.0]);
    }

    #[test]
    fn test_train_with_variance() {
        let mut detector = AnomalyDetector::new(3.0);
        // Mean = 10, values: 8, 10, 12 -> variance = 8/3, std = sqrt(8/3) ≈ 1.633
        let data = vec![vec![8.0], vec![10.0], vec![12.0]];
        detector.train(&data);

        assert!(detector.is_trained);
        assert_eq!(detector.mean[0], 10.0);
        assert!((detector.std_dev[0] - 1.632993).abs() < 0.001);
    }

    #[test]
    fn test_train_negative_values() {
        let mut detector = AnomalyDetector::new(3.0);
        let data = vec![vec![-10.0, -5.0], vec![-8.0, -7.0], vec![-12.0, -3.0]];
        detector.train(&data);

        assert!(detector.is_trained);
        assert_eq!(detector.mean[0], -10.0);
        assert_eq!(detector.mean[1], -5.0);
    }

    #[test]
    fn test_train_large_dataset() {
        let mut detector = AnomalyDetector::new(3.0);
        // 1000 samples of [100.0, 200.0]
        let data: Vec<Vec<f64>> = (0..1000).map(|_| vec![100.0, 200.0]).collect();
        detector.train(&data);

        assert!(detector.is_trained);
        assert_eq!(detector.mean, vec![100.0, 200.0]);
        assert_eq!(detector.std_dev, vec![0.0, 0.0]);
    }

    #[test]
    fn test_train_eight_channels() {
        let mut detector = AnomalyDetector::new(3.0);
        // Simulating 8 bearing channels like real data
        let data = vec![
            vec![0.1, 0.2, 0.15, 0.18, 0.12, 0.14, 0.11, 0.13],
            vec![0.11, 0.19, 0.16, 0.17, 0.13, 0.15, 0.12, 0.14],
            vec![0.09, 0.21, 0.14, 0.19, 0.11, 0.13, 0.10, 0.12],
        ];
        detector.train(&data);

        assert!(detector.is_trained);
        assert_eq!(detector.mean.len(), 8);
        assert_eq!(detector.std_dev.len(), 8);
    }

    // ==================== ANOMALY DETECTION TESTS ====================

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
    fn test_anomaly_untrained_detector() {
        let detector = AnomalyDetector::new(3.0);
        let result = detector.is_anomaly(&[100.0, 200.0, 300.0]);

        // Untrained detector should return all false
        assert_eq!(result, vec![false, false, false]);
    }

    #[test]
    fn test_anomaly_at_boundary() {
        let mut detector = AnomalyDetector::new(3.0);
        // std_dev = 1.0, mean = 10.0
        let data = vec![vec![9.0], vec![10.0], vec![11.0]];
        detector.train(&data);

        // Exactly at threshold (mean + 3*std) should NOT be anomaly
        // mean=10, std≈0.816, threshold = 10 + 3*0.816 = 12.45
        let at_threshold = vec![12.4];
        let result = detector.is_anomaly(&at_threshold);
        assert!(!result[0]);

        // Just above threshold SHOULD be anomaly
        let above_threshold = vec![15.0];
        let result = detector.is_anomaly(&above_threshold);
        assert!(result[0]);
    }

    #[test]
    fn test_anomaly_only_detects_upper_bound() {
        let mut detector = AnomalyDetector::new(3.0);
        let data = vec![vec![10.0], vec![10.0], vec![10.0]];
        detector.train(&data);

        // Very low value (below mean) - current impl only checks upper bound
        let low_value = vec![-100.0];
        let result = detector.is_anomaly(&low_value);
        assert!(!result[0]); // Current implementation only checks val > limit
    }

    // ==================== HEALTH SCORE TESTS ====================

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
    fn test_health_score_zero() {
        let mut detector = AnomalyDetector::new(3.0);
        let data = vec![vec![10.0], vec![11.0], vec![9.0]];
        detector.train(&data);

        // Fatal level (Z >= 15) should return 0.0
        // std ≈ 0.816, need value where z >= 15
        // z = |val - mean| / std = |val - 10| / 0.816 >= 15
        // |val - 10| >= 12.24, so val >= 22.24 or val <= -2.24
        let fatal_value = vec![25.0];
        let score = detector.calculate_health_score(&fatal_value);
        assert_eq!(score, 0.0);
    }

    #[test]
    fn test_health_score_intermediate() {
        let mut detector = AnomalyDetector::new(3.0);
        // Use data with std_dev = 1.0 for easy calculation
        let data = vec![vec![9.0], vec![10.0], vec![11.0]];
        detector.train(&data);
        // mean = 10.0, std ≈ 0.816

        // Value that gives z-score between threshold (3) and fatal (15)
        // For z = 9 (midpoint): val = mean + z*std = 10 + 9*0.816 ≈ 17.35
        let mid_value = vec![17.35];
        let score = detector.calculate_health_score(&mid_value);

        // Score should be between 0 and 1
        assert!(score > 0.0 && score < 1.0);
    }

    #[test]
    fn test_health_score_zero_std_dev() {
        let mut detector = AnomalyDetector::new(3.0);
        // All same values -> std_dev = 0
        let data = vec![vec![10.0], vec![10.0], vec![10.0]];
        detector.train(&data);

        // With zero std_dev, any different value should still work
        let score = detector.calculate_health_score(&vec![100.0]);
        // Should return 1.0 because std_dev[i] == 0 is skipped
        assert_eq!(score, 1.0);
    }

    #[test]
    fn test_health_score_multiple_channels() {
        let mut detector = AnomalyDetector::new(3.0);
        let data = vec![
            vec![10.0, 20.0, 30.0],
            vec![11.0, 21.0, 31.0],
            vec![9.0, 19.0, 29.0],
        ];
        detector.train(&data);

        // One channel bad, others good - should reflect worst channel
        let mixed = vec![10.0, 20.0, 50.0]; // Third channel is bad
        let score = detector.calculate_health_score(&mixed);
        assert!(score < 1.0);
    }

    // ==================== INTEGRATION TESTS ====================

    #[test]
    fn test_full_workflow() {
        // Simulate real usage pattern
        let mut detector = AnomalyDetector::new(3.0);

        // 1. Training phase with healthy data
        let healthy_data: Vec<Vec<f64>> = (0..100)
            .map(|i| {
                vec![
                    0.1 + (i as f64 * 0.001), // Slight drift
                    0.2 + (i as f64 * 0.0005),
                ]
            })
            .collect();
        detector.train(&healthy_data);
        assert!(detector.is_trained);

        // 2. Normal operation - should be healthy
        let normal_reading = vec![0.15, 0.22];
        let health = detector.calculate_health_score(&normal_reading);
        assert!(health > 0.9);
        let anomalies = detector.is_anomaly(&normal_reading);
        assert!(!anomalies[0] && !anomalies[1]);

        // 3. Degradation starts
        let degraded_reading = vec![0.5, 0.25];
        let health = detector.calculate_health_score(&degraded_reading);
        assert!(health < 1.0);

        // 4. Adjust threshold on the fly
        detector.set_threshold(5.0);
        let health_after = detector.calculate_health_score(&degraded_reading);
        assert!(health_after >= health); // Higher threshold = more lenient
    }

    #[test]
    fn test_retrain_detector() {
        let mut detector = AnomalyDetector::new(3.0);

        // First training
        detector.train(&[vec![10.0], vec![10.0]]);
        assert_eq!(detector.mean[0], 10.0);

        // Retrain with different data
        detector.train(&[vec![50.0], vec![50.0]]);
        assert_eq!(detector.mean[0], 50.0);
    }
}
