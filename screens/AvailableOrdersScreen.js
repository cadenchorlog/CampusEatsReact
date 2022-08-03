import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
import {
  ButtonSolid,
  Divider,
  Icon,
  Row,
  ScreenContainer,
  Spacer,
  Surface,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const AvailableOrdersScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const setGlobalVariableValue = GlobalVariables.useSetValue();
  // asfasdf
  const requestLocation = async () => {
    let { status } = await CustomCode.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('Access to your location is needed to complete this action');
      return null;
    }

    let location = await CustomCode.getCurrentPositionAsync({});
    return location;
  };

  const { theme } = props;
  const { navigation } = props;

  const markEnRoutePOST = XanoApi.useMarkEnRoutePOST();
  const markDeliveredPOST = XanoApi.useMarkDeliveredPOST();

  const isFocused = useIsFocused();
  React.useEffect(async () => {
    try {
      if (!isFocused) {
        return;
      }
      const me = await XanoApi.newEndpointGET(Constants, {
        user_id: Constants['user_id'],
      });
      const delivID = me.currentDelivery;
      console.log(me);
      if (!delivID) {
        return;
      }
      setGlobalVariableValue({
        key: 'courierActive',
        value: true,
      });
      setGlobalVariableValue({
        key: 'driverPickupID',
        value: delivID,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [lat, setLat] = React.useState('');
  const [long, setLong] = React.useState('');

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      hasSafeArea={false}
      scrollable={true}
      hasTopSafeArea={false}
    >
      <>
        {!Constants['courierActive'] ? null : (
          <View>
            <XanoApi.FetchSpecificOrderViewGET
              refetchInterval={1000}
              session_id={Constants['driverPickupID']}
              onData={async fetchData => {
                try {
                  const location = await Utils.getLocation();
                  console.log('hello');
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {({ loading, error, data, refetchSpecificOrderView }) => {
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
                  <>
                    <Image
                      style={styles.ImageuB}
                      source={{
                        uri: `${fetchData?.userOrder?.restaurantImage}`,
                      }}
                      resizeMode={'cover'}
                    />
                    <Surface
                      style={[
                        styles.SurfaceQB,
                        { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
                      ]}
                    >
                      <Text
                        style={[styles.TextxS, { color: theme.colors.strong }]}
                      >
                        {'Delivering order #'}
                        {fetchData?.id}
                      </Text>

                      <Text
                        style={[styles.Textpk, { color: theme.colors.strong }]}
                      >
                        {'Delivering to user: '}
                        {fetchData?.user_id}
                      </Text>

                      <Row
                        justifyContent={'space-between'}
                        alignItems={'center'}
                      >
                        <ButtonSolid
                          onPress={() => {
                            try {
                              Linking.openURL(
                                'https://goo.gl/maps/RA8T4eq7YKmFaUBK9'
                              );
                              if (Platform.OS === 'android') {
                                return;
                              }
                              Linking.openURL(
                                'https://maps.apple.com/?address=300%20S%20Broadway%20Ave,%20Boise,%20ID%20%2083702,%20United%20States&auid=9221457093882853987&ll=43.608212,-116.193010&lsp=9902&q=Chick-fil-A&_ext=CjMKBQgEEOIBCgQIBRADCgUIBhDRAQoECAoQAAoECFIQAQoECFUQDQoECFkQAQoFCKQBEAESJin2dBr/Rc1FQDFbqb/bvwxdwDl0SkBbbM5FQEElCnqX9AtdwFAD'
                              );
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={[
                            styles.ButtonSolidAb,
                            { backgroundColor: theme.colors.primary },
                          ]}
                          title={'Pickup'}
                          icon={'MaterialIcons/store'}
                        />
                        <ButtonSolid
                          onPress={() => {
                            try {
                              Linking.openURL(
                                'https://goo.gl/maps/7uDDo3hhMvQHeXfFA'
                              );
                              if (Platform.OS === 'android') {
                                return;
                              }
                              Linking.openURL(
                                'https://maps.apple.com/?address=3975%20W%20Farm%20View%20Dr,%20Boise,%20ID%20%2083714,%20United%20States&ll=43.715948,-116.244271&q=Home&_ext=EiYpEeVmBBHbRUAx/qJz8gcQXcA5j7qMYDfcRUBBgEyyUDwPXcBQBA%3D%3D'
                              );
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={[
                            styles.ButtonSolidKw,
                            { backgroundColor: theme.colors.primary },
                          ]}
                          title={'Destination'}
                          icon={'Ionicons/ios-pin-sharp'}
                        />
                      </Row>
                      <ButtonSolid
                        onPress={() => {
                          try {
                            navigation.navigate('DriverChatScreen', {
                              orderID: Constants['driverPickupID'],
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        style={[
                          styles.ButtonSolidMS,
                          { backgroundColor: theme.colors.primary },
                        ]}
                        title={'Message User'}
                        icon={'MaterialCommunityIcons/android-messages'}
                      />
                      <>
                        {fetchData?.enRoute ? null : (
                          <ButtonSolid
                            onPress={async () => {
                              try {
                                await markEnRoutePOST.mutateAsync({
                                  driverUID: Constants['user_id'],
                                  orderID: Constants['driverPickupID'],
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            style={[
                              styles.ButtonSolidb5,
                              { backgroundColor: theme.colors.primary },
                            ]}
                            title={'Order Picked Up'}
                          />
                        )}
                      </>
                      <>
                        {!fetchData?.enRoute ? null : (
                          <ButtonSolid
                            onPress={async () => {
                              try {
                                await markDeliveredPOST.mutateAsync({
                                  driverID: Constants['user_id'],
                                  orderID: Constants['driverPickupID'],
                                });
                                setGlobalVariableValue({
                                  key: 'courierActive',
                                  value: '',
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            style={[
                              styles.ButtonSolid_04,
                              { backgroundColor: theme.colors.primary },
                            ]}
                            title={'Mark Delivered'}
                          />
                        )}
                      </>
                      <Divider
                        style={styles.DividerWh}
                        color={theme.colors.divider}
                      />
                      <Text
                        style={[styles.Texta9, { color: theme.colors.strong }]}
                      >
                        {'Order Contents:'}
                      </Text>

                      <XanoApi.FetchGetItemsGET
                        order_id={Constants['driverPickupID']}
                      >
                        {({ loading, error, data, refetchGetItems }) => {
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
                              listKey={'54olhpYp'}
                              keyExtractor={({ item }) =>
                                item?.id || item?.uuid || item
                              }
                              renderItem={({ item }) => {
                                const listData = item;
                                return (
                                  <Surface
                                    style={[
                                      styles.Surfacef7,
                                      {
                                        borderRadius: 10,
                                        borderColor: theme.colors.divider,
                                      },
                                    ]}
                                  >
                                    <Text
                                      style={[
                                        styles.TextlZ,
                                        { color: theme.colors.strong },
                                      ]}
                                    >
                                      {listData?.itemName}
                                    </Text>

                                    <Text
                                      style={[
                                        styles.Textma,
                                        { color: theme.colors.strong },
                                      ]}
                                    >
                                      {'Item ID: '}
                                      {listData?.itemID}
                                    </Text>
                                  </Surface>
                                );
                              }}
                              contentContainerStyle={styles.FlatList_54Content}
                              numColumns={1}
                            />
                          );
                        }}
                      </XanoApi.FetchGetItemsGET>
                    </Surface>
                  </>
                );
              }}
            </XanoApi.FetchSpecificOrderViewGET>
            <XanoApi.FetchSetLocationGET
              refetchInterval={5000}
              lat={lat}
              long={long}
              session={Constants['driverPickupID']}
              onData={async fetchData => {
                try {
                  const location = await Utils.getLocation();
                  console.log(location);
                  const latitude = location.latitude;
                  const longitude = location.longitude;
                  setLat(latitude);
                  setLong(longitude);
                  await refetchSetLocation();
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {({ loading, error, data, refetchSetLocation }) => {
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

                return null;
              }}
            </XanoApi.FetchSetLocationGET>
          </View>
        )}
      </>
      <>
        {Constants['courierActive'] ? null : (
          <View style={styles.ViewBk}>
            <Text style={[styles.Textzb, { color: theme.colors.strong }]}>
              {'Available Orders'}
            </Text>

            <XanoApi.FetchCourierOffersGET
              method={'GET'}
              refetchInterval={10000}
            >
              {({ loading, error, data, refetchCourierOffers }) => {
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
                    listKey={'jHvtzsa4'}
                    keyExtractor={({ item }) => item?.id || item?.uuid || item}
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          <View
                            style={[
                              styles.ViewOP,
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
                                  navigation.navigate('AcceptOrderScreen', {
                                    orderID: listData?.id,
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <View style={styles.ViewTY}>
                                <ImageBackground
                                  style={[
                                    styles.ImageBackgroundj4,
                                    { borderRadius: theme.roundness },
                                  ]}
                                  resizeMode={'cover'}
                                  source={{
                                    uri: `${listData?.userOrder?.restaurantImage}`,
                                  }}
                                >
                                  <View style={styles.ViewKN}>
                                    <View
                                      style={[
                                        styles.ViewFt,
                                        {
                                          backgroundColor: theme.colors.primary,
                                          borderBottomLeftRadius: 8,
                                          borderTopLeftRadius: 8,
                                        },
                                      ]}
                                    >
                                      <Text
                                        style={[
                                          styles.Textaf,
                                          { color: theme.colors.surface },
                                        ]}
                                        allowFontScaling={true}
                                        ellipsizeMode={'tail'}
                                        textBreakStrategy={'highQuality'}
                                      >
                                        {'$'}
                                        {listData?.earnings}
                                      </Text>
                                    </View>
                                  </View>
                                </ImageBackground>
                              </View>

                              <View style={styles.Viewb0}>
                                <View>
                                  <Text
                                    style={[
                                      styles.Texttp,
                                      { color: theme.colors.strong },
                                    ]}
                                    textBreakStrategy={'highQuality'}
                                    ellipsizeMode={'tail'}
                                    allowFontScaling={true}
                                    numberOfLines={2}
                                  >
                                    {listData?.userOrder?.restaurantName}
                                  </Text>
                                  <Divider
                                    style={styles.DividernZ}
                                    color={theme.colors.divider}
                                  />
                                  <View style={styles.ViewRH}>
                                    <View style={styles.ViewXK}>
                                      <Icon
                                        name={
                                          'MaterialCommunityIcons/map-marker-distance'
                                        }
                                        size={24}
                                        color={theme.colors.primary}
                                      />
                                      <Spacer right={2} left={2} />
                                      <Text
                                        style={[
                                          styles.TextlI,
                                          { color: theme.colors.medium },
                                        ]}
                                      >
                                        {listData?.distance}
                                        {' Mi.   OrderID: '}
                                        {listData?.id}
                                      </Text>
                                    </View>
                                    <Spacer
                                      top={8}
                                      right={8}
                                      bottom={8}
                                      left={8}
                                    />
                                    <Spacer
                                      top={8}
                                      right={8}
                                      bottom={8}
                                      left={8}
                                    />
                                  </View>
                                </View>
                              </View>
                            </Touchable>
                          </View>
                          <Spacer top={12} right={8} bottom={12} left={8} />
                        </>
                      );
                    }}
                    contentContainerStyle={styles.FlatListjHContent}
                  />
                );
              }}
            </XanoApi.FetchCourierOffersGET>
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ImageuB: {
    width: '100%',
    height: 250,
  },
  TextxS: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  Textpk: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  ButtonSolidAb: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 16,
    marginRight: 8,
    marginBottom: 16,
    width: '42.5%',
  },
  ButtonSolidKw: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 8,
    marginRight: 16,
    marginBottom: 16,
    width: '42.5%',
  },
  ButtonSolidMS: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
  },
  ButtonSolidb5: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
  },
  ButtonSolid_04: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
  },
  DividerWh: {
    height: 1,
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  Texta9: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  TextlZ: {
    marginLeft: 16,
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
  },
  Textma: {
    marginLeft: 16,
    fontFamily: 'Poppins_300Light',
    fontSize: 14,
    marginRight: 16,
  },
  Surfacef7: {
    minHeight: 60,
    width: '90%',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  FlatList_54Content: {
    flex: 1,
    marginBottom: 20,
  },
  Fetchil: {
    minHeight: 40,
  },
  SurfaceQB: {
    marginTop: -20,
    height: '100%',
  },
  Fetch_9C: {
    minHeight: 40,
  },
  FetchpI: {
    minHeight: 40,
  },
  Textzb: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  Textaf: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  ViewFt: {
    paddingLeft: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewKN: {
    alignItems: 'flex-end',
    marginTop: 16,
  },
  ImageBackgroundj4: {
    width: '100%',
    height: '100%',
  },
  ViewTY: {
    height: 150,
  },
  Texttp: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
  },
  DividernZ: {
    height: 1,
    marginTop: 12,
    marginBottom: 12,
  },
  TextlI: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  ViewXK: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewRH: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  Viewb0: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  ViewOP: {
    overflow: 'hidden',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  FlatListjHContent: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  ViewBk: {
    marginTop: 45,
  },
});

export default withTheme(AvailableOrdersScreen);
