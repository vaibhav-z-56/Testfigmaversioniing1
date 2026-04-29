import { mockDevices } from '../data/mockDevices';
import { AlertTriangle, XCircle } from 'lucide-react';

export function AlertBanner() {
  const offlineDevices = mockDevices.filter((d) => d.status === 'offline');
  const warningDevices = mockDevices.filter((d) => d.status === 'warning');

  if (offlineDevices.length === 0 && warningDevices.length === 0) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border-b border-yellow-200">
      <div className="px-6 py-3 flex items-center gap-3 text-sm">
        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
        <div className="flex-1 flex flex-wrap items-center gap-x-4 gap-y-1">
          {offlineDevices.length > 0 && (
            <div className="flex items-center gap-2">
              <XCircle className="w-3.5 h-3.5 text-red-600" />
              <span className="text-yellow-900">
                <strong>{offlineDevices.length}</strong> device{offlineDevices.length > 1 ? 's' : ''} offline
              </span>
            </div>
          )}
          {warningDevices.length > 0 && (
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-yellow-600" />
              <span className="text-yellow-900">
                <strong>{warningDevices.length}</strong> device{warningDevices.length > 1 ? 's' : ''} need attention
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
