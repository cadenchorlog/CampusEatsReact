import React from 'react';
import * as CustomCode from '../components.js';
import * as Utils from '../utils';
import { IconButton, ScreenContainer, withTheme } from '@draftbit/ui';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const CheckoutScreen = props => {
  const { theme } = props;
  const { navigation } = props;

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.primary }}
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
    >
      <IconButton
        onPress={() => {
          try {
            navigation.goBack();
          } catch (err) {
            console.error(err);
          }
        }}
        style={styles.IconButton04e18c6b}
        icon={'AntDesign/closecircle'}
        size={45}
        color={theme.colors.divider}
      />
      
        
        <WebView
        style={styles.webView}
          source={{
            uri: `${props.route?.params?.url ?? 'https://google.com'}`,
          }}

          onNavigationStateChange={state => {
            console.log(state.url);
            if(state.url != props.route?.params?.url){
            navigation.navigate('BottomTabNavigator', { screen: 'HistoryScreen' });
            }
          }}
        />
      
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  IconButton04e18c6b: {
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  webView: {
    marginTop: -50
    
  },
});

export default withTheme(CheckoutScreen);