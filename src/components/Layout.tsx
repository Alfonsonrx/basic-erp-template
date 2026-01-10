"use client";

import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar full width, above sidebar */}
        <header className="z-10">
          <Navbar />
        </header>
        <main className="flex bg-background text-foreground overflow-auto h-full">
          <Sidebar />
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;