import React from 'react';
import { User, Lock, Wallet, FileText } from 'lucide-react';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'private', label: 'Private Info', icon: Lock },
    { id: 'salary', label: 'Salary Info', icon: Wallet },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  return (
    <div className="border-b border-slate-200 bg-white px-2 rounded-xl shadow-xs">
      <nav className="flex gap-2 lg:gap-8 overflow-x-auto no-scrollbar" aria-label="Profile navigation">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 py-3.5 px-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
