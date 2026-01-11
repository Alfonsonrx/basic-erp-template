"use client";

import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { User } from 'lucide-react';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex-shrink-0">
        <nav className="mt-10 space-y-2 px-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block py-2 rounded-md text-sm font-medium ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `block py-2 rounded-md text-sm font-medium ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            Customers
          </NavLink>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <header className="h-16 bg-white shadow-md flex items-center justify-end px-4">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <User size={24} />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;