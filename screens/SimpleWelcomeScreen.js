import React from 'react';
import Images from '../config/Images';
import {
  ButtonOutline,
  ButtonSolid,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

const SimpleWelcomeScreen = props => {
  const { theme } = props;
  const { navigation } = props;

  return (
    <ScreenContainer scrollable={false} hasSafeArea={false}>
      <ImageBackground
        style={styles.ImageBackgrounda6}
        source={Images.Sky}
        resizeMode={'cover'}
      >
        <View>
          <Text style={[styles.TextJd, { color: theme.colors.strongInverse }]}>
            {'Welcome'}
          </Text>

          <Text style={[styles.TextmE, { color: theme.colors.strongInverse }]}>
            {'Lets get started.'}
          </Text>
        </View>
        <View />
        <View>
          <ButtonSolid
            style={[
              styles.ButtonSolid_0o,
              { backgroundColor: theme.colors.primary },
            ]}
            title={'Sign Up'}
          />
          <ButtonOutline
            onPress={() => {
              try {
                navigation.navigate('LoginScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            style={[
              styles.ButtonOutlineZo,
              {
                borderColor: theme.colors.lightInverse,
                color: theme.colors.strongInverse,
              },
            ]}
            title={'Log In'}
          />
        </View>
      </ImageBackground>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  TextJd: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'System',
    fontWeight: '700',
    marginBottom: 8,
  },
  TextmE: {
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 16,
  },
  ButtonSolid_0o: {
    borderRadius: 64,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
  },
  ButtonOutlineZo: {
    borderRadius: 64,
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    marginTop: 16,
  },
  ImageBackgrounda6: {
    height: '100%',
    justifyContent: 'space-around',
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default withTheme(SimpleWelcomeScreen);
