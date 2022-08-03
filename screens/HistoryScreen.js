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
      <View style={styles.View_3F}>
        <Row justifyContent={'flex-start'} alignItems={'center'}>
          <Text style={[styles.TextFg, { color: theme.colors.strong }]}>
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
                        styles.ViewEV,
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
                        <View style={styles.Viewnc}>
                          <ImageBackground
                            style={[
                              styles.ImageBackgroundxC,
                              { borderRadius: theme.roundness },
                            ]}
                            resizeMode={'cover'}
                            source={{
                              uri: `${listData?.userOrder?.restaurantImage}`,
                            }}
                          >
                            <View style={styles.ViewsA}>
                              <>
                                {listData?.completed ? null : (
                                  <View
                                    style={[
                                      styles.ViewZB,
                                      {
                                        backgroundColor: theme.colors.primary,
                                        borderBottomLeftRadius: 8,
                                        borderTopLeftRadius: 8,
                                      },
                                    ]}
                                  >
                                    <Text
                                      style={[
                                        styles.Textti,
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

                        <View style={styles.Viewvr}>
                          <View>
                            <Text
                              style={[
                                styles.TextwY,
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
                              style={styles.DividerfQ}
                              color={theme.colors.divider}
                            />
                            <View style={styles.View_7b}>
                              <View style={styles.ViewCb}>
                                <Icon
                                  name={'FontAwesome/dollar'}
                                  size={24}
                                  color={theme.colors.primary}
                                />
                                <Spacer right={2} left={2} />
                                <Text
                                  style={[
                                    styles.Text_47,
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
              contentContainerStyle={styles.FlatListPIContent}
            />
          );
        }}
      </XanoApi.FetchGetUserOrdersGET>
      <ScrollView showsVerticalScrollIndicator={true} bounces={true} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  TextFg: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
  },
  View_3F: {
    marginTop: 60,
    marginBottom: 20,
  },
  Textti: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  ViewZB: {
    paddingLeft: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewsA: {
    alignItems: 'flex-end',
    marginTop: 16,
  },
  ImageBackgroundxC: {
    width: '100%',
    height: '100%',
  },
  Viewnc: {
    height: 180,
  },
  TextwY: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
  },
  DividerfQ: {
    height: 1,
    marginTop: 12,
    marginBottom: 12,
  },
  Text_47: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  ViewCb: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  View_7b: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  Viewvr: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  ViewEV: {
    overflow: 'hidden',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  FlatListPIContent: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
});

export default withTheme(HistoryScreen);
