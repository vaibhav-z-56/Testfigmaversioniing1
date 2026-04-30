import { useState } from 'react';
import { Device, DeviceStatus } from '../data/mockDevices';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface EditDeviceDialogProps {
  device: Device | null;
  open: boolean;
  onClose: () => void;
}

export function EditDeviceDialog({ device, open, onClose }: EditDeviceDialogProps) {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    name: device?.name || '',
    type: device?.type || '',
    status: device?.status || 'online' as DeviceStatus,
    address: device?.location.address || '',
    lat: device?.location.lat.toString() || '',
    lng: device?.location.lng.toString() || '',
    firmware: device?.firmware || '',
    serialNumber: device?.serialNumber || '',
    battery: device?.battery.toString() || '',
    signal: device?.signal.toString() || '',
  });

  const handleClose = () => {
    setStage(1);
    onClose();
  };

  const handleSave = () => {
    console.log('Saving device:', formData);
    handleClose();
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const canProceed = () => {
    if (stage === 1) {
      return formData.name.trim() !== '' && formData.type.trim() !== '';
    }
    if (stage === 2) {
      return formData.address.trim() !== '' && formData.lat !== '' && formData.lng !== '';
    }
    return true;
  };

  if (!device) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Device</DialogTitle>
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`h-1.5 rounded-full flex-1 transition-colors ${
                    s <= stage ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Step {stage} of 3
          </div>
        </DialogHeader>

        <div className="py-6">
          {stage === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-4">Basic Information</h3>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Device Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g., Temperature Sensor A1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Device Type *</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => updateField('type', e.target.value)}
                  placeholder="e.g., Temperature"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => updateField('status', value)}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {stage === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-4">Location Details</h3>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="e.g., Building A, Floor 1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lat">Latitude *</Label>
                  <Input
                    id="lat"
                    type="number"
                    step="0.0001"
                    value={formData.lat}
                    onChange={(e) => updateField('lat', e.target.value)}
                    placeholder="37.7749"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lng">Longitude *</Label>
                  <Input
                    id="lng"
                    type="number"
                    step="0.0001"
                    value={formData.lng}
                    onChange={(e) => updateField('lng', e.target.value)}
                    placeholder="-122.4194"
                  />
                </div>
              </div>
            </div>
          )}

          {stage === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-4">Technical Information</h3>
              </div>
              <div className="space-y-2">
                <Label htmlFor="firmware">Firmware Version</Label>
                <Input
                  id="firmware"
                  value={formData.firmware}
                  onChange={(e) => updateField('firmware', e.target.value)}
                  placeholder="e.g., v2.3.1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input
                  id="serialNumber"
                  value={formData.serialNumber}
                  onChange={(e) => updateField('serialNumber', e.target.value)}
                  placeholder="e.g., TS-A1-2024-001"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="battery">Battery (%)</Label>
                  <Input
                    id="battery"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.battery}
                    onChange={(e) => updateField('battery', e.target.value)}
                    placeholder="87"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signal">Signal (%)</Label>
                  <Input
                    id="signal"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.signal}
                    onChange={(e) => updateField('signal', e.target.value)}
                    placeholder="95"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="flex gap-2 flex-1">
            {stage > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStage(stage - 1)}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            {stage < 3 ? (
              <Button
                type="button"
                onClick={() => setStage(stage + 1)}
                disabled={!canProceed()}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button type="button" onClick={handleSave}>
                <Check className="w-4 h-4 mr-1" />
                Save Changes
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
