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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  React.useEffect(() => {
    const handler = async () => {
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
    };
    handler();
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
      <KeyboardAwareScrollView
        style={styles.KeyboardAwareScrollView6559c7e9}
        contentContainerStyle={styles.KeyboardAwareScrollView6559c7e9Content}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={'never'}
      >
        <Surface style={styles.Surface6400fc79}>
          <MapView
            style={styles.MapView37c37e1e}
            latitude={currentLat}
            longitude={currentLong}
            zoom={16}
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
        </Surface>

        <Surface
          style={[
            styles.Surfaceac21182a,
            { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
          ]}
        >
          <Row justifyContent={'space-around'} alignItems={'center'}>
            {/* Search Field */}
            <View
              style={[
                styles.View9deeaf2f,
                { backgroundColor: theme.colors.divider, borderRadius: 12 },
              ]}
            >
              <View>
                {/* Search Button */}
                <IconButton
                  icon={'MaterialIcons/search'}
                  size={32}
                  color={theme.colors.light}
                />
              </View>
              <Spacer top={0} right={3} bottom={0} left={3} />
              <View style={styles.Viewc992f941}>
                {/* Search Input */}
                <TextInput
                  onChangeText={newSearchInputValue => {
                    const textInputValue = newSearchInputValue;
                    try {
                      setTextInputValue(textInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={styles.TextInputbaf7ad36}
                  placeholder={'Search...'}
                  value={textInputValue}
                />
              </View>
            </View>
            {/* showDrawer */}
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
                  style={styles.IconButtonbcce0fc4}
                  icon={'Ionicons/grid'}
                  size={32}
                  color={theme.colors.light}
                />
              )}
            </>
            {/* hideDrawer */}
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
                  style={styles.IconButtonbcce0fc4}
                  icon={'Entypo/chevron-thin-down'}
                  size={32}
                  color={theme.colors.light}
                />
              )}
            </>
          </Row>
        </Surface>
      </KeyboardAwareScrollView>
      <>
        {!drawerOpened ? null : (
          <View style={styles.Viewac5e8875}>
            {/* Grid */}
            <View
              style={[
                styles.View1acef5e2,
                { backgroundColor: theme.colors.strongInverse },
              ]}
              needsOffscreenAlphaCompositing={false}
            >
              {/* Profile */}
              <Touchable
                onPress={() => {
                  try {
                    navigation.navigate('AccountScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles.Touchableaf6910bf}
              >
                <View
                  style={[
                    styles.View1aef42d9,
                    {
                      borderRadius: theme.roundness,
                      borderColor: theme.colors.divider,
                      backgroundColor: theme.colors.background,
                    },
                  ]}
                >
                  <Icon
                    style={styles.Icon6bf74529}
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
                      style={[
                        styles.Text8a1d4f88,
                        { color: theme.colors.strong },
                      ]}
                      allowFontScaling={true}
                    >
                      {'Hi '}
                      {Constants['user_name']}
                      {'!'}
                    </Text>

                    <Text
                      style={[
                        styles.Text058e2418,
                        { color: theme.colors.strong },
                      ]}
                      allowFontScaling={true}
                    >
                      {'View your account'}
                    </Text>
                  </Stack>
                </View>
              </Touchable>
              {/* Courier */}
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
                style={styles.Touchable2e5bf580}
              >
                <View
                  style={[
                    styles.View0f4451f3,
                    {
                      borderRadius: theme.roundness,
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.divider,
                    },
                  ]}
                >
                  <View style={styles.View94ee2e18}>
                    <Text
                      style={[
                        theme.typography.headline6,
                        styles.Textca4d6164,
                        { color: theme.colors.strong },
                      ]}
                      allowFontScaling={true}
                    >
                      {'Switch to\nCourier\n'}
                    </Text>
                    <Icon
                      style={styles.Icon84575dc9}
                      name={'MaterialCommunityIcons/truck-delivery'}
                      size={32}
                      color={theme.colors.strong}
                    />
                  </View>
                </View>
              </Touchable>
              {/* Address */}
              <Touchable
                onPress={() => {
                  try {
                    navigation.navigate('UserSetAddressScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles.Touchableb3269bed}
              >
                <View
                  style={[
                    styles.View57ac46a1,
                    {
                      borderRadius: theme.roundness,
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.divider,
                    },
                  ]}
                >
                  <View style={styles.View837d8621}>
                    <Text
                      style={[
                        theme.typography.headline6,
                        styles.Text4b62e5ec,
                        { color: theme.colors.strong },
                      ]}
                      allowFontScaling={true}
                    >
                      {'Delivery\nAddress'}
                    </Text>
                    <Icon
                      style={styles.Icon013300ec}
                      size={26}
                      name={'Ionicons/md-home'}
                      color={theme.colors.strong}
                    />
                  </View>
                </View>
              </Touchable>
              {/* Sign Out */}
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
                style={styles.Touchablec4f3901b}
              >
                <View
                  style={[
                    styles.View075ba974,
                    {
                      borderRadius: theme.roundness,
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.divider,
                    },
                  ]}
                >
                  <View style={styles.View3b106cac}>
                    <Text
                      style={[
                        theme.typography.headline6,
                        styles.Textca4d6164,
                        { color: theme.colors.strong },
                      ]}
                      allowFontScaling={true}
                    >
                      {'Sign Out'}
                    </Text>
                    <Icon
                      style={styles.Icon9e5973b7}
                      name={'MaterialIcons/logout'}
                      size={24}
                      color={theme.colors.error}
                    />
                  </View>
                </View>
              </Touchable>
              {/* help */}
              <Touchable style={styles.Touchable1b2cb320}>
                <View
                  style={[
                    styles.View075ba974,
                    {
                      borderRadius: theme.roundness,
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.divider,
                    },
                  ]}
                >
                  <View style={styles.View3b106cac}>
                    <Text
                      style={[
                        theme.typography.headline6,
                        styles.Textca4d6164,
                        { color: theme.colors.strong },
                      ]}
                      allowFontScaling={true}
                    >
                      {'Help'}
                    </Text>
                    <Icon
                      style={styles.Icon9e5973b7}
                      name={'Entypo/help-with-circle'}
                      size={24}
                      color={theme.colors.error}
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
  MapView37c37e1e: {
    flex: 1,
    marginBottom: -25,
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    height: '100%',
  },
  Surface6400fc79: {
    height: '95%',
  },
  TextInputbaf7ad36: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 18,
  },
  Viewc992f941: {
    flex: 1,
  },
  View9deeaf2f: {
    paddingLeft: 12,
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '15%',
  },
  IconButtonbcce0fc4: {
    right: 25,
  },
  Surfaceac21182a: {
    minHeight: 70,
    justifyContent: 'space-around',
    alignContent: 'space-around',
    overflow: 'hidden',
    bottom: 0,
    position: 'absolute',
    right: 0,
    left: 0,
  },
  KeyboardAwareScrollView6559c7e9: {
    height: '100%',
  },
  KeyboardAwareScrollView6559c7e9Content: {
    minHeight: '100%',
    maxHeight: '100%',
  },
  Icon6bf74529: {
    width: 40,
    height: 40,
  },
  Text8a1d4f88: {
    textAlign: 'left',
    fontSize: 20,
  },
  Text058e2418: {
    textAlign: 'left',
    fontSize: 14,
  },
  View1aef42d9: {
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
  Touchableaf6910bf: {
    width: '100%',
    marginBottom: 14,
    marginTop: 14,
    alignSelf: 'stretch',
    height: 75,
  },
  Textca4d6164: {
    textAlign: 'left',
  },
  Icon84575dc9: {
    width: 32,
    height: 32,
  },
  View94ee2e18: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  View0f4451f3: {
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
    height: 80,
  },
  Touchable2e5bf580: {
    alignSelf: 'stretch',
    marginBottom: 10,
    width: '48%',
    marginTop: 14,
  },
  Text4b62e5ec: {
    textAlign: 'left',
  },
  Icon013300ec: {
    width: 26,
    height: 26,
  },
  View837d8621: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  View57ac46a1: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    height: 80,
    width: '100%',
    borderRightWidth: 1,
    paddingLeft: 14,
    paddingTop: 14,
    paddingRight: 14,
    paddingBottom: 14,
  },
  Touchableb3269bed: {
    alignSelf: 'stretch',
    marginBottom: 10,
    width: '48%',
    marginTop: 14,
    marginLeft: 10,
  },
  Icon9e5973b7: {
    width: 24,
    height: 24,
  },
  View3b106cac: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  View075ba974: {
    width: '100%',
    borderRightWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    paddingRight: 14,
    paddingBottom: 14,
    paddingTop: 14,
    borderBottomWidth: 1,
    paddingLeft: 14,
    height: 60,
  },
  Touchablec4f3901b: {
    alignSelf: 'stretch',
    marginBottom: 14,
    width: '48%',
    marginTop: 4,
  },
  Touchable1b2cb320: {
    alignSelf: 'stretch',
    marginBottom: 10,
    width: '48%',
    marginTop: 4,
    marginLeft: 10,
  },
  View1acef5e2: {
    justifyContent: 'space-evenly',
    paddingLeft: 12,
    alignItems: 'flex-start',
    paddingRight: 12,
    flexWrap: 'wrap',
    paddingBottom: 14,
    flexDirection: 'row',
  },
  Viewac5e8875: {
    paddingTop: 0,
    marginTop: 0,
  },
});

export default withTheme(MapScreen);
