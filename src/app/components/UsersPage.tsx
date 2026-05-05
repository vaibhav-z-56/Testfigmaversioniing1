import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Search, Plus, MoreVertical, Mail, Shield, UserX } from 'lucide-react';
import { format } from 'date-fns';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Viewer';
  status: 'Active' | 'Inactive';
  lastActive: Date;
  initials: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@sensorfleet.io',
    role: 'Admin',
    status: 'Active',
    lastActive: new Date('2026-05-05T14:30:00'),
    initials: 'JD',
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@sensorfleet.io',
    role: 'Manager',
    status: 'Active',
    lastActive: new Date('2026-05-05T12:15:00'),
    initials: 'SW',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@sensorfleet.io',
    role: 'Manager',
    status: 'Active',
    lastActive: new Date('2026-05-04T16:45:00'),
    initials: 'MC',
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@sensorfleet.io',
    role: 'Viewer',
    status: 'Active',
    lastActive: new Date('2026-05-05T09:20:00'),
    initials: 'ER',
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@sensorfleet.io',
    role: 'Viewer',
    status: 'Active',
    lastActive: new Date('2026-05-03T11:30:00'),
    initials: 'DK',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@sensorfleet.io',
    role: 'Manager',
    status: 'Inactive',
    lastActive: new Date('2026-04-20T10:00:00'),
    initials: 'LA',
  },
];

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const roleColors = {
    Admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    Manager: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    Viewer: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  };

  const statusColors = {
    Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage team members and their access permissions
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.status === 'Active').length}
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Administrators</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.role === 'Admin').length}
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Managers</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.role === 'Manager').length}
            </p>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={roleColors[user.role]}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statusColors[user.status]}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(user.lastActive, 'MMM dd, yyyy')}
                  <br />
                  <span className="text-xs">
                    {format(user.lastActive, 'h:mm a')}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="w-4 h-4 mr-2" />
                        Change Role
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <UserX className="w-4 h-4 mr-2" />
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'} User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No users found</p>
          </div>
        )}
      </Card>

      {/* Role Permissions Info */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Role Permissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={roleColors.Admin}>
                Admin
              </Badge>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1 ml-1">
              <li>• Full system access</li>
              <li>• Manage users & permissions</li>
              <li>• Configure system settings</li>
              <li>• View all analytics</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={roleColors.Manager}>
                Manager
              </Badge>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1 ml-1">
              <li>• Manage devices</li>
              <li>• View analytics</li>
              <li>• Configure alerts</li>
              <li>• Export reports</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={roleColors.Viewer}>
                Viewer
              </Badge>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1 ml-1">
              <li>• View devices</li>
              <li>• View basic analytics</li>
              <li>• View alerts</li>
              <li>• Read-only access</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
