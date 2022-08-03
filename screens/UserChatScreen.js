import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  IconButton,
  Row,
  ScreenContainer,
  Spacer,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const UserChatScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const isEven = value => {
    return value % 2 === 0;
  };

  const { theme } = props;
  const { navigation } = props;

  const addChatPOST = XanoApi.useAddChatPOST();

  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.divider }}
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={false}
    >
      <View style={styles.Viewwo}>
        <Row justifyContent={'flex-start'} alignItems={'center'}>
          <IconButton
            onPress={() => {
              try {
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles.IconButtonp3}
            icon={'Ionicons/ios-chevron-back'}
            size={32}
          />
          <Text style={[styles.TextAX, { color: theme.colors.strong }]}>
            {'Chat'}
          </Text>
        </Row>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.KeyboardAwareScrollView_6iContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={'always'}
        extraScrollHeight={15}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.KeyboardAwareScrollViewa6Content}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps={'never'}
          enableAutomaticScroll={true}
        >
          <XanoApi.FetchChatGET
            refetchInterval={1000}
            session_id={props.route?.params?.orderID ?? 67}
          >
            {({ loading, error, data, refetchChat }) => {
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
                  listKey={'DZF5G2dy'}
                  keyExtractor={({ item }) => item?.id || item?.uuid || item}
                  renderItem={({ item }) => {
                    const listData = item;
                    return (
                      <>
                        <>
                          {!listData?.isDriver ? null : (
                            <View style={styles.ViewK1}>
                              <View
                                style={[
                                  styles.View_6e,
                                  {
                                    backgroundColor: theme.colors.surface,
                                    borderRadius: 12,
                                  },
                                ]}
                              >
                                <Text style={{ color: theme.colors.strong }}>
                                  {listData?.message}
                                </Text>
                              </View>

                              <Text
                                style={[
                                  styles.TextA2,
                                  { color: theme.colors.medium },
                                ]}
                              >
                                {'Courier'}
                              </Text>
                            </View>
                          )}
                        </>
                        <>
                          {listData?.isDriver ? null : (
                            <View style={styles.Viewt8}>
                              <>
                                {isEven(listData?.userId) ? null : (
                                  <View
                                    style={[
                                      styles.View_88,
                                      {
                                        backgroundColor: theme.colors.primary,
                                        borderRadius: 12,
                                      },
                                    ]}
                                  >
                                    <Text
                                      style={{ color: theme.colors.surface }}
                                    >
                                      {listData?.message}
                                    </Text>
                                  </View>
                                )}
                              </>
                              <Text
                                style={[
                                  styles.Text_8q,
                                  { color: theme.colors.medium },
                                ]}
                              >
                                {'Me'}
                              </Text>
                            </View>
                          )}
                        </>
                        <Spacer top={8} right={8} bottom={8} left={8} />
                      </>
                    );
                  }}
                  contentContainerStyle={styles.FlatListDZContent}
                  numColumns={1}
                />
              );
            }}
          </XanoApi.FetchChatGET>
        </KeyboardAwareScrollView>

        <View
          style={[
            styles.Viewl8,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.divider,
              borderRadius: 20,
            },
          ]}
        >
          <View style={styles.ViewJI}>
            <TextInput
              onChangeText={newTextInputValue => {
                try {
                  setTextInputValue(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInputa3,
                { borderColor: theme.colors.divider },
              ]}
              value={textInputValue}
              placeholder={'Enter a value...'}
            />
          </View>
          <Spacer top={8} right={8} bottom={8} left={8} />
          <IconButton
            onPress={async () => {
              try {
                await addChatPOST.mutateAsync({
                  isDriver: false,
                  message: textInputValue,
                  session: props.route?.params?.orderID ?? 67,
                });
                setTextInputValue(' ');
              } catch (err) {
                console.error(err);
              }
            }}
            icon={'Ionicons/md-send'}
            size={32}
          />
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  IconButtonp3: {
    marginLeft: 16,
  },
  TextAX: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
  },
  Viewwo: {
    marginTop: 60,
    marginBottom: 20,
  },
  View_6e: {
    paddingLeft: 12,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  TextA2: {
    fontSize: 12,
  },
  ViewK1: {
    alignItems: 'flex-start',
  },
  View_88: {
    paddingLeft: 12,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  Text_8q: {
    fontSize: 12,
  },
  Viewt8: {
    alignItems: 'flex-end',
  },
  FlatListDZContent: {
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: 16,
    marginLeft: 16,
  },
  Fetchbv: {
    minHeight: 40,
  },
  KeyboardAwareScrollViewa6Content: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  TextInputa3: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 8,
  },
  ViewJI: {
    flex: 1,
  },
  Viewl8: {
    paddingLeft: 16,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  KeyboardAwareScrollView_6iContent: {
    flex: 1,
  },
});

export default withTheme(UserChatScreen);
