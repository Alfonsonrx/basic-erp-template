"use client";

import { Button } from '@/components/ui/Button';
import { User } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="bg-background border-b border-input h-16 flex items-center justify-end px-4 shadow-sm">
      <Button variant="ghost" size="sm" className="p-2 rounded-full hover:bg-muted/20">
        <User className="h-5 w-5 text-foreground" />
      </Button>
    </nav>
  );
};