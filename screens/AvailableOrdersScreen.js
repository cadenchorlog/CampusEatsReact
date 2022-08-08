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
  const openMapApplication = (latitude, longitude) => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const label = 'Address';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    return url;
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

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
                      style={styles.Image6ba238f9}
                      source={{
                        uri: `${fetchData?.userOrder?.restaurantImage}`,
                      }}
                      resizeMode={'cover'}
                    />
                    <Surface
                      style={[
                        styles.Surfacefd5c62b0,
                        { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
                      ]}
                    >
                      <Text
                        style={[
                          styles.Text9e468f17,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {'Delivering order #'}
                        {fetchData?.id}
                      </Text>

                      <Text
                        style={[
                          styles.Textdf7ef565,
                          { color: theme.colors.strong },
                        ]}
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
                              const result = openMapApplication(
                                fetchData?.userOrder?.storeLat,
                                fetchData?.userOrder?.storeLong
                              );
                              Linking.openURL(`${result}`);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={[
                            styles.ButtonSolidb5539f45,
                            { backgroundColor: theme.colors.primary },
                          ]}
                          title={'Pickup'}
                          icon={'MaterialIcons/store'}
                        />
                        <ButtonSolid
                          onPress={() => {
                            try {
                              const result = openMapApplication(
                                fetchData?.userOrder?.userLat,
                                fetchData?.userOrder?.userLong
                              );
                              Linking.openURL(`${result}`);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={[
                            styles.ButtonSolid3a730fd5,
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
                          styles.ButtonSolidc21c4061,
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
                              styles.ButtonSolidc21c4061,
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
                              styles.ButtonSolidc21c4061,
                              { backgroundColor: theme.colors.primary },
                            ]}
                            title={'Mark Delivered'}
                          />
                        )}
                      </>
                      <Divider
                        style={styles.Dividerfc046f10}
                        color={theme.colors.divider}
                      />
                      <Text
                        style={[
                          styles.Text0586d8e1,
                          { color: theme.colors.strong },
                        ]}
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
                                      styles.Surface8ff00fe3,
                                      {
                                        borderRadius: 10,
                                        borderColor: theme.colors.divider,
                                      },
                                    ]}
                                  >
                                    <Text
                                      style={[
                                        styles.Text91bd8308,
                                        { color: theme.colors.strong },
                                      ]}
                                    >
                                      {listData?.itemName}
                                    </Text>

                                    <Text
                                      style={[
                                        styles.Textddd2e1d3,
                                        { color: theme.colors.strong },
                                      ]}
                                    >
                                      {'Item ID: '}
                                      {listData?.itemID}
                                    </Text>
                                  </Surface>
                                );
                              }}
                              contentContainerStyle={
                                styles.FlatListafd6d09eContent
                              }
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
          <View style={styles.View9900fb05}>
            <Text style={[styles.Texta195e174, { color: theme.colors.strong }]}>
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
                                  navigation.navigate('AcceptOrderScreen', {
                                    orderID: listData?.id,
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <View style={styles.View769cb23a}>
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
                                        {'$'}
                                        {listData?.earnings}
                                      </Text>
                                    </View>
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
                                  <Divider
                                    style={styles.Divider22627dc6}
                                    color={theme.colors.divider}
                                  />
                                  <View style={styles.Viewce4accf0}>
                                    <View style={styles.View7d6a39b7}>
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
                                          styles.Textde21574d,
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
                    contentContainerStyle={styles.FlatList8db74792Content}
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
  Image6ba238f9: {
    width: '100%',
    height: 250,
  },
  Text9e468f17: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  Textdf7ef565: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  ButtonSolidb5539f45: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 16,
    marginRight: 8,
    marginBottom: 16,
    width: '42.5%',
  },
  ButtonSolid3a730fd5: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 8,
    marginRight: 16,
    marginBottom: 16,
    width: '42.5%',
  },
  ButtonSolidc21c4061: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
  },
  Dividerfc046f10: {
    height: 1,
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  Text0586d8e1: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  Text91bd8308: {
    marginLeft: 16,
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
  },
  Textddd2e1d3: {
    marginLeft: 16,
    fontFamily: 'Poppins_300Light',
    fontSize: 14,
    marginRight: 16,
  },
  Surface8ff00fe3: {
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
  FlatListafd6d09eContent: {
    flex: 1,
    marginBottom: 20,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  Surfacefd5c62b0: {
    marginTop: -20,
    height: '100%',
  },
  Texta195e174: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
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
  View769cb23a: {
    height: 150,
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
  View9900fb05: {
    marginTop: 45,
  },
});

export default withTheme(AvailableOrdersScreen);
