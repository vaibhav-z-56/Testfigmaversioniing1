import { mockDevices } from '../data/mockDevices';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bell, AlertTriangle, XCircle, AlertCircle, CheckCircle, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Alert {
  id: string;
  deviceId: string;
  deviceName: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export function AlertsPage() {
  const [filter, setFilter] = useState<string>('all');

  // Generate alerts from devices
  const alerts: Alert[] = mockDevices
    .filter((d) => d.status !== 'online')
    .map((device, index) => ({
      id: `alert-${device.id}-${index}`,
      deviceId: device.id,
      deviceName: device.name,
      type:
        device.status === 'offline' || device.status === 'error'
          ? ('critical' as const)
          : ('warning' as const),
      message:
        device.status === 'offline'
          ? 'Device has gone offline and is not responding'
          : device.status === 'error'
          ? 'Device is reporting critical errors'
          : device.battery < 30
          ? `Low battery level: ${device.battery}%`
          : 'Device requires attention',
      timestamp: device.lastSeen,
      acknowledged: Math.random() > 0.5,
    }))
    .concat([
      {
        id: 'alert-system-1',
        deviceId: 'SYS',
        deviceName: 'System',
        type: 'info',
        message: 'Firmware update available for 8 devices',
        timestamp: new Date('2026-05-05T10:00:00'),
        acknowledged: false,
      },
      {
        id: 'alert-system-2',
        deviceId: 'SYS',
        deviceName: 'System',
        type: 'warning',
        message: 'Network latency detected in Building C sensors',
        timestamp: new Date('2026-05-04T15:30:00'),
        acknowledged: true,
      },
    ])
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'all') return true;
    if (filter === 'unacknowledged') return !alert.acknowledged;
    return alert.type === filter;
  });

  const stats = {
    total: alerts.length,
    critical: alerts.filter((a) => a.type === 'critical').length,
    warning: alerts.filter((a) => a.type === 'warning').length,
    info: alerts.filter((a) => a.type === 'info').length,
    unacknowledged: alerts.filter((a) => !a.acknowledged).length,
  };

  const alertTypeIcons = {
    critical: XCircle,
    warning: AlertTriangle,
    info: AlertCircle,
  };

  const alertTypeColors = {
    critical: 'text-red-600 bg-red-50 dark:bg-red-950',
    warning: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950',
    info: 'text-blue-600 bg-blue-50 dark:bg-blue-950',
  };

  const badgeColors = {
    critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage system alerts and notifications
          </p>
        </div>
        <Button variant="outline">
          <CheckCircle className="w-4 h-4 mr-2" />
          Acknowledge All
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Total Alerts</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-sm text-muted-foreground">Critical</p>
              <p className="text-2xl font-bold">{stats.critical}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-sm text-muted-foreground">Warning</p>
              <p className="text-2xl font-bold">{stats.warning}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Info</p>
              <p className="text-2xl font-bold">{stats.info}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-sm text-muted-foreground">Unacknowledged</p>
              <p className="text-2xl font-bold">{stats.unacknowledged}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Alerts</SelectItem>
              <SelectItem value="unacknowledged">Unacknowledged</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </span>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const Icon = alertTypeIcons[alert.type];
          return (
            <Card
              key={alert.id}
              className={`p-4 ${alert.acknowledged ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${alertTypeColors[alert.type]}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold">{alert.deviceName}</h3>
                      <Badge variant="secondary" className={badgeColors[alert.type]}>
                        {alert.type.toUpperCase()}
                      </Badge>
                      {alert.acknowledged && (
                        <Badge variant="outline" className="gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Acknowledged
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-2">
                    {!alert.acknowledged && (
                      <Button size="sm" variant="outline">
                        Acknowledge
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      View Device
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}

        {filteredAlerts.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">All Clear!</h3>
              <p className="text-muted-foreground">
                No alerts match your current filter
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
