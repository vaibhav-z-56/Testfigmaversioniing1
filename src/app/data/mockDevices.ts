export type DeviceStatus = 'online' | 'offline' | 'warning' | 'error';

export interface TelemetryReading {
  timestamp: Date;
  value: number;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  status: DeviceStatus;
  battery: number;
  signal: number;
  lastSeen: Date;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  firmware: string;
  serialNumber: string;
  recentReadings: TelemetryReading[];
  telemetry24h: TelemetryReading[];
}

function generateRecentReadings(count: number, baseValue: number, variance: number): TelemetryReading[] {
  const readings: TelemetryReading[] = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    readings.push({
      timestamp: new Date(now.getTime() - i * 5 * 60 * 1000),
      value: baseValue + (Math.random() - 0.5) * variance,
    });
  }
  return readings;
}

function generate24hTelemetry(baseValue: number, variance: number): TelemetryReading[] {
  const readings: TelemetryReading[] = [];
  const now = new Date();
  for (let i = 287; i >= 0; i--) {
    readings.push({
      timestamp: new Date(now.getTime() - i * 5 * 60 * 1000),
      value: baseValue + (Math.random() - 0.5) * variance,
    });
  }
  return readings;
}

export const mockDevices: Device[] = [
  {
    id: 'SEN-001',
    name: 'Temperature Sensor A1',
    type: 'Temperature',
    status: 'online',
    battery: 87,
    signal: 95,
    lastSeen: new Date('2026-04-27T16:45:00'),
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: 'Building A, Floor 1'
    },
    firmware: 'v2.3.1',
    serialNumber: 'TS-A1-2024-001',
    recentReadings: generateRecentReadings(10, 22, 4),
    telemetry24h: generate24hTelemetry(22, 5)
  },
  {
    id: 'SEN-002',
    name: 'Humidity Sensor B2',
    type: 'Humidity',
    status: 'online',
    battery: 92,
    signal: 88,
    lastSeen: new Date('2026-04-27T16:50:00'),
    location: {
      lat: 37.7750,
      lng: -122.4195,
      address: 'Building A, Floor 2'
    },
    firmware: 'v2.3.1',
    serialNumber: 'HS-B2-2024-002',
    recentReadings: generateRecentReadings(10, 65, 10),
    telemetry24h: generate24hTelemetry(65, 12)
  },
  {
    id: 'SEN-003',
    name: 'Motion Detector C1',
    type: 'Motion',
    status: 'warning',
    battery: 45,
    signal: 72,
    lastSeen: new Date('2026-04-27T15:20:00'),
    location: {
      lat: 37.7751,
      lng: -122.4196,
      address: 'Building B, Floor 1'
    },
    firmware: 'v2.2.5',
    serialNumber: 'MD-C1-2024-003',
    recentReadings: generateRecentReadings(10, 15, 20),
    telemetry24h: generate24hTelemetry(15, 25)
  },
  {
    id: 'SEN-004',
    name: 'Pressure Sensor D3',
    type: 'Pressure',
    status: 'online',
    battery: 78,
    signal: 90,
    lastSeen: new Date('2026-04-27T16:55:00'),
    location: {
      lat: 37.7752,
      lng: -122.4197,
      address: 'Building B, Floor 3'
    },
    firmware: 'v2.3.0',
    serialNumber: 'PS-D3-2024-004',
    recentReadings: generateRecentReadings(10, 1013, 8),
    telemetry24h: generate24hTelemetry(1013, 10)
  },
  {
    id: 'SEN-005',
    name: 'Air Quality Sensor E1',
    type: 'Air Quality',
    status: 'offline',
    battery: 12,
    signal: 0,
    lastSeen: new Date('2026-04-26T08:30:00'),
    location: {
      lat: 37.7753,
      lng: -122.4198,
      address: 'Building C, Floor 1'
    },
    firmware: 'v2.1.8',
    serialNumber: 'AQ-E1-2024-005',
    recentReadings: generateRecentReadings(10, 85, 15),
    telemetry24h: generate24hTelemetry(85, 20)
  },
  {
    id: 'SEN-006',
    name: 'Light Sensor F2',
    type: 'Light',
    status: 'online',
    battery: 95,
    signal: 92,
    lastSeen: new Date('2026-04-27T16:52:00'),
    location: {
      lat: 37.7754,
      lng: -122.4199,
      address: 'Building C, Floor 2'
    },
    firmware: 'v2.3.1',
    serialNumber: 'LS-F2-2024-006',
    recentReadings: generateRecentReadings(10, 450, 100),
    telemetry24h: generate24hTelemetry(450, 150)
  },
  {
    id: 'SEN-007',
    name: 'Sound Sensor G1',
    type: 'Sound',
    status: 'error',
    battery: 68,
    signal: 45,
    lastSeen: new Date('2026-04-27T12:15:00'),
    location: {
      lat: 37.7755,
      lng: -122.4200,
      address: 'Building D, Floor 1'
    },
    firmware: 'v2.2.0',
    serialNumber: 'SS-G1-2024-007',
    recentReadings: generateRecentReadings(10, 55, 15),
    telemetry24h: generate24hTelemetry(55, 20)
  },
  {
    id: 'SEN-008',
    name: 'Vibration Sensor H3',
    type: 'Vibration',
    status: 'online',
    battery: 83,
    signal: 85,
    lastSeen: new Date('2026-04-27T16:48:00'),
    location: {
      lat: 37.7756,
      lng: -122.4201,
      address: 'Building D, Floor 3'
    },
    firmware: 'v2.3.1',
    serialNumber: 'VS-H3-2024-008',
    recentReadings: generateRecentReadings(10, 0.5, 0.8),
    telemetry24h: generate24hTelemetry(0.5, 1)
  },
  {
    id: 'SEN-009',
    name: 'CO2 Sensor I2',
    type: 'CO2',
    status: 'online',
    battery: 76,
    signal: 88,
    lastSeen: new Date('2026-04-27T16:53:00'),
    location: {
      lat: 37.7757,
      lng: -122.4202,
      address: 'Building E, Floor 2'
    },
    firmware: 'v2.3.0',
    serialNumber: 'CO-I2-2024-009',
    recentReadings: generateRecentReadings(10, 420, 50),
    telemetry24h: generate24hTelemetry(420, 80)
  },
  {
    id: 'SEN-010',
    name: 'Water Leak Detector J1',
    type: 'Water Leak',
    status: 'warning',
    battery: 38,
    signal: 65,
    lastSeen: new Date('2026-04-27T14:30:00'),
    location: {
      lat: 37.7758,
      lng: -122.4203,
      address: 'Building E, Basement'
    },
    firmware: 'v2.2.8',
    serialNumber: 'WL-J1-2024-010',
    recentReadings: generateRecentReadings(10, 0, 1),
    telemetry24h: generate24hTelemetry(0, 1)
  },
  {
    id: 'SEN-011',
    name: 'Door Sensor K4',
    type: 'Door',
    status: 'online',
    battery: 91,
    signal: 94,
    lastSeen: new Date('2026-04-27T16:54:00'),
    location: {
      lat: 37.7759,
      lng: -122.4204,
      address: 'Building F, Floor 4'
    },
    firmware: 'v2.3.1',
    serialNumber: 'DS-K4-2024-011',
    recentReadings: generateRecentReadings(10, 0, 1),
    telemetry24h: generate24hTelemetry(0, 1)
  },
  {
    id: 'SEN-012',
    name: 'Window Sensor L2',
    type: 'Window',
    status: 'online',
    battery: 88,
    signal: 91,
    lastSeen: new Date('2026-04-27T16:49:00'),
    location: {
      lat: 37.7760,
      lng: -122.4205,
      address: 'Building F, Floor 2'
    },
    firmware: 'v2.3.1',
    serialNumber: 'WS-L2-2024-012',
    recentReadings: generateRecentReadings(10, 0, 1),
    telemetry24h: generate24hTelemetry(0, 1)
  },
  {
    id: 'SEN-013',
    name: 'Smoke Detector M1',
    type: 'Smoke',
    status: 'online',
    battery: 94,
    signal: 96,
    lastSeen: new Date('2026-04-27T16:56:00'),
    location: {
      lat: 37.7761,
      lng: -122.4206,
      address: 'Building G, Floor 1'
    },
    firmware: 'v2.3.1',
    serialNumber: 'SD-M1-2024-013',
    recentReadings: generateRecentReadings(10, 0, 0.5),
    telemetry24h: generate24hTelemetry(0, 0.5)
  },
  {
    id: 'SEN-014',
    name: 'Gas Sensor N3',
    type: 'Gas',
    status: 'warning',
    battery: 52,
    signal: 70,
    lastSeen: new Date('2026-04-27T16:10:00'),
    location: {
      lat: 37.7762,
      lng: -122.4207,
      address: 'Building G, Floor 3'
    },
    firmware: 'v2.2.9',
    serialNumber: 'GS-N3-2024-014',
    recentReadings: generateRecentReadings(10, 25, 10),
    telemetry24h: generate24hTelemetry(25, 15)
  },
  {
    id: 'SEN-015',
    name: 'Occupancy Sensor O2',
    type: 'Occupancy',
    status: 'online',
    battery: 85,
    signal: 89,
    lastSeen: new Date('2026-04-27T16:51:00'),
    location: {
      lat: 37.7763,
      lng: -122.4208,
      address: 'Building H, Floor 2'
    },
    firmware: 'v2.3.0',
    serialNumber: 'OS-O2-2024-015',
    recentReadings: generateRecentReadings(10, 1, 1),
    telemetry24h: generate24hTelemetry(1, 1)
  },
  {
    id: 'SEN-016',
    name: 'Energy Meter P1',
    type: 'Energy',
    status: 'offline',
    battery: 5,
    signal: 0,
    lastSeen: new Date('2026-04-25T22:00:00'),
    location: {
      lat: 37.7764,
      lng: -122.4209,
      address: 'Building H, Utility Room'
    },
    firmware: 'v2.0.5',
    serialNumber: 'EM-P1-2024-016',
    recentReadings: generateRecentReadings(10, 245, 30),
    telemetry24h: generate24hTelemetry(245, 40)
  }
];
