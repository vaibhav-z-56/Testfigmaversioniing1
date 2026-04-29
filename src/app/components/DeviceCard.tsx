import { Device } from '../data/mockDevices';
import { Card } from './ui/card';
import { Battery, Signal, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DeviceCardProps {
  device: Device;
  onClick: () => void;
}

function Sparkline({ data }: { data: number[] }) {
  if (data.length === 0) return null;

  const width = 120;
  const height = 24;
  const padding = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DeviceCard({ device, onClick }: DeviceCardProps) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  const batteryColor =
    device.battery > 60 ? 'text-green-600' :
    device.battery > 30 ? 'text-yellow-600' :
    'text-red-600';

  const signalColor =
    device.signal > 70 ? 'text-green-600' :
    device.signal > 40 ? 'text-yellow-600' :
    'text-red-600';

  return (
    <Card
      className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${statusColors[device.status]}`} />
            <div>
              <h3 className="font-semibold">{device.name}</h3>
              <p className="text-sm text-muted-foreground">{device.type}</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {device.id}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Battery className={`w-4 h-4 ${batteryColor}`} />
            <span className={batteryColor}>{device.battery}%</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Signal className={`w-4 h-4 ${signalColor}`} />
            <span className={signalColor}>{device.signal}%</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{formatDistanceToNow(device.lastSeen, { addSuffix: true })}</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {device.location.address}
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Last 10 readings</span>
            <Sparkline data={device.recentReadings.map((r) => r.value)} />
          </div>
        </div>
      </div>
    </Card>
  );
}
