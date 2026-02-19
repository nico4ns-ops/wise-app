import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  ArrowRightLeft, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  SlidersHorizontal, 
  Download, 
  MoreHorizontal,
  TrendingUp, 
  RefreshCw,
  ChevronRight,
  Landmark
} from 'lucide-react';
import { Account, Transaction, TransactionStatus, UserProfile } from '../types';
import TransactionItem from './TransactionItem';
import AccountInfo from './AccountInfo';

interface AccountDetailProps {
  account: Account;
  user: UserProfile;
  transactions: Transaction[];
  isEditMode: boolean;
  onBack: () => void;
  onUpdateBalance: (newBalance: number) => void;
  onUpdateTransaction: (t: Transaction) => void;
  onUpdateUser: (field: keyof UserProfile, value: string) => void;
}

const AccountDetail: React.FC<AccountDetailProps> = ({ 
  account,
  user,
  transactions, 
  isEditMode, 
  onBack,
  onUpdateBalance,
  onUpdateTransaction,
  onUpdateUser
}) => {
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  
  // Scroll to top when toggling views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showAccountInfo]);
  
  // Filter transactions for this account currency
  const accountTransactions = transactions.filter(t => t.currency === account.currency);
  
  // Grouping
  const pending = accountTransactions.filter(t => t.status === TransactionStatus.PENDING);
  const today = accountTransactions.filter(t => t.status !== TransactionStatus.PENDING && t.date === 'Today');
  const yesterday = accountTransactions.filter(t => t.status !== TransactionStatus.PENDING && t.date === 'Yesterday');
  const older = accountTransactions.filter(t => t.status !== TransactionStatus.PENDING && t.date !== 'Today' && t.date !== 'Yesterday');

  if (showAccountInfo) {
    return (
      <AccountInfo 
        account={account} 
        user={user} 
        isEditMode={isEditMode}
        onBack={() => setShowAccountInfo(false)} 
        onUpdateUser={onUpdateUser}
      />
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg shadow-sm border border-gray-100">
                {account.flag}
            </div>
            <span className="font-semibold text-lg text-gray-700">{account.currency}</span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Balance Hero */}
      <div className="mb-8">
        <div className="flex items-baseline gap-3 mb-4">
           <span 
              className={`text-5xl font-bold tracking-tight text-slate-900 outline-none ${isEditMode ? 'hover:bg-gray-100 rounded px-2 cursor-text border-b-2 border-wise-green' : ''}`}
              contentEditable={isEditMode}
              suppressContentEditableWarning
              onBlur={(e) => {
                  const val = parseFloat(e.currentTarget.textContent?.replace(/[^0-9.]/g, '') || '0');
                  onUpdateBalance(val);
              }}
            >
              {account.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-2xl font-medium text-gray-500">{account.currency}</span>
        </div>

        <div 
            onClick={() => setShowAccountInfo(true)}
            className="inline-flex items-center gap-2 bg-wise-bg px-4 py-2 rounded-full text-sm font-semibold text-wise-dark cursor-pointer hover:bg-green-100 transition-colors"
        >
          <Landmark className="w-4 h-4" />
          {account.accountNumber} 
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-8 mb-12 overflow-x-auto pb-4">
        {[
          { icon: Plus, label: 'Add' },
          { icon: ArrowRightLeft, label: 'Convert or move', multiline: true },
          { icon: ArrowUp, label: 'Send' },
          { icon: ArrowDown, label: 'Request' }
        ].map((action, i) => (
          <div key={i} className="flex flex-col items-center gap-2 min-w-[80px] group cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-wise-green flex items-center justify-center text-wise-dark shadow-sm group-hover:scale-105 transition-transform">
              <action.icon className="w-7 h-7" />
            </div>
            <span className="text-sm font-semibold text-center text-gray-700 leading-tight max-w-[80px]">
              {action.label.split(' or ').map((part, idx, arr) => (
                <span key={idx}>
                  {part}{idx < arr.length - 1 ? ' or ' : ''}
                  {idx < arr.length - 1 && action.multiline ? <br/> : ''}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Transactions */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Transactions</h3>
          
          {/* Filters */}
          <div className="flex gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-200">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>

          <div className="space-y-8">
            {pending.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">In progress</h4>
                {pending.map(tx => (
                  <TransactionItem 
                    key={tx.id} 
                    transaction={tx} 
                    isEditMode={isEditMode} 
                    onUpdate={onUpdateTransaction} 
                  />
                ))}
              </div>
            )}

            {today.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Today</h4>
                {today.map(tx => (
                  <TransactionItem 
                    key={tx.id} 
                    transaction={tx} 
                    isEditMode={isEditMode} 
                    onUpdate={onUpdateTransaction} 
                  />
                ))}
              </div>
            )}

            {yesterday.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Yesterday</h4>
                {yesterday.map(tx => (
                  <TransactionItem 
                    key={tx.id} 
                    transaction={tx} 
                    isEditMode={isEditMode} 
                    onUpdate={onUpdateTransaction} 
                  />
                ))}
              </div>
            )}

            {older.length > 0 && (
                <div>
                     <h4 className="text-sm font-medium text-gray-500 mb-2">Earlier</h4>
                     {older.map(tx => (
                        <TransactionItem 
                            key={tx.id} 
                            transaction={tx} 
                            isEditMode={isEditMode} 
                            onUpdate={onUpdateTransaction} 
                        />
                     ))}
                </div>
            )}

            {accountTransactions.length === 0 && (
              <div className="py-8 text-center text-gray-400 italic">No transactions found</div>
            )}
          </div>
        </div>

        {/* Right Column: Options */}
        <div className="lg:col-span-1 space-y-8">
           <h3 className="text-xl font-bold text-slate-900">Options</h3>
           
           <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-gray-300 cursor-pointer transition-all group">
             <div className="flex justify-between items-start mb-2">
               <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                 <TrendingUp className="w-5 h-5" />
               </div>
               <ChevronRight className="w-5 h-5 text-gray-400" />
             </div>
             <h4 className="font-bold text-gray-900">Earn a return</h4>
             <p className="text-sm text-gray-600 mt-1">Explore ways to grow your money with Wise Assets Europe</p>
           </div>

           <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-gray-300 cursor-pointer transition-all group">
             <div className="flex justify-between items-start mb-2">
               <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                 <RefreshCw className="w-5 h-5" />
               </div>
               <ChevronRight className="w-5 h-5 text-gray-400" />
             </div>
             <h4 className="font-bold text-gray-900">Auto conversions</h4>
             <p className="text-sm text-gray-600 mt-1">Convert money between your currencies at your chosen rate.</p>
           </div>
           
           <div className="text-xs text-gray-500 px-2 leading-relaxed">
             Investment services are provided by Wise Assets Europe AS. Capital at risk. Growth not guaranteed.
           </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;