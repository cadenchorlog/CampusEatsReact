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
        contentContainerStyle={styles.KeyboardAwareScrollViewaIContent}
      >
        <View style={styles.Viewyg}>
          <Divider style={styles.Divideray} color={theme.colors.divider} />
          <Text style={styles.TextIb}>{'Welcome to Campus Eats!'}</Text>

          <Text style={styles.Textr3}>
            {'Sign in to your account to continue'}
          </Text>
        </View>

        <View style={styles.View_1J}>
          <>
            {!Constants['error_message'] ? null : (
              <Text style={[styles.Text_5K, { color: theme.colors.error }]}>
                {Constants['error_message']}
              </Text>
            )}
          </>
          <TextInput
            onChangeText={newNameInputValue => {
              try {
                setNameValue(newNameInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={[styles.TextInput_0x, { borderColor: theme.colors.divider }]}
            placeholder={'Your Name '}
            value={nameValue}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
            autoCapitalize={'none'}
          />
          <Spacer top={12} right={8} bottom={12} left={8} />
          <TextInput
            onChangeText={newEmailInputValue => {
              try {
                setEmailValue(newEmailInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={[styles.TextInputqJ, { borderColor: theme.colors.divider }]}
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
            style={[styles.TextInpute4, { borderColor: theme.colors.divider }]}
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
                    navigation.navigate('BottomTabNavigator', {
                      screen: 'MapScreen',
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.ButtonSolidIH,
                  { backgroundColor: theme.colors.primary },
                ]}
                title={'Sign up'}
              />
            )}
          </>
          <>
            {!Constants['is_loading'] ? null : (
              <ButtonSolid
                style={[
                  styles.ButtonSolidrr,
                  { backgroundColor: theme.colors.primary },
                ]}
                title={''}
                disabled={true}
                loading={true}
              />
            )}
          </>
          <Spacer top={16} right={8} bottom={16} left={8} />
          <View style={styles.Viewi6}>
            <Text>{'Already have an account?'}</Text>
            <Spacer top={8} right={2} bottom={8} left={2} />
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
  Divideray: {
    height: 120,
  },
  TextIb: {
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'System',
    fontWeight: '600',
    paddingLeft: 40,
    paddingRight: 40,
  },
  Textr3: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 14,
    marginTop: 4,
  },
  Viewyg: {
    alignItems: 'center',
  },
  Text_5K: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  TextInput_0x: {
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
  TextInputqJ: {
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
  TextInpute4: {
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
  ButtonSolidIH: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  ButtonSolidrr: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  Viewi6: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'center',
  },
  View_1J: {
    paddingLeft: 36,
    paddingRight: 36,
    marginTop: 24,
  },
  KeyboardAwareScrollViewaIContent: {
    justifyContent: 'center',
  },
});

export default withTheme(SignUpScreen);
