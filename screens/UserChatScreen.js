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
      <View style={styles.Viewf39cc81f}>
        <Row justifyContent={'flex-start'} alignItems={'center'}>
          <IconButton
            onPress={() => {
              try {
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles.IconButton897c6051}
            icon={'Ionicons/ios-chevron-back'}
            size={32}
          />
          <Text style={[styles.Textd59ae7c0, { color: theme.colors.strong }]}>
            {'Chat'}
          </Text>
        </Row>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.KeyboardAwareScrollViewc992f941Content}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={'always'}
        extraScrollHeight={15}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.KeyboardAwareScrollView21525df2Content}
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
                            <View style={styles.View4a298bf0}>
                              <View
                                style={[
                                  styles.View16da829b,
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
                                  styles.Text3e6b6036,
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
                            <View style={styles.Viewc65acab6}>
                              <>
                                {isEven(listData?.userId) ? null : (
                                  <View
                                    style={[
                                      styles.View5ca3917e,
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
                                  styles.Text3e6b6036,
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
                  contentContainerStyle={styles.FlatList9a8ba39cContent}
                  numColumns={1}
                />
              );
            }}
          </XanoApi.FetchChatGET>
        </KeyboardAwareScrollView>

        <View
          style={[
            styles.View99839e42,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.divider,
              borderRadius: 20,
            },
          ]}
        >
          <View style={styles.Viewc992f941}>
            <TextInput
              onChangeText={newTextInputValue => {
                try {
                  setTextInputValue(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInput5476f367,
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
  IconButton897c6051: {
    marginLeft: 16,
  },
  Textd59ae7c0: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
  },
  Viewf39cc81f: {
    marginTop: 60,
    marginBottom: 20,
  },
  View16da829b: {
    paddingLeft: 12,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  Text3e6b6036: {
    fontSize: 12,
  },
  View4a298bf0: {
    alignItems: 'flex-start',
  },
  View5ca3917e: {
    paddingLeft: 12,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  Viewc65acab6: {
    alignItems: 'flex-end',
  },
  FlatList9a8ba39cContent: {
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: 16,
    marginLeft: 16,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  KeyboardAwareScrollView21525df2Content: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  TextInput5476f367: {
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
  Viewc992f941: {
    flex: 1,
  },
  View99839e42: {
    paddingLeft: 16,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  KeyboardAwareScrollViewc992f941Content: {
    flex: 1,
  },
});

export default withTheme(UserChatScreen);
