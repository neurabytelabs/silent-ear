import { Sensor, SystemHealth } from '../types';
import { SENSOR_CONFIG } from '../constants';

let timeStep = 0;

export const generateSensorData = (currentSensors: Sensor[]): Sensor[] => {
  timeStep += 0.1;
  
  return SENSOR_CONFIG.map((config, index) => {
    const prev = currentSensors.find(s => s.id === config.id);
    
    // Create some coherent noise (simulating vibration sine waves + noise)
    const baseFreq = 1 + (index * 0.2);
    const noise = (Math.random() - 0.5) * 0.5;
    const wave = Math.sin(timeStep * baseFreq) * 1.5;
    
    // Add intermittent spikes
    const spike = Math.random() > 0.98 ? Math.random() * 3 : 0;
    
    let value = Math.abs(2.5 + wave + noise + spike);
    
    // Simulate specific failure on Sensor 4
    if (config.id === 's4') {
        value += 3.5 + (Math.sin(timeStep * 5) * 1); // Destabilizing
    }

    // Determine Status
    let status: Sensor['status'] = 'nominal';
    if (value > 5.5) status = 'warning';
    if (value > 7.5) status = 'critical';

    const peak = prev ? Math.max(prev.peak, value) : value;

    return {
      id: config.id,
      label: config.label,
      value,
      peak: Math.random() > 0.95 ? value : peak, // Reset peak occasionally
      status,
      trend: prev ? [...prev.trend.slice(-10), value] : Array(10).fill(0)
    };
  });
};

export const calculateSystemHealth = (sensors: Sensor[]): SystemHealth => {
  const criticalCount = sensors.filter(s => s.status === 'critical').length;
  const warningCount = sensors.filter(s => s.status === 'warning').length;
  
  // Base Score
  let score = 98;
  
  // Penalties
  score -= (criticalCount * 25);
  score -= (warningCount * 10);
  
  // Add some jitter
  score += (Math.random() - 0.5);
  
  // Clamp
  score = Math.max(0, Math.min(100, score));

  let status: SystemHealth['status'] = 'OPTIMAL';
  if (score < 85) status = 'DEGRADED';
  if (score < 50) status = 'CRITICAL';

  return {
    score: Math.floor(score),
    status,
    uptime: '42d 14h 22m',
    lastMaintenance: '2023-10-15',
    rpm: Math.floor(3400 + (Math.random() * 20)),
    temperature: 65 + (criticalCount * 10) + (Math.random() * 2)
  };
};
