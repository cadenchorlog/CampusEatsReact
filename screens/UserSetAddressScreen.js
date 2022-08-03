import React from 'react';
import * as GeocodioApi from '../apis/GeocodioApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import { MapMarker, MapView } from '@draftbit/maps';
import {
  ButtonOutline,
  IconButton,
  Row,
  ScreenContainer,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { StyleSheet, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const UserSetAddressScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

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
          style={styles.IconButtonYZ}
          icon={'Ionicons/chevron-back'}
          size={40}
        />
        <Text style={[styles.Textl3, { color: theme.colors.strong }]}>
          {'Set Delivery Location'}
        </Text>
      </Row>
      <>
        {!didGeocode ? null : (
          <Surface style={styles.Surface_2r}>
            <MapView
              style={styles.MapViewOl}
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
      <KeyboardAwareScrollView
        contentContainerStyle={styles.KeyboardAwareScrollViewX0Content}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={'never'}
        enableAutomaticScroll={true}
      >
        <Surface
          style={[
            styles.Surfaceb2,
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
            style={[styles.TextInput_6v, { borderColor: theme.colors.light }]}
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
              style={[styles.TextInput_0A, { borderColor: theme.colors.light }]}
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
              style={[styles.TextInputgA, { borderColor: theme.colors.light }]}
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
              style={[styles.TextInputxH, { borderColor: theme.colors.light }]}
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
                style={styles.ButtonOutline_4e}
                title={'Check Address'}
              />
            )}
          </>
          <>
            {!didGeocode ? null : (
              <ButtonOutline
                onPress={() => {
                  try {
                    navigation.goBack();
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles.ButtonOutlineP5}
                title={'Save Address'}
              />
            )}
          </>
        </Surface>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  IconButtonYZ: {
    marginTop: 70,
    marginLeft: '5%',
  },
  Textl3: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingTop: 72,
    paddingLeft: 8,
    paddingRight: 16,
    paddingBottom: 16,
  },
  MapViewOl: {
    flex: 1,
    height: '100%',
    maxHeight: '100%',
    width: '100%',
  },
  Surface_2r: {
    minHeight: 40,
    width: '90%',
    height: '30%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  TextInput_6v: {
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
  TextInput_0A: {
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
  TextInputgA: {
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
  TextInputxH: {
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
  ButtonOutline_4e: {
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
  ButtonOutlineP5: {
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
  Surfaceb2: {
    height: '150%',
  },
  KeyboardAwareScrollViewX0Content: {
    overflow: 'hidden',
    marginTop: 16,
  },
});

export default withTheme(UserSetAddressScreen);
