import React from 'react';

interface HudPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: 'normal' | 'danger';
}

export const HudPanel: React.FC<HudPanelProps> = ({ 
  children, 
  className = '', 
  title,
  variant = 'normal' 
}) => {
  const borderColor = variant === 'danger' ? 'border-red-500/50' : 'border-cyan-500/30';
  const glowColor = variant === 'danger' ? 'shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'shadow-[0_0_15px_rgba(6,182,212,0.1)]';
  const bgColor = variant === 'danger' ? 'bg-red-950/10' : 'bg-slate-900/40';

  return (
    <div className={`relative group ${className}`}>
      {/* Sci-fi Corner Decorators */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${borderColor}`} />
      <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${borderColor}`} />
      <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${borderColor}`} />
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${borderColor}`} />

      {/* Main Container */}
      <div className={`h-full w-full border ${borderColor} ${bgColor} backdrop-blur-sm ${glowColor} flex flex-col overflow-hidden`}>
        {title && (
          <div className={`px-3 py-1 text-xs font-tech tracking-widest border-b ${borderColor} flex justify-between items-center bg-slate-900/50`}>
            <span className={variant === 'danger' ? 'text-red-400' : 'text-cyan-400'}>
              {title}
            </span>
            <div className="flex space-x-1">
              <div className={`w-1 h-1 ${variant === 'danger' ? 'bg-red-500' : 'bg-cyan-500'} rounded-full animate-pulse`} />
              <div className={`w-1 h-1 ${variant === 'danger' ? 'bg-red-500' : 'bg-cyan-500'} rounded-full opacity-50`} />
            </div>
          </div>
        )}
        <div className="p-4 flex-1 relative">
          {children}
        </div>
      </div>
    </div>
  );
};
