import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import { MapMarker, MapView } from '@draftbit/maps';
import {
  ButtonOutline,
  ButtonSolid,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const CreateOrderScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const checkSearch = searchField => {
    if (typeof searchField === 'string' && searchField.trim().length === 0) {
      console.log('string is empty');
      return false;
    } else {
      console.log('string is NOT empty');
      refetchCreateOfferSearchStores();
      return true;
    } // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const { theme } = props;
  const { navigation } = props;

  const xanoCreateDriverOfferPOST = XanoApi.useCreateDriverOfferPOST();

  const [mapOpen, setMapOpen] = React.useState(false);
  const [searchInputValue, setSearchInputValue] = React.useState(' ');
  const [storeID, setStoreID] = React.useState(0);
  const [storeSelected, setStoreSelected] = React.useState(false);

  const mapViewsroyiNArRef = React.useRef();

  return (
    <ScreenContainer scrollable={false} hasTopSafeArea={true}>
      {/* Header */}
      <View style={styles.View7a993fb0}>
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
            {'Create Offer'}
          </Text>
        </Row>
      </View>

      <KeyboardAwareScrollView
        style={styles.KeyboardAwareScrollView1e5d0f53}
        contentContainerStyle={styles.KeyboardAwareScrollView1e5d0f53Content}
        extraScrollHeight={72}
      >
        {/* Select Store View */}
        <>
          {storeSelected ? null : (
            <View>
              <Surface
                style={[
                  styles.Surface32810724,
                  {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: theme.colors.background,
                  },
                ]}
              >
                <Row justifyContent={'space-around'} alignItems={'center'}>
                  {/* Search Field */}
                  <View
                    style={[
                      styles.View85f207cf,
                      {
                        backgroundColor: theme.colors.divider,
                        borderRadius: 12,
                      },
                    ]}
                  >
                    <View style={styles.Viewc992f941}>
                      {/* Search Input */}
                      <TextInput
                        onChangeText={newSearchInputValue => {
                          const handler = async () => {
                            try {
                              setSearchInputValue(newSearchInputValue);
                              const result = checkSearch(newSearchInputValue);
                              if (result) {
                                return;
                              }
                              setSearchInputValue(' ');
                              await refetchCreateOfferSearchStores();
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
                        }}
                        style={styles.TextInputbaf7ad36}
                        placeholder={'Search Stores'}
                        value={searchInputValue}
                      />
                    </View>
                    <Spacer top={0} right={3} bottom={0} left={3} />
                    <View>
                      {/* Search Button */}
                      <IconButton
                        icon={'MaterialIcons/search'}
                        size={32}
                        color={theme.colors.light}
                      />
                    </View>
                  </View>
                </Row>
              </Surface>

              <XanoApi.FetchCreateOfferSearchStoresGET
                driverLat={Constants['deviceLat']}
                driverLong={Constants['deviceLong']}
                searchTerm={searchInputValue}
              >
                {({ loading, error, data, refetchCreateOfferSearchStores }) => {
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
                      listKey={'m4jtkcKB'}
                      keyExtractor={item => item?.id || item?.uuid || item}
                      renderItem={({ item }) => {
                        const listData = item;
                        return (
                          <Touchable
                            onPress={() => {
                              try {
                                setStoreID(listData?.id);
                                setMapOpen(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            style={styles.Touchabledf29e2e2}
                          >
                            <View
                              style={[
                                styles.View415f6e65,
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
                                source={{ uri: `${listData?.storeImage}` }}
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
                                      {listData?.storeName}
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
                                          {null}
                                          {' Mi.'}
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
                                        {listData?.deliveryFee}
                                      </Text>
                                    </View>
                                  </View>
                                </Row>
                              </ImageBackground>
                            </View>
                          </Touchable>
                        );
                      }}
                      style={styles.FlatList3d037f47}
                      contentContainerStyle={styles.FlatList3d037f47Content}
                      numColumns={1}
                      horizontal={false}
                    />
                  );
                }}
              </XanoApi.FetchCreateOfferSearchStoresGET>
              <Modal
                visible={mapOpen}
                animationType={'slide'}
                presentationStyle={'pageSheet'}
              >
                <XanoApi.FetchGetStoreInfoGET stores_id={storeID}>
                  {({ loading, error, data, refetchGetStoreInfo }) => {
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
                      <Surface style={styles.Surface53160ad4}>
                        <MapView
                          style={styles.MapViewc992f941}
                          latitude={fetchData?.storeLat}
                          longitude={fetchData?.storeLong}
                          zoom={14}
                          zoomEnabled={true}
                          rotateEnabled={true}
                          scrollEnabled={true}
                          loadingEnabled={true}
                          showsPointsOfInterest={true}
                          apiKey={'AIzaSyC53v7BvSuA1yv7Hwf1rC_9kpHMmmYJJhU'}
                          ref={mapViewsroyiNArRef}
                        >
                          <MapMarker
                            latitude={fetchData?.storeLat}
                            longitude={fetchData?.storeLong}
                            title={fetchData?.storeName}
                          />
                        </MapView>
                      </Surface>
                    );
                  }}
                </XanoApi.FetchGetStoreInfoGET>
                <Text
                  style={[styles.Text58d1c036, { color: theme.colors.strong }]}
                >
                  {'Confirm Store'}
                </Text>
                <ButtonSolid
                  onPress={() => {
                    try {
                      setStoreSelected(true);
                      setMapOpen(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={[
                    styles.ButtonSolid9d6c1362,
                    { backgroundColor: theme.colors.primary },
                  ]}
                  title={'Confirm'}
                />
                <ButtonOutline
                  onPress={() => {
                    try {
                      setMapOpen(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={styles.ButtonOutline44cee43f}
                  title={'Go Back'}
                />
              </Modal>
            </View>
          )}
        </>
        {/* Final Dialog */}
        <>
          {!storeSelected ? null : (
            <View style={styles.View9c00e420}>
              <Icon
                style={styles.Icon38064599}
                name={'Ionicons/md-create'}
                size={120}
                color={theme.colors.primary}
              />
              <Text
                style={[styles.Text193adc76, { color: theme.colors.strong }]}
              >
                {
                  "Are you sure you want to create this offer? You won't be able to accept any other orders for 30 minutes."
                }
              </Text>
              <ButtonSolid
                onPress={() => {
                  const handler = async () => {
                    try {
                      await xanoCreateDriverOfferPOST.mutateAsync({
                        storeID: storeID,
                        uid: Constants['user_id'],
                      });
                      navigation.navigate('StackNavigator', {
                        screen: 'DriverNav',
                        params: { screen: 'AvailableOrdersScreen' },
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={[
                  styles.ButtonSolid16be54e1,
                  { backgroundColor: theme.colors.primary },
                ]}
                title={'Confirm'}
              />
              <ButtonOutline
                onPress={() => {
                  try {
                    navigation.navigate('StackNavigator', {
                      screen: 'DriverNav',
                      params: { screen: 'AvailableOrdersScreen' },
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles.ButtonOutline043ff0b7}
                title={'Cancel'}
              />
            </View>
          )}
        </>
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
  View7a993fb0: {
    marginTop: 20,
    marginBottom: 20,
  },
  TextInputbaf7ad36: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 18,
  },
  Viewc992f941: {
    flex: 1,
  },
  View85f207cf: {
    paddingLeft: 12,
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
  },
  Surface32810724: {
    minHeight: 70,
    justifyContent: 'space-around',
    alignContent: 'space-around',
    overflow: 'hidden',
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
  View415f6e65: {
    height: 110,
    overflow: 'hidden',
    width: 356,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
  },
  Touchabledf29e2e2: {
    width: '100%',
  },
  FlatList3d037f47: {
    width: '100%',
  },
  FlatList3d037f47Content: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  MapViewc992f941: {
    flex: 1,
  },
  Surface53160ad4: {
    minHeight: '75%',
    overflow: 'hidden',
  },
  Text58d1c036: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  ButtonSolid9d6c1362: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 16,
    marginTop: 16,
    marginRight: 16,
  },
  ButtonOutline44cee43f: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    marginLeft: '25%',
    marginRight: '25%',
    marginTop: 10,
  },
  Icon38064599: {
    marginLeft: 20,
    marginTop: -250,
  },
  Text193adc76: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: 16,
    fontSize: 14,
    textAlign: 'center',
  },
  ButtonSolid16be54e1: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 140,
    marginLeft: 16,
    marginRight: 16,
  },
  ButtonOutline043ff0b7: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 84,
    marginLeft: '25%',
    marginRight: '25%',
  },
  View9c00e420: {
    alignItems: 'center',
    height: '100%',
    minHeight: '100%',
    justifyContent: 'center',
  },
  KeyboardAwareScrollView1e5d0f53: {
    width: '100%',
    height: '100%',
  },
  KeyboardAwareScrollView1e5d0f53Content: {
    paddingBottom: 36,
  },
});

export default withTheme(CreateOrderScreen);
