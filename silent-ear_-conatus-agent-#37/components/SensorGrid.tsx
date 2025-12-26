import React from 'react';
import { Sensor } from '../types';
import { HudPanel } from './ui/HudPanel';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SensorGridProps {
  sensors: Sensor[];
}

const SensorCard: React.FC<{ sensor: Sensor }> = ({ sensor }) => {
  const isCritical = sensor.status === 'critical';
  const isWarning = sensor.status === 'warning';
  
  let statusColor = 'text-cyan-400';
  let barColor = 'bg-cyan-500';
  let panelBorder = 'border-slate-700';

  if (isCritical) {
    statusColor = 'text-red-500';
    barColor = 'bg-red-500';
    panelBorder = 'border-red-900 animate-pulse';
  } else if (isWarning) {
    statusColor = 'text-amber-400';
    barColor = 'bg-amber-500';
    panelBorder = 'border-amber-900';
  }

  // Calculate percentage for bar chart (assuming max safe is 5.0)
  const barWidth = Math.min((sensor.value / 8.0) * 100, 100);

  return (
    <div className={`bg-slate-900/50 border ${panelBorder} p-3 relative overflow-hidden flex flex-col justify-between group hover:bg-slate-800/50 transition-colors`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] text-slate-400 font-tech tracking-wider">{sensor.label}</span>
        <div className={`w-2 h-2 rounded-full ${barColor} ${isCritical ? 'animate-ping' : ''}`} />
      </div>
      
      <div className="flex items-end justify-between">
        <span className={`text-2xl font-mono font-bold tabular-nums tracking-tighter ${statusColor}`}>
          {sensor.value.toFixed(3)}
        </span>
        <span className="text-[10px] text-slate-500 font-mono mb-1">mm/s</span>
      </div>

      {/* Visual Bar Indicator */}
      <div className="w-full h-1 bg-slate-800 mt-2 overflow-hidden">
        <div 
            className={`h-full ${barColor} transition-all duration-500 ease-out`} 
            style={{ width: `${barWidth}%` }}
        />
      </div>

      {/* Peak Indicator */}
      <div className="mt-1 flex justify-between text-[10px] font-mono text-slate-500">
        <span>PEAK: {sensor.peak.toFixed(2)}</span>
      </div>
      
      {/* Decorative corner */}
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-r border-b ${isCritical ? 'border-red-500' : 'border-slate-600'}`} />
    </div>
  );
};

export const SensorGrid: React.FC<SensorGridProps> = ({ sensors }) => {
  return (
    <HudPanel title="SENSOR ARRAY // VIBRATION ANALYSIS" className="h-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-full overflow-y-auto pr-1">
        {sensors.map(sensor => (
          <SensorCard key={sensor.id} sensor={sensor} />
        ))}
      </div>
    </HudPanel>
  );
};
