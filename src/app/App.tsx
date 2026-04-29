import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { LoginPage } from './components/LoginPage';
import { DashboardShell } from './components/DashboardShell';
import { DevicesPage } from './components/DevicesPage';
import { MapPage } from './components/MapPage';
import { AlertsPage } from './components/AlertsPage';

export default function App() {
  return (
    <div className="size-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardShell />}>
            <Route index element={<Navigate to="/dashboard/devices" replace />} />
            <Route path="devices" element={<DevicesPage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="alerts" element={<AlertsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}