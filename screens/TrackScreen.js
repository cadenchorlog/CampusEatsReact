import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
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
  Surface,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const TrackScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const [lat, setLat] = React.useState(0);
  const [long, setLong] = React.useState(0);
  const [userLat, setUserLat] = React.useState(0);
  const [userLong, setUserLong] = React.useState('');

  const mapViewshEBZl8usRef = React.useRef();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={true}>
      <XanoApi.FetchSpecificOrderViewGET
        refetchInterval={30000}
        session_id={props.route?.params?.orderID ?? 41}
        onData={async fetchData => {
          try {
            setLat(fetchData?.driverCurrentLat);
            setLong(fetchData?.driverCurrentLong);
            const currentLocation = await Utils.getLocation();
            console.log(currentLocation);
            const lat = currentLocation.latitude;
            const long = currentLocation.longitude;
            setUserLat(lat);
            setUserLong(long);
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
              <Row justifyContent={'flex-start'} alignItems={'flex-end'}>
                <IconButton
                  onPress={() => {
                    try {
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={styles.IconButton_0f}
                  icon={'Entypo/chevron-thin-left'}
                  size={32}
                />
                <Text style={[styles.Textmx, { color: theme.colors.strong }]}>
                  {'Tracking Order #'}
                  {props.route?.params?.orderID ?? 41}
                </Text>
              </Row>
              <>
                {fetchData?.completed ? null : (
                  <Surface style={styles.SurfaceBr}>
                    <MapView
                      style={styles.MapViewhE}
                      latitude={userLat}
                      longitude={userLong}
                      zoomEnabled={true}
                      rotateEnabled={true}
                      scrollEnabled={true}
                      loadingEnabled={true}
                      showsPointsOfInterest={true}
                      apiKey={'AIzaSyC53v7BvSuA1yv7Hwf1rC_9kpHMmmYJJhU'}
                      showsUserLocation={true}
                      zoom={13}
                      ref={mapViewshEBZl8usRef}
                    >
                      <MapMarker
                        latitude={lat}
                        longitude={long}
                        title={'Driver'}
                        description={'Location'}
                        flat={false}
                      />
                    </MapView>
                  </Surface>
                )}
              </>
              <>
                {fetchData?.completed ? null : (
                  <Text style={[styles.TextWx, { color: theme.colors.strong }]}>
                    {'Current Stage:'}
                  </Text>
                )}
              </>
              <>
                {!fetchData?.completed ? null : (
                  <Text style={[styles.Textk2, { color: theme.colors.strong }]}>
                    {'Order Completed'}
                  </Text>
                )}
              </>
              <Row justifyContent={'center'} alignItems={'center'}>
                <Divider
                  style={styles.DivideruL}
                  color={theme.colors.primary}
                />
                <Icon
                  name={'MaterialCommunityIcons/numeric-1-circle'}
                  size={40}
                  color={theme.colors.primary}
                />
                <Divider
                  style={styles.Dividero1}
                  color={theme.colors.primary}
                />
                <>
                  {fetchData?.enRoute ? null : (
                    <Icon
                      name={'MaterialCommunityIcons/numeric-2-circle'}
                      size={40}
                    />
                  )}
                </>
                <>
                  {!fetchData?.enRoute ? null : (
                    <Icon
                      name={'MaterialCommunityIcons/numeric-2-circle'}
                      size={40}
                      color={theme.colors.primary}
                    />
                  )}
                </>
                <>
                  {fetchData?.enRoute ? null : (
                    <Divider
                      style={styles.Dividerp1}
                      color={theme.colors.divider}
                    />
                  )}
                </>
                <>
                  {!fetchData?.enRoute ? null : (
                    <Divider
                      style={styles.Divider_47}
                      color={theme.colors.primary}
                    />
                  )}
                </>
                <>
                  {fetchData?.completed ? null : (
                    <Icon
                      name={'MaterialCommunityIcons/checkbox-marked-circle'}
                      size={40}
                    />
                  )}
                </>
                <>
                  {!fetchData?.completed ? null : (
                    <Icon
                      name={'MaterialCommunityIcons/checkbox-marked-circle'}
                      size={40}
                      color={theme.colors.primary}
                    />
                  )}
                </>
                <>
                  {fetchData?.completed ? null : (
                    <Divider
                      style={styles.DividerAd}
                      color={theme.colors.divider}
                    />
                  )}
                </>
                <>
                  {!fetchData?.completed ? null : (
                    <Divider
                      style={styles.DividerUm}
                      color={theme.colors.primary}
                    />
                  )}
                </>
              </Row>
              <Spacer top={4} right={8} bottom={4} left={8} />
              <Row justifyContent={'center'} alignItems={'center'}>
                <Divider
                  style={styles.DividerGG}
                  color={theme.colors.background}
                />
                <Text style={[styles.Text_60, { color: theme.colors.strong }]}>
                  {'Order\nPlaced'}
                </Text>
                <Divider
                  style={styles.DividerK4}
                  color={theme.colors.background}
                />
                <Text style={[styles.TextIz, { color: theme.colors.strong }]}>
                  {'Picked\nUp'}
                </Text>
                <Divider
                  style={styles.Dividerer}
                  color={theme.colors.background}
                />
                <Text style={[styles.Texty1, { color: theme.colors.strong }]}>
                  {'Order\nArrived'}
                </Text>
                <Divider
                  style={styles.Dividerzy}
                  color={theme.colors.background}
                />
              </Row>
              <>
                {fetchData?.completed ? null : (
                  <ButtonSolid
                    onPress={() => {
                      try {
                        navigation.navigate('UserChatScreen', {
                          orderID: props.route?.params?.orderID ?? 41,
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={[
                      styles.ButtonSolidFt,
                      { backgroundColor: theme.colors.primary },
                    ]}
                    title={'Message Courier'}
                    icon={'MaterialCommunityIcons/android-messages'}
                  />
                )}
              </>
              <ButtonSolid
                onPress={() => {
                  try {
                    navigation.navigate('UserChatScreen', {
                      orderID: props.route?.params?.orderID ?? 41,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.ButtonSolidxK,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.primary,
                    color: theme.colors.primary,
                  },
                ]}
                title={'View Order Contents'}
                icon={'MaterialCommunityIcons/table-of-contents'}
              />
              <Text style={[styles.TextpH, { color: theme.colors.strong }]}>
                {'Order Total: '}
                {fetchData?.amount_total}
              </Text>
            </>
          );
        }}
      </XanoApi.FetchSpecificOrderViewGET>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  IconButton_0f: {
    marginBottom: 18,
    marginLeft: 16,
  },
  Textmx: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    marginTop: 40,
  },
  MapViewhE: {
    flex: 1,
  },
  SurfaceBr: {
    minHeight: 40,
    width: '90%',
    height: '30%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
  },
  TextWx: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 26,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    textAlign: 'center',
  },
  Textk2: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 26,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    textAlign: 'center',
  },
  DivideruL: {
    height: 5,
    width: '15%',
  },
  Dividero1: {
    height: 5,
    width: '15%',
  },
  Dividerp1: {
    height: 5,
    width: '15%',
  },
  Divider_47: {
    height: 5,
    width: '15%',
  },
  DividerAd: {
    height: 5,
    width: '15%',
  },
  DividerUm: {
    height: 5,
    width: '15%',
  },
  DividerGG: {
    height: 5,
    width: '13%',
  },
  Text_60: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  DividerK4: {
    height: 5,
    width: '12%',
  },
  TextIz: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  Dividerer: {
    height: 5,
    width: '12%',
  },
  Texty1: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  Dividerzy: {
    height: 5,
    width: '13%',
  },
  ButtonSolidFt: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },
  ButtonSolidxK: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  },
  TextpH: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  FetchEE: {
    minHeight: 40,
  },
});

export default withTheme(TrackScreen);
