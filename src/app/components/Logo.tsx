import { Activity } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center`}>
          <Activity className="w-1/2 h-1/2 text-white" strokeWidth={2.5} />
        </div>
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border-2 border-background" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold tracking-tight`}>
            SensorFleet
          </span>
          <span className="text-xs text-muted-foreground -mt-1">
            IoT Management
          </span>
        </div>
      )}
    </div>
  );
}
