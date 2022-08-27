import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  CircleImage,
  Icon,
  Row,
  ScreenContainer,
  Spacer,
  Stack,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const HistoryScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={false}
    >
      {/* Header */}
      <View style={styles.Viewf39cc81f}>
        <Row justifyContent={'flex-start'} alignItems={'center'}>
          <Text style={[styles.Textd59ae7c0, { color: theme.colors.strong }]}>
            {'Your History'}
          </Text>
        </Row>
      </View>

      <XanoApi.FetchGetUserOrdersGET
        method={'GET'}
        refetchInterval={30000}
        UID={Constants['user_id']}
      >
        {({ loading, error, data, refetchGetUserOrders }) => {
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
              listKey={'PImaJIqg'}
              keyExtractor={item => item?.id || item?.uuid || item}
              renderItem={({ item }) => {
                const listData = item;
                return (
                  <>
                    <View
                      style={[
                        styles.Viewcabc33e8,
                        {
                          backgroundColor: theme.colors.surface,
                          borderRadius: 8,
                          borderColor: theme.colors.divider,
                        },
                      ]}
                    >
                      <Touchable
                        onPress={() => {
                          try {
                            navigation.navigate('TrackScreen', {
                              orderID: listData?.id,
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View style={styles.View24b1ad64}>
                          <View style={styles.View66d94174} />
                          <View style={styles.View88c44c3e}>
                            <Row
                              justifyContent={'flex-start'}
                              alignItems={'center'}
                            >
                              <CircleImage
                                source={{
                                  uri: `${listData?.userOrder?.storeIcon}`,
                                }}
                                size={60}
                              />
                              <Stack
                                justifyContent={'flex-start'}
                                alignItems={'flex-start'}
                              >
                                <Text
                                  style={[
                                    styles.Textaa9d0917,
                                    { color: theme.colors.strong },
                                  ]}
                                  textBreakStrategy={'highQuality'}
                                  ellipsizeMode={'tail'}
                                  allowFontScaling={true}
                                  numberOfLines={2}
                                >
                                  {listData?.userOrder?.restaurantName}
                                </Text>

                                <Text
                                  style={[
                                    styles.Text16847c01,
                                    { color: theme.colors.strong },
                                  ]}
                                  textBreakStrategy={'highQuality'}
                                  ellipsizeMode={'tail'}
                                  allowFontScaling={true}
                                  numberOfLines={2}
                                >
                                  {'Total: $'}
                                  {listData?.amount_total}
                                </Text>
                              </Stack>
                            </Row>

                            <Stack
                              justifyContent={'flex-start'}
                              alignItems={'flex-end'}
                            >
                              <>
                                {listData?.completed ? null : (
                                  <View
                                    style={[
                                      styles.View617a256a,
                                      {
                                        backgroundColor: theme.colors.primary,
                                        borderBottomLeftRadius: 8,
                                        borderTopLeftRadius: 8,
                                      },
                                    ]}
                                  >
                                    <Text
                                      style={[
                                        styles.Textd40b1daa,
                                        { color: theme.colors.surface },
                                      ]}
                                      allowFontScaling={true}
                                      ellipsizeMode={'tail'}
                                      textBreakStrategy={'highQuality'}
                                    >
                                      {'Active'}
                                    </Text>
                                  </View>
                                )}
                              </>
                              <>
                                {listData?.completed ? null : (
                                  <Icon
                                    style={styles.Icon12a462a2}
                                    name={'Ionicons/ios-chevron-forward'}
                                    size={24}
                                    color={theme.colors.primary}
                                  />
                                )}
                              </>
                            </Stack>
                          </View>
                        </View>
                      </Touchable>
                    </View>
                    <Spacer top={6} right={8} bottom={6} left={8} />
                  </>
                );
              }}
              contentContainerStyle={styles.FlatList8db74792Content}
            />
          );
        }}
      </XanoApi.FetchGetUserOrdersGET>
      <ScrollView showsVerticalScrollIndicator={true} bounces={true} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
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
  View66d94174: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  Textaa9d0917: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    marginLeft: 16,
  },
  Text16847c01: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    marginLeft: 16,
  },
  Textd40b1daa: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  View617a256a: {
    paddingLeft: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    right: 0,
    height: 30,
  },
  Icon12a462a2: {
    marginTop: 10,
    marginRight: 8,
  },
  View88c44c3e: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  View24b1ad64: {
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  Viewcabc33e8: {
    overflow: 'hidden',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  FlatList8db74792Content: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
});

export default withTheme(HistoryScreen);
