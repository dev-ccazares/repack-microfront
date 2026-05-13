import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ThemeProvider from '@deuna/tl-core-components-rn/src/theming/themeProvider';
import { DeunaTheme } from '@deuna/tl-core-components-v2-rn';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './store';
import { SelectContact } from './screens/SelectContact';
import { EnterAmount } from './screens/EnterAmount';
import { ConfirmPayment } from './screens/ConfirmPayment';
import { Voucher } from './screens/Voucher';

const deunaTheme = require('./theme/deunaTheme');
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={deunaTheme}>
          <DeunaTheme>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
                <Stack.Screen name="SelectContact" component={SelectContact} />
                <Stack.Screen name="EnterAmount" component={EnterAmount} />
                <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} />
                <Stack.Screen name="Voucher" component={Voucher} />
              </Stack.Navigator>
            </NavigationContainer>
          </DeunaTheme>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
