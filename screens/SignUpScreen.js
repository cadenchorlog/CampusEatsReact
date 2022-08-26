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
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUpScreen = props => {
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
  const [nameValue, setNameValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  return (
    <ScreenContainer hasTopSafeArea={true}>
      <KeyboardAwareScrollView
        enableAutomaticScroll={true}
        extraScrollHeight={110}
        enableResetScrollToCoords={false}
      >
        {/* Header */}
        <View style={styles.Viewb4f9b01d}>
          <Divider
            style={styles.Divider4d5c264b}
            color={theme.colors.divider}
          />
          {/* Title */}
          <Text style={styles.Textdd83da03}>{'Welcome to Campus Eats!'}</Text>
          {/* Subtitle */}
          <Text style={styles.Textf51af5e8}>
            {'Sign in to your account to continue'}
          </Text>
        </View>
        {/* Login Form */}
        <View style={styles.View1e98c651}>
          {/* Error Message */}
          <>
            {!Constants['error_message'] ? null : (
              <Text
                style={[styles.Text6789b8ec, { color: theme.colors.error }]}
              >
                {Constants['error_message']}
              </Text>
            )}
          </>
          {/* Name Input */}
          <TextInput
            onChangeText={newNameInputValue => {
              try {
                setNameValue(newNameInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={[
              styles.TextInput1ffae2f5,
              { borderColor: theme.colors.divider },
            ]}
            placeholder={'Your Name '}
            value={nameValue}
            keyboardType={'default'}
            textContentType={'none'}
            autoCapitalize={'words'}
          />
          <Spacer top={12} right={8} bottom={12} left={8} />
          {/* Email Input */}
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
          {/* Password Input */}
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
          {/* Sign In Button */}
          <>
            {Constants['is_loading'] ? null : (
              <ButtonSolid
                onPress={() => {
                  const handler = async () => {
                    try {
                      setGlobalVariableValue({
                        key: 'is_loading',
                        value: true,
                      });
                      const test = await XanoApi.signUpPOST(Constants, {
                        email: emailValue,
                        name: nameValue,
                        password: passwordValue,
                      });
                      if (!test) {
                        return;
                      }
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
                      navigation.navigate('AddressOnSignUpScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={[
                  styles.ButtonSolidfe5f3af3,
                  { backgroundColor: theme.colors.primary },
                ]}
                title={'Sign up'}
              />
            )}
          </>
          {/* Sign In Button Loading */}
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
            <Text>{'Already have an account?'}</Text>
            <Spacer top={8} right={2} bottom={8} left={2} />
            {/* Sign Up Link */}
            <Link
              onPress={() => {
                try {
                  navigation.navigate('LoginScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={{ color: theme.colors.primary }}
              title={'Sign in!'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Divider4d5c264b: {
    height: 20,
  },
  Textdd83da03: {
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'System',
    fontWeight: '600',
    paddingLeft: 40,
    paddingRight: 40,
  },
  Textf51af5e8: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 14,
    marginTop: 4,
  },
  Viewb4f9b01d: {
    alignItems: 'center',
    marginTop: 40,
  },
  Text6789b8ec: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  TextInput1ffae2f5: {
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
    textTransform: 'none',
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
});

export default withTheme(SignUpScreen);
