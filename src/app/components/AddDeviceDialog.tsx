import { useState } from 'react';
import { DeviceStatus } from '../data/mockDevices';
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

interface AddDeviceDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddDeviceDialog({ open, onClose }: AddDeviceDialogProps) {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'online' as DeviceStatus,
    address: '',
    lat: '',
    lng: '',
    firmware: '',
    serialNumber: '',
    battery: '100',
    signal: '100',
  });

  const handleClose = () => {
    setStage(1);
    setFormData({
      name: '',
      type: '',
      status: 'online',
      address: '',
      lat: '',
      lng: '',
      firmware: '',
      serialNumber: '',
      battery: '100',
      signal: '100',
    });
    onClose();
  };

  const handleAdd = () => {
    console.log('Adding new device:', formData);
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

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
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
                <p className="text-sm text-muted-foreground">
                  Enter the basic details for your new sensor device
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-name">Device Name *</Label>
                <Input
                  id="add-name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g., Temperature Sensor A1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-type">Device Type *</Label>
                <Select value={formData.type} onValueChange={(value) => updateField('type', value)}>
                  <SelectTrigger id="add-type">
                    <SelectValue placeholder="Select device type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Temperature">Temperature</SelectItem>
                    <SelectItem value="Humidity">Humidity</SelectItem>
                    <SelectItem value="Motion">Motion</SelectItem>
                    <SelectItem value="Pressure">Pressure</SelectItem>
                    <SelectItem value="Air Quality">Air Quality</SelectItem>
                    <SelectItem value="Light">Light</SelectItem>
                    <SelectItem value="Sound">Sound</SelectItem>
                    <SelectItem value="Vibration">Vibration</SelectItem>
                    <SelectItem value="CO2">CO2</SelectItem>
                    <SelectItem value="Water Leak">Water Leak</SelectItem>
                    <SelectItem value="Door">Door</SelectItem>
                    <SelectItem value="Window">Window</SelectItem>
                    <SelectItem value="Smoke">Smoke</SelectItem>
                    <SelectItem value="Gas">Gas</SelectItem>
                    <SelectItem value="Occupancy">Occupancy</SelectItem>
                    <SelectItem value="Energy">Energy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-status">Initial Status</Label>
                <Select value={formData.status} onValueChange={(value) => updateField('status', value)}>
                  <SelectTrigger id="add-status">
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
                <p className="text-sm text-muted-foreground">
                  Specify where this device will be installed
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-address">Address *</Label>
                <Input
                  id="add-address"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="e.g., Building A, Floor 1"
                />
                <p className="text-xs text-muted-foreground">
                  Building name, floor, room, or any location identifier
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="add-lat">Latitude *</Label>
                  <Input
                    id="add-lat"
                    type="number"
                    step="0.0001"
                    value={formData.lat}
                    onChange={(e) => updateField('lat', e.target.value)}
                    placeholder="37.7749"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-lng">Longitude *</Label>
                  <Input
                    id="add-lng"
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
                <p className="text-sm text-muted-foreground">
                  Optional technical details and initial readings
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-firmware">Firmware Version</Label>
                <Input
                  id="add-firmware"
                  value={formData.firmware}
                  onChange={(e) => updateField('firmware', e.target.value)}
                  placeholder="e.g., v2.3.1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-serialNumber">Serial Number</Label>
                <Input
                  id="add-serialNumber"
                  value={formData.serialNumber}
                  onChange={(e) => updateField('serialNumber', e.target.value)}
                  placeholder="e.g., TS-A1-2024-001"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="add-battery">Battery Level (%)</Label>
                  <Input
                    id="add-battery"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.battery}
                    onChange={(e) => updateField('battery', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-signal">Signal Strength (%)</Label>
                  <Input
                    id="add-signal"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.signal}
                    onChange={(e) => updateField('signal', e.target.value)}
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
              <Button type="button" onClick={handleAdd}>
                <Check className="w-4 h-4 mr-1" />
                Add Device
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
