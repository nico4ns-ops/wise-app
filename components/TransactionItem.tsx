import React from 'react';
import { Transaction, TransactionDirection, TransactionStatus } from '../types';
import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Wallet, Clock, XCircle, CheckCircle2 } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
  isEditMode: boolean;
  onUpdate: (updated: Transaction) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, isEditMode, onUpdate }) => {

  const getIcon = () => {
    const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center shrink-0";
    
    if (transaction.status === TransactionStatus.PENDING) {
       return (
        <div className={`${baseClasses} bg-gray-100 text-gray-500`}>
          <Clock className="w-5 h-5" />
        </div>
      );
    }

    if (transaction.direction === TransactionDirection.INCOMING) {
      return (
        <div className={`${baseClasses} bg-wise-bg text-wise-dark`}>
          <ArrowDownLeft className="w-5 h-5" />
        </div>
      );
    }

    switch (transaction.iconType) {
      case 'shopping':
        return <div className={`${baseClasses} bg-blue-50 text-blue-600`}><ShoppingBag className="w-5 h-5" /></div>;
      case 'transfer':
      default:
        return <div className={`${baseClasses} bg-gray-100 text-gray-600`}><ArrowUpRight className="w-5 h-5" /></div>;
    }
  };

  const handleTextChange = (field: keyof Transaction, value: string) => {
    let finalValue: any = value;
    if (field === 'amount') {
      finalValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    }
    onUpdate({ ...transaction, [field]: finalValue });
  };

  return (
    <div
      className={`flex items-center justify-between py-4 px-2 -mx-2 rounded-lg transition-colors ${isEditMode ? 'hover:bg-yellow-50 cursor-pointer border border-transparent hover:border-yellow-200' : 'hover:bg-gray-50'}`}
    >
      <div className="flex items-center gap-4 flex-1">
        {getIcon()}
        
        <div className="flex flex-col min-w-0 flex-1">
          <div 
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange('recipient', e.currentTarget.textContent || '')}
            className={`font-semibold text-gray-900 text-base outline-none ${isEditMode ? 'hover:bg-white hover:shadow-sm px-1 rounded' : ''}`}
          >
            {transaction.recipient}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
             <span
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('description', e.currentTarget.textContent || '')}
                className={`outline-none ${isEditMode ? 'hover:bg-white hover:shadow-sm px-1 rounded' : ''}`}
             >
                {transaction.description}
             </span>
             <span>·</span>
             <span
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('date', e.currentTarget.textContent || '')}
                className={`outline-none ${isEditMode ? 'hover:bg-white hover:shadow-sm px-1 rounded' : ''}`}
             >
                {transaction.date}
             </span>
          </div>
        </div>
      </div>

      <div className="text-right pl-4">
        <div 
          className={`font-bold text-base outline-none whitespace-nowrap ${isEditMode ? 'hover:bg-white hover:shadow-sm px-1 rounded' : ''}`}
          contentEditable={isEditMode}
          suppressContentEditableWarning
          onBlur={(e) => handleTextChange('amount', e.currentTarget.textContent || '')}
        >
          {transaction.direction === TransactionDirection.OUTGOING ? '-' : '+'}{transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="text-sm text-gray-500 font-medium">
          {transaction.currency}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;