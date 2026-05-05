import { mockDevices } from '../data/mockDevices';
import { Card } from './ui/card';
import { Monitor, Activity, AlertTriangle, TrendingUp, Battery, Signal } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router';

export function OverviewPage() {
  const navigate = useNavigate();

  const stats = {
    total: mockDevices.length,
    online: mockDevices.filter((d) => d.status === 'online').length,
    offline: mockDevices.filter((d) => d.status === 'offline').length,
    warning: mockDevices.filter((d) => d.status === 'warning').length,
    error: mockDevices.filter((d) => d.status === 'error').length,
    avgBattery: Math.round(
      mockDevices.reduce((acc, d) => acc + d.battery, 0) / mockDevices.length
    ),
    avgSignal: Math.round(
      mockDevices.reduce((acc, d) => acc + d.signal, 0) / mockDevices.length
    ),
  };

  const deviceTypeData = mockDevices.reduce((acc, device) => {
    const existing = acc.find((item) => item.name === device.type);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: device.type, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const statusData = [
    { name: 'Online', value: stats.online, color: '#22c55e' },
    { name: 'Offline', value: stats.offline, color: '#9ca3af' },
    { name: 'Warning', value: stats.warning, color: '#eab308' },
    { name: 'Error', value: stats.error, color: '#ef4444' },
  ];

  const batteryDistribution = [
    { range: '0-20%', count: mockDevices.filter((d) => d.battery <= 20).length },
    { range: '21-40%', count: mockDevices.filter((d) => d.battery > 20 && d.battery <= 40).length },
    { range: '41-60%', count: mockDevices.filter((d) => d.battery > 40 && d.battery <= 60).length },
    { range: '61-80%', count: mockDevices.filter((d) => d.battery > 60 && d.battery <= 80).length },
    { range: '81-100%', count: mockDevices.filter((d) => d.battery > 80).length },
  ];

  const recentAlerts = mockDevices
    .filter((d) => d.status === 'offline' || d.status === 'warning' || d.status === 'error')
    .sort((a, b) => b.lastSeen.getTime() - a.lastSeen.getTime())
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your sensor fleet performance and health at a glance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Devices</p>
              <p className="text-3xl font-bold mt-2">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Monitor className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">12% increase</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Online Devices</p>
              <p className="text-3xl font-bold mt-2">{stats.online}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            {((stats.online / stats.total) * 100).toFixed(1)}% of total fleet
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Battery</p>
              <p className="text-3xl font-bold mt-2">{stats.avgBattery}%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
              <Battery className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500"
              style={{ width: `${stats.avgBattery}%` }}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Signal</p>
              <p className="text-3xl font-bold mt-2">{stats.avgSignal}%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Signal className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500"
              style={{ width: `${stats.avgSignal}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Device Status Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Battery Level Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={batteryDistribution}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="range"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Device Types and Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Device Types</h3>
          <div className="space-y-3">
            {deviceTypeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm">{item.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${(item.value / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-8 text-right">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Alerts</h3>
            <button
              onClick={() => navigate('/dashboard/alerts')}
              className="text-sm text-primary hover:underline"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {recentAlerts.length > 0 ? (
              recentAlerts.map((device) => (
                <div
                  key={device.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => navigate('/dashboard/devices')}
                >
                  <AlertTriangle
                    className={`w-5 h-5 mt-0.5 ${
                      device.status === 'offline'
                        ? 'text-gray-500'
                        : device.status === 'error'
                        ? 'text-red-500'
                        : 'text-yellow-500'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{device.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {device.status === 'offline'
                        ? 'Device offline'
                        : device.status === 'error'
                        ? 'Connection error'
                        : 'Low battery warning'}{' '}
                      • {formatDistanceToNow(device.lastSeen, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No recent alerts
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
