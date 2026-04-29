import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/devices');
  };

  return (
    <div className="size-full flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Sensor Fleet</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button className="text-primary hover:underline">
              Sign up
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 items-center justify-center p-8">
        <div className="max-w-md text-white space-y-6">
          <h2 className="text-4xl font-bold">
            Monitor your sensors in real-time
          </h2>
          <p className="text-blue-100 text-lg">
            Track device status, battery levels, signal strength, and receive alerts for your entire sensor fleet.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-300 mt-2" />
              <div>
                <div className="font-semibold">Real-time Monitoring</div>
                <div className="text-blue-200 text-sm">
                  Get instant updates on all your devices
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-300 mt-2" />
              <div>
                <div className="font-semibold">Alert Management</div>
                <div className="text-blue-200 text-sm">
                  Stay informed with intelligent notifications
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-300 mt-2" />
              <div>
                <div className="font-semibold">Fleet Overview</div>
                <div className="text-blue-200 text-sm">
                  Manage all devices from a single dashboard
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
