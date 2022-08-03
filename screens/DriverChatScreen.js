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

const DriverChatScreen = props => {
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
      <View style={styles.Viewt4}>
        <Row justifyContent={'flex-start'} alignItems={'center'}>
          <IconButton
            onPress={() => {
              try {
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles.IconButtonbC}
            icon={'Ionicons/ios-chevron-back'}
            size={32}
          />
          <Text style={[styles.TextYS, { color: theme.colors.strong }]}>
            {'Chat'}
          </Text>
        </Row>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.KeyboardAwareScrollViewm8Content}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={'always'}
        extraScrollHeight={15}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.KeyboardAwareScrollViewrWContent}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps={'never'}
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
                  listKey={'BaJD3l44'}
                  keyExtractor={({ item }) => item?.id || item?.uuid || item}
                  renderItem={({ item }) => {
                    const listData = item;
                    return (
                      <>
                        <>
                          {listData?.isDriver ? null : (
                            <View style={styles.Viewct}>
                              <View
                                style={[
                                  styles.View_9X,
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
                                  styles.TextZb,
                                  { color: theme.colors.medium },
                                ]}
                              >
                                {'User'}
                              </Text>
                            </View>
                          )}
                        </>
                        <>
                          {!listData?.isDriver ? null : (
                            <View style={styles.ViewhY}>
                              <>
                                {isEven(listData?.userId) ? null : (
                                  <View
                                    style={[
                                      styles.ViewGa,
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
                                  styles.Text_9B,
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
                  contentContainerStyle={styles.FlatListBaContent}
                  numColumns={1}
                />
              );
            }}
          </XanoApi.FetchChatGET>
        </KeyboardAwareScrollView>

        <View
          style={[
            styles.Viewo9,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.divider,
              borderRadius: 20,
            },
          ]}
        >
          <View style={styles.ViewuK}>
            <TextInput
              onChangeText={newTextInputValue => {
                try {
                  setTextInputValue(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInputHU,
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
                  isDriver: true,
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
  IconButtonbC: {
    marginLeft: 16,
  },
  TextYS: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
  },
  Viewt4: {
    marginTop: 60,
    marginBottom: 20,
  },
  View_9X: {
    paddingLeft: 12,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  TextZb: {
    fontSize: 12,
  },
  Viewct: {
    alignItems: 'flex-start',
  },
  ViewGa: {
    paddingLeft: 12,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  Text_9B: {
    fontSize: 12,
  },
  ViewhY: {
    alignItems: 'flex-end',
  },
  FlatListBaContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  FetchIN: {
    minHeight: 40,
  },
  KeyboardAwareScrollViewrWContent: {
    paddingLeft: 16,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  TextInputHU: {
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
  ViewuK: {
    flex: 1,
  },
  Viewo9: {
    paddingLeft: 16,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  KeyboardAwareScrollViewm8Content: {
    flex: 1,
  },
});

export default withTheme(DriverChatScreen);
