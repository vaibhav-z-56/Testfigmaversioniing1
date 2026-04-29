import { Outlet, NavLink, useNavigate } from 'react-router';
import { Map, Monitor, Bell, LogOut, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { AlertBanner } from './AlertBanner';

export function DashboardShell() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard/map', label: 'Map', icon: Map },
    { to: '/dashboard/devices', label: 'Devices', icon: Monitor },
    { to: '/dashboard/alerts', label: 'Alerts', icon: Bell },
  ];

  return (
    <div className="size-full flex flex-col">
      <header className="border-b bg-background">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold">Sensor Fleet</h1>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="hidden md:flex"
            >
              <LogOut className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden border-t px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-muted-foreground hover:bg-muted hover:text-foreground w-full"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </nav>
        )}
      </header>

      <AlertBanner />

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
