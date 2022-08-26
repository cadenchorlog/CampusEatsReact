import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
import {
  ButtonSolid,
  FieldSearchBarFull,
  Icon,
  IconButton,
  Row,
  ScreenContainer,
  Spacer,
  Surface,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const LinkCampusScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const checkSearch = searchField => {
    if (typeof searchField === 'string' && searchField.trim().length === 0) {
      console.log('string is empty');
      return false;
    } else {
      console.log('string is NOT empty');
      refetchGetCampusList();
      return true;
    } // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'onCampusLink',
        value: true,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [campusID, setCampusID] = React.useState(0);
  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [loginModal, setLoginModal] = React.useState(false);
  const [next, setNext] = React.useState(false);
  const [searchBarValue, setSearchBarValue] = React.useState(' ');
  const [studentIDInputValue, setStudentIDInputValue] = React.useState('');
  const [verify, setVerify] = React.useState(true);
  const [verifyLoading, setVerifyLoading] = React.useState(false);

  return (
    <ScreenContainer
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
      hasBottomSafeArea={false}
    >
      {/* Featured Static Frame */}
      <View style={styles.View33be2a49}>
        {/* Text Frame  */}
        <View style={styles.View92136ac9}>
          {/* Heading 18 24 Bold */}
          <Text
            style={[
              styles.Text354e478f,
              { color: theme.colors.studilyMediumUI },
            ]}
          >
            {'Link Campus'}
          </Text>
        </View>
        {/* Text Frame  */}
        <View style={styles.Viewa2426c22}>
          {/* Heading 18 24 Bold */}
          <Text
            style={[
              styles.Text8e74075a,
              { color: theme.colors.studilyMediumUI },
            ]}
          >
            {
              'Campus Eats needs to connect to your school in order to offer the best deals and on campus offerings.'
            }
          </Text>
        </View>
      </View>
      {/* Search Frame */}
      <View style={styles.View300032e0}>
        {/* Search Bar Flex */}
        <View
          style={[
            styles.Viewc58193b4,
            {
              backgroundColor: theme.colors.divider,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
            },
          ]}
        >
          <FieldSearchBarFull
            onChange={newSearchBarValue => {
              const handler = async () => {
                try {
                  setSearchBarValue(newSearchBarValue);
                  const result = checkSearch(newSearchBarValue);
                  if (result) {
                    return;
                  }
                  setSearchBarValue(' ');
                  await refetchGetCampusList();
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            value={searchBarValue}
            placeholder={'Search'}
          />
        </View>
        {/* Right Side Frame */}
        <View
          style={[
            styles.Viewf6d9c156,
            {
              backgroundColor: theme.colors.divider,
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
            },
          ]}
        >
          {/* Touchable Frame */}
          <View>
            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    await refetchGetCampusList();
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              {/* Rectangle Search BG */}
              <View
                style={[
                  styles.View7d9aef08,
                  { backgroundColor: theme.colors.primary, borderRadius: 6 },
                ]}
              >
                {/* Icon  */}
                <Icon
                  name={'AntDesign/search1'}
                  size={18}
                  color={theme.colors.studilyWhite3}
                />
              </View>
            </Touchable>
          </View>
        </View>
      </View>

      <View style={styles.Viewdde20612}>
        <XanoApi.FetchGetCampusListGET searchTerm={searchBarValue}>
          {({ loading, error, data, refetchGetCampusList }) => {
            const fetchData = data;
            if (!fetchData || loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return (
                <Text style={{ textAlign: 'center' }}>
                  There was a problem fetching this data
                </Text>
              );
            }

            return (
              <FlatList
                data={fetchData}
                listKey={'RPkMeOhq'}
                keyExtractor={item => item?.id || item?.uuid || item}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <Touchable
                      onPress={() => {
                        try {
                          setLoginModal(true);
                          setCampusID(listData?.id);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <View
                        style={[
                          styles.View97b82255,
                          {
                            backgroundColor: theme.colors.strong,
                            borderRadius: 8,
                          },
                        ]}
                      >
                        <ImageBackground
                          style={[
                            styles.ImageBackground2c2160f4,
                            { borderRadius: theme.roundness },
                          ]}
                          resizeMode={'cover'}
                          source={{ uri: `${listData?.campusImage}` }}
                        >
                          <Surface
                            style={[
                              styles.Surface32124a57,
                              {
                                borderBottomRightRadius: 8,
                                backgroundColor: theme.colors.primary,
                              },
                            ]}
                          >
                            <Row
                              justifyContent={'space-between'}
                              alignItems={'center'}
                            >
                              <View style={styles.Viewd42f7b63}>
                                <Text
                                  style={[
                                    styles.Textef390972,
                                    { color: theme.colors.mediumInverse },
                                  ]}
                                  textBreakStrategy={'highQuality'}
                                  ellipsizeMode={'tail'}
                                  allowFontScaling={true}
                                  numberOfLines={2}
                                >
                                  {listData?.campusName}
                                </Text>
                              </View>
                            </Row>
                          </Surface>
                        </ImageBackground>
                      </View>
                    </Touchable>
                  );
                }}
                style={styles.FlatListdf29e2e2}
                numColumns={1}
                horizontal={false}
              />
            );
          }}
        </XanoApi.FetchGetCampusListGET>
      </View>
      {/* campusLogin */}
      <Modal
        visible={loginModal}
        animationType={'slide'}
        presentationStyle={'pageSheet'}
        transparent={false}
      >
        {/* Header */}
        <View style={styles.View7a993fb0}>
          <Row justifyContent={'flex-start'} alignItems={'center'}>
            <IconButton
              onPress={() => {
                try {
                  setLoginModal(false);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles.IconButton897c6051}
              icon={'Ionicons/ios-chevron-back'}
              size={32}
            />
            <Text style={[styles.Textd59ae7c0, { color: theme.colors.strong }]}>
              {'Verify Enrollment'}
            </Text>
          </Row>
        </View>
        {/* Login Form */}
        <View style={styles.View4f2fa389}>
          {/* Error Message */}
          <Text style={[styles.Text6789b8ec, { color: theme.colors.error }]}>
            {null}
          </Text>
          {/* Email Input */}
          <TextInput
            onChangeText={newEmailInputValue => {
              try {
                setStudentIDInputValue(newEmailInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={[
              styles.TextInputa4869d83,
              { borderColor: theme.colors.divider },
            ]}
            placeholder={'student ID'}
            value={studentIDInputValue}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
            autoCapitalize={'none'}
          />
          <Spacer top={12} right={8} bottom={12} left={8} />
          {/* Email Input */}
          <TextInput
            onChangeText={newEmailInputValue => {
              try {
                setEmailInputValue(newEmailInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={[
              styles.TextInput34ffd2e4,
              { borderColor: theme.colors.divider },
            ]}
            placeholder={'Student Email'}
            value={emailInputValue}
            secureTextEntry={false}
            textContentType={'emailAddress'}
          />
          <Spacer top={24} right={8} bottom={24} left={8} />
          {/* verifyButton */}
          <>
            {!verify ? null : (
              <ButtonSolid
                onPress={() => {
                  const handler = async () => {
                    try {
                      setVerify(false);
                      const verifyResult =
                        await XanoApi.verifyStudentEnrollmentPOST(Constants, {
                          UID: Constants['user_id'],
                          campusID: campusID,
                          studentEmail: emailInputValue,
                          studentID: studentIDInputValue,
                        });
                      const verifyBool = verifyResult.response.result;
                      setNext(true);
                      if (verifyBool) {
                        return;
                      }
                      Utils.showAlert({
                        title: 'Verification Failed',
                        message: 'This could be from a type-o.',
                        buttonText: 'Ok',
                      });
                      setVerifyLoading(false);
                      setVerify(true);
                      setNext(false);
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
                title={'Verify'}
              />
            )}
          </>
          {/* verifyLoading */}
          <>
            {!verifyLoading ? null : (
              <ButtonSolid
                style={[
                  styles.ButtonSolidfe5f3af3,
                  { backgroundColor: theme.colors.primary },
                ]}
                title={'Verify'}
                loading={true}
              />
            )}
          </>
          {/* next */}
          <>
            {!next ? null : (
              <ButtonSolid
                onPress={() => {
                  try {
                    navigation.navigate('BottomTabNavigator', {
                      screen: 'OrderScreen',
                    });
                    setLoginModal(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.ButtonSolidfe5f3af3,
                  { backgroundColor: theme.colors.primary },
                ]}
                title={'Complete'}
              />
            )}
          </>
          <Spacer top={16} right={8} bottom={16} left={8} />
        </View>
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Text354e478f: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
  },
  View92136ac9: {
    paddingTop: 12,
    paddingLeft: 30,
    paddingBottom: 12,
    paddingRight: 30,
    flexGrow: 0,
    flexShrink: 0,
  },
  Text8e74075a: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  Viewa2426c22: {
    paddingTop: 12,
    paddingLeft: 30,
    paddingRight: 30,
    flexGrow: 0,
    flexShrink: 0,
  },
  View33be2a49: {
    paddingTop: 30,
  },
  Viewc58193b4: {
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    flexGrow: 1,
    flexShrink: 0,
  },
  View7d9aef08: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingBottom: 12,
    paddingRight: 12,
    marginRight: 12,
  },
  Viewf6d9c156: {
    paddingTop: 6,
    paddingBottom: 6,
  },
  View300032e0: {
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 12,
  },
  Textef390972: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
  },
  Viewd42f7b63: {
    paddingLeft: 16,
    justifyContent: 'center',
    marginTop: 2,
  },
  Surface32124a57: {
    minHeight: 40,
    width: '75%',
  },
  ImageBackground2c2160f4: {
    width: '100%',
    height: '100%',
    opacity: 1,
  },
  View97b82255: {
    height: 110,
    overflow: 'hidden',
    marginBottom: 8,
    justifyContent: 'flex-end',
    width: '100%',
  },
  FlatListdf29e2e2: {
    width: '100%',
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  Viewdde20612: {
    marginTop: 24,
    width: '100%',
    minWidth: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  IconButton897c6051: {
    marginLeft: 16,
  },
  Textd59ae7c0: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
  },
  View7a993fb0: {
    marginTop: 20,
    marginBottom: 20,
  },
  Text6789b8ec: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  TextInputa4869d83: {
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
  View4f2fa389: {
    paddingLeft: 36,
    paddingRight: 36,
  },
  screen: {
    alignItems: 'center',
  },
});

export default withTheme(LinkCampusScreen);
