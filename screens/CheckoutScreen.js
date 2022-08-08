import React from 'react';
import { IconButton, ScreenContainer, WebView, withTheme } from '@draftbit/ui';
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
      <WebView
        style={styles.WebView4825887f}
        source={{ uri: `${props.route?.params?.url ?? 'https://google.com'}` }}
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
  WebView4825887f: {
    flex: 1,
    marginTop: -75,
    marginBottom: -80,
  },
});

export default withTheme(CheckoutScreen);
