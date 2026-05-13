import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableHighlight,
  Pressable,
  Text as RNText,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NumberComponent } from '@deuna/tl-core-components-rn/src/atoms/typography';
import { KeyboardCustomNumeric } from '@deuna/tl-core-components-rn/src/molecules/keyboard';
import { Avatar as AvatarV1 } from '@deuna/tl-core-components-rn/src/atoms/avatar';
import { Body } from '@deuna/tl-core-components-rn/src/atoms/typography';
import { Button, colors, Text } from '@deuna/tl-core-components-v2-rn';
import { useAppSelector } from '../store';

const isIos = () => Platform.OS === 'ios';

const REASON_CHIPS = [
  { key: 'meal_chip', text: 'Comida', emoji: '🍔' },
  { key: 'debt_chip', text: 'Deuda', emoji: '💸' },
  { key: 'transport_chip', text: 'Transporte', emoji: '🚖' },
  { key: 'services_chip', text: 'Servicios', emoji: '💡' },
  { key: 'custom_chip', text: '+ Motivo' },
];

export function EnterAmount({ navigation }: any) {
  const selectedContact = useAppSelector(state => state.payment.selectedContact);
  const [amount, setAmount] = useState('');
  const [transactionReason, setTransactionReason] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const typingHandler = ({ value, action }: { value: string; action: string }) => {
    if (action === 'delete') {
      setAmount(prev => prev.slice(0, -1));
    } else if (action === 'clear') {
      setAmount('');
    } else if (value !== undefined && value !== '') {
      // type="amount" pasa el valor acumulado
      setAmount(value.replace(',', '.'));
    }
  };

  const prepareTransfer = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Por favor ingresa un monto válido');
      return;
    }
    navigation.navigate('ConfirmPayment', { amount, description: transactionReason ?? '' });
  };

  const clientName = selectedContact?.name ?? '';
  const transferButtonDisabled = !amount || parseFloat(amount) <= 0;

  const renderPaymentReasonContainer = () => (
    <View style={styles.containerChipReason}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          flexDirection: 'row',
          gap: 8,
          width: 'auto',
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}
      >
        {REASON_CHIPS.map(chip => {
          const isSelected = transactionReason === chip.text;
          return (
            <Pressable
              key={chip.key}
              onPress={() => setTransactionReason(isSelected ? null : chip.text)}
              style={[chipStyles.chip, isSelected && chipStyles.chipSelected]}
            >
              <Text
                variant="text-sm-regular"
                style={isSelected ? chipStyles.chipTextSelected : chipStyles.chipText}
              >
                {chip.emoji ? `${chip.emoji} ` : ''}{chip.text}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={isIos() ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <StatusBar backgroundColor="transparent" translucent={false} />

      <SafeAreaView edges={['top']} style={{ backgroundColor: 'white' }}>
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
            ¿Cuánto quieres pagar?
          </Text>

          <TouchableHighlight
            activeOpacity={1}
            underlayColor="transparent"
            onPress={() => navigation.navigate('SelectContact')}
            style={topNavStyles.btn}
          >
            <Text variant="text-sm-semibold" style={{ color: colors.primary500 }}>Salir</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollView}
        style={styles.scrollContainer}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.containerCashIn}>
          <View>
            <View style={styles.containerAvatar}>
              <AvatarV1
                type="userInitials"
                name={clientName}
                size="g"
                background="gradientPurple"
              />
              <Body type="strong" style={{ textAlign: 'center', marginVertical: 16 }}>
                {clientName}
              </Body>
            </View>
          </View>

          <View style={styles.amountFormat}>
            <NumberComponent type="xl" color={colors.primary500}>
              ${amount || '0'}
            </NumberComponent>
          </View>

          {renderPaymentReasonContainer()}
        </View>
      </ScrollView>

      <SafeAreaView
        style={isIos() ? styles.buttonContainerIOS : styles.buttonContainer}
        edges={['bottom']}
      >
        <KeyboardCustomNumeric
          type="amount"
          hasAction={true}
          handleKey={typingHandler}
          maxCant={5}
          disable={false}
          clear={false}
        />
        <View style={styles.paddingTopButton}>
          <Button
            onPress={prepareTransfer}
            semantic="default"
            type="filled"
            size="l"
            disabled={transferButtonDisabled}
          >
            Continuar
          </Button>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: 'white' },
  scrollView: { flexGrow: 1, justifyContent: 'flex-start' },
  buttonContainer: { padding: 16, backgroundColor: 'white' },
  buttonContainerIOS: { paddingHorizontal: 16, backgroundColor: 'white' },
  containerCashIn: {},
  containerAvatar: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 16,
  },
  containerChipReason: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 25,
  },
  paddingTopButton: { paddingTop: 24 },
  amountFormat: { paddingTop: 32, alignItems: 'center' },
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

const chipStyles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D2D7E1',
    backgroundColor: 'white',
  },
  chipSelected: { backgroundColor: '#EEE8F8', borderColor: colors.primary500 },
  chipText: { color: '#606060' },
  chipTextSelected: { color: colors.primary500, fontWeight: '600' },
});
