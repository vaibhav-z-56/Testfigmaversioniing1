import { Device } from '../data/mockDevices';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from './ui/drawer';
import { X, Battery, Signal, MapPin, Cpu, Hash } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DeviceDetailDrawerProps {
  device: Device | null;
  open: boolean;
  onClose: () => void;
}

export function DeviceDetailDrawer({
  device,
  open,
  onClose,
}: DeviceDetailDrawerProps) {
  if (!device) return null;

  const statusVariants = {
    online: 'default',
    offline: 'secondary',
    warning: 'outline',
    error: 'destructive',
  } as const;

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()} direction="right">
      <DrawerContent className="h-full w-full sm:w-[400px] ml-auto">
        <DrawerHeader className="border-b">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div
                className={`w-2.5 h-2.5 rounded-full mt-2 ${statusColors[device.status]}`}
              />
              <div>
                <DrawerTitle>{device.name}</DrawerTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {device.type} Sensor
                </p>
              </div>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="w-4 h-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="p-6 space-y-6 overflow-auto">
          <div>
            <Badge variant={statusVariants[device.status]} className="capitalize">
              {device.status}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-3">Device Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Device ID</div>
                    <div className="text-sm font-mono">{device.id}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Serial Number</div>
                    <div className="text-sm font-mono">{device.serialNumber}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Cpu className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Firmware</div>
                    <div className="text-sm">{device.firmware}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3">Status Metrics</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Battery className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs text-muted-foreground">Battery</div>
                      <div className="text-sm font-semibold">{device.battery}%</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          device.battery > 60
                            ? 'bg-green-500'
                            : device.battery > 30
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${device.battery}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Signal className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs text-muted-foreground">Signal Strength</div>
                      <div className="text-sm font-semibold">{device.signal}%</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          device.signal > 70
                            ? 'bg-green-500'
                            : device.signal > 40
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${device.signal}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3">Location</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm">{device.location.address}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {device.location.lat.toFixed(4)}, {device.location.lng.toFixed(4)}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-2">Last Seen</h3>
              <div className="text-sm text-muted-foreground">
                {format(device.lastSeen, 'PPpp')}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3">24-Hour Telemetry</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={device.telemetry24h.map((reading) => ({
                      time: format(reading.timestamp, 'HH:mm'),
                      value: reading.value,
                    }))}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 10 }}
                      interval={47}
                      className="text-muted-foreground"
                    />
                    <YAxis
                      tick={{ fontSize: 10 }}
                      width={40}
                      className="text-muted-foreground"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                        fontSize: '12px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1" variant="outline">
              Edit Device
            </Button>
            <Button className="flex-1" variant="destructive">
              Remove
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
