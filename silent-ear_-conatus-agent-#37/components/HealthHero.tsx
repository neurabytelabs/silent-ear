import React from 'react';
import { Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import { HudPanel } from './ui/HudPanel';
import { SystemHealth } from '../types';

interface HealthHeroProps {
  health: SystemHealth;
}

export const HealthHero: React.FC<HealthHeroProps> = ({ health }) => {
  const isCritical = health.status === 'CRITICAL';
  const isWarning = health.status === 'DEGRADED';
  
  let colorClass = 'text-cyan-400';
  let Icon = ShieldCheck;
  
  if (isCritical) {
    colorClass = 'text-red-500';
    Icon = AlertTriangle;
  } else if (isWarning) {
    colorClass = 'text-amber-400';
    Icon = Activity;
  }

  const ringColor = isCritical ? 'border-red-500' : isWarning ? 'border-amber-400' : 'border-cyan-500';

  return (
    <HudPanel 
      className="h-full" 
      title="SYSTEM STATUS // DIGITAL TWIN" 
      variant={isCritical ? 'danger' : 'normal'}
    >
      <div className="flex flex-col items-center justify-center h-full relative">
        
        {/* Decorative rotating rings */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
             <div className={`w-48 h-48 border border-dashed ${ringColor} rounded-full animate-[spin_10s_linear_infinite]`} />
             <div className={`w-40 h-40 border border-dotted ${ringColor} rounded-full animate-[spin_15s_linear_reverse_infinite] absolute`} />
        </div>

        {/* Central Score */}
        <div className="relative z-10 flex flex-col items-center">
            <Icon className={`w-12 h-12 mb-2 ${colorClass} ${isCritical ? 'animate-pulse' : ''}`} />
            <div className={`text-6xl font-mono font-bold tracking-tighter ${colorClass}`}>
                {health.score}%
            </div>
            <div className={`mt-2 text-lg font-tech tracking-[0.2em] ${colorClass}`}>
                {health.status}
            </div>
        </div>

        {/* Secondary Metrics */}
        <div className="w-full mt-8 grid grid-cols-2 gap-4 border-t border-slate-700/50 pt-4">
            <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-tech">RPM</span>
                <span className="text-xl font-mono text-slate-200 tabular-nums">{health.rpm}</span>
            </div>
            <div className="flex flex-col text-right">
                <span className="text-xs text-slate-500 font-tech">CORE TEMP</span>
                <span className={`text-xl font-mono tabular-nums ${health.temperature > 85 ? 'text-red-400 animate-pulse' : 'text-slate-200'}`}>
                    {health.temperature}°C
                </span>
            </div>
            <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-tech">UPTIME</span>
                <span className="text-sm font-mono text-cyan-600">{health.uptime}</span>
            </div>
             <div className="flex flex-col text-right">
                <span className="text-xs text-slate-500 font-tech">AI MODEL</span>
                <span className="text-sm font-mono text-cyan-600">v3.4.1-b</span>
            </div>
        </div>
      </div>
    </HudPanel>
  );
};
