import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TransactionItem from './components/TransactionItem';
import EditControl from './components/EditControl';
import AccountDetail from './components/AccountDetail';
import ProfilePage from './components/ProfilePage';
import { INITIAL_ACCOUNTS, INITIAL_TRANSACTIONS } from './constants';
import { Transaction, Account, UserProfile } from './types';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  BarChart3, 
  MoreHorizontal,
  ChevronRight,
  Bell,
  X,
  ArrowRight,
  ArrowUpDown,
  Info,
  ChevronDown
} from 'lucide-react';

const INITIAL_USER: UserProfile = {
  name: "Maria Isabel Pérez Rodriguez",
  username: "@maria7889",
  avatarUrl: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=200&h=200", // Static sunset image
  membershipNumber: "P38371203"
};

const App: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Derived state for the "Main" balance display (usually the first account or aggregate)
  const mainAccount = accounts[0];
  const selectedAccount = accounts.find(a => a.id === selectedAccountId);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedAccountId, isProfileOpen]);

  const handleUpdateTransaction = (updated: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  const handleAddTransaction = (transaction: Transaction) => {
    // If we are in a specific account view, force the currency to match
    if (selectedAccount) {
      transaction.currency = selectedAccount.currency;
    }
    setTransactions(prev => [transaction, ...prev]);
  };

  const handleUpdateBalance = (accountId: string, newBalance: number) => {
    setAccounts(prev => prev.map(acc => acc.id === accountId ? { ...acc, balance: newBalance } : acc));
  };

  const handleUpdateUser = (field: keyof UserProfile, value: string) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  if (isProfileOpen) {
    return (
      <>
        <ProfilePage 
          user={user}
          isEditMode={isEditMode}
          onBack={() => setIsProfileOpen(false)}
          onUpdateUser={handleUpdateUser}
        />
        <EditControl 
          isEditMode={isEditMode} 
          toggleEditMode={() => setIsEditMode(!isEditMode)} 
          onAddTransaction={handleAddTransaction}
        />
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-slate-900 font-sans selection:bg-wise-green selection:text-wise-dark">
      <Sidebar />
      
      <main className="flex-1 min-w-0">
        {/* Top Navigation */}
        <header className="flex justify-end items-center px-8 py-4 sticky top-0 bg-white/90 backdrop-blur-sm z-30">
          <div className="flex items-center gap-4">
             <button className="bg-wise-green px-4 py-2 rounded-full text-sm font-bold text-wise-dark hover:brightness-95 transition-all">
              Earn £50
            </button>
            <div className="p-2 text-gray-500 hover:bg-gray-100 rounded-full cursor-pointer">
              <Bell className="w-5 h-5" />
            </div>
            <div 
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 pl-2 pr-1 py-1 rounded-full border border-transparent hover:border-gray-200 transition-all"
            >
              <img 
                src={user.avatarUrl} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-gray-200 object-cover"
              />
              <span className="text-sm font-semibold text-wise-dark hidden sm:block normal-case">{user.name.split(' ').map(n => n.charAt(0) + n.slice(1).toLowerCase()).join(' ')}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-8 pb-20 max-w-5xl mx-auto">
          
          {selectedAccount ? (
            <AccountDetail 
              account={selectedAccount}
              user={user}
              transactions={transactions}
              isEditMode={isEditMode}
              onBack={() => setSelectedAccountId(null)}
              onUpdateBalance={(val) => handleUpdateBalance(selectedAccount.id, val)}
              onUpdateTransaction={handleUpdateTransaction}
              onUpdateUser={handleUpdateUser}
            />
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              {/* Main Balance Hero */}
              <section className="mb-12 mt-4">
                <h2 className="text-gray-500 text-sm font-medium mb-1">Total balance</h2>
                <div className="flex items-baseline gap-2 mb-6 group relative w-fit">
                  <span 
                    className={`text-4xl md:text-5xl font-bold tracking-tight text-slate-900 outline-none ${isEditMode ? 'hover:bg-gray-100 rounded px-2 cursor-text border-b-2 border-wise-green' : ''}`}
                    contentEditable={isEditMode}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                        const val = parseFloat(e.currentTarget.textContent?.replace(/[^0-9.]/g, '') || '0');
                        handleUpdateBalance(mainAccount.id, val);
                    }}
                  >
                    {mainAccount.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-2xl font-medium text-gray-500">{mainAccount.currency}</span>
                  {/* Optional Chart Icon */}
                  <div className="bg-gray-100 p-1.5 rounded-md ml-2">
                    <BarChart3 className="w-5 h-5 text-gray-600" />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-wise-green text-wise-dark px-5 py-2.5 rounded-full font-bold hover:brightness-95 transition-all">
                    <ArrowUpRight className="w-5 h-5" /> Send
                  </button>
                  <button className="flex items-center gap-2 bg-wise-bg text-wise-dark px-5 py-2.5 rounded-full font-bold hover:bg-gray-200 transition-all">
                    <Plus className="w-5 h-5" /> Add money
                  </button>
                  <button className="flex items-center gap-2 bg-wise-bg text-wise-dark px-5 py-2.5 rounded-full font-bold hover:bg-gray-200 transition-all">
                    <ArrowDownLeft className="w-5 h-5" /> Request
                  </button>
                </div>
              </section>

              {/* Cards / Accounts Scroll */}
              <section className="mb-12 overflow-x-auto no-scrollbar">
                <div className="flex gap-4 min-w-max pb-2">
                  {accounts.map((acc) => (
                    <div 
                      key={acc.id}
                      onClick={() => setSelectedAccountId(acc.id)}
                      className="w-64 h-40 bg-wise-bg rounded-xl p-5 flex flex-col justify-between relative group border border-transparent hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">
                                {acc.flag}
                            </div>
                            <span className="font-bold text-slate-700">{acc.currency}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                            <span className="bg-gray-200/50 px-1 rounded">🏛️</span>
                            <span>{acc.accountNumber}</span>
                        </div>
                        <div 
                            className={`text-xl font-bold text-slate-900 outline-none ${isEditMode ? 'bg-white/50 ring-1 ring-wise-green rounded px-1' : ''}`}
                            contentEditable={isEditMode}
                            suppressContentEditableWarning
                            onClick={(e) => isEditMode && e.stopPropagation()} 
                            onBlur={(e) => {
                                const val = parseFloat(e.currentTarget.textContent?.replace(/[^0-9.]/g, '') || '0');
                                handleUpdateBalance(acc.id, val);
                            }}
                        >
                            {acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="w-20 h-40 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-wise-green hover:text-wise-green hover:bg-wise-bg/20 transition-all cursor-pointer">
                      <Plus className="w-6 h-6" />
                  </div>
                </div>
              </section>

              {/* Transactions */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Transactions</h3>
                  <button className="text-wise-green font-semibold hover:underline decoration-2 underline-offset-4">See all</button>
                </div>

                <div className="space-y-1">
                  {transactions.map((tx) => (
                    <TransactionItem 
                        key={tx.id} 
                        transaction={tx} 
                        isEditMode={isEditMode}
                        onUpdate={handleUpdateTransaction}
                    />
                  ))}
                </div>
              </section>

              {/* Wise Assets Europe Promo */}
              <section className="mb-12">
                <div className="text-sm font-semibold text-gray-500 mb-2">Provided by Wise Assets Europe</div>
                <div className="bg-[#163300] rounded-2xl p-8 relative overflow-hidden h-[360px] flex flex-col justify-between group cursor-pointer transition-transform hover:scale-[1.01]">
                    {/* Close Icon */}
                    <button className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-full z-20">
                        <X className="w-5 h-5" />
                    </button>

                    <div className="relative z-10 max-w-sm">
                        <h2 className="text-5xl font-black text-white leading-[0.9] tracking-tighter mb-3 uppercase">
                            Help boost<br/>your money
                        </h2>
                        <p className="text-wise-green font-medium text-lg">1.72% variable rate</p>
                    </div>

                    {/* Decorative Coins Image (Simulated) */}
                    <div className="absolute right-[-40px] bottom-[-40px] w-80 h-80 z-0">
                         <img 
                            src="https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=600&q=80"
                            alt="Coins"
                            className="w-full h-full object-cover rounded-full mix-blend-hard-light opacity-80"
                         />
                    </div>

                    <div className="relative z-10 flex items-center gap-3 mt-auto">
                        <button className="bg-white hover:bg-gray-100 text-wise-dark px-5 py-2.5 rounded-full text-sm font-bold transition-colors">
                            Learn more
                        </button>
                        <button className="bg-wise-green w-10 h-10 flex items-center justify-center rounded-full text-wise-dark hover:brightness-110 transition-all">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-4 leading-relaxed max-w-2xl">
                    This investment option is provided by Wise Assets Europe AS. Capital at risk. Growth not guaranteed. Rate is based on 7-day performance as of 2 Jan.
                </p>
              </section>

              {/* Transfer Calculator */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Transfer calculator</h2>
                <div className="bg-wise-bg rounded-2xl p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-8">1 EUR = 1.1876 USD</h3>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Chart Area */}
                        <div className="flex-1 min-h-[200px] flex flex-col justify-between">
                             <div className="flex-1 w-full h-48 relative">
                                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#252525" stopOpacity="0.1"/>
                                            <stop offset="100%" stopColor="#252525" stopOpacity="0"/>
                                        </linearGradient>
                                    </defs>
                                    <path 
                                        d="M0,80 Q10,75 20,78 T40,60 T60,40 T80,55 T100,30" 
                                        fill="none" 
                                        stroke="#163300" 
                                        strokeWidth="2" 
                                        strokeLinecap="round"
                                    />
                                    <circle cx="100" cy="30" r="4" fill="#163300" stroke="white" strokeWidth="2" />
                                    {/* Dashed guidelines */}
                                    <line x1="0" y1="20" x2="100" y2="20" stroke="#000" strokeOpacity="0.05" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"/>
                                    <line x1="0" y1="50" x2="100" y2="50" stroke="#000" strokeOpacity="0.05" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"/>
                                    <line x1="0" y1="80" x2="100" y2="80" stroke="#000" strokeOpacity="0.05" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"/>
                                </svg>
                                <div className="absolute right-0 top-[20%] bg-wise-dark text-white text-xs font-bold px-2 py-1 rounded">1.1876</div>
                             </div>
                             <div className="flex justify-between text-xs font-medium text-gray-400 mt-4">
                                <span>10 Jan</span>
                                <span>Today</span>
                             </div>
                        </div>

                        {/* Calculator Inputs */}
                        <div className="flex-1 space-y-4">
                             {/* Source Currency */}
                            <div className="group">
                                <label className="text-xs font-medium text-gray-500 mb-1.5 block group-focus-within:text-wise-dark transition-colors">You send</label>
                                <div className="flex relative shadow-sm rounded-md transition-shadow focus-within:ring-2 focus-within:ring-wise-dark/20 focus-within:border-wise-dark">
                                    <input 
                                        type="text" 
                                        defaultValue="1,000.00" 
                                        className="block w-full rounded-l-md border-0 py-3.5 pl-4 text-black bg-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wise-dark sm:text-lg font-semibold"
                                    />
                                    <button className="flex shrink-0 items-center gap-2 rounded-r-md border border-l-0 border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-wise-dark focus:ring-offset-0">
                                        <span className="text-2xl">🇪🇺</span>
                                        <span className="font-bold text-gray-900">EUR</span>
                                        <ChevronDown className="h-4 w-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Swap Button (Purely visual here) */}
                            <div className="flex justify-center -my-2 relative z-10">
                                <div className="bg-white border border-gray-200 p-2 rounded-full shadow-sm hover:shadow-md cursor-pointer transition-shadow">
                                    <ArrowUpDown className="w-4 h-4 text-wise-green" />
                                </div>
                            </div>

                            {/* Target Currency */}
                             <div className="group">
                                <label className="text-xs font-medium text-gray-500 mb-1.5 block group-focus-within:text-wise-dark transition-colors">Recipient gets</label>
                                <div className="flex relative shadow-sm rounded-md transition-shadow focus-within:ring-2 focus-within:ring-wise-dark/20 focus-within:border-wise-dark">
                                    <input 
                                        type="text" 
                                        defaultValue="1,180.18" 
                                        className="block w-full rounded-l-md border-0 py-3.5 pl-4 text-black bg-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wise-dark sm:text-lg font-semibold"
                                    />
                                    <button className="flex shrink-0 items-center gap-2 rounded-r-md border border-l-0 border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-wise-dark focus:ring-offset-0">
                                        <span className="text-2xl">🇺🇸</span>
                                        <span className="font-bold text-gray-900">USD</span>
                                        <ChevronDown className="h-4 w-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Details Box */}
                            <div className="bg-white rounded-lg p-4 flex justify-between items-center text-sm border border-gray-200 shadow-sm mt-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-500 flex items-center gap-1">Includes fees <Info className="w-3 h-3"/></span>
                                    <span className="font-semibold text-gray-900">6.21 EUR</span>
                                </div>
                                <div className="w-px h-8 bg-gray-200 mx-4"></div>
                                <div className="flex flex-col gap-1 text-right">
                                    <span className="text-gray-500">Should arrive</span>
                                    <span className="font-semibold text-gray-900">In 10 hours</span>
                                </div>
                            </div>

                            <button className="w-full bg-wise-green text-wise-dark font-bold py-3.5 rounded-full hover:brightness-95 transition-all shadow-sm hover:shadow active:scale-[0.99] mt-2">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
              </section>

              {/* Get Updates */}
              <section className="flex items-center justify-between py-4 cursor-pointer group hover:bg-gray-50 rounded-xl px-2 transition-colors -mx-2 mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-wise-bg flex items-center justify-center text-gray-600 group-hover:bg-white group-hover:shadow-md transition-all">
                        <Bell className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900">Get exchange rate updates</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </section>

            </div>
          )}

        </div>
      </main>

      <EditControl 
        isEditMode={isEditMode} 
        toggleEditMode={() => setIsEditMode(!isEditMode)} 
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
};

export default App;