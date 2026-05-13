import React, { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ticket, Text, colors } from '@deuna/tl-core-components-v2-rn';
import { TicketStrategy } from '@deuna/tl-core-components-v2-rn/templates/Ticket/TicketStrategy';
import { Item } from '@deuna/tl-core-components-rn/src/molecules/item';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { PaymentData } from '../types';

const SECTION_BACKGROUND = 'gradientPurple';
const SECTION_TEXT_COLOR = '#4C1D80';

const sectionStyles = StyleSheet.create({
  container: { marginVertical: 8 },
  label: { marginBottom: 8, color: colors.neutral700 },
});

const renderLabeledItem = (
  label: string,
  { name = '', account = '', avatarName, itemProps }: any,
) => (
  <View style={sectionStyles.container}>
    {label ? (
      <Text variant="text-xs-semibold" style={sectionStyles.label}>
        {label}
      </Text>
    ) : null}
    <Item
      subtitle={name}
      children={account}
      type="confirm"
      background={SECTION_BACKGROUND}
      color={SECTION_TEXT_COLOR}
      showIcon={false}
      nameAvatar={avatarName ?? name}
      {...itemProps}
    />
  </View>
);

class P2PVoucherStrategy extends TicketStrategy {
  constructor(payment: PaymentData) {
    const transaction = {
      amount: payment.amount,
      caption: '¡Pago exitoso!',
      description: 'Listo, tu pago se realizó con éxito',
      concept: payment.description || '',
      ordererLabel: 'Pagaste con',
      ordererName: 'Cuenta DEUNA',
      ordererAccountNumber: '****1234',
      beneficiaryLabel: 'Pagaste a',
      beneficiaryName: payment.contact.name,
      beneficiaryAccountNumber: payment.contact.phone,
      reasonLabel: payment.description ? 'Concepto' : '',
      reason: payment.description || '',
      payDayLabel: 'Fecha y hora',
      accreditationDateLabel: '',
      accreditationDate: '',
      transactionNumberLabel: 'N° de transacción',
      trasactionNumber: payment.transactionId,
      costLabel: '',
      cost: '',
      showDetailLabel: 'Ver detalle',
      hideDetailLabel: 'Ocultar detalle',
    };
    super(transaction, {});
    (this as any)._schema = transaction;
  }

  generateComponent(): JSX.Element {
    return (
      <>
        {renderLabeledItem(this._schema.ordererLabel ?? '', {
          name: this._schema.ordererName ?? '',
          account: this._schema.ordererAccountNumber ?? '',
          avatarName: this._schema.ordererName,
        })}

        {renderLabeledItem(this._schema.beneficiaryLabel ?? '', {
          name: this._schema.beneficiaryName ?? '',
          account: this._schema.beneficiaryAccountNumber ?? '',
          avatarName: this._schema.beneficiaryName,
        })}
      </>
    );
  }
}

export function Voucher({ route, navigation }: any) {
  const payment: PaymentData = route.params.payment;
  const strategy = new P2PVoucherStrategy(payment);
  const payDay = format(new Date(payment.timestamp), "dd 'de' MMMM yyyy, HH:mm", { locale: es });

  return (
    <Ticket
      goBack={() => navigation.navigate('SelectContact')}
      payDay={payDay}
      icons={{ close: { hasCloseHeaderIcon: false } }}
      isFirebaseReason={null}
      hasGoToHome={true}
      goToHome={() => navigation.navigate('SelectContact')}
      benefit={null}
      voucherStrategy={strategy as any}
    />
  );
}
