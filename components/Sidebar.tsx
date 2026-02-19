import React from 'react';
import { 
  Home, 
  CreditCard, 
  List, 
  ArrowLeftRight, 
  CalendarClock, 
  RotateCw, 
  Repeat, 
  Download, 
  Split, 
  Users, 
  BarChart3,
  Globe
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: CreditCard, label: 'Cards' },
    { icon: List, label: 'Transactions' },
  ];

  const secondaryItems = [
    { icon: ArrowLeftRight, label: 'Payments', hasDropdown: true },
    { icon: CalendarClock, label: 'Scheduled' },
    { icon: RotateCw, label: 'Direct Debits' },
    { icon: Repeat, label: 'Recurring payments' },
    { icon: Download, label: 'Payment requests' },
    { icon: Split, label: 'Bill splits' },
    { icon: Users, label: 'Recipients' },
    { icon: BarChart3, label: 'Insights' },
  ];

  return (
    <div className="w-64 min-h-screen bg-white hidden lg:flex flex-col border-r border-gray-100 py-6 pr-4 sticky top-0 h-screen overflow-y-auto no-scrollbar">
      <div className="px-6 mb-8 flex items-center gap-2">
        {/* Fake Logo */}
        <div className="font-bold text-2xl tracking-tighter text-wise-dark flex items-center">
          <Globe className="w-6 h-6 mr-1 text-wise-green fill-wise-green" />
          Wise
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center px-6 py-2.5 text-sm font-medium rounded-r-full transition-colors ${
              item.active 
                ? 'bg-wise-bg text-wise-dark' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-3 ${item.active ? 'text-wise-dark' : 'text-gray-400'}`} />
            {item.label}
          </a>
        ))}

        <div className="pt-4 pb-2"></div>

        {secondaryItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className="flex items-center px-6 py-2.5 text-sm font-medium text-gray-500 rounded-r-full hover:bg-gray-50 hover:text-gray-900 transition-colors group"
          >
            <item.icon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600" />
            <span className="flex-1">{item.label}</span>
            {item.hasDropdown && (
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;