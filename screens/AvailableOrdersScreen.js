import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
import { MapMarker, MapView } from '@draftbit/maps';
import {
  ButtonSolid,
  Divider,
  Icon,
  IconButton,
  Row,
  ScreenContainer,
  Spacer,
  Stack,
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
  Modal,
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

  const xanoMarkEnRoutePOST = XanoApi.useMarkEnRoutePOST();
  const xanoMarkDeliveredPOST = XanoApi.useMarkDeliveredPOST();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const location = await Utils.getLocation();
        const lat = location.latitude;
        const long = location.longitude;
        setGlobalVariableValue({
          key: 'deviceLat',
          value: lat,
        });
        setGlobalVariableValue({
          key: 'deviceLong',
          value: long,
        });
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const [driverModal, setDriverModal] = React.useState(false);
  const [enRoute, setEnRoute] = React.useState(false);
  const [lat, setLat] = React.useState('');
  const [long, setLong] = React.useState('');
  const [previewID, setPreviewID] = React.useState(0);
  const [previewModal, setPreviewModal] = React.useState(false);

  const mapViewwpaCz5cORef = React.useRef();

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      hasSafeArea={false}
      scrollable={true}
      hasTopSafeArea={false}
    >
      <XanoApi.FetchIsDeliveringGET
        refetchInterval={1000}
        user_id={Constants['user_id']}
        onData={fetchData => {
          try {
            setGlobalVariableValue({
              key: 'driverPickupID',
              value: fetchData?.currentDelivery,
            });
            if (!fetchData?.currentDelivery) {
              return;
            }
            setDriverModal(true);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ loading, error, data, refetchIsDelivering }) => {
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
              {!fetchData?.currentDelivery ? null : (
                <View>
                  <XanoApi.FetchSpecificOrderViewGET
                    refetchInterval={1000}
                    session_id={fetchData?.currentDelivery}
                    onData={fetchData => {
                      const handler = async () => {
                        try {
                          const location = await Utils.getLocation();
                          console.log('hello');
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
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
                              {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                              },
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
                                  onPress={() => {
                                    const handler = async () => {
                                      try {
                                        const loggg =
                                          await xanoMarkEnRoutePOST.mutateAsync(
                                            {
                                              driverUID: Constants['user_id'],
                                              orderID:
                                                Constants['driverPickupID'],
                                            }
                                          );
                                        console.log(loggg);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    };
                                    handler();
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
                                  onPress={() => {
                                    const handler = async () => {
                                      try {
                                        await xanoMarkDeliveredPOST.mutateAsync(
                                          {
                                            driverID: Constants['user_id'],
                                            orderID:
                                              Constants['driverPickupID'],
                                          }
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    };
                                    handler();
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
                            <FlatList
                              data={fetchData?.userOrder?.items}
                              listKey={'54olhpYp'}
                              keyExtractor={item =>
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
                          </Surface>
                        </>
                      );
                    }}
                  </XanoApi.FetchSpecificOrderViewGET>
                  <XanoApi.FetchSetLocationGET
                    refetchInterval={5000}
                    lat={lat}
                    long={long}
                    session={fetchData?.currentDelivery}
                    onData={fetchData => {
                      const handler = async () => {
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
                      };
                      handler();
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
          );
        }}
      </XanoApi.FetchIsDeliveringGET>
      {/* offerView */}
      <View style={styles.View9900fb05}>
        <Row justifyContent={'space-between'} alignItems={'center'}>
          <Text style={[styles.Texta195e174, { color: theme.colors.strong }]}>
            {'Available Orders'}
          </Text>
          <IconButton
            onPress={() => {
              try {
                navigation.navigate('CreateOrderScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles.IconButton03ed04fc}
            icon={'AntDesign/plus'}
            size={32}
          />
        </Row>

        <XanoApi.FetchCourierOffersGET
          method={'GET'}
          refetchInterval={10000}
          driverLat={Constants['deviceLat']}
          driverLong={Constants['deviceLong']}
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
                keyExtractor={item => item?.id || item?.uuid || item}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <>
                      <View
                        style={[
                          styles.View4685c5ed,
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
                              setPreviewID(listData?.id);
                              setPreviewModal(true);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <View
                            style={[
                              styles.View5cec8edc,
                              { backgroundColor: theme.colors.strong },
                            ]}
                          >
                            <ImageBackground
                              style={[
                                styles.ImageBackground2c2160f4,
                                { borderRadius: theme.roundness },
                              ]}
                              resizeMode={'cover'}
                              source={{
                                uri: `${listData?.userOrder?.restaurantImage}`,
                              }}
                            >
                              <Row
                                justifyContent={'space-between'}
                                alignItems={'center'}
                              >
                                <View style={styles.View24206b27}>
                                  <Text
                                    style={[
                                      styles.Textfb77ec08,
                                      { color: theme.colors.background },
                                    ]}
                                    textBreakStrategy={'highQuality'}
                                    ellipsizeMode={'tail'}
                                    allowFontScaling={true}
                                    numberOfLines={2}
                                  >
                                    {listData?.userOrder?.restaurantName}
                                  </Text>

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
                                          styles.Text92a50533,
                                          { color: theme.colors.background },
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

                                <View style={styles.View6a670001}>
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
                              </Row>
                            </ImageBackground>
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
      {/* preAccectDialog */}
      <>
        {!previewModal ? null : (
          <Modal animationType={'slide'} presentationStyle={'pageSheet'}>
            {/* Header */}
            <View style={styles.View7a993fb0}>
              <Row justifyContent={'flex-start'} alignItems={'center'}>
                <IconButton
                  onPress={() => {
                    try {
                      setPreviewModal(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={styles.IconButton897c6051}
                  icon={'AntDesign/close'}
                  size={40}
                />
                <Text
                  style={[styles.Textd59ae7c0, { color: theme.colors.strong }]}
                >
                  {'Order #'}
                  {previewID}
                </Text>
              </Row>
            </View>

            <XanoApi.FetchSpecificOrderViewGET session_id={previewID}>
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
                    <Touchable
                      onPress={() => {
                        try {
                          const url = openMapApplication(
                            fetchData?.userOrder?.storeLat,
                            fetchData?.userOrder?.storeLong
                          );
                          Linking.openURL(`${url}`);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <Surface
                        style={[styles.Surfacedbd81cab, { borderRadius: 8 }]}
                      >
                        <MapView
                          style={[styles.MapView7f1c84a4, { borderRadius: 8 }]}
                          latitude={fetchData?.userOrder?.storeLat}
                          longitude={fetchData?.userOrder?.storeLong}
                          zoom={15}
                          zoomEnabled={true}
                          rotateEnabled={true}
                          scrollEnabled={true}
                          loadingEnabled={true}
                          showsPointsOfInterest={true}
                          apiKey={'AIzaSyC53v7BvSuA1yv7Hwf1rC_9kpHMmmYJJhU'}
                          showsUserLocation={true}
                          ref={mapViewwpaCz5cORef}
                        >
                          <MapMarker
                            latitude={fetchData?.userOrder?.storeLat}
                            longitude={fetchData?.userOrder?.storeLong}
                            title={'Pickup Location'}
                          />
                        </MapView>
                      </Surface>
                    </Touchable>
                    <FlatList
                      data={fetchData?.userOrder?.items}
                      listKey={'Wgjvgo9d'}
                      keyExtractor={item => item?.id || item?.uuid || item}
                      renderItem={({ item }) => {
                        const listData = item;
                        return (
                          <>
                            <Row
                              justifyContent={'space-between'}
                              alignItems={'flex-start'}
                            >
                              <Stack
                                justifyContent={'flex-start'}
                                alignItems={'flex-start'}
                              >
                                <Text
                                  style={[
                                    styles.Text0dd45cce,
                                    { color: theme.colors.strong },
                                  ]}
                                >
                                  {listData?.itemName}
                                </Text>

                                <Text
                                  style={[
                                    styles.Text6ebfd19b,
                                    { color: theme.colors.strong },
                                  ]}
                                >
                                  {listData?.customizations}
                                </Text>
                              </Stack>

                              <Text
                                style={[
                                  styles.Text09cd9b42,
                                  { color: theme.colors.strong },
                                ]}
                              >
                                {'$'}
                                {listData?.itemPrice}
                              </Text>
                            </Row>
                            <Divider
                              style={styles.Divider6f17520d}
                              color={theme.colors.divider}
                            />
                          </>
                        );
                      }}
                      contentContainerStyle={styles.FlatList54a9f6e6Content}
                      numColumns={1}
                    />
                    <Surface
                      style={[
                        styles.Surface67b2725c,
                        {
                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16,
                          backgroundColor: theme.colors.background,
                        },
                      ]}
                      elevation={3}
                    >
                      <Row
                        justifyContent={'space-around'}
                        alignItems={'flex-start'}
                      >
                        <Surface
                          style={[
                            styles.Surface24b0047f,
                            {
                              backgroundColor: theme.colors.background,
                              borderRadius: 40,
                            },
                          ]}
                        >
                          <Row justifyContent={'center'} alignItems={'center'}>
                            <Icon
                              name={'FontAwesome/dollar'}
                              size={24}
                              color={theme.colors.primary}
                            />
                            <Text style={{ color: theme.colors.primary }}>
                              {fetchData?.earnings}
                            </Text>
                          </Row>
                        </Surface>
                        <ButtonSolid
                          onPress={() => {
                            try {
                              setPreviewModal(false);
                              navigation.navigate('AcceptOrderScreen', {
                                orderID: previewID,
                              });
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={[
                            styles.ButtonSolid2ffa6a59,
                            { backgroundColor: theme.colors.primary },
                          ]}
                          title={'Accept Order'}
                        />
                      </Row>
                      <Spacer top={15} right={8} bottom={15} left={8} />
                      <Text
                        style={[
                          styles.Text97a79954,
                          { color: theme.colors.light },
                        ]}
                      >
                        {'Copyright Campus Eats 2022'}
                      </Text>
                    </Surface>
                  </>
                );
              }}
            </XanoApi.FetchSpecificOrderViewGET>
          </Modal>
        )}
      </>
      <Surface style={styles.Surface0503a1c6}>
        <XanoApi.FetchCheckOfferEnabledGET
          refetchInterval={1000}
          courieroffers_id={Constants['user_id']}
        >
          {({ loading, error, data, refetchCheckOfferEnabled }) => {
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
              <Modal
                visible={fetchData}
                animationType={'slide'}
                presentationStyle={'fullScreen'}
              >
                <View style={styles.View45f37179}>
                  <ActivityIndicator
                    style={styles.ActivityIndicatord06b86ef}
                    size={'large'}
                    animating={true}
                    hidesWhenStopped={true}
                    color={theme.colors.primary}
                  />
                  <Text style={{ color: theme.colors.strong }}>
                    {'Awaiting offer pickup.'}
                  </Text>
                </View>
              </Modal>
            );
          }}
        </XanoApi.FetchCheckOfferEnabledGET>
      </Surface>
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
  Surfacefd5c62b0: {
    marginTop: -20,
    height: '100%',
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  Texta195e174: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  IconButton03ed04fc: {
    marginTop: 16,
    marginRight: 16,
  },
  Textfb77ec08: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
  },
  Text92a50533: {
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
  View24206b27: {
    paddingLeft: 16,
    justifyContent: 'center',
    marginTop: 20,
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
  View6a670001: {
    alignItems: 'flex-end',
    marginTop: -10,
  },
  ImageBackground2c2160f4: {
    width: '100%',
    height: '100%',
    opacity: 1,
  },
  View5cec8edc: {
    height: 110,
  },
  View4685c5ed: {
    overflow: 'hidden',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    height: 100,
    maxHeight: 100,
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
  MapView7f1c84a4: {
    flex: 1,
    overflow: 'hidden',
  },
  Surfacedbd81cab: {
    minHeight: 240,
    marginLeft: 16,
    marginRight: 16,
  },
  Text0dd45cce: {
    marginLeft: 20,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
  },
  Text6ebfd19b: {
    marginLeft: 20,
    marginBottom: 12,
  },
  Text09cd9b42: {
    marginRight: 20,
    fontFamily: 'Poppins_600SemiBold',
    marginLeft: 20,
    marginTop: 4,
  },
  Divider6f17520d: {
    height: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  FlatList54a9f6e6Content: {
    flex: 1,
    marginTop: 40,
    maxHeight: 300,
  },
  Surface24b0047f: {
    minHeight: 40,
    minWidth: 80,
    marginLeft: 16,
    marginTop: 16,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  ButtonSolid2ffa6a59: {
    borderRadius: 40,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    width: '70%',
  },
  Text97a79954: {
    textAlign: 'center',
  },
  Surface67b2725c: {
    minHeight: 150,
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  ActivityIndicatord06b86ef: {
    width: 100,
    height: 100,
  },
  View45f37179: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  Surface0503a1c6: {
    minHeight: 40,
    position: 'absolute',
    bottom: -200,
  },
});

export default withTheme(AvailableOrdersScreen);
