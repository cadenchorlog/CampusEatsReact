import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  ButtonSolid,
  Divider,
  Link,
  ScreenContainer,
  Spacer,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const myFunctionName = response => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules
    console.log(JSON.stringify(response));
  };

  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      if (!Constants['auth_header']) {
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  return (
    <ScreenContainer hasTopSafeArea={true}>
      <Image
        style={styles.Image68ea8a71}
        source={{
          uri: 'https://images.pexels.com/photos/54539/pexels-photo-54539.jpeg?auto=compress&cs=tinysrgb&w=600',
        }}
        resizeMode={'cover'}
      />
      <View
        style={[
          styles.Viewb8b014cc,
          {
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        ]}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.KeyboardAwareScrollView6a955cc3Content}
        >
          <View style={styles.View39912261}>
            <Divider
              style={styles.Divider259a88df}
              color={theme.colors.divider}
            />
            <Text style={styles.Textf8b291a4}>
              {'Sign In to\nCampus Eats.'}
            </Text>
          </View>

          <View style={styles.View1e98c651}>
            <TextInput
              onChangeText={newEmailInputValue => {
                try {
                  setEmailValue(newEmailInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInputa6e0f828,
                { borderColor: theme.colors.divider },
              ]}
              value={emailValue}
              placeholder={'Email'}
              keyboardType={'email-address'}
              textContentType={'emailAddress'}
              autoCapitalize={'none'}
            />
            <Spacer top={12} right={8} bottom={12} left={8} />
            <TextInput
              onChangeText={newPasswordInputValue => {
                try {
                  setPasswordValue(newPasswordInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInput34ffd2e4,
                { borderColor: theme.colors.divider },
              ]}
              value={passwordValue}
              placeholder={'Password'}
              secureTextEntry={true}
            />
            <Spacer top={24} right={8} bottom={24} left={8} />
            <>
              {Constants['is_loading'] ? null : (
                <ButtonSolid
                  onPress={async () => {
                    try {
                      setGlobalVariableValue({
                        key: 'is_loading',
                        value: true,
                      });
                      const response = await XanoApi.loginPOST(Constants, {
                        email: emailValue,
                        password: passwordValue,
                      });
                      const authToken = response.authToken;
                      const message = response.message;
                      setGlobalVariableValue({
                        key: 'error_message',
                        value: message,
                      });
                      setGlobalVariableValue({
                        key: 'is_loading',
                        value: false,
                      });
                      if (!authToken) {
                        return;
                      }
                      const id = response.id;
                      const name = response.name;
                      const email = response.email;
                      setGlobalVariableValue({
                        key: 'auth_header',
                        value: 'Bearer ' + authToken,
                      });
                      setGlobalVariableValue({
                        key: 'user_id',
                        value: id,
                      });
                      setGlobalVariableValue({
                        key: 'user_name',
                        value: name,
                      });
                      setGlobalVariableValue({
                        key: 'user_email',
                        value: email,
                      });
                      setEmailValue('');
                      setPasswordValue('');
                      setGlobalVariableValue({
                        key: 'error_message',
                        value: '',
                      });
                      navigation.navigate('BottomTabNavigator', {
                        screen: 'MapScreen',
                      });
                      const latitude = response.addressLat;
                      const longitude = response.addressLong;
                      setGlobalVariableValue({
                        key: 'delivLat',
                        value: latitude,
                      });
                      setGlobalVariableValue({
                        key: 'delivLong',
                        value: longitude,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={[
                    styles.ButtonSolid8a5c1755,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.primary,
                      color: theme.colors.primary,
                    },
                  ]}
                  title={'Sign in'}
                />
              )}
            </>
            <>
              {!Constants['is_loading'] ? null : (
                <ButtonSolid
                  style={[
                    styles.ButtonSolidfe5f3af3,
                    { backgroundColor: theme.colors.primary },
                  ]}
                  title={''}
                  disabled={true}
                  loading={true}
                />
              )}
            </>
            <Spacer top={16} right={8} bottom={16} left={8} />
            <View style={styles.View8bb6a2bc}>
              <Text>{'New User?'}</Text>
              <Spacer top={8} right={2} bottom={8} left={2} />
              <Link
                style={{ color: theme.colors.primary }}
                title={'Sign up!'}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Image68ea8a71: {
    width: '100%',
    height: '40%',
  },
  Divider259a88df: {
    height: 24,
  },
  Textf8b291a4: {
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'System',
    fontWeight: '600',
  },
  View39912261: {
    alignItems: 'center',
  },
  Text6789b8ec: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  TextInputa6e0f828: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '400',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    textTransform: 'lowercase',
  },
  TextInput34ffd2e4: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '400',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  ButtonSolid8a5c1755: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  ButtonSolidfe5f3af3: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  View8bb6a2bc: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'center',
  },
  View1e98c651: {
    paddingLeft: 36,
    paddingRight: 36,
    marginTop: 24,
  },
  KeyboardAwareScrollView6a955cc3Content: {
    justifyContent: 'center',
  },
  Viewb8b014cc: {
    marginTop: '-5%',
  },
});

export default withTheme(LoginScreen);
