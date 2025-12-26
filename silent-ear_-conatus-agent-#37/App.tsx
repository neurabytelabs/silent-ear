import React, { useEffect, useState } from 'react';
import { Zap, Wifi, Menu, MoreVertical } from 'lucide-react';
import { HealthHero } from './components/HealthHero';
import { VibrationChart } from './components/VibrationChart';
import { SensorGrid } from './components/SensorGrid';
import { generateSensorData, calculateSystemHealth } from './services/dataSimulator';
import { Sensor, SystemHealth } from './types';
import { REFRESH_RATE_MS, MOCK_HISTORY_LENGTH } from './constants';

const App: React.FC = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [health, setHealth] = useState<SystemHealth>({
    score: 100,
    status: 'OPTIMAL',
    uptime: '0',
    lastMaintenance: '-',
    rpm: 0,
    temperature: 0
  });
  
  const [history, setHistory] = useState<{time: string, value: number}[]>([]);

  // Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => {
        const newData = generateSensorData(prev);
        
        // Update Health based on new sensor data
        const newHealth = calculateSystemHealth(newData);
        setHealth(newHealth);
        
        // Update Chart History (using average of all sensors for the composite chart)
        const avgVibration = newData.reduce((acc, curr) => acc + curr.value, 0) / newData.length;
        
        setHistory(prevHist => {
            const newEntry = {
                time: new Date().toLocaleTimeString('en-US', { hour12: false, second: '2-digit', minute: '2-digit' }),
                value: avgVibration
            };
            const newHist = [...prevHist, newEntry];
            if (newHist.length > MOCK_HISTORY_LENGTH) return newHist.slice(1);
            return newHist;
        });

        return newData;
      });
    }, REFRESH_RATE_MS);

    return () => clearInterval(interval);
  }, []);

  const isCritical = health.status === 'CRITICAL';

  return (
    <div className={`w-screen h-screen flex flex-col p-2 md:p-4 gap-4 transition-colors duration-1000 ${isCritical ? 'bg-red-950/20' : 'bg-slate-950'}`}>
      
      {/* HEADER */}
      <header className="flex justify-between items-center px-4 py-3 border-b border-cyan-500/20 bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center space-x-4">
            <div className="p-2 border border-cyan-500/50 rounded-sm">
                <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
                <h1 className="font-tech text-2xl tracking-widest text-slate-100 uppercase">
                    Silent-Ear <span className="text-cyan-500 text-sm align-top">v1.0</span>
                </h1>
                <p className="text-[10px] font-mono text-slate-500 tracking-[0.2em]">CONATUS AGENT #37 // PREDICTIVE MAINTENANCE</p>
            </div>
        </div>
        
        <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col text-right">
                <span className="text-[10px] text-slate-500 font-tech">CONNECTION</span>
                <div className="flex items-center justify-end space-x-2 text-emerald-400">
                    <span className="text-xs font-mono">SECURE_TLS_1.3</span>
                    <Wifi className="w-4 h-4" />
                </div>
            </div>
            <button className="p-2 hover:bg-slate-800 rounded-sm transition-colors text-slate-400 hover:text-cyan-400">
                <Menu className="w-6 h-6" />
            </button>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <main className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 grid-rows-[min-content_1fr] md:grid-rows-2 gap-4">
        
        {/* TOP LEFT: HERO HEALTH */}
        <div className="md:col-span-4 row-span-1 h-[300px] md:h-auto">
            <HealthHero health={health} />
        </div>

        {/* TOP RIGHT: LIVE CHART */}
        <div className="md:col-span-8 row-span-1 h-[300px] md:h-auto">
            <VibrationChart 
                data={history} 
                color={isCritical ? "#ef4444" : "#22d3ee"} 
            />
        </div>

        {/* BOTTOM: SENSOR ARRAY */}
        <div className="md:col-span-12 row-span-1 h-[400px] md:h-auto min-h-0">
            <SensorGrid sensors={sensors} />
        </div>

      </main>

      {/* FOOTER */}
      <footer className="flex justify-between items-center text-[10px] font-mono text-slate-600 px-2">
        <span>UNIT ID: 884-AX-99 // SECTOR 7G</span>
        <div className="flex space-x-4">
            <span>MEM: 44%</span>
            <span>CPU: 12%</span>
            <span>LATENCY: 24ms</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
