import React from 'react';
import * as GeocodioApi from '../apis/GeocodioApi.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
import { MapMarker, MapView } from '@draftbit/maps';
import {
  ButtonOutline,
  IconButton,
  Row,
  ScreenContainer,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const UserSetAddressScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const combineStringAddress = (Address, City, Zip, State) => {
    const fullAddress = Address + ' ' + City + ' ' + State + ', ' + Zip; // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.
    return fullAddress;
    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const { theme } = props;
  const { navigation } = props;

  const userAddressPOST = XanoApi.useUserAddressPOST();

  const [addressValue, setAddressValue] = React.useState('');
  const [cityValue, setCityValue] = React.useState('');
  const [didGeocode, setDidGeocode] = React.useState(false);
  const [geocodeLAT, setGeocodeLAT] = React.useState(0);
  const [geocodeLONG, setGeocodeLONG] = React.useState(0);
  const [stateValue, setStateValue] = React.useState('');
  const [zipValue, setZipValue] = React.useState('');

  const mapViewOll6EPzaRef = React.useRef();

  return (
    <ScreenContainer
      style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      hasSafeArea={false}
      scrollable={false}
    >
      <Row justifyContent={'flex-start'} alignItems={'flex-start'}>
        <IconButton
          onPress={() => {
            try {
              navigation.goBack();
            } catch (err) {
              console.error(err);
            }
          }}
          style={styles.IconButton782f7e86}
          icon={'Ionicons/chevron-back'}
          size={40}
        />
        <Text style={[styles.Textdca00c56, { color: theme.colors.strong }]}>
          {'Set Delivery Location'}
        </Text>
      </Row>
      <>
        {!didGeocode ? null : (
          <Surface style={styles.Surfaceed39b37b}>
            <MapView
              style={styles.MapView9b634705}
              latitude={37.40241}
              longitude={-122.12125}
              zoom={8}
              zoomEnabled={false}
              rotateEnabled={true}
              scrollEnabled={true}
              loadingEnabled={true}
              showsPointsOfInterest={true}
              apiKey={'AIzaSyC53v7BvSuA1yv7Hwf1rC_9kpHMmmYJJhU'}
              showsUserLocation={true}
              followsUserLocation={false}
              ref={mapViewOll6EPzaRef}
            >
              <MapMarker
                latitude={geocodeLAT}
                longitude={geocodeLONG}
                title={'Entered Address'}
              />
            </MapView>
          </Surface>
        )}
      </>
      <XanoApi.FetchGetUserRecordGET
        user_id={Constants['user_id']}
        onData={fetchData => {
          try {
            if (!fetchData?.addressSet) {
              return;
            }
            Utils.showAlert({
              title: 'Address Already Saved',
              message:
                'Continuing will replace your old address. You can always go back.',
              buttonText: 'OK',
            });
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ loading, error, data, refetchGetUserRecord }) => {
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
            <KeyboardAwareScrollView
              contentContainerStyle={
                styles.KeyboardAwareScrollView82e0832aContent
              }
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps={'never'}
              enableAutomaticScroll={true}
            >
              <Surface
                style={[
                  styles.Surfaced2208edb,
                  { backgroundColor: theme.colors.background },
                ]}
              >
                <TextInput
                  onChangeText={newTextInputValue => {
                    try {
                      setAddressValue(newTextInputValue);
                      setDidGeocode(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={[
                    styles.TextInput0db87d08,
                    { borderColor: theme.colors.light },
                  ]}
                  placeholder={'Address Line'}
                  value={null}
                  placeholderTextColor={theme.colors.light}
                  autoCapitalize={'words'}
                />
                <Row justifyContent={'space-between'} alignItems={'center'}>
                  <TextInput
                    onChangeText={newTextInputValue => {
                      try {
                        setCityValue(newTextInputValue);
                        setDidGeocode(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={[
                      styles.TextInput815295d3,
                      { borderColor: theme.colors.light },
                    ]}
                    placeholder={'City'}
                    value={null}
                    placeholderTextColor={theme.colors.light}
                  />
                  <TextInput
                    onChangeText={newTextInputValue => {
                      try {
                        setDidGeocode(false);
                        setStateValue(newTextInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={[
                      styles.TextInput5c32179a,
                      { borderColor: theme.colors.light },
                    ]}
                    placeholder={'State'}
                    placeholderTextColor={theme.colors.light}
                  />
                  <TextInput
                    onChangeText={newTextInputValue => {
                      try {
                        setDidGeocode(false);
                        setZipValue(newTextInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={[
                      styles.TextInputcfa1c5d0,
                      { borderColor: theme.colors.light },
                    ]}
                    placeholder={'ZIP'}
                    placeholderTextColor={theme.colors.light}
                  />
                </Row>
                <>
                  {didGeocode ? null : (
                    <ButtonOutline
                      onPress={async () => {
                        try {
                          const geocodeResult = await GeocodioApi.geocodeGET(
                            Constants,
                            {
                              api_key: Constants['geocodio_api_key'],
                              city: cityValue,
                              state: stateValue,
                              street: addressValue,
                              zip: zipValue,
                            }
                          );
                          const latitude = geocodeResult.lat;
                          const longitude = geocodeResult.lng;
                          setGeocodeLAT(latitude);
                          setGeocodeLONG(longitude);
                          setDidGeocode(true);
                          mapViewOll6EPzaRef.current.animateToLocation({
                            latitude: latitude,
                            longitude: longitude,
                            zoom: 19,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={styles.ButtonOutline6b352d80}
                      title={'Check Address'}
                    />
                  )}
                </>
                <>
                  {!didGeocode ? null : (
                    <ButtonOutline
                      onPress={async () => {
                        try {
                          const combined = combineStringAddress(
                            addressValue,
                            cityValue,
                            zipValue,
                            stateValue
                          );
                          await userAddressPOST.mutateAsync({
                            UID: Constants['user_id'],
                            addressString: combined,
                            lat: geocodeLAT,
                            long: geocodeLONG,
                          });
                          Utils.showAlert({
                            title: 'Success!',
                            message: 'Address has been saved to your account.',
                            buttonText: 'OK',
                          });
                          navigation.goBack();
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={styles.ButtonOutline6b352d80}
                      title={'Save Address'}
                    />
                  )}
                </>
              </Surface>
            </KeyboardAwareScrollView>
          );
        }}
      </XanoApi.FetchGetUserRecordGET>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  IconButton782f7e86: {
    marginTop: 70,
    marginLeft: '5%',
  },
  Textdca00c56: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingTop: 72,
    paddingLeft: 8,
    paddingRight: 16,
    paddingBottom: 16,
  },
  MapView9b634705: {
    flex: 1,
    height: '100%',
    maxHeight: '100%',
    width: '100%',
  },
  Surfaceed39b37b: {
    minHeight: 40,
    width: '90%',
    height: '30%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  TextInput0db87d08: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    marginLeft: '5%',
    marginRight: '5%',
    height: 50,
    marginBottom: 10,
  },
  TextInput815295d3: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    marginLeft: '5%',
    height: 50,
    minWidth: 120,
  },
  TextInput5c32179a: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    height: 50,
    minWidth: 100,
  },
  TextInputcfa1c5d0: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    height: 50,
    minWidth: 100,
    marginRight: '5%',
  },
  ButtonOutline6b352d80: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    marginTop: 16,
    marginLeft: '5%',
    marginRight: '5%',
  },
  Surfaced2208edb: {
    height: '150%',
  },
  KeyboardAwareScrollView82e0832aContent: {
    overflow: 'hidden',
    marginTop: 16,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
});

export default withTheme(UserSetAddressScreen);
