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
  Stack,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const TrackScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const [lat, setLat] = React.useState(0);
  const [long, setLong] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [userLat, setUserLat] = React.useState(0);
  const [userLong, setUserLong] = React.useState('');

  const mapViewshEBZl8usRef = React.useRef();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <XanoApi.FetchSpecificOrderViewGET
        refetchInterval={30000}
        session_id={props.route?.params?.orderID ?? 84}
        onData={fetchData => {
          const handler = async () => {
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
              <Row justifyContent={'flex-start'} alignItems={'flex-end'}>
                <IconButton
                  onPress={() => {
                    try {
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={styles.IconButtonba106552}
                  icon={'Entypo/chevron-thin-left'}
                  size={32}
                />
                <Text
                  style={[styles.Textfb371129, { color: theme.colors.strong }]}
                >
                  {fetchData?.userOrder?.restaurantName}
                  {' Order #'}
                  {props.route?.params?.orderID ?? 84}
                </Text>
              </Row>
              <>
                {fetchData?.completed ? null : (
                  <Surface style={styles.Surface494c0973}>
                    {/* Map Views */}
                    <MapView
                      style={styles.MapViewc992f941}
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
                  <Text
                    style={[
                      styles.Text00d6867f,
                      { color: theme.colors.strong },
                    ]}
                  >
                    {'Current Stage:'}
                  </Text>
                )}
              </>
              <>
                {!fetchData?.completed ? null : (
                  <Text
                    style={[
                      styles.Text00d6867f,
                      { color: theme.colors.strong },
                    ]}
                  >
                    {'Order Completed'}
                  </Text>
                )}
              </>
              <Row justifyContent={'center'} alignItems={'center'}>
                <Divider
                  style={styles.Divider8ca704fc}
                  color={theme.colors.primary}
                />
                <Icon
                  name={'MaterialCommunityIcons/numeric-1-circle'}
                  size={40}
                  color={theme.colors.primary}
                />
                <Divider
                  style={styles.Divider8ca704fc}
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
                      style={styles.Divider8ca704fc}
                      color={theme.colors.divider}
                    />
                  )}
                </>
                <>
                  {!fetchData?.enRoute ? null : (
                    <Divider
                      style={styles.Divider8ca704fc}
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
                      style={styles.Divider8ca704fc}
                      color={theme.colors.divider}
                    />
                  )}
                </>
                <>
                  {!fetchData?.completed ? null : (
                    <Divider
                      style={styles.Divider8ca704fc}
                      color={theme.colors.primary}
                    />
                  )}
                </>
              </Row>
              <Spacer top={4} right={8} bottom={4} left={8} />
              <Row justifyContent={'center'} alignItems={'center'}>
                <Divider
                  style={styles.Divider02c21491}
                  color={theme.colors.background}
                />
                <Text
                  style={[styles.Textfc6a8388, { color: theme.colors.strong }]}
                >
                  {'Order\nPlaced'}
                </Text>
                <Divider
                  style={styles.Divider65945329}
                  color={theme.colors.background}
                />
                <Text
                  style={[styles.Textfc6a8388, { color: theme.colors.strong }]}
                >
                  {'Picked\nUp'}
                </Text>
                <Divider
                  style={styles.Divider65945329}
                  color={theme.colors.background}
                />
                <Text
                  style={[styles.Textfc6a8388, { color: theme.colors.strong }]}
                >
                  {'Order\nArrived'}
                </Text>
                <Divider
                  style={styles.Divider02c21491}
                  color={theme.colors.background}
                />
              </Row>
              <>
                {fetchData?.completed ? null : (
                  <ButtonSolid
                    onPress={() => {
                      try {
                        navigation.navigate('UserChatScreen', {
                          orderID: props.route?.params?.orderID ?? 84,
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={[
                      styles.ButtonSolid7d5c426d,
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
                    setModalOpen(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.ButtonSolid062cd685,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.primary,
                    color: theme.colors.primary,
                  },
                ]}
                title={'View Order Contents'}
                icon={'MaterialCommunityIcons/table-of-contents'}
              />
              <ButtonSolid
                onPress={() => {
                  try {
                    Linking.openURL('https://direct.lc.chat/14396454/');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.ButtonSolidc9daa8c2,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.primary,
                    color: theme.colors.primary,
                  },
                ]}
                title={'Contact CampusEats'}
                icon={'MaterialIcons/support-agent'}
              />
              <>
                {!modalOpen ? null : (
                  <Modal
                    animationType={'slide'}
                    presentationStyle={'pageSheet'}
                  >
                    {/* Header */}
                    <View style={styles.View80c79e26}>
                      <Row justifyContent={'flex-start'} alignItems={'center'}>
                        <IconButton
                          onPress={() => {
                            try {
                              setModalOpen(false);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={styles.IconButton897c6051}
                          icon={'MaterialCommunityIcons/close'}
                          size={32}
                        />
                        <Text
                          style={[
                            styles.Textf06b4705,
                            { color: theme.colors.strong },
                          ]}
                        >
                          {'Order Contents'}
                        </Text>
                      </Row>
                    </View>

                    <View style={styles.View0e1782af}>
                      <FlatList
                        data={fetchData?.userOrder?.items}
                        listKey={'MdvDMLzC'}
                        keyExtractor={item => item?.id || item?.uuid || item}
                        renderItem={({ item }) => {
                          const listData = item;
                          return (
                            <>
                              <Row
                                justifyContent={'flex-start'}
                                alignItems={'center'}
                              >
                                <Image
                                  style={styles.Image61c110c8}
                                  source={{ uri: `${listData?.itemImage}` }}
                                  resizeMode={'cover'}
                                />
                                <Stack
                                  justifyContent={'flex-start'}
                                  alignItems={'flex-start'}
                                >
                                  <Row
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                  >
                                    <Text
                                      style={[
                                        styles.Text1a0045e5,
                                        { color: theme.colors.strong },
                                      ]}
                                    >
                                      {listData?.itemName}
                                    </Text>

                                    <Text
                                      style={[
                                        styles.Text7f80e720,
                                        { color: theme.colors.strong },
                                      ]}
                                    >
                                      {'$'}
                                      {listData?.itemPrice}
                                    </Text>
                                  </Row>

                                  <Text
                                    style={[
                                      styles.Text6ebfd19b,
                                      { color: theme.colors.strong },
                                    ]}
                                  >
                                    {listData?.customizations}
                                  </Text>
                                </Stack>
                              </Row>
                              <Divider
                                style={styles.Divider6f17520d}
                                color={theme.colors.divider}
                              />
                            </>
                          );
                        }}
                        contentContainerStyle={styles.FlatListc992f941Content}
                        numColumns={1}
                      />
                    </View>

                    <Surface style={styles.Surface984452ed}>
                      <Text
                        style={[
                          styles.Text0b38f660,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {'Order Subtotal: $'}
                        {fetchData?.amount_subtotal}
                      </Text>

                      <Text
                        style={[
                          styles.Texte88c8a82,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {'Order Total: $'}
                        {fetchData?.amount_total}
                      </Text>
                    </Surface>
                  </Modal>
                )}
              </>
            </>
          );
        }}
      </XanoApi.FetchSpecificOrderViewGET>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  IconButtonba106552: {
    marginBottom: 18,
    marginLeft: 16,
  },
  Textfb371129: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    marginTop: 40,
  },
  MapViewc992f941: {
    flex: 1,
  },
  Surface494c0973: {
    minHeight: 40,
    width: '90%',
    height: '30%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
  },
  Text00d6867f: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 26,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    textAlign: 'center',
  },
  Divider8ca704fc: {
    height: 5,
    width: '15%',
  },
  Divider02c21491: {
    height: 5,
    width: '13%',
  },
  Textfc6a8388: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  Divider65945329: {
    height: 5,
    width: '12%',
  },
  ButtonSolid7d5c426d: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },
  ButtonSolid062cd685: {
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
  ButtonSolidc9daa8c2: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: '25%',
    marginRight: '25%',
    marginTop: 16,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    width: '50%',
  },
  IconButton897c6051: {
    marginLeft: 16,
  },
  Textf06b4705: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 48,
    paddingRight: 16,
    textAlign: 'center',
    marginRight: 48,
    alignSelf: 'flex-end',
    marginLeft: 0,
  },
  View80c79e26: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  Image61c110c8: {
    width: 60,
    height: 60,
    marginLeft: 20,
  },
  Text1a0045e5: {
    marginLeft: 20,
    marginTop: 12,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
  },
  Text7f80e720: {
    marginTop: 12,
    marginRight: 20,
    fontFamily: 'Poppins_600SemiBold',
    marginLeft: 20,
  },
  Text6ebfd19b: {
    marginLeft: 20,
    marginBottom: 12,
  },
  Divider6f17520d: {
    height: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  FlatListc992f941Content: {
    flex: 1,
  },
  View0e1782af: {
    height: '100%',
    paddingBottom: 120,
  },
  Text0b38f660: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 0,
  },
  Texte88c8a82: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 8,
  },
  Surface984452ed: {
    minHeight: 120,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  Fetch431eb058: {
    minHeight: 40,
  },
});

export default withTheme(TrackScreen);
