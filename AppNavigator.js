import * as React from 'react';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable } from '@draftbit/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './themes/DraftbitTheme.js';

import AcceptOrderScreen from './screens/AcceptOrderScreen';
import AccountScreen from './screens/AccountScreen';
import AvailableOrdersScreen from './screens/AvailableOrdersScreen';
import BaggageCartScreen from './screens/BaggageCartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import CreateOrderScreen from './screens/CreateOrderScreen';
import DriverChatScreen from './screens/DriverChatScreen';
import DriverDashboardScreen from './screens/DriverDashboardScreen';
import ExitDriverScreen from './screens/ExitDriverScreen';
import HistoryScreen from './screens/HistoryScreen';
import LoginScreen from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';
import OrderScreen from './screens/OrderScreen';
import RestaurantItemViewScreen from './screens/RestaurantItemViewScreen';
import RestaurantViewScreen from './screens/RestaurantViewScreen';
import SignUpScreen from './screens/SignUpScreen';
import SimpleWelcomeScreen from './screens/SimpleWelcomeScreen';
import TrackScreen from './screens/TrackScreen';
import UserChatScreen from './screens/UserChatScreen';
import UserSetAddressScreen from './screens/UserSetAddressScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Placeholder() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#131A2A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 12,
          color: '#FFF',
        }}
      >
        Missing Screen
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        This screen is not in a navigator.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        Go to Navigation mode, and click the + (plus) icon in the Navigator tab
        on the left side to add this screen to a Navigator.
      </Text>
      <Text style={{ textAlign: 'center', fontSize: 16, color: '#FFF' }}>
        If the screen is in a Tab Navigator, make sure the screen is assigned to
        a tab in the Config panel on the right.
      </Text>
    </View>
  );
}
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="OrderScreen"
      tabBarOptions={{
        showLabel: false,
        showIcon: true,
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          title: 'Order',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Ionicons/fast-food-outline"
              size={25}
              color={focused ? theme.colors.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: 'Map',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialCommunityIcons/map-marker-outline"
              size={25}
              color={focused ? theme.colors.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BaggageCartScreen"
        component={BaggageCartScreen}
        options={{
          title: 'Baggage - Cart',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Feather/shopping-bag"
              size={25}
              color={focused ? theme.colors.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          title: 'History',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="FontAwesome/history"
              size={25}
              color={focused ? theme.colors.primary : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function DriverNav() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="DriverDashboardScreen"
        component={DriverDashboardScreen}
        options={{
          title: 'Driver Dashboard',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="FontAwesome/dollar"
              size={25}
              color={focused ? theme.colors.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AvailableOrdersScreen"
        component={AvailableOrdersScreen}
        options={{
          title: 'AvailableOrders',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Entypo/list"
              size={25}
              color={focused ? theme.colors.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ExitDriverScreen"
        component={ExitDriverScreen}
        options={{
          title: 'exitDriver',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialIcons/logout"
              size={25}
              color={focused ? theme.colors.primary : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="DriverNav" component={DriverNav} />
    </Stack.Navigator>
  );
}

export default function RootAppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        mode="card"
        headerMode="none"
        initialRouteName="SimpleWelcomeScreen"
        screenOptions={{
          headerTransparent: true,
          gestureEnabled: false,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false, title: 'Login' }}
        />
        <Stack.Screen
          name="SimpleWelcomeScreen"
          component={SimpleWelcomeScreen}
          options={{ title: 'Simple Welcome' }}
        />
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            headerTitle: 'Profile',
            gestureEnabled: false,
            gestureDirection: 'horizontal',
            headerBackImage: ({ tintColor }) => (
              <Icon
                name="Entypo/chevron-thin-left"
                size={Platform.OS === 'ios' ? 21 : 24}
                color={tintColor}
                style={[styles.headerIcon, styles.headerIconLeft]}
              />
            ),
            headerBackTitle: 'Back',
            title: 'Account',
          }}
        />
        <Stack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
          options={{ title: 'Checkout' }}
        />
        <Stack.Screen
          name="AcceptOrderScreen"
          component={AcceptOrderScreen}
          options={{ title: 'acceptOrder' }}
        />
        <Stack.Screen
          name="UserChatScreen"
          component={UserChatScreen}
          options={{ title: 'userChat' }}
        />
        <Stack.Screen
          name="DriverChatScreen"
          component={DriverChatScreen}
          options={{ title: 'driverChat' }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ title: 'signUp' }}
        />
        <Stack.Screen
          name="TrackScreen"
          component={TrackScreen}
          options={{ title: 'track' }}
        />
        <Stack.Screen
          name="UserSetAddressScreen"
          component={UserSetAddressScreen}
          options={{ title: 'userSetAddress' }}
        />
        <Stack.Screen
          name="RestaurantItemViewScreen"
          component={RestaurantItemViewScreen}
          options={{ title: 'Restaurant Item View' }}
        />
        <Stack.Screen
          name="RestaurantViewScreen"
          component={RestaurantViewScreen}
          options={{ title: 'restaurantView' }}
        />
        <Stack.Screen
          name="CreateOrderScreen"
          component={CreateOrderScreen}
          options={{ title: 'createOrder' }}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
        <Stack.Screen name="StackNavigator" component={StackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({
    ios: {
      marginRight: 6,
    },
  }),
  headerIconRight: Platform.select({
    ios: {
      marginLeft: 6,
    },
  }),
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({
    ios: {
      marginLeft: 8,
    },
  }),
  headerContainerRight: Platform.select({
    ios: {
      marginRight: 8,
    },
  }),
  headerLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerLabel: {
    fontSize: 17,
    letterSpacing: 0.35,
  },
});
