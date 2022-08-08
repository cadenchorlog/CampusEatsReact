import React from 'react';
import {
  ButtonOutline,
  ButtonSolid,
  ScreenContainer,
  Stack,
  withTheme,
} from '@draftbit/ui';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

const SimpleWelcomeScreen = props => {
  const { theme } = props;
  const { navigation } = props;

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.strong }}
      scrollable={false}
      hasSafeArea={false}
    >
      <ImageBackground
        style={styles.ImageBackground587a5f31}
        source={{
          uri: 'https://images.pexels.com/photos/3043114/pexels-photo-3043114.jpeg?auto=compress&cs=tinysrgb&w=600',
        }}
        resizeMode={'cover'}
      >
        <View style={styles.View2b14edd0}>
          <Image
            style={styles.Imagee65b0c4c}
            source={{
              uri: 'https://assets.stickpng.com/images/584290baa6515b1e0ad75ac2.png',
            }}
            resizeMode={'cover'}
          />
          <Stack justifyContent={'flex-start'} alignItems={'flex-start'}>
            <Text
              style={[
                styles.Text5816c588,
                { color: theme.colors.strongInverse },
              ]}
            >
              {'Welcome to Campus Eats!'}
            </Text>

            <Text
              style={[
                styles.Textd37fce74,
                { color: theme.colors.strongInverse },
              ]}
            >
              {'Lets get started.'}
            </Text>
          </Stack>
        </View>

        <View>
          <ButtonSolid
            style={[
              styles.ButtonSolidb9306319,
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
              styles.ButtonOutlinee49837d0,
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
  Imagee65b0c4c: {
    width: 250,
    height: 250,
  },
  Text5816c588: {
    textAlign: 'left',
    fontSize: 36,
    fontFamily: 'System',
    fontWeight: '700',
    marginBottom: 8,
  },
  Textd37fce74: {
    textAlign: 'left',
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 16,
  },
  View2b14edd0: {
    marginLeft: '15%',
    marginRight: '15%',
    justifyContent: 'space-around',
    height: '75%',
    paddingBottom: '50%',
  },
  ButtonSolidb9306319: {
    borderRadius: 64,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
  },
  ButtonOutlinee49837d0: {
    borderRadius: 64,
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    marginTop: 16,
  },
  ImageBackground587a5f31: {
    height: '100%',
    justifyContent: 'space-around',
    paddingLeft: 16,
    paddingRight: 16,
    opacity: 0.75,
  },
});

export default withTheme(SimpleWelcomeScreen);
