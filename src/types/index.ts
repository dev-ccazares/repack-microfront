export interface Contact {
  id: string;
  name: string;
  document: string;
  phone: string;
}

export interface PaymentData {
  contact: Contact;
  amount: string;
  description: string;
  timestamp: number;
  transactionId: string;
  status: 'success' | 'pending' | 'failed';
}

export interface PaymentContextType {
  paymentData: PaymentData | null;
  setPaymentData: (data: PaymentData) => void;
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact) => void;
}
