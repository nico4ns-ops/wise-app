import React, { useState } from 'react';
import { Settings, Plus, Eye, EyeOff, Save, X } from 'lucide-react';
import { Transaction, TransactionDirection, TransactionStatus } from '../types';

interface EditControlProps {
  isEditMode: boolean;
  toggleEditMode: () => void;
  onAddTransaction: (t: Transaction) => void;
}

const EditControl: React.FC<EditControlProps> = ({ isEditMode, toggleEditMode, onAddTransaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTx, setNewTx] = useState<Partial<Transaction>>({
    recipient: '',
    amount: 0,
    currency: 'EUR',
    direction: TransactionDirection.OUTGOING,
    date: 'Today',
    status: TransactionStatus.COMPLETED
  });

  const handleAdd = () => {
    if (!newTx.recipient || !newTx.amount) return;
    
    const transaction: Transaction = {
      id: Math.random().toString(36).substring(2, 11),
      recipient: newTx.recipient,
      description: newTx.direction === TransactionDirection.OUTGOING ? 'Payment' : 'Income',
      amount: Number(newTx.amount),
      currency: newTx.currency || 'EUR',
      date: newTx.date || 'Today',
      status: newTx.status || TransactionStatus.COMPLETED,
      direction: newTx.direction || TransactionDirection.OUTGOING,
      iconType: newTx.direction === TransactionDirection.INCOMING ? 'income' : 'shopping'
    };
    
    onAddTransaction(transaction);
    setNewTx({ ...newTx, recipient: '', amount: 0 }); // Reset key fields
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-slate-900 text-white p-3 rounded-full shadow-lg hover:bg-slate-800 transition-all z-50"
        title="Open Director Controls"
      >
        <Settings className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 bg-white border border-gray-200 p-6 rounded-2xl shadow-2xl w-80 z-50 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">Director Mode</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Editable UI</span>
          <button 
            onClick={toggleEditMode}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              isEditMode ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {isEditMode ? <><Eye className="w-3 h-3"/> ON</> : <><EyeOff className="w-3 h-3"/> OFF</>}
          </button>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Add Transaction</h4>
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Recipient / Shop" 
              className="w-full text-sm p-2 border border-gray-200 rounded-md"
              value={newTx.recipient}
              onChange={e => setNewTx({...newTx, recipient: e.target.value})}
            />
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Amount" 
                className="w-2/3 text-sm p-2 border border-gray-200 rounded-md"
                value={newTx.amount || ''}
                onChange={e => setNewTx({...newTx, amount: parseFloat(e.target.value)})}
              />
              <select 
                className="w-1/3 text-sm p-2 border border-gray-200 rounded-md"
                value={newTx.currency}
                onChange={e => setNewTx({...newTx, currency: e.target.value})}
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="THB">THB</option>
              </select>
            </div>
            <div className="flex gap-2">
               <select 
                className="w-1/2 text-sm p-2 border border-gray-200 rounded-md"
                value={newTx.direction}
                onChange={e => setNewTx({...newTx, direction: e.target.value as TransactionDirection})}
              >
                <option value={TransactionDirection.OUTGOING}>Outgoing (-)</option>
                <option value={TransactionDirection.INCOMING}>Incoming (+)</option>
              </select>
               <input 
                type="text" 
                placeholder="Date" 
                className="w-1/2 text-sm p-2 border border-gray-200 rounded-md"
                value={newTx.date}
                onChange={e => setNewTx({...newTx, date: e.target.value})}
              />
            </div>
            <button 
              onClick={handleAdd}
              className="w-full bg-wise-dark text-white text-sm font-medium py-2 rounded-md hover:bg-slate-800 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditControl;