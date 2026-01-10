"use client";

import React from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const Navbar = () => {
  return (
    <div className="flex items-center justify-end h-16 bg-white shadow-md px-4">
      <Button variant="ghost" size="sm" className="p-2 rounded-full hover:bg-gray-200">
        <User size={24} />
      </Button>
    </div>
  );
};

export default Navbar;