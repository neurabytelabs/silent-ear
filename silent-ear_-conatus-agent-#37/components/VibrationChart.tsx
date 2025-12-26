import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { HudPanel } from './ui/HudPanel';

interface DataPoint {
  time: string;
  value: number;
}

interface VibrationChartProps {
  data: DataPoint[];
  color?: string;
}

export const VibrationChart: React.FC<VibrationChartProps> = ({ data, color = "#22d3ee" }) => {
  return (
    <HudPanel title="REAL-TIME OSCILLOSCOPE // COMPOSITE SIGNAL" className="h-full">
      <div className="h-full w-full flex flex-col">
        <div className="flex justify-between items-end mb-2 px-2">
            <div className="text-xs text-slate-400 font-mono">
                SIGNAL: <span className="text-cyan-400">COMBINED_RMS</span>
            </div>
            <div className="text-xs text-slate-500 font-mono">
                WINDOW: 30s
            </div>
        </div>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="time" 
                hide={true} 
              />
              <YAxis 
                domain={[0, 10]} 
                tick={{fill: '#475569', fontSize: 10, fontFamily: 'JetBrains Mono'}}
                tickFormatter={(val) => val.toFixed(1)}
                width={30}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                itemStyle={{ fontFamily: 'JetBrains Mono', color: color }}
                labelStyle={{ display: 'none' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                isAnimationActive={false} // Crucial for smooth real-time updates
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </HudPanel>
  );
};
