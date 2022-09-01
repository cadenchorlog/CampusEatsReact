import * as React from 'react';
import { AppState } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Provider as ThemeProvider } from '@draftbit/ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppNavigator from './AppNavigator';
import DraftbitTheme from './themes/DraftbitTheme.js';
import cacheAssetsAsync from './config/cacheAssetsAsync';
import { GlobalVariableProvider } from './config/GlobalVariableContext';

import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import Constants from "expo-constants";
import registerForPushNotificationsAsync from './utils/getPushToken';
import { StripeProvider } from "@stripe/stripe-react-native";
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const queryClient = new QueryClient();

const App = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    OpenSans_600SemiBold,
    Poppins_300Light,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_400Regular,
    Poppins_400Regular,
    Poppins_400Regular,
    Poppins_400Regular,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_600SemiBold,
    Poppins_600SemiBold,
    Poppins_600SemiBold,
    Poppins_600SemiBold,
    Poppins_600SemiBold,
    Poppins_600SemiBold,
    Poppins_600SemiBold,
    Poppins_600SemiBold,
    Poppins_600SemiBold,
    Poppins_600SemiBold,
    Poppins_600SemiBold,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_700Bold,
  });

  React.useEffect(() => {
    async function prepare() {
      try {
        await cacheAssetsAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    

    prepare();
  }, []);
  

  const onLayoutRootView = React.useCallback(async () => {
    if (isReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded]);

  if (!isReady || !fontsLoaded) {
    return null;
  }
 

  registerForPushNotificationsAsync();
  function CheckoutScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:hBvJuMsa/payment_intents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer} = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
      });
      if (!error) {
        setLoading(true);
      }
    };
  
    const openPaymentSheet = async () => {
      const { error } = await presentPaymentSheet();
  
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert('Success', 'Your order is confirmed!');
      }
    };
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);
  
    return (
      <CheckoutScreen>
        <Button
          variant="primary"
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
        />
      </CheckoutScreen>
    );
  }
  return (
    <StripeProvider
      publishableKey="pk_test_51LO2SYBwsDz1it0i7ggJBhk7TxeVTpHgoPeQuk0yl3QE9e02ZdZ4zR30fddiZqTCvqXlLxIXty0RQHNqEP8IybMY00ZlUmG26K"
      urlScheme="https://campuseats.net/redirected" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.campuseats.test" // required for Apple Pay
    >
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      onLayout={onLayoutRootView}
    >
      <GlobalVariableProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={DraftbitTheme}>
            <AppNavigator />
          </ThemeProvider>
        </QueryClientProvider>
      </GlobalVariableProvider>
    </SafeAreaProvider>
    </StripeProvider>
  );
};

export default App;
