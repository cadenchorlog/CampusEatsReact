// Place any imports required by your custom components at the top of
// this file. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section. The first import from
// 'react' is required.
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    //this.setState({ expoPushToken: token });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#D22F27',
    });
  }

  return token;
}

export function PushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Text>Token: {expoPushToken}</Text>
      <Text>Title: {notification && notification.request.content.title}</Text>
      <Text>Body: {notification && notification.request.content.body}</Text>
      <Text>
        Data:{' '}
        {notification && JSON.stringify(notification.request.content.data)}
      </Text>
    </View>
  );
}

export {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

// Define and export your components as named exports here.
// You can reference them within a Custom Code block
// as <CustomCode.MyTextComponent />

// Uncomment below to create your first component
// export const MyTextComponent = () => <Text>Hello world!</Text>;
