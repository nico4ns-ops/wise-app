import React from 'react';
import { 
  ArrowLeft, 
  Copy, 
  ChevronRight, 
  CheckCircle,
  Share,
  ChevronDown
} from 'lucide-react';
import { Account, UserProfile } from '../types';

interface AccountInfoProps {
  account: Account;
  user: UserProfile;
  isEditMode: boolean;
  onBack: () => void;
  onUpdateUser: (field: keyof UserProfile, value: string) => void;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ account, user, isEditMode, onBack, onUpdateUser }) => {
  const DetailRow = ({ label, value, field }: { label: string, value: string, field?: keyof UserProfile }) => (
    <div className="flex items-start justify-between py-4 border-b border-gray-100 last:border-0 group cursor-pointer">
      <div className="space-y-1">
        <div className="text-sm text-gray-500">{label}</div>
        <div 
            className={`font-semibold text-slate-900 break-all pr-4 outline-none ${isEditMode && field ? 'hover:bg-gray-100 rounded px-1 -ml-1 border-b-2 border-wise-green' : ''}`}
            contentEditable={isEditMode && !!field}
            suppressContentEditableWarning
            onBlur={(e) => field && onUpdateUser(field, e.currentTarget.textContent || '')}
        >
            {value}
        </div>
        {label === 'IBAN' && (
             <div className="text-xs text-gray-500 mt-1 flex items-center gap-1 hover:underline">
                Can receive {account.currency} and other currencies. <span className="font-semibold text-wise-green underline decoration-1 underline-offset-2">How it works</span>
             </div>
        )}
      </div>
      <Copy className="w-5 h-5 text-wise-green opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div>
             <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm shadow-sm border border-gray-100">
                    {account.flag}
                </div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    {account.currency}
                    <ChevronDown className="w-5 h-5 text-gray-400 bg-gray-100 rounded-full p-0.5" />
                </h1>
            </div>
            <p className="text-gray-500 text-sm">Account details</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Column: Details */}
        <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Receive {account.currency}</h2>
                    <p className="text-sm text-gray-500">From SEPA and <span className="underline decoration-1 underline-offset-2 hover:text-gray-700 cursor-pointer">100+ countries</span></p>
                </div>
                <button className="bg-wise-green hover:bg-[#8ee060] text-wise-dark px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-colors">
                    Share <ChevronDown className="w-4 h-4" />
                </button>
            </div>

            <div className="bg-wise-bg rounded-2xl p-6">
                <div className="space-y-2">
                    <DetailRow label="Name" value={user.name} field="name" />
                    <DetailRow label="IBAN" value={`BE50 9673 0136 ${account.accountNumber.replace('.. ', '')}`} />
                    <DetailRow label="Swift/BIC" value="TRWIBEB1XXX" />
                    <div className="flex items-start justify-between py-4 group cursor-pointer">
                        <div className="space-y-1">
                            <div className="text-sm text-gray-500">Bank name and address</div>
                            <div className="font-semibold text-slate-900 pr-4">
                                Wise, Rue du Trône 100, 3rd floor, Brussels, 1050, Belgium
                            </div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1 hover:underline">
                                Some senders may need this. <span className="font-semibold text-wise-green underline decoration-1 underline-offset-2">Learn more</span>
                            </div>
                        </div>
                        <Copy className="w-5 h-5 text-wise-green opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <span>Details not accepted?</span>
                <button className="font-semibold underline decoration-1 underline-offset-2 hover:text-gray-700">Tell us where</button>
                <span>or</span>
                <button className="font-semibold underline decoration-1 underline-offset-2 hover:text-gray-700">give general feedback</button>
            </div>
        </div>

        {/* Right Column: Quick Facts */}
        <div className="lg:w-80 space-y-8">
            <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Quick facts</h2>
                <div className="flex gap-2 mb-4">
                    <button className="px-4 py-1.5 bg-[#163300] text-white rounded-full text-sm font-semibold">Fees</button>
                    <button className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-50">Speed</button>
                    <button className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-50">Limits</button>
                </div>
                
                <div className="mb-2 text-sm text-gray-500">What does it cost?</div>
                
                <div className="border border-gray-200 rounded-xl p-4 space-y-4">
                     <div className="flex justify-between items-start cursor-pointer group">
                        <div>
                            <div className="text-sm text-gray-500 mb-0.5">From SEPA (domestic)</div>
                            <div className="font-bold text-slate-900">No fees</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                     </div>
                     <div className="border-t border-gray-100 pt-4 flex justify-between items-start cursor-pointer group">
                        <div>
                            <div className="text-sm text-gray-500 mb-0.5">From outside SEPA (Swift)</div>
                            <div className="font-bold text-slate-900">2.39 {account.currency} Wise fee</div>
                            <div className="text-xs text-gray-400 mt-0.5">Bank fees may also apply</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                     </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Availability</h2>
                <div className="border border-gray-200 rounded-xl p-4 flex gap-3">
                    <div className="mt-0.5">
                         <div className="w-5 h-5 rounded-full bg-[#163300] flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                         </div>
                    </div>
                    <div>
                        <div className="font-bold text-slate-900 mb-1">SEPA Direct Debits available</div>
                        <div className="text-sm text-gray-500 leading-relaxed">
                            Make regular payments. Works with Amazon, PayPal, Stripe and more.
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;