import React, { useState, useMemo, useCallback } from 'react';
import { View, SectionList, StyleSheet, FlatList, Pressable, Text as RNText } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Item } from '@deuna/tl-core-components-rn/src/molecules/item';
import { Body } from '@deuna/tl-core-components-rn/src/atoms/typography';
import { FormInput } from '@deuna/tl-core-components-rn/src/molecules/forms/formInput';
import { Avatar as AvatarV1 } from '@deuna/tl-core-components-rn/src/atoms/avatar';
import { Text, colors } from '@deuna/tl-core-components-v2-rn';
import { TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../store';
import { setSelectedContact } from '../store/paymentSlice';
import { mockContacts } from '../mocks/mockContacts';
import { Contact } from '../types';

const CHIPS_CONFIG = [
  { icon: '', label: 'Todos' },
  { icon: 'deuna', label: 'Deuna' },
  { icon: 'bank-outline', label: 'Cuentas' },
];

const FRECUENTES = mockContacts.slice(0, 4);

export function SelectContact({ navigation }: any) {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChip, setSelectedChip] = useState('Todos');

  const handleSelect = useCallback((contact: Contact) => {
    dispatch(setSelectedContact(contact));
    navigation.navigate('EnterAmount');
  }, [dispatch, navigation]);

  const filteredContacts = useMemo(() => {
    if (!searchQuery) return mockContacts;
    return mockContacts.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery),
    );
  }, [searchQuery]);

  const sections = useMemo(() => {
    if (searchQuery) return [{ title: 'Resultados', data: filteredContacts }];
    return [{ title: 'Contactos', data: mockContacts }];
  }, [searchQuery, filteredContacts]);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView edges={['top']}>
        <View style={styles.headerContainer} testID="backButtonTopNavigator-header-container">
          <Pressable onPress={() => navigation.goBack()} style={styles.leftIcon}>
            <RNText style={{ fontSize: 24, color: colors.neutral700 }}>←</RNText>
          </Pressable>
          <Text style={[styles.titleContent, { color: colors.neutral700 }]} variant="text-md-bold">
            Enviar dinero
          </Text>
        </View>
      </SafeAreaView>

      <View style={styles.inputContainer}>
        <FormInput
          value={searchQuery}
          placeholder="Buscar"
          keyboardType="default"
          onChangeText={setSearchQuery}
          type="search"
          background="neutralVariant50"
          maxLength={140}
        />
      </View>

      {/* Filter Chips */}
      <View style={styles.filterChipsContainer}>
        {CHIPS_CONFIG.map((chip, index) => {
          const isSelected = selectedChip === chip.label;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedChip(chip.label)}
              style={[chipFilterStyles.chip, isSelected && chipFilterStyles.chipSelected]}
              activeOpacity={0.7}
            >
              <Text
                variant="text-sm-regular"
                style={isSelected ? chipFilterStyles.chipTextSelected : chipFilterStyles.chipText}
              >
                {chip.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <SectionList
        key="section-list-pay-contacts"
        sections={sections}
        ListHeaderComponent={
          !searchQuery ? (
            <View style={frequentStyles.container}>
              <Text variant="text-xs-semibold" style={frequentStyles.title}>
                Frecuentes
              </Text>
              <FlatList
                data={FRECUENTES}
                keyExtractor={(_, idx) => `freq-${idx}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={frequentStyles.customContainer}
                renderItem={({ item }) => (
                  <View style={frequentStyles.userList}>
                    <AvatarV1
                      type="userInitials"
                      name={item.name}
                      size="m"
                      background="gradientPurple"
                      onPress={() => handleSelect(item)}
                    />
                    <Pressable onPress={() => handleSelect(item)}>
                      <Text
                        variant="text-xs-medium"
                        numberOfLines={2}
                        style={frequentStyles.textAvatar}
                      >
                        {item.name.split(' ')[0]}
                      </Text>
                    </Pressable>
                  </View>
                )}
              />
              <View style={frequentStyles.divider} />

              {/* Acciones - igual a la app principal */}
              <Item
                title="Escanear QR"
                subtitle="Para pagar negocios y personas"
                nameAvatar="qrcode-scan"
                showIcon={false}
                type="primaryLight"
                onPress={() => {}}
              />
              <Item
                title="Pagar a un nuevo número"
                subtitle="Si tu contacto tiene Deuna"
                nameAvatar="account-plus"
                type="primaryLight"
                onPress={() => {}}
                showIcon={false}
              />
              <Item
                title="Pagar a cuenta bancaria"
                subtitle="A cualquier banco del Ecuador"
                nameAvatar="bank"
                type="primaryLight"
                onPress={() => {}}
                showIcon={false}
                label="Nuevo"
              />
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <Item
            type="contact"
            title={item.name}
            subtitle={`+593 ${item.phone.replace(/^0/, '')}`}
            nameAvatar={item.name}
            background="gradientPurple"
            showIcon={false}
            onPress={() => handleSelect(item)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={commonStyle.inviteContainer}>
            <Body type="smStrong">{title}</Body>
          </View>
        )}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        keyboardShouldPersistTaps="always"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: colors.white },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginTop: 16,
  },
  leftIcon: { zIndex: 1, marginLeft: 16, marginRight: 12 },
  titleContent: {
    position: 'absolute',
    textAlign: 'center',
    left: 0,
    right: 0,
    zIndex: 100,
    width: '80%',
    marginLeft: '10%',
  },
  inputContainer: { padding: 16 },
  filterChipsContainer: {
    backgroundColor: colors.white,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
});

const commonStyle = StyleSheet.create({
  inviteContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
  },
});

const frequentStyles = StyleSheet.create({
  container: { marginBottom: 8 },
  title: { paddingLeft: 16, color: colors.neutral700, paddingVertical: 8 },
  divider: { height: 1, width: '100%', backgroundColor: '#E0E0E0', marginTop: 16 },
  customContainer: { gap: 20, paddingHorizontal: 16, alignItems: 'stretch', justifyContent: 'center' },
  userList: { alignItems: 'center' },
  textAvatar: { marginTop: 8, width: 72, textAlign: 'center' },
});

const chipFilterStyles = StyleSheet.create({
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
