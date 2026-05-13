import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact, PaymentData } from '../types';

interface PaymentState {
  paymentData: PaymentData | null;
  selectedContact: Contact | null;
}

const initialState: PaymentState = {
  paymentData: null,
  selectedContact: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentData: (state, action: PayloadAction<PaymentData | null>) => {
      state.paymentData = action.payload;
    },
    setSelectedContact: (state, action: PayloadAction<Contact | null>) => {
      state.selectedContact = action.payload;
    },
    resetPayment: (state) => {
      state.paymentData = null;
      state.selectedContact = null;
    },
  },
});

export const { setPaymentData, setSelectedContact, resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
