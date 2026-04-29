import { MapPin } from 'lucide-react';

export function MapPage() {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
          <MapPin className="w-8 h-8 text-muted-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Map View</h2>
          <p className="text-muted-foreground mt-2">
            Interactive map showing all sensor locations will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
}
