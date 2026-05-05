import { mockDevices } from '../data/mockDevices';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Layers, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function MapPage() {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  // Group devices by location address (building)
  const devicesByLocation = mockDevices.reduce((acc, device) => {
    const building = device.location.address.split(',')[0];
    if (!acc[building]) {
      acc[building] = [];
    }
    acc[building].push(device);
    return acc;
  }, {} as Record<string, typeof mockDevices>);

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Map View</h1>
            <p className="text-muted-foreground mt-1">
              Geographic distribution of your sensor fleet
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="gap-2">
              <Layers className="w-4 h-4" />
              Layers
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Map Area - Placeholder */}
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
          {/* Map Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, .05) 25%, rgba(0, 0, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .05) 75%, rgba(0, 0, 0, .05) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, .05) 25%, rgba(0, 0, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .05) 75%, rgba(0, 0, 0, .05) 76%, transparent 77%)',
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          {/* Device Location Markers */}
          <div className="absolute inset-0 p-12 flex items-center justify-center">
            <div className="relative w-full max-w-4xl h-full">
              {Object.entries(devicesByLocation).map(([building, devices], index) => {
                const position = {
                  left: `${(index % 4) * 25 + 10}%`,
                  top: `${Math.floor(index / 4) * 30 + 10}%`,
                };

                const online = devices.filter((d) => d.status === 'online').length;
                const total = devices.length;

                return (
                  <div
                    key={building}
                    className="absolute"
                    style={position}
                  >
                    <button
                      className="relative group"
                      onClick={() =>
                        setSelectedDevice(selectedDevice === building ? null : building)
                      }
                    >
                      <div className="relative">
                        <MapPin
                          className={`w-12 h-12 ${
                            online === total
                              ? 'text-green-600'
                              : online === 0
                              ? 'text-gray-400'
                              : 'text-yellow-600'
                          } drop-shadow-lg transform transition-transform group-hover:scale-110`}
                          fill="currentColor"
                        />
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-xs font-bold">
                          {total}
                        </div>
                      </div>

                      {/* Hover Card */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <Card className="p-3 whitespace-nowrap shadow-lg">
                          <p className="font-semibold">{building}</p>
                          <p className="text-sm text-muted-foreground">
                            {online} online / {total} total
                          </p>
                        </Card>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-6 left-6">
            <Card className="p-4">
              <h4 className="font-semibold mb-3 text-sm">Device Status</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-600" />
                  <span>All Online</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-yellow-600" />
                  <span>Partial Online</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-gray-400" />
                  <span>All Offline</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Panel - Location Details */}
        {selectedDevice && devicesByLocation[selectedDevice] && (
          <div className="w-80 border-l bg-background overflow-auto">
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedDevice}</h3>
                <p className="text-sm text-muted-foreground">
                  {devicesByLocation[selectedDevice].length} devices at this location
                </p>
              </div>

              <div className="space-y-2">
                {devicesByLocation[selectedDevice].map((device) => (
                  <Card key={device.id} className="p-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 ${statusColors[device.status]}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{device.name}</p>
                        <p className="text-xs text-muted-foreground">{device.type}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className="text-xs capitalize"
                          >
                            {device.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {device.battery}% • {device.signal}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
