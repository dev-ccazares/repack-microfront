import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableHighlight, Text as RNText } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Item } from '@deuna/tl-core-components-rn/src/molecules/item';
import { Headline, Body } from '@deuna/tl-core-components-rn/src/atoms/typography';
import { Button, colors, Text } from '@deuna/tl-core-components-v2-rn';
import { useAppSelector, useAppDispatch } from '../store';
import { setPaymentData } from '../store/paymentSlice';
import { PaymentData } from '../types';

export function ConfirmPayment({ route, navigation }: any) {
  const dispatch = useAppDispatch();
  const selectedContact = useAppSelector(state => state.payment.selectedContact);
  const { amount, description } = route.params;
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  const { bottom: safeAreaBottom } = useSafeAreaInsets();

  const bottomNavigationStyle = useMemo(
    () => ({ paddingBottom: 24 + (safeAreaBottom || 0) }),
    [safeAreaBottom],
  );

  const startTransfer = () => {
    setLoadingTransfer(true);
    setTimeout(() => {
      const paymentData: PaymentData = {
        contact: selectedContact!,
        amount,
        description,
        timestamp: Date.now(),
        transactionId: `TXN-${Date.now()}`,
        status: 'success',
      };
      dispatch(setPaymentData(paymentData));
      setLoadingTransfer(false);
      navigation.navigate('Voucher', { payment: paymentData });
    }, 1500);
  };

  const getContent = () => (
    <View style={styles.detailPayment}>
      <Item
        background="gradientPurple"
        color="#4C1D80"
        title="Te enviaremos a"
        subtitle={selectedContact?.name ?? ''}
        type="confirm"
        children={`+593 ${(selectedContact?.phone ?? '').replace(/^0/, '')}`}
        showIcon={false}
        nameAvatar={selectedContact?.name ?? ''}
        typeAvatar="userInitials"
      />
      <Item
        background="gradientGray"
        color={colors.neutral700}
        title="Monto a enviar"
        subtitle={`$${amount}`}
        type="confirm"
        showIcon={false}
        nameAvatar="cash-multiple"
        typeAvatar="iconPrimary"
      />
      {description ? (
        <Item
          background="gradientGray"
          color={colors.neutral700}
          title="Motivo"
          subtitle={description}
          type="confirm"
          showIcon={false}
          nameAvatar="text-box-outline"
          typeAvatar="iconPrimary"
        />
      ) : null}
      <Item
        background="solidPrimaryViolet500"
        color={colors.accent500}
        title="Pagas con"
        subtitle="Cuenta DEUNA"
        type="confirm"
        children="****1234"
        showIcon={false}
        nameAvatar="wallet"
        typeAvatar="iconSecondary"
      />
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.safeAreaView} edges={['top']}>
        {/* Header con flecha y Salir */}
        <View style={topNavStyles.header}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="transparent"
            onPress={() => navigation.goBack()}
            style={topNavStyles.btn}
          >
            <RNText style={{ fontSize: 24, color: colors.neutral700 }}>←</RNText>
          </TouchableHighlight>

          <Text variant="text-md-bold" style={[topNavStyles.title, { color: colors.neutral700 }]}>
            Confirmar pago
          </Text>

          <TouchableHighlight
            activeOpacity={1}
            underlayColor="transparent"
            onPress={() => navigation.popToTop()}
            style={topNavStyles.btn}
          >
            <Text variant="text-sm-semibold" style={{ color: colors.primary500 }}>Salir</Text>
          </TouchableHighlight>
        </View>

        <ScrollView>
          <View style={styles.container}>
            <Headline type="h1">¡Confirma tu pago!</Headline>
            {getContent()}
          </View>
        </ScrollView>
      </SafeAreaView>

      <View style={[styles.bottomSection, bottomNavigationStyle]}>
        <View style={[styles.bottomNavigationChildren, styles.bottomNavigationSummary]}>
          <Body type="smStrong" color="black">Total del pago</Body>
          <Body type="smStrong" color="black">${amount}</Body>
        </View>

        <Button
          semantic="default"
          type="filled"
          size="l"
          onPress={startTransfer}
          loading={loadingTransfer}
          disabled={loadingTransfer}
          style={styles.bottomButton}
        >
          {loadingTransfer ? 'Pagando...' : 'Pagar'}
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: { backgroundColor: colors.white, flex: 1 },
  container: { paddingHorizontal: 16 },
  bottomNavigationChildren: {
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderColor: '#F1F2F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 6,
  },
  bottomNavigationSummary: { marginBottom: 8 },
  bottomButton: { marginTop: 16 },
  detailPayment: {
    marginHorizontal: -16,
    marginTop: 32,
    marginBottom: 12,
  },
});

const topNavStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F2F5',
    backgroundColor: 'white',
  },
  btn: { padding: 4, minWidth: 50 },
  title: { flex: 1, textAlign: 'center', fontSize: 16 },
});
