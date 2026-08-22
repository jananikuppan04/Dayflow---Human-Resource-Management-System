import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <TopNav />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-slate-200 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm text-slate-500">
          <p>&copy; 2026 Dayflow HRMS. All rights reserved.</p>
          <div className="flex gap-4">
            <button className="hover:text-slate-900 transition-colors flex items-center gap-1">
              Settings
            </button>
            <button className="hover:text-slate-900 transition-colors flex items-center gap-1">
              Help
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
