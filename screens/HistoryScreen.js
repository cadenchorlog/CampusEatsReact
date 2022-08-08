import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  Divider,
  Icon,
  Row,
  ScreenContainer,
  Spacer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
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
              keyExtractor={({ item }) => item?.id || item?.uuid || item}
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
                        <View style={styles.Viewd42e9bbc}>
                          <ImageBackground
                            style={[
                              styles.ImageBackground69e94ca6,
                              { borderRadius: theme.roundness },
                            ]}
                            resizeMode={'cover'}
                            source={{
                              uri: `${listData?.userOrder?.restaurantImage}`,
                            }}
                          >
                            <View style={styles.View272ee112}>
                              <>
                                {listData?.completed ? null : (
                                  <View
                                    style={[
                                      styles.View422f6f32,
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
                            </View>
                          </ImageBackground>
                        </View>

                        <View style={styles.View8db74792}>
                          <View>
                            <Text
                              style={[
                                styles.Text99b56fe5,
                                { color: theme.colors.strong },
                              ]}
                              textBreakStrategy={'highQuality'}
                              ellipsizeMode={'tail'}
                              allowFontScaling={true}
                              numberOfLines={2}
                            >
                              {listData?.userOrder?.restaurantName}
                            </Text>
                            <Spacer top={4} right={8} bottom={4} left={8} />
                            <Divider
                              style={styles.Divider22627dc6}
                              color={theme.colors.divider}
                            />
                            <View style={styles.Viewce4accf0}>
                              <View style={styles.View7d6a39b7}>
                                <Icon
                                  name={'FontAwesome/dollar'}
                                  size={24}
                                  color={theme.colors.primary}
                                />
                                <Spacer right={2} left={2} />
                                <Text
                                  style={[
                                    styles.Textde21574d,
                                    { color: theme.colors.medium },
                                  ]}
                                >
                                  {listData?.amount_total}
                                </Text>
                              </View>
                              <Spacer top={8} right={8} bottom={8} left={8} />
                              <Spacer top={8} right={8} bottom={8} left={8} />
                            </View>
                          </View>
                        </View>
                      </Touchable>
                    </View>
                    <Spacer top={12} right={8} bottom={12} left={8} />
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
  Textd40b1daa: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  View422f6f32: {
    paddingLeft: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  View272ee112: {
    alignItems: 'flex-end',
    marginTop: 16,
  },
  ImageBackground69e94ca6: {
    width: '100%',
    height: '100%',
  },
  Viewd42e9bbc: {
    height: 180,
  },
  Text99b56fe5: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
  },
  Divider22627dc6: {
    height: 1,
    marginTop: 12,
    marginBottom: 12,
  },
  Textde21574d: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  View7d6a39b7: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Viewce4accf0: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  View8db74792: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
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
