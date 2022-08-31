import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import isArrayEmpty from '../custom/isArrayEmpty';
import { MapMarker, MapView } from '@draftbit/maps';
import {
  ButtonSolid,
  CircleImage,
  Icon,
  IconButton,
  Row,
  ScreenContainer,
  Spacer,
  Stack,
  StarRating,
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
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const OrderScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const openMapApp = (longitude, latitude) => {
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

  const checkSearchField = searchField => {
    if (typeof searchField === 'string' && searchField.trim().length === 0) {
      console.log('string is empty');
      return false;
    } else {
      console.log('string is NOT empty');
      refetchGetAllStores();
      return true;
    } // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const { theme } = props;
  const { navigation } = props;

  const [campusEmpty, setCampusEmpty] = React.useState(false);
  const [courierEmpty, setCourierEmpty] = React.useState(false);
  const [mapOpen, setMapOpen] = React.useState(false);
  const [offersOpen, setOffersOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [searchInputValue, setSearchInputValue] = React.useState(' ');
  const [storeLat, setStoreLat] = React.useState(0);
  const [storeLong, setStoreLong] = React.useState(0);

  const mapViewgdzxBb5HRef = React.useRef();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
    >
      <KeyboardAvoidingView
        enabled={true}
        behavior={'padding'}
        keyboardVerticalOffset={45}
      >
        <Text style={[styles.Text85b763cf, { color: theme.colors.strong }]}>
          {'Order'}
        </Text>

        <Row justifyContent={'space-between'} alignItems={'center'}>
          {/* Search Field */}
          <View
            style={[
              styles.View64d89b6e,
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
                  const handler = async () => {
                    try {
                      setSearchInputValue(newSearchInputValue);
                      const result = checkSearchField(newSearchInputValue);
                      if (result) {
                        return;
                      }
                      setSearchInputValue(' ');
                      await refetchGetAllStores();
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={styles.TextInputbaf7ad36}
                value={searchInputValue}
                placeholder={'Search...'}
                returnKeyType={'done'}
                clearButtonMode={'always'}
              />
            </View>
          </View>
          {/* showDrawer */}
          <IconButton
            onPress={() => {
              try {
                setOpenDrawer(true);
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles.IconButton28dcfe17}
            icon={'Ionicons/grid'}
            size={32}
            color={theme.colors.light}
          />
        </Row>

        <ScrollView showsVerticalScrollIndicator={true} bounces={true}>
          <Spacer top={4} right={8} bottom={4} left={8} />
          <XanoApi.FetchGetAllStoresGET
            UID={Constants['user_id']}
            onCampus={false}
            searchterm={searchInputValue}
            onData={fetchData => {
              try {
                const courierResult = isArrayEmpty(fetchData?.campusDetails);
                setCourierEmpty(false);
                if (!courierResult) {
                  return;
                }
                setCourierEmpty(true);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {({ loading, error, data, refetchGetAllStores }) => {
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
                  {/* courierOffers */}
                  <>
                    {courierEmpty ? null : (
                      <View style={styles.Viewd63bc9bc}>
                        {/* Heading */}
                        <View style={styles.View9fa86917}>
                          <Row
                            justifyContent={'space-between'}
                            alignItems={'flex-start'}
                          >
                            {/* Primary */}
                            <Text
                              style={[
                                styles.Text84b3e508,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {'Courier Offers'}
                            </Text>

                            <Touchable
                              onPress={() => {
                                try {
                                  setOffersOpen(true);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                style={[
                                  styles.Text34e0cb74,
                                  { color: theme.colors.primary },
                                ]}
                              >
                                {'See All'}
                              </Text>
                            </Touchable>
                          </Row>
                          {/* Secondary */}
                          <Text style={{ color: theme.colors.strong }}>
                            {'Off campus options'}
                          </Text>
                        </View>
                        {/* courierList */}
                        <FlatList
                          data={fetchData?.campusDetails}
                          listKey={'HQwHamTL'}
                          keyExtractor={item => item?.id || item?.uuid || item}
                          renderItem={({ item }) => {
                            const courierListData = item;
                            return (
                              <Touchable
                                onPress={() => {
                                  try {
                                    navigation.navigate(
                                      'RestaurantViewScreen',
                                      { storeID: courierListData?.id }
                                    );
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <Surface
                                  style={[
                                    styles.Surface56d97cb4,
                                    { borderRadius: 8 },
                                  ]}
                                >
                                  <View
                                    style={[
                                      styles.View1b1f79af,
                                      {
                                        borderTopLeftRadius: 8,
                                        borderTopRightRadius: 8,
                                      },
                                    ]}
                                  >
                                    <Image
                                      style={styles.Imagea98db7de}
                                      source={{
                                        uri: `${courierListData?.storeImage}`,
                                      }}
                                      resizeMode={'cover'}
                                    />
                                  </View>
                                  <CircleImage
                                    style={styles.CircleImage34352bf1}
                                    source={{
                                      uri: `${courierListData?.storeIcon}`,
                                    }}
                                    size={60}
                                  />
                                  <Row
                                    justifyContent={'space-between'}
                                    alignItems={'flex-end'}
                                  >
                                    <Stack
                                      justifyContent={'flex-start'}
                                      alignItems={'flex-start'}
                                    >
                                      {/* Name */}
                                      <Text
                                        style={[
                                          styles.Textb73c4ca6,
                                          { color: theme.colors.strong },
                                        ]}
                                      >
                                        {courierListData?.storeName}
                                      </Text>
                                      {/* Style */}
                                      <Text
                                        style={[
                                          styles.Textcd669454,
                                          { color: theme.colors.medium },
                                        ]}
                                      >
                                        {'$'}
                                        {courierListData?.deliveryFee}
                                        {' Delivery Fee'}
                                      </Text>
                                    </Stack>

                                    <Stack
                                      justifyContent={'flex-start'}
                                      alignItems={'flex-end'}
                                    >
                                      <StarRating
                                        style={styles.StarRatinga57a4184}
                                        starSize={16}
                                        maxStars={5}
                                        activeColor={theme.colors.primary}
                                        inactiveColor={theme.colors.divider}
                                        defaultValue={
                                          courierListData?.storeRating
                                        }
                                      />
                                      {/* Style */}
                                      <Text
                                        style={[
                                          styles.Text25694ba4,
                                          { color: theme.colors.medium },
                                        ]}
                                      >
                                        {courierListData?.storeRating}
                                        {' Stars'}
                                      </Text>
                                    </Stack>
                                    <IconButton
                                      onPress={() => {
                                        try {
                                          setStoreLat(
                                            courierListData?.storeLat
                                          );
                                          setStoreLong(
                                            courierListData?.storeLong
                                          );
                                          setMapOpen(true);
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                      style={styles.IconButton2c3e883b}
                                      icon={'MaterialCommunityIcons/map-marker'}
                                      size={35}
                                      color={theme.colors.primary}
                                    />
                                  </Row>
                                </Surface>
                              </Touchable>
                            );
                          }}
                          contentContainerStyle={styles.FlatListe3f3fa82Content}
                          numColumns={1}
                          horizontal={true}
                        />
                      </View>
                    )}
                  </>
                </>
              );
            }}
          </XanoApi.FetchGetAllStoresGET>
          <>
            {courierEmpty ? null : (
              <Spacer top={8} right={8} bottom={8} left={8} />
            )}
          </>
          <XanoApi.FetchGetAllStoresGET
            UID={Constants['user_id']}
            onCampus={true}
            searchterm={searchInputValue}
            onData={fetchData => {
              try {
                const campusResult = isArrayEmpty(fetchData?.campusDetails);
                setCampusEmpty(false);
                if (!campusResult) {
                  return;
                }
                setCampusEmpty(true);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {({ loading, error, data, refetchGetAllStores }) => {
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
                  {/* campusOffers */}
                  <>
                    {campusEmpty ? null : (
                      <View style={styles.Viewdf29e2e2}>
                        {/* Heading */}
                        <View style={styles.View9fa86917}>
                          <Row
                            justifyContent={'space-between'}
                            alignItems={'flex-start'}
                          >
                            {/* Primary */}
                            <Text
                              style={[
                                styles.Text84b3e508,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {'Campus Offers'}
                            </Text>
                          </Row>
                          {/* Secondary */}
                          <Text style={{ color: theme.colors.strong }}>
                            {'Places on campus'}
                          </Text>
                        </View>
                        {/* campusList */}
                        <FlatList
                          data={fetchData?.campusDetails}
                          listKey={'wB9pCiba'}
                          keyExtractor={item => item?.id || item?.uuid || item}
                          renderItem={({ item }) => {
                            const campusListData = item;
                            return (
                              <>
                                <Touchable
                                  onPress={() => {
                                    try {
                                      navigation.navigate(
                                        'RestaurantViewScreen',
                                        { storeID: campusListData?.id }
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  style={styles.Touchable7d2b959f}
                                >
                                  {/* campusSurface */}
                                  <Surface
                                    style={[
                                      styles.Surface8012acab,
                                      { borderRadius: 8 },
                                    ]}
                                  >
                                    <View
                                      style={[
                                        styles.View78e61bd0,
                                        {
                                          borderTopLeftRadius: 8,
                                          borderTopRightRadius: 8,
                                        },
                                      ]}
                                    >
                                      <Image
                                        style={styles.Imagea98db7de}
                                        source={{
                                          uri: `${campusListData?.storeImage}`,
                                        }}
                                        resizeMode={'cover'}
                                      />
                                    </View>
                                    <CircleImage
                                      style={styles.CircleImage34352bf1}
                                      source={{
                                        uri: `${campusListData?.storeIcon}`,
                                      }}
                                      size={60}
                                    />
                                    <Row
                                      justifyContent={'space-between'}
                                      alignItems={'flex-end'}
                                    >
                                      <Stack
                                        justifyContent={'flex-start'}
                                        alignItems={'flex-start'}
                                      >
                                        {/* Name */}
                                        <Text
                                          style={[
                                            styles.Text26f0ecb9,
                                            { color: theme.colors.strong },
                                          ]}
                                        >
                                          {campusListData?.storeName}
                                        </Text>
                                        {/* Style */}
                                        <Text
                                          style={[
                                            styles.Textcd669454,
                                            { color: theme.colors.medium },
                                          ]}
                                        >
                                          {'$'}
                                          {campusListData?.deliveryFee}
                                          {' Delivery Fee'}
                                        </Text>
                                      </Stack>

                                      <Row
                                        justifyContent={'flex-start'}
                                        alignItems={'flex-start'}
                                      >
                                        <Stack
                                          justifyContent={'flex-start'}
                                          alignItems={'flex-end'}
                                        >
                                          <StarRating
                                            style={styles.StarRating27d4405a}
                                            starSize={16}
                                            maxStars={5}
                                            activeColor={theme.colors.primary}
                                            inactiveColor={theme.colors.divider}
                                            defaultValue={
                                              campusListData?.storeRating
                                            }
                                          />
                                          {/* Style */}
                                          <Text
                                            style={[
                                              styles.Text23f672fe,
                                              { color: theme.colors.medium },
                                            ]}
                                          >
                                            {campusListData?.storeRating}
                                            {' Stars'}
                                          </Text>
                                        </Stack>
                                        <IconButton
                                          onPress={() => {
                                            try {
                                              setStoreLat(
                                                campusListData?.storeLat
                                              );
                                              setStoreLong(
                                                campusListData?.storeLong
                                              );
                                              setMapOpen(true);
                                            } catch (err) {
                                              console.error(err);
                                            }
                                          }}
                                          style={styles.IconButton2c3e883b}
                                          icon={
                                            'MaterialCommunityIcons/map-marker'
                                          }
                                          size={35}
                                          color={theme.colors.primary}
                                        />
                                      </Row>
                                    </Row>
                                  </Surface>
                                </Touchable>
                                <Spacer
                                  top={8}
                                  right={10}
                                  bottom={8}
                                  left={10}
                                />
                              </>
                            );
                          }}
                          style={styles.FlatList754b2e07}
                          contentContainerStyle={styles.FlatList754b2e07Content}
                          numColumns={1}
                          horizontal={false}
                        />
                      </View>
                    )}
                  </>
                </>
              );
            }}
          </XanoApi.FetchGetAllStoresGET>
          <Spacer right={8} bottom={8} left={8} top={110} />
        </ScrollView>
      </KeyboardAvoidingView>
      {/* offerList */}
      <>
        {!offersOpen ? null : (
          <Modal animationType={'slide'} presentationStyle={'pageSheet'}>
            {/* Popular Places */}
            <XanoApi.FetchGetAllStoresGET
              UID={Constants['user_id']}
              onCampus={false}
              searchterm={' '}
            >
              {({ loading, error, data, refetchGetAllStores }) => {
                const popularPlacesData = data;
                if (!popularPlacesData || loading) {
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
                  <View style={styles.Viewbbfb22dd}>
                    {/* Heading */}
                    <View style={styles.View9fa86917}>
                      <Row
                        justifyContent={'space-between'}
                        alignItems={'flex-start'}
                      >
                        {/* Primary */}
                        <Text
                          style={[
                            styles.Textf90d72c6,
                            { color: theme.colors.strong },
                          ]}
                        >
                          {'Courier Offers'}
                        </Text>
                        <IconButton
                          onPress={() => {
                            try {
                              setOffersOpen(false);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={styles.IconButton5f47a348}
                          icon={'AntDesign/close'}
                          size={32}
                        />
                      </Row>
                      {/* Secondary */}
                      <Text style={{ color: theme.colors.strong }}>
                        {'Off campus options'}
                      </Text>
                    </View>
                    <FlatList
                      data={popularPlacesData?.campusDetails}
                      listKey={'38Kv5lnu'}
                      keyExtractor={item => item?.id || item?.uuid || item}
                      renderItem={({ item }) => {
                        const listData = item;
                        return (
                          <>
                            <Touchable
                              onPress={() => {
                                try {
                                  navigation.navigate('RestaurantViewScreen', {
                                    storeID: listData?.id,
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              style={styles.Touchable7d2b959f}
                            >
                              <Surface
                                style={[
                                  styles.Surface8012acab,
                                  { borderRadius: 8 },
                                ]}
                              >
                                <View
                                  style={[
                                    styles.View78e61bd0,
                                    {
                                      borderTopLeftRadius: 8,
                                      borderTopRightRadius: 8,
                                    },
                                  ]}
                                >
                                  <Image
                                    style={styles.Imagea98db7de}
                                    source={{ uri: `${listData?.storeImage}` }}
                                    resizeMode={'cover'}
                                  />
                                </View>
                                <CircleImage
                                  style={styles.CircleImage34352bf1}
                                  source={{ uri: `${listData?.storeIcon}` }}
                                  size={60}
                                />
                                <Row
                                  justifyContent={'space-between'}
                                  alignItems={'flex-end'}
                                >
                                  <Stack
                                    justifyContent={'flex-start'}
                                    alignItems={'flex-start'}
                                  >
                                    {/* Name */}
                                    <Text
                                      style={[
                                        styles.Text26f0ecb9,
                                        { color: theme.colors.strong },
                                      ]}
                                    >
                                      {listData?.storeName}
                                    </Text>
                                    {/* Style */}
                                    <Text
                                      style={[
                                        styles.Textcd669454,
                                        { color: theme.colors.medium },
                                      ]}
                                    >
                                      {'$'}
                                      {listData?.deliveryFee}
                                      {' Delivery Fee'}
                                    </Text>
                                  </Stack>

                                  <Stack
                                    justifyContent={'flex-start'}
                                    alignItems={'flex-start'}
                                  >
                                    <StarRating
                                      style={styles.StarRating2c3e883b}
                                      starSize={16}
                                      maxStars={5}
                                      activeColor={theme.colors.primary}
                                      inactiveColor={theme.colors.divider}
                                      defaultValue={listData?.storeRating}
                                    />
                                    {/* Style */}
                                    <Text
                                      style={[
                                        styles.Text621d5cae,
                                        { color: theme.colors.medium },
                                      ]}
                                    >
                                      {listData?.storeRating}
                                      {' Stars'}
                                    </Text>
                                  </Stack>
                                </Row>
                              </Surface>
                            </Touchable>
                            <Spacer top={8} right={10} bottom={8} left={10} />
                          </>
                        );
                      }}
                      style={styles.FlatList754b2e07}
                      contentContainerStyle={styles.FlatList754b2e07Content}
                      numColumns={1}
                      horizontal={false}
                    />
                  </View>
                );
              }}
            </XanoApi.FetchGetAllStoresGET>
            <View />
          </Modal>
        )}
      </>
      {/* mapView */}
      <>
        {!mapOpen ? null : (
          <Modal animationType={'slide'} presentationStyle={'pageSheet'}>
            <Surface style={styles.Surfacec0dec774}>
              <MapView
                style={styles.MapViewc992f941}
                latitude={storeLat}
                longitude={storeLong}
                zoom={14}
                zoomEnabled={true}
                rotateEnabled={true}
                scrollEnabled={true}
                loadingEnabled={true}
                showsPointsOfInterest={true}
                apiKey={'AIzaSyC53v7BvSuA1yv7Hwf1rC_9kpHMmmYJJhU'}
                ref={mapViewgdzxBb5HRef}
              >
                <MapMarker
                  latitude={storeLat}
                  longitude={storeLong}
                  title={'Store Location'}
                />
              </MapView>
            </Surface>

            <Surface style={[styles.Surface2df1c553, { borderRadius: 16 }]}>
              <Text
                style={[styles.Text58d1c036, { color: theme.colors.strong }]}
              >
                {'Store Location'}
              </Text>
              <ButtonSolid
                onPress={() => {
                  try {
                    const url = openMapApp(storeLong, storeLat);
                    Linking.openURL(`${url}`);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.ButtonSolidd6d80f99,
                  { backgroundColor: theme.colors.primary },
                ]}
                title={'Open in Maps'}
              />
            </Surface>
            <IconButton
              onPress={() => {
                try {
                  setMapOpen(false);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles.IconButton007f30a6}
              icon={'AntDesign/closecircle'}
              size={32}
            />
          </Modal>
        )}
      </>
      {/* dashboardModal */}
      <>
        {!openDrawer ? null : (
          <Modal animationType={'slide'} presentationStyle={'pageSheet'}>
            {/* Header */}
            <View style={styles.View40d56b89}>
              <Row justifyContent={'space-between'} alignItems={'center'}>
                <Text
                  style={[styles.Textd59ae7c0, { color: theme.colors.strong }]}
                >
                  {'Dashboard'}
                </Text>
                <IconButton
                  onPress={() => {
                    try {
                      setOpenDrawer(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={styles.IconButton2c3e883b}
                  icon={'AntDesign/close'}
                  size={40}
                />
              </Row>
            </View>
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
                    setOpenDrawer(false);
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
                    setOpenDrawer(false);
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
                    setOpenDrawer(false);
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
                    setOpenDrawer(false);
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
              <Touchable
                onPress={() => {
                  try {
                    setOpenDrawer(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles.Touchable1b2cb320}
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

            <Text style={[styles.Textb536ac60, { color: theme.colors.strong }]}>
              {'Copyright Campus Eats 2022'}
            </Text>
          </Modal>
        )}
      </>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Text85b763cf: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 30,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  TextInputbaf7ad36: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 18,
  },
  Viewc992f941: {
    flex: 1,
  },
  View64d89b6e: {
    paddingLeft: 12,
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    width: '75%',
    marginBottom: 16,
  },
  IconButton28dcfe17: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  Text84b3e508: {
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '600',
  },
  Text34e0cb74: {
    marginTop: 10,
  },
  View9fa86917: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Imagea98db7de: {
    width: '100%',
    height: '100%',
  },
  View1b1f79af: {
    height: '60%',
    overflow: 'hidden',
    alignItems: 'flex-end',
  },
  CircleImage34352bf1: {
    width: 60,
    height: 60,
    marginLeft: 16,
    marginTop: -30,
  },
  Textb73c4ca6: {
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '600',
    paddingTop: 4,
    paddingLeft: 16,
  },
  Textcd669454: {
    fontSize: 12,
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 16,
  },
  StarRatinga57a4184: {
    marginRight: -10,
  },
  Text25694ba4: {
    fontSize: 12,
    paddingTop: 4,
    paddingRight: -5,
    paddingLeft: 16,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  IconButton2c3e883b: {
    marginRight: 16,
  },
  Surface56d97cb4: {
    width: 300,
    height: 220,
    marginRight: 16,
  },
  FlatListe3f3fa82Content: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 0,
    paddingLeft: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  Viewd63bc9bc: {
    left: 0,
    right: 0,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  View78e61bd0: {
    height: '65%',
    overflow: 'hidden',
  },
  Text26f0ecb9: {
    fontSize: 22,
    fontFamily: 'System',
    fontWeight: '600',
    paddingTop: 4,
    paddingLeft: 16,
  },
  StarRating27d4405a: {
    marginRight: 8,
  },
  Text23f672fe: {
    fontSize: 12,
    paddingTop: 4,
    paddingRight: 10,
    paddingLeft: 16,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  Surface8012acab: {
    minHeight: 260,
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    maxHeight: 260,
  },
  Touchable7d2b959f: {
    width: '100%',
    minWidth: '100%',
  },
  FlatList754b2e07: {
    width: '100%',
  },
  FlatList754b2e07Content: {
    paddingLeft: 16,
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',
    paddingRight: 16,
  },
  Viewdf29e2e2: {
    width: '100%',
  },
  Textf90d72c6: {
    fontSize: 24,
    fontFamily: 'System',
    fontWeight: '600',
  },
  IconButton5f47a348: {
    marginRight: 4,
  },
  StarRating2c3e883b: {
    marginRight: 16,
  },
  Text621d5cae: {
    fontSize: 12,
    paddingTop: 4,
    paddingRight: 20,
    paddingLeft: 16,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  Viewbbfb22dd: {
    width: '100%',
    marginBottom: 70,
    marginTop: 20,
  },
  MapViewc992f941: {
    flex: 1,
  },
  Surfacec0dec774: {
    height: '80%',
    overflow: 'hidden',
  },
  Text58d1c036: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  ButtonSolidd6d80f99: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 16,
    marginTop: 8,
    marginRight: 16,
  },
  Surface2df1c553: {
    minHeight: '28%',
    marginTop: '-8%',
  },
  IconButton007f30a6: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  Textd59ae7c0: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
  },
  View40d56b89: {
    marginTop: 20,
    marginBottom: 16,
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
  Textb536ac60: {
    textAlign: 'center',
  },
});

export default withTheme(OrderScreen);
