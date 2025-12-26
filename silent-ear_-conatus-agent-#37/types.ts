export interface Sensor {
  id: string;
  label: string;
  value: number; // Current vibration level (mm/s)
  peak: number; // Peak value in last window
  status: 'nominal' | 'warning' | 'critical';
  trend: number[]; // History for sparkline
}

export interface SystemHealth {
  score: number; // 0-100
  status: 'OPTIMAL' | 'DEGRADED' | 'CRITICAL';
  uptime: string;
  lastMaintenance: string;
  rpm: number;
  temperature: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
}
