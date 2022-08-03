import React from 'react';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import { parseBoolean } from '../utils';
import { MapView } from '@draftbit/maps';
import {
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
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';

const MapScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const requestLocation = async () => {
    //let { status } = await CustomCode.requestForegroundPermissionsAsync();
    let { status } = await CustomCode.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('Access to your location is needed to complete this action');
      return null;
    }

    let location = await CustomCode.getCurrentPositionAsync({});
    return location;
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const openMapApp = (latitude, longitude) => {
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
    return url; // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(async () => {
    try {
      if (!isFocused) {
        return;
      }
      const currentLocation = await requestLocation();
      if (!currentLocation) {
        return;
      }
      const longitude = currentLocation.coords.longitude;
      const latitude = currentLocation.coords.latitude;
      setCurrentLat(latitude);
      setCurrentLong(longitude);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [currentLat, setCurrentLat] = React.useState(0);
  const [currentLong, setCurrentLong] = React.useState(0);
  const [drawerOpened, setDrawerOpened] = React.useState(false);
  const [keyboardOpened, setKeyboardOpened] = React.useState(false);
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const [searchBarValue2, setSearchBarValue2] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

  const mapViewEjxxH1YMRef = React.useRef();

  return (
    <ScreenContainer
      style={{
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        borderRadius: 30,
      }}
      hasTopSafeArea={false}
      scrollable={true}
    >
      <MapView
        style={styles.MapViewEj}
        latitude={currentLat}
        longitude={currentLong}
        zoom={12}
        zoomEnabled={true}
        rotateEnabled={true}
        scrollEnabled={true}
        loadingEnabled={true}
        showsPointsOfInterest={true}
        apiKey={'AIzaSyC53v7BvSuA1yv7Hwf1rC_9kpHMmmYJJhU'}
        showsUserLocation={true}
        followsUserLocation={false}
        showsCompass={true}
        ref={mapViewEjxxH1YMRef}
      />
      <Surface
        style={[
          styles.SurfaceYt,
          { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
        ]}
      >
        <Row justifyContent={'space-around'} alignItems={'center'}>
          <View
            style={[
              styles.ViewUI,
              { backgroundColor: theme.colors.divider, borderRadius: 12 },
            ]}
          >
            <View style={styles.View_82}>
              <TextInput
                onChangeText={newSearchInputValue => {
                  const textInputValue = newSearchInputValue;
                  try {
                    setTextInputValue(textInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles.TextInputlX}
                placeholder={'Search...'}
                value={textInputValue}
              />
            </View>
            <Spacer top={0} right={3} bottom={0} left={3} />
            <View>
              <IconButton
                icon={'MaterialIcons/search'}
                size={32}
                color={theme.colors.light}
              />
            </View>
          </View>
          <>
            {drawerOpened ? null : (
              <IconButton
                onPress={() => {
                  try {
                    setDrawerOpened(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles.IconButtonYa}
                icon={'Ionicons/grid'}
                size={32}
                color={theme.colors.light}
              />
            )}
          </>
          <>
            {!parseBoolean(drawerOpened) ? null : (
              <IconButton
                onPress={() => {
                  try {
                    setDrawerOpened(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles.IconButtonPk}
                icon={'Entypo/chevron-thin-down'}
                size={32}
                color={theme.colors.light}
              />
            )}
          </>
        </Row>
      </Surface>
      <>
        {!drawerOpened ? null : (
          <View style={styles.ViewgZ}>
            <View
              style={[
                styles.ViewHT,
                { backgroundColor: theme.colors.strongInverse },
              ]}
              needsOffscreenAlphaCompositing={false}
            >
              <Touchable
                onPress={() => {
                  try {
                    navigation.navigate('AccountScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles.TouchablebL}
              >
                <View
                  style={[
                    styles.Viewkb,
                    {
                      borderRadius: theme.roundness,
                      borderColor: theme.colors.divider,
                      backgroundColor: theme.colors.background,
                    },
                  ]}
                >
                  <Icon
                    style={styles.Iconaw}
                    size={40}
                    color={theme.colors.strong}
                    name={'Ionicons/md-person-circle-outline'}
                  />
                  <Spacer top={8} right={8} bottom={8} left={8} />
                  <Stack
                    justifyContent={'flex-start'}
                    alignItems={'flex-start'}
                  >
                    <Text
                      style={[styles.TextDT, { color: theme.colors.strong }]}
                      allowFontScaling={true}
                    >
                      {'Hi '}
                      {Constants['user_name']}
                      {'!'}
                    </Text>

                    <Text
                      style={[styles.TextsX, { color: theme.colors.strong }]}
                      allowFontScaling={true}
                    >
                      {'View your account'}
                    </Text>
                  </Stack>
                </View>
              </Touchable>

              <Touchable
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
                style={styles.Touchablerl}
              >
                <View
                  style={[
                    styles.View_5k,
                    {
                      borderRadius: theme.roundness,
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.divider,
                    },
                  ]}
                >
                  <View style={styles.ViewFd}>
                    <Text
                      style={[
                        theme.typography.headline6,
                        styles.TextlK,
                        { color: theme.colors.strong },
                      ]}
                      allowFontScaling={true}
                    >
                      {'Switch to\nCourier\n'}
                    </Text>
                  </View>

                  <View style={styles.ViewEa}>
                    <Icon
                      style={styles.Icon_5C}
                      name={'MaterialCommunityIcons/truck-delivery'}
                      size={24}
                      color={theme.colors.strong}
                    />
                  </View>
                </View>
              </Touchable>

              <Touchable
                onPress={() => {
                  try {
                    navigation.navigate('UserSetAddressScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles.Touchablekk}
              >
                <View
                  style={[
                    styles.ViewDg,
                    {
                      borderRadius: theme.roundness,
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.divider,
                    },
                  ]}
                >
                  <View style={styles.ViewXx}>
                    <Text
                      style={[
                        theme.typography.headline6,
                        styles.TextQP,
                        { color: theme.colors.strong },
                      ]}
                      allowFontScaling={true}
                    >
                      {'Delivery\nAddress'}
                    </Text>
                  </View>

                  <View style={styles.ViewSk}>
                    <Icon
                      style={styles.IconrH}
                      size={24}
                      name={'Ionicons/md-home'}
                      color={theme.colors.strong}
                    />
                  </View>
                </View>
              </Touchable>

              <Touchable
                onPress={() => {
                  try {
                    navigation.navigate('SimpleWelcomeScreen');
                    setGlobalVariableValue({
                      key: 'auth_header',
                      value: '',
                    });
                    setGlobalVariableValue({
                      key: 'user_id',
                      value: '',
                    });
                    setGlobalVariableValue({
                      key: 'user_name',
                      value: '',
                    });
                    setGlobalVariableValue({
                      key: 'user_email',
                      value: '',
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles.TouchableQg}
              >
                <View
                  style={[
                    styles.VieweJ,
                    {
                      borderRadius: theme.roundness,
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.divider,
                    },
                  ]}
                >
                  <View style={styles.Viewj6}>
                    <Text
                      style={[
                        theme.typography.headline6,
                        styles.TextR8,
                        { color: theme.colors.strong },
                      ]}
                      allowFontScaling={true}
                    >
                      {'Sign Out\n'}
                    </Text>
                  </View>

                  <View style={styles.ViewVe}>
                    <Icon
                      style={styles.IconYO}
                      name={'MaterialIcons/logout'}
                      size={24}
                      color={theme.colors.error}
                    />
                  </View>
                </View>
              </Touchable>

              <Touchable style={styles.TouchablemW}>
                <View
                  style={[
                    styles.ViewWt,
                    {
                      borderRadius: theme.roundness,
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.divider,
                    },
                  ]}
                >
                  <View style={styles.Viewbm}>
                    <Text
                      style={[
                        theme.typography.headline6,
                        styles.TextGQ,
                        { color: theme.colors.strong },
                      ]}
                      allowFontScaling={true}
                    >
                      {'Need Help?'}
                    </Text>

                    <Text
                      style={[
                        theme.typography.subtitle1,
                        styles.TextX9,
                        { color: theme.colors.medium },
                      ]}
                      allowFontScaling={true}
                    >
                      {' '}
                    </Text>
                  </View>

                  <View style={styles.View_03}>
                    <Icon
                      style={styles.IconFt}
                      size={30}
                      name={'MaterialIcons/help'}
                      color={theme.colors.strong}
                    />
                  </View>
                </View>
              </Touchable>
            </View>
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  MapViewEj: {
    flex: 1,
    marginBottom: -25,
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
  },
  TextInputlX: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 18,
  },
  View_82: {
    flex: 1,
  },
  ViewUI: {
    paddingLeft: 12,
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '15%',
  },
  IconButtonYa: {
    right: 25,
  },
  IconButtonPk: {
    right: 25,
  },
  SurfaceYt: {
    minHeight: 70,
    justifyContent: 'space-around',
    alignContent: 'space-around',
    overflow: 'hidden',
  },
  Iconaw: {
    width: 40,
    height: 40,
  },
  TextDT: {
    textAlign: 'left',
    fontSize: 20,
  },
  TextsX: {
    textAlign: 'left',
    fontSize: 14,
  },
  Viewkb: {
    width: '100%',
    height: 90,
    paddingBottom: 14,
    paddingTop: 14,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    flexDirection: 'row',
    paddingLeft: 14,
    paddingRight: 14,
  },
  TouchablebL: {
    width: '100%',
    marginBottom: 14,
    marginTop: 14,
    alignSelf: 'stretch',
    height: 75,
  },
  TextlK: {
    textAlign: 'left',
    paddingTop: 8,
  },
  ViewFd: {
    marginBottom: 16,
  },
  Icon_5C: {
    width: 24,
    height: 24,
  },
  ViewEa: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    width: 42,
  },
  View_5k: {
    width: '100%',
    borderRightWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    paddingRight: 14,
    paddingBottom: 14,
    paddingTop: 14,
    borderBottomWidth: 1,
    paddingLeft: 14,
    height: 140,
  },
  Touchablerl: {
    alignSelf: 'stretch',
    marginBottom: 10,
    width: '48%',
    marginTop: 14,
  },
  TextQP: {
    textAlign: 'left',
  },
  ViewXx: {
    marginBottom: 24,
  },
  IconrH: {
    width: 24,
    height: 24,
  },
  ViewSk: {
    justifyContent: 'center',
    width: 42,
    height: 42,
    alignItems: 'center',
  },
  ViewDg: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingRight: 14,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    paddingLeft: 14,
    height: 140,
    width: '100%',
    borderRightWidth: 1,
  },
  Touchablekk: {
    alignSelf: 'stretch',
    marginBottom: 10,
    width: '48%',
    marginTop: 14,
    marginLeft: 10,
  },
  TextR8: {
    textAlign: 'left',
  },
  Viewj6: {
    marginBottom: 24,
  },
  IconYO: {
    width: 24,
    height: 24,
  },
  ViewVe: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    width: 42,
  },
  VieweJ: {
    width: '100%',
    borderRightWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    paddingRight: 14,
    paddingBottom: 14,
    paddingTop: 14,
    borderBottomWidth: 1,
    paddingLeft: 14,
    height: 140,
  },
  TouchableQg: {
    alignSelf: 'stretch',
    marginBottom: 14,
    width: '48%',
    marginRight: 10,
  },
  TextGQ: {
    textAlign: 'left',
  },
  TextX9: {
    textAlign: 'left',
  },
  Viewbm: {
    marginBottom: 24,
  },
  IconFt: {
    width: 30,
    height: 30,
  },
  View_03: {
    justifyContent: 'center',
    width: 42,
    height: 42,
    alignItems: 'center',
  },
  ViewWt: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingRight: 14,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    paddingLeft: 14,
    height: 140,
    width: '100%',
    borderRightWidth: 1,
  },
  TouchablemW: {
    alignSelf: 'stretch',
    marginBottom: 14,
    width: '48%',
  },
  ViewHT: {
    justifyContent: 'space-evenly',
    paddingLeft: 32,
    alignItems: 'flex-start',
    paddingRight: 32,
    flexWrap: 'wrap',
    paddingBottom: 14,
    flexDirection: 'row',
  },
  ViewgZ: {
    paddingTop: 0,
    marginTop: 0,
  },
});

export default withTheme(MapScreen);
