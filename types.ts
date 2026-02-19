export enum TransactionStatus {
  COMPLETED = 'Completed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled'
}

export enum TransactionDirection {
  INCOMING = 'incoming', // Money received
  OUTGOING = 'outgoing'  // Money sent
}

export interface Transaction {
  id: string;
  recipient: string;
  description: string;
  amount: number;
  currency: string;
  date: string; // Display string like "Today", "Yesterday", "12 Dec"
  status: TransactionStatus;
  direction: TransactionDirection;
  iconType: 'transfer' | 'shopping' | 'income' | 'general';
}

export interface Account {
  id: string;
  currency: string;
  balance: number;
  flag: string; // Emoji flag
  accountNumber: string;
}

export interface UserProfile {
  name: string;
  username: string;
  avatarUrl: string;
  membershipNumber: string;
}