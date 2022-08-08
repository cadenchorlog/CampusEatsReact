import React from 'react';
import * as GoogleDistanceApi from '../apis/GoogleDistanceApi.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  ButtonOutline,
  ButtonSolid,
  CircleImage,
  Divider,
  Icon,
  IconButton,
  Row,
  ScreenContainer,
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
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const RestaurantViewScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

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

  const [starRatingValue, setStarRatingValue] = React.useState(0);
  const [tabOne, setTabOne] = React.useState(true);
  const [tabThree, setTabThree] = React.useState(false);
  const [tabTwo, setTabTwo] = React.useState(false);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <View>
        <XanoApi.FetchGetStoreInfoGET
          stores_id={props.route?.params?.storeID ?? 1}
          onData={fetchData => {
            try {
              setStarRatingValue(fetchData?.storeRating);
            } catch (err) {
              console.error(err);
            }
          }}
        >
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
              <>
                <View style={styles.View00c37131}>
                  <ImageBackground
                    style={styles.ImageBackgrounda98db7de}
                    source={{ uri: `${fetchData?.storeImage}` }}
                    resizeMode={'cover'}
                  />
                  <View style={styles.View3fd5da9b}>
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
                        size={40}
                      />
                    </Row>
                    <CircleImage
                      style={styles.CircleImage18b962a4}
                      source={{
                        uri: 'https://static.draftbit.com/images/placeholder-image.png',
                      }}
                      size={60}
                    />
                  </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={true} bounces={true}>
                  <Row justifyContent={'space-between'} alignItems={'center'}>
                    <Text
                      style={[
                        styles.Text22985566,
                        { color: theme.colors.strong },
                      ]}
                    >
                      {fetchData?.storeName}
                    </Text>
                    <IconButton
                      onPress={() => {
                        try {
                          const url = openMapApp(
                            fetchData?.storeLat,
                            fetchData?.storeLong
                          );
                          Linking.openURL(`${url}`);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={styles.IconButton0cd9c8b5}
                      icon={'MaterialCommunityIcons/information-outline'}
                      size={32}
                    />
                  </Row>

                  <Text
                    style={[
                      styles.Text0acea39c,
                      { color: theme.colors.strong },
                    ]}
                  >
                    {null}
                  </Text>

                  <GoogleDistanceApi.FetchGetDistanceGET
                    destLat={fetchData?.storeLat}
                    destLong={fetchData?.storeLong}
                    orgLat={Constants['delivLat']}
                    orgLong={Constants['delivLong']}
                  >
                    {({ loading, error, data, refetchGetDistance }) => {
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
                        <Row
                          justifyContent={'flex-start'}
                          alignItems={'center'}
                        >
                          <Icon
                            style={styles.Icon5f48b508}
                            name={'MaterialCommunityIcons/map-marker-distance'}
                            size={24}
                            color={theme.colors.primary}
                          />
                          <Text
                            style={[
                              styles.Text51b9e88f,
                              { color: theme.colors.strong },
                            ]}
                          >
                            {null}
                            {' mi'}
                          </Text>
                          <Divider
                            style={styles.Dividerd78f213f}
                            color={theme.colors.primary}
                          />
                          <Text style={{ color: theme.colors.strong }}>
                            {fetchData?.storeRating}
                          </Text>
                          <StarRating
                            onPress={newStarRatingValue => {
                              try {
                                setStarRatingValue(newStarRatingValue);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            style={styles.StarRatingbabcec09}
                            rating={starRatingValue}
                            starSize={16}
                            maxStars={5}
                            activeColor={theme.colors.primary}
                            inactiveColor={theme.colors.divider}
                          />
                        </Row>
                      );
                    }}
                  </GoogleDistanceApi.FetchGetDistanceGET>
                  <Surface
                    style={[
                      styles.Surfacef56f18d2,
                      { borderRadius: 10, borderColor: theme.colors.divider },
                    ]}
                  >
                    <Stack justifyContent={'flex-start'} alignItems={'center'}>
                      <View style={styles.Viewff163501}>
                        <Text
                          style={[
                            styles.Texte6e7dad8,
                            { color: theme.colors.strong },
                          ]}
                        >
                          {'2'}
                        </Text>

                        <Text
                          style={[
                            styles.Text2f0b40cf,
                            { color: theme.colors.strong },
                          ]}
                        >
                          {'Active Couriers'}
                        </Text>
                      </View>
                    </Stack>
                    <Divider
                      style={styles.Divider4234fc39}
                      color={theme.colors.divider}
                    />
                    <Stack justifyContent={'flex-start'} alignItems={'center'}>
                      <View style={styles.Viewff163501}>
                        <Text
                          style={[
                            styles.Texte6e7dad8,
                            { color: theme.colors.strong },
                          ]}
                        >
                          {'$'}
                          {fetchData?.deliveryFee}
                        </Text>

                        <Text
                          style={[
                            styles.Text2f0b40cf,
                            { color: theme.colors.strong },
                          ]}
                        >
                          {'Delivery Fee'}
                        </Text>
                      </View>
                    </Stack>
                  </Surface>

                  <Row justifyContent={'center'} alignItems={'flex-start'}>
                    <>
                      {!tabOne ? null : (
                        <ButtonSolid
                          style={[
                            styles.ButtonSolida14c8046,
                            {
                              backgroundColor: theme.colors.background,
                              color: theme.colors.primary,
                              borderColor: theme.colors.primary,
                              borderRadius: 0,
                            },
                          ]}
                          title={'Menu'}
                        />
                      )}
                    </>
                    <>
                      {tabOne ? null : (
                        <ButtonOutline
                          onPress={() => {
                            try {
                              setTabOne(true);
                              setTabTwo(false);
                              setTabThree(false);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={[
                            styles.ButtonOutline3b1b8dd9,
                            {
                              color: theme.colors.light,
                              borderColor: theme.colors.background,
                              borderRadius: 0,
                            },
                          ]}
                          title={'Menu'}
                        />
                      )}
                    </>
                    <>
                      {!tabTwo ? null : (
                        <ButtonSolid
                          style={[
                            styles.ButtonSolid7df3f55b,
                            {
                              backgroundColor: theme.colors.background,
                              color: theme.colors.primary,
                              borderRadius: 0,
                              borderColor: theme.colors.primary,
                            },
                          ]}
                          title={'Offers'}
                        />
                      )}
                    </>
                    <>
                      {tabTwo ? null : (
                        <ButtonOutline
                          onPress={() => {
                            try {
                              setTabTwo(true);
                              setTabOne(false);
                              setTabThree(false);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={[
                            styles.ButtonOutline0c7d324c,
                            {
                              borderColor: theme.colors.background,
                              borderRadius: 0,
                              color: theme.colors.light,
                            },
                          ]}
                          title={'Offers'}
                        />
                      )}
                    </>
                  </Row>
                  <>
                    {!tabOne ? null : (
                      <ScrollView
                        contentContainerStyle={styles.ScrollView124cf545Content}
                        showsVerticalScrollIndicator={true}
                        bounces={true}
                      >
                        <XanoApi.FetchGetItemListGET
                          store_id={props.route?.params?.storeID ?? 1}
                        >
                          {({ loading, error, data, refetchGetItemList }) => {
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
                                {null ? null : (
                                  <FlatList
                                    data={fetchData}
                                    listKey={'Y51RbSb4'}
                                    keyExtractor={({ item }) =>
                                      item?.id || item?.uuid || item
                                    }
                                    renderItem={({ item }) => {
                                      const gridData = item;
                                      return (
                                        <View style={styles.Viewb7efd8d7}>
                                          <Touchable
                                            onPress={() => {
                                              try {
                                                navigation.navigate(
                                                  'RestaurantItemViewScreen',
                                                  {
                                                    storeID:
                                                      props.route?.params
                                                        ?.storeID ?? 1,
                                                    itemID: gridData?.itemID,
                                                  }
                                                );
                                              } catch (err) {
                                                console.error(err);
                                              }
                                            }}
                                          >
                                            <View
                                              style={[
                                                styles.Viewa4bdd040,
                                                {
                                                  borderRadius: 12,
                                                  borderColor:
                                                    theme.colors.divider,
                                                  backgroundColor:
                                                    theme.colors.surface,
                                                },
                                              ]}
                                            >
                                              <View style={styles.View5152e902}>
                                                <ImageBackground
                                                  style={
                                                    styles.ImageBackgrounda98db7de
                                                  }
                                                  source={{
                                                    uri: `${gridData?.itemImage}`,
                                                  }}
                                                  resizeMode={'cover'}
                                                />
                                              </View>

                                              <View style={styles.Viewd8f97984}>
                                                <Text
                                                  style={[
                                                    styles.Text56ff1cc0,
                                                    {
                                                      color:
                                                        theme.colors.strong,
                                                    },
                                                  ]}
                                                  numberOfLines={1}
                                                  ellipsizeMode={'tail'}
                                                >
                                                  {gridData?.itemName}{' '}
                                                </Text>

                                                <View
                                                  style={styles.View7d6a39b7}
                                                >
                                                  <Text
                                                    style={[
                                                      styles.Textc3380ce3,
                                                      {
                                                        color:
                                                          theme.colors.primary,
                                                      },
                                                    ]}
                                                  >
                                                    {'$'}
                                                    {gridData?.itemCost}
                                                  </Text>
                                                </View>
                                              </View>
                                            </View>
                                          </Touchable>
                                        </View>
                                      );
                                    }}
                                    contentContainerStyle={
                                      styles.FlatList7591d95eContent
                                    }
                                    numColumns={2}
                                  />
                                )}
                              </>
                            );
                          }}
                        </XanoApi.FetchGetItemListGET>
                      </ScrollView>
                    )}
                  </>
                  <>
                    {!tabTwo ? null : (
                      <ScrollView
                        contentContainerStyle={styles.ScrollView124cf545Content}
                        showsVerticalScrollIndicator={true}
                        bounces={true}
                      >
                        <FlatList
                          data={[]}
                          listKey={'V73lG5U8'}
                          keyExtractor={({ item }) =>
                            item?.id || item?.uuid || item
                          }
                          renderItem={({ item }) => {
                            const listData = item;
                            return null;
                          }}
                          contentContainerStyle={styles.FlatListc992f941Content}
                          numColumns={1}
                        />
                      </ScrollView>
                    )}
                  </>
                  <>
                    {!tabThree ? null : (
                      <ScrollView
                        contentContainerStyle={styles.ScrollView124cf545Content}
                        showsVerticalScrollIndicator={true}
                        bounces={true}
                      >
                        <FlatList
                          data={[]}
                          listKey={'2rE43hcu'}
                          keyExtractor={({ item }) =>
                            item?.id || item?.uuid || item
                          }
                          renderItem={({ item }) => {
                            const listData = item;
                            return null;
                          }}
                          contentContainerStyle={styles.FlatListc992f941Content}
                          numColumns={1}
                        />
                      </ScrollView>
                    )}
                  </>
                </ScrollView>
              </>
            );
          }}
        </XanoApi.FetchGetStoreInfoGET>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ImageBackgrounda98db7de: {
    width: '100%',
    height: '100%',
  },
  IconButton897c6051: {
    marginLeft: 16,
  },
  CircleImage18b962a4: {
    left: 20,
    top: 75,
  },
  View3fd5da9b: {
    marginTop: 60,
    marginBottom: 20,
    top: -250,
  },
  View00c37131: {
    height: 250,
  },
  Text22985566: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 30,
    paddingLeft: 20,
    paddingRight: 16,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: -12,
  },
  IconButton0cd9c8b5: {
    marginRight: 20,
    marginTop: 20,
  },
  Text0acea39c: {
    marginLeft: 20,
  },
  Icon5f48b508: {
    marginLeft: 20,
  },
  Text51b9e88f: {
    marginLeft: 4,
  },
  Dividerd78f213f: {
    height: 16,
    width: 2,
    marginLeft: 20,
    marginRight: 20,
  },
  StarRatingbabcec09: {
    marginLeft: 4,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  Texte6e7dad8: {
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20,
  },
  Text2f0b40cf: {
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    fontSize: 14,
  },
  Viewff163501: {
    width: 120,
  },
  Divider4234fc39: {
    height: 40,
    width: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  Surfacef56f18d2: {
    minHeight: 50,
    marginLeft: 20,
    marginBottom: 8,
    marginTop: 20,
    overflow: 'hidden',
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    marginRight: 20,
    maxHeight: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  ButtonSolida14c8046: {
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
    marginLeft: 20,
    borderBottomWidth: 1.5,
    width: 180,
  },
  ButtonOutline3b1b8dd9: {
    backgroundColor: 'transparent',
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    marginTop: 16,
    marginLeft: 20,
    borderBottomWidth: 2,
    width: 180,
  },
  ButtonSolid7df3f55b: {
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
    borderBottomWidth: 1.5,
    marginRight: 20,
    width: 180,
  },
  ButtonOutline0c7d324c: {
    backgroundColor: 'transparent',
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    marginTop: 16,
    borderBottomWidth: 2,
    marginRight: 20,
    width: 180,
  },
  View5152e902: {
    height: 140,
  },
  Text56ff1cc0: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
  },
  Textc3380ce3: {
    fontFamily: 'Poppins_600SemiBold',
  },
  View7d6a39b7: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Viewd8f97984: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: 'space-between',
    flex: 1,
  },
  Viewa4bdd040: {
    overflow: 'hidden',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  Viewb7efd8d7: {
    flex: 1,
    paddingLeft: 8,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
  FlatList7591d95eContent: {
    paddingLeft: 8,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
  ScrollView124cf545Content: {
    paddingTop: 10,
  },
  FlatListc992f941Content: {
    flex: 1,
  },
});

export default withTheme(RestaurantViewScreen);
