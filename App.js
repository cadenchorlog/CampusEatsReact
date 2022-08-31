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
import OneSignal from 'react-native-onesignal';
import Constants from "expo-constants";
import registerForPushNotificationsAsync from './utils/getPushToken';
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
 


  return (
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
  );
};

export default App;
