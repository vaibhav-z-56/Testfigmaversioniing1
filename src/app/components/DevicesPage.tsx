import { useState } from 'react';
import { mockDevices, Device } from '../data/mockDevices';
import { DeviceCard } from './DeviceCard';
import { DeviceDetailDrawer } from './DeviceDetailDrawer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function DevicesPage() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
    setDrawerOpen(true);
  };

  const handleAddDevice = () => {
    alert('Add Device functionality would open a dialog here');
  };

  const filteredDevices = mockDevices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || device.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockDevices.length,
    online: mockDevices.filter((d) => d.status === 'online').length,
    offline: mockDevices.filter((d) => d.status === 'offline').length,
    warning: mockDevices.filter((d) => d.status === 'warning').length,
    error: mockDevices.filter((d) => d.status === 'error').length,
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b bg-background">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Devices</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and monitor your sensor fleet
              </p>
            </div>
            <Button onClick={handleAddDevice}>
              <Plus className="w-4 h-4 mr-2" />
              Add Device
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Total:</span>
              <span className="font-semibold">{stats.total}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Online:</span>
              <span className="font-semibold">{stats.online}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="text-sm text-muted-foreground">Offline:</span>
              <span className="font-semibold">{stats.offline}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-sm text-muted-foreground">Warning:</span>
              <span className="font-semibold">{stats.warning}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-sm text-muted-foreground">Error:</span>
              <span className="font-semibold">{stats.error}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDevices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onClick={() => handleDeviceClick(device)}
            />
          ))}
        </div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No devices found</p>
          </div>
        )}
      </div>

      <DeviceDetailDrawer
        device={selectedDevice}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
