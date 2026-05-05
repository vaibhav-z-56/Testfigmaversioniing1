import { useState } from 'react';
import { mockDevices } from '../data/mockDevices';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { format, subDays } from 'date-fns';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  // Generate mock historical data
  const generateHistoricalData = (days: number) => {
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const onlineCount = Math.floor(Math.random() * 4) + 10;
      data.push({
        date: format(date, 'MMM dd'),
        online: onlineCount,
        offline: Math.floor(Math.random() * 3) + 1,
        warning: Math.floor(Math.random() * 4) + 2,
        avgBattery: Math.floor(Math.random() * 15) + 75,
        avgSignal: Math.floor(Math.random() * 20) + 70,
        activeDevices: onlineCount + Math.floor(Math.random() * 2),
      });
    }
    return data;
  };

  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  const historicalData = generateHistoricalData(days);

  const deviceUptimeData = mockDevices.slice(0, 8).map((device) => ({
    name: device.name.split(' ').slice(0, 2).join(' '),
    uptime: Math.floor(Math.random() * 20) + 80,
  }));

  const currentStats = {
    online: mockDevices.filter((d) => d.status === 'online').length,
    avgBattery: Math.round(
      mockDevices.reduce((acc, d) => acc + d.battery, 0) / mockDevices.length
    ),
    avgSignal: Math.round(
      mockDevices.reduce((acc, d) => acc + d.signal, 0) / mockDevices.length
    ),
  };

  const previousStats = {
    online: historicalData[0]?.online || 10,
    avgBattery: historicalData[0]?.avgBattery || 80,
    avgSignal: historicalData[0]?.avgSignal || 75,
  };

  const trends = {
    online: currentStats.online - previousStats.online,
    battery: currentStats.avgBattery - previousStats.avgBattery,
    signal: currentStats.avgSignal - previousStats.avgSignal,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Deep insights into your sensor fleet performance and trends
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Online Devices Trend</p>
            {trends.online >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <p className="text-3xl font-bold">{currentStats.online}</p>
          <p
            className={`text-sm mt-2 ${
              trends.online >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trends.online >= 0 ? '+' : ''}
            {trends.online} vs {timeRange === '7d' ? '7 days ago' : timeRange === '30d' ? '30 days ago' : '90 days ago'}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Avg Battery Trend</p>
            {trends.battery >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <p className="text-3xl font-bold">{currentStats.avgBattery}%</p>
          <p
            className={`text-sm mt-2 ${
              trends.battery >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trends.battery >= 0 ? '+' : ''}
            {trends.battery}% vs {timeRange === '7d' ? '7 days ago' : timeRange === '30d' ? '30 days ago' : '90 days ago'}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Avg Signal Trend</p>
            {trends.signal >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <p className="text-3xl font-bold">{currentStats.avgSignal}%</p>
          <p
            className={`text-sm mt-2 ${
              trends.signal >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trends.signal >= 0 ? '+' : ''}
            {trends.signal}% vs {timeRange === '7d' ? '7 days ago' : timeRange === '30d' ? '30 days ago' : '90 days ago'}
          </p>
        </Card>
      </div>

      {/* Device Status Over Time */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Device Status Over Time</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalData}>
              <defs>
                <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorWarning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOffline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="online"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorOnline)"
                name="Online"
              />
              <Area
                type="monotone"
                dataKey="warning"
                stroke="#eab308"
                fillOpacity={1}
                fill="url(#colorWarning)"
                name="Warning"
              />
              <Area
                type="monotone"
                dataKey="offline"
                stroke="#9ca3af"
                fillOpacity={1}
                fill="url(#colorOffline)"
                name="Offline"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Battery and Signal Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Average Battery Level</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avgBattery"
                  stroke="#eab308"
                  strokeWidth={3}
                  dot={false}
                  name="Avg Battery %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Average Signal Strength</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avgSignal"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={false}
                  name="Avg Signal %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Device Uptime */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Device Uptime (Last {days} days)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deviceUptimeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12 }}
                width={120}
              />
              <Tooltip />
              <Bar dataKey="uptime" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
