import { Transaction, TransactionStatus, TransactionDirection, Account } from './types';

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: '1',
    currency: 'EUR',
    balance: 14534.87,
    flag: '🇪🇺',
    accountNumber: '.. 64818'
  },
  {
    id: '2',
    currency: 'USD',
    balance: 0.00,
    flag: '🇺🇸',
    accountNumber: '.. 74161'
  },
  {
    id: '3',
    currency: 'GBP',
    balance: 0.00,
    flag: '🇬🇧',
    accountNumber: '.. 99212'
  },
  {
    id: '4',
    currency: 'THB',
    balance: 0.00,
    flag: '🇹🇭',
    accountNumber: '.. 11234'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  // TODAY
  {
    id: 't1',
    recipient: 'Shwe Sin Win',
    description: 'Sending',
    amount: 12086.34,
    currency: 'THB',
    date: 'Today',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.OUTGOING,
    iconType: 'transfer'
  },
  {
    id: 't2',
    recipient: 'To EUR',
    description: 'Moved by you',
    amount: 34.30,
    currency: 'EUR',
    date: 'Today',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.INCOMING,
    iconType: 'transfer'
  },
  {
    id: 't_today_1',
    recipient: 'Albert Heijn',
    description: 'Groceries',
    amount: 42.15,
    currency: 'EUR',
    date: 'Today',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.OUTGOING,
    iconType: 'shopping'
  },
  {
    id: 't_today_2',
    recipient: 'Uber BV',
    description: 'Transport',
    amount: 18.50,
    currency: 'EUR',
    date: 'Today',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.OUTGOING,
    iconType: 'shopping'
  },
  {
    id: 't_today_3',
    recipient: 'Tikkie - Lunch',
    description: 'Payment request',
    amount: 12.50,
    currency: 'EUR',
    date: 'Today',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.OUTGOING,
    iconType: 'transfer'
  },
  {
    id: 't_today_4',
    recipient: 'Spotify AB',
    description: 'Subscription',
    amount: 10.99,
    currency: 'EUR',
    date: 'Yesterday',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.OUTGOING,
    iconType: 'shopping'
  },
  {
    id: 't_today_5',
    recipient: 'From Savings',
    description: 'Top up',
    amount: 250.00,
    currency: 'EUR',
    date: 'Today',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.INCOMING,
    iconType: 'transfer'
  },

  // YESTERDAY
  {
    id: 't3',
    recipient: 'Iberojet',
    description: 'Travel',
    amount: 405.76,
    currency: 'EUR',
    date: 'Yesterday',
    status: TransactionStatus.PENDING,
    direction: TransactionDirection.OUTGOING,
    iconType: 'shopping'
  },
  {
    id: 't_yest_1',
    recipient: 'Starbucks Coffee',
    description: 'Food & Drink',
    amount: 5.75,
    currency: 'EUR',
    date: 'Yesterday',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.OUTGOING,
    iconType: 'shopping'
  },
  {
    id: 't_yest_2',
    recipient: 'Shell Station',
    description: 'Fuel',
    amount: 54.20,
    currency: 'EUR',
    date: 'Yesterday',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.OUTGOING,
    iconType: 'shopping'
  },
  {
    id: 't_yest_3',
    recipient: 'Bol.com',
    description: 'Electronics',
    amount: 129.99,
    currency: 'EUR',
    date: 'Yesterday',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.OUTGOING,
    iconType: 'shopping'
  },
  {
    id: 't_yest_4',
    recipient: 'H&M',
    description: 'Clothing',
    amount: 49.90,
    currency: 'EUR',
    date: 'Yesterday',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.OUTGOING,
    iconType: 'shopping'
  },
  {
    id: 't_yest_5',
    recipient: 'Ziggo BV',
    description: 'Internet & TV',
    amount: 67.50,
    currency: 'EUR',
    date: 'Yesterday',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.OUTGOING,
    iconType: 'shopping'
  },
  {
    id: 't4',
    recipient: 'Spotify AB',
    description: 'Subscription',
    amount: 10.99,
    currency: 'EUR',
    date: 'Yesterday',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.OUTGOING,
    iconType: 'shopping'
  },
  {
    id: 't5',
    recipient: 'Upwork Global Inc.',
    description: 'Payout',
    amount: 1250.00,
    currency: 'USD',
    date: 'Yesterday',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.INCOMING,
    iconType: 'income'
  }
];