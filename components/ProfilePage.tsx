import React from 'react';
import { 
  ArrowLeft, 
  Bell, 
  HelpCircle, 
  FileText, 
  Shield, 
  Link, 
  CreditCard, 
  Gauge, 
  ChevronRight, 
  Briefcase, 
  Plus, 
  Tag, 
  Camera,
  LogOut,
  Copy
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfilePageProps {
  user: UserProfile;
  isEditMode: boolean;
  onBack: () => void;
  onUpdateUser: (field: keyof UserProfile, value: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, isEditMode, onBack, onUpdateUser }) => {
  const MenuSection = ({ title, items }: { title?: string, items: any[] }) => (
    <div className="mb-8">
      {title && <h2 className="text-xl font-bold text-slate-900 mb-4">{title}</h2>}
      <div className="space-y-1">
        {items.map((item, idx) => (
          <button 
            key={idx}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 group-hover:border-gray-300 bg-white">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-900 text-base">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
          </button>
        ))}
      </div>
    </div>
  );

  const accountItems = [
    { icon: Bell, label: 'Inbox' },
    { icon: Tag, label: 'Pricing and discounts' },
    { icon: HelpCircle, label: 'Help' },
    { icon: FileText, label: 'Statements and reports' },
  ];

  const settingItems = [
    { icon: Shield, label: 'Security and privacy', sub: 'Change your security and privacy settings.' },
    { icon: Bell, label: 'Notifications', sub: 'Customise how you get updates.' },
    { icon: Link, label: 'Integrations and tools', sub: 'Connect your account to third-party software.' },
    { icon: CreditCard, label: 'Payment methods', sub: 'Manage saved cards and bank accounts.' },
    { icon: Gauge, label: 'Limits', sub: 'Manage your transfer and card limits.' },
  ];

  return (
    <div className="min-h-screen bg-white animate-in fade-in slide-in-from-right-8 duration-300">
      {/* Header */}
      <div className="sticky top-0 bg-white z-20 px-4 py-4 sm:px-8 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </button>
        <button className="bg-wise-green px-4 py-2 rounded-full text-sm font-bold text-wise-dark hover:brightness-95 transition-all">
          Earn £90
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-20">
        
        {/* Profile Hero */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-6 group cursor-pointer">
            <img 
              src={user.avatarUrl} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border border-gray-200 object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-wise-green p-1.5 rounded-full border-2 border-white text-wise-dark">
              <Camera className="w-4 h-4" />
            </div>
          </div>

          <h1 
            className={`text-3xl sm:text-4xl font-black text-slate-900 text-center uppercase leading-tight mb-2 tracking-tight outline-none ${isEditMode ? 'hover:bg-gray-100 px-2 rounded border-b-2 border-wise-green' : ''}`}
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => onUpdateUser('name', e.currentTarget.textContent || '')}
          >
            {user.name}
          </h1>
          
          <p className="text-gray-500 font-medium mb-4">Your personal account</p>

          <div className="bg-[#e2e6e0] px-4 py-1.5 rounded-full flex items-center gap-2 text-wise-dark font-bold text-sm">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" fill="currentColor">
               <path d="M6 14l1.5-6h5l-1.5 6h-5z" />
               <path d="M16.5 6l-4.5 12h-3l2.5-6.5h-5L8.5 6h8z" />
            </svg>
            <span
               className={`outline-none ${isEditMode ? 'hover:bg-white/50 px-1 rounded cursor-text' : ''}`}
               contentEditable={isEditMode}
               suppressContentEditableWarning
               onBlur={(e) => onUpdateUser('username', e.currentTarget.textContent || '')}
            >
              {user.username}
            </span>
          </div>
        </div>

        {/* Menu Sections */}
        <MenuSection title="Your account" items={accountItems} />

        {/* Business Accounts */}
        <div className="mb-12">
            <div className="bg-gray-100 rounded-xl p-4 mb-3 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#9b72cf] flex items-center justify-center text-white">
                        <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="font-bold text-slate-900">NS PSICOLOGIA LLC</div>
                        <div className="text-sm text-gray-500">Your business account</div>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-wise-green">
                        <Plus className="w-5 h-5 fill-current" />
                    </div>
                    <div className="font-bold text-slate-900">Open another business account</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
        </div>

        {/* Settings */}
        <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Settings</h2>
            <div className="space-y-6">
                {settingItems.map((item, idx) => (
                    <button key={idx} className="w-full flex items-start justify-between group text-left">
                        <div className="flex gap-4">
                             <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 shrink-0 mt-1">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 text-base">{item.label}</div>
                                <div className="text-gray-500 text-sm leading-relaxed max-w-[280px] sm:max-w-none">{item.sub}</div>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 mt-3" />
                    </button>
                ))}
            </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 text-sm cursor-pointer hover:text-gray-700">
                Membership number: {user.membershipNumber}
                <Copy className="w-3 h-3" />
            </div>
            
            <button className="bg-gray-100 text-slate-900 font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors">
                Log out
            </button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;