"use client";

import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Home, Users, FileText, PlusCircle } from 'lucide-react';

const navItems = [
  { to: '/', icon: <Home className="h-4 w-4" />, label: 'Home' },
  { to: '/employees', icon: <Users className="h-4 w-4" />, label: 'Employees' },
  { to: '/clients', icon: <FileText className="h-4 w-4" />, label: 'Clients' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-muted text-muted-foreground h-full p-4 flex flex-col gap-2">
      {navItems.map((item) => (
        <Link key={item.to} to={item.to}>
          <Button
            variant={location.pathname === item.to ? 'secondary' : 'ghost'}
            size="sm"
            className="w-full justify-start gap-3"
          >
            {item.icon}
            {item.label}
          </Button>
        </Link>
      ))}
      <div className="mt-auto">
        <Link to="/clients/add">
          <Button variant="outline" size="sm" className="w-full gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Client
          </Button>
        </Link>
      </div>
    </aside>
  );
};