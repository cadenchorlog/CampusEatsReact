import React from 'react';
import * as CustomCode from '../components.js';
import * as Utils from '../utils';
import { IconButton, ScreenContainer, withTheme } from '@draftbit/ui';
import { StyleSheet } from 'react-native';

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
      <Utils.CustomCodeErrorBoundary>
        {' '}
        <WebView
          source={{
            uri: `${props.route?.params?.url ?? 'https://google.com'}`,
          }}
          onLoadEnd={() => this.hideSpinner()}
          onMessage={onMessage.bind(this)}
          ref={WEBVIEW_REF => (this.WebViewRef = WEBVIEW_REF)}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadProgress={({ nativeEvent }) => {
            //your code goes here
          }}
          onNavigationStateChange={state => {
            navigation.navigate('BottomTabNavigator', { screen: 'History' });
          }}
        />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  IconButton04e18c6b: {
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
});

export default withTheme(CheckoutScreen);
