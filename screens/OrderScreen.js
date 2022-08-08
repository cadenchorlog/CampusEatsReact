import React from 'react';
import * as RestaurantListApi from '../apis/RestaurantListApi.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  LinearGradient,
  Row,
  ScreenContainer,
  Spacer,
  StarRating,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const OrderScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const [ratingValue, setRatingValue] = React.useState(undefined);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={true}
      hasTopSafeArea={true}
    >
      <Spacer top={6} right={0} bottom={6} left={0} />
      <View style={styles.View9fa86917}>
        <Text style={[styles.Text93742bfd, { color: theme.colors.medium }]}>
          {'Hi '}
          {Constants['user_name']}
          {'!'}
        </Text>
      </View>
      <Spacer top={4} right={8} bottom={4} left={8} />
      <XanoApi.FetchGetAllStoresGET>
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
            <View>
              <View style={styles.View9fa86917}>
                <Row justifyContent={'space-between'} alignItems={'flex-start'}>
                  <Text
                    style={[
                      styles.Textf90d72c6,
                      { color: theme.colors.strong },
                    ]}
                  >
                    {'Courier Offers'}
                  </Text>

                  <Touchable>
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

                <Text style={{ color: theme.colors.strong }}>
                  {'Off Campus Options'}
                </Text>
              </View>
              <FlatList
                data={popularPlacesData}
                listKey={'lnONbxEq'}
                keyExtractor={({ item }) => item?.id || item?.uuid || item}
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
                      >
                        <View>
                          <View
                            style={[styles.View2760cf33, { borderRadius: 16 }]}
                          >
                            <Image
                              style={[
                                styles.Imageb42ed28f,
                                { borderRadius: theme.roundness },
                              ]}
                              source={{ uri: `${listData?.storeImage}` }}
                              resizeMode={'cover'}
                            />
                          </View>

                          <View style={styles.View91edb4b3}>
                            <Text
                              style={[
                                styles.Text884ea74f,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {listData?.storeName}
                            </Text>

                            <Text
                              style={[
                                styles.Textdb189077,
                                { color: theme.colors.medium },
                              ]}
                            >
                              {'$'}
                              {listData?.deliveryFee}
                              {' Delivery Fee'}
                            </Text>
                          </View>
                        </View>
                      </Touchable>
                      <Spacer top={0} right={10} bottom={0} left={10} />
                    </>
                  );
                }}
                contentContainerStyle={styles.FlatListcef0b366Content}
                numColumns={1}
                horizontal={true}
              />
            </View>
          );
        }}
      </XanoApi.FetchGetAllStoresGET>
      <Spacer top={8} right={8} bottom={8} left={8} />
      <RestaurantListApi.FetchQueryGET limit={1} parameter={'id'} query={50}>
        {({ loading, error, data, refetchQuery }) => {
          const featuredData = data;
          if (!featuredData || loading) {
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
            <View>
              <View style={styles.View9fa86917}>
                <Text
                  style={[styles.Textf90d72c6, { color: theme.colors.strong }]}
                >
                  {'Campus Offerings'}
                </Text>

                <Text style={{ color: theme.colors.strong }}>
                  {'Fastest Delivery'}
                </Text>
              </View>
              <FlatList
                data={featuredData}
                listKey={'bbWyyyVl'}
                keyExtractor={({ item }) => item?.id || item?.uuid || item}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <Touchable>
                      <View style={styles.View9fa86917}>
                        <ImageBackground
                          style={[
                            styles.ImageBackgroundd0d5dfbd,
                            { borderRadius: 24 },
                          ]}
                          source={{ uri: `${listData?.image}` }}
                          resizeMode={'cover'}
                        >
                          <LinearGradient
                            style={styles.LinearGradientd132bfba}
                            endY={100}
                            endX={100}
                            color2={theme.colors.transparent}
                            color1={theme.colors.transparent}
                            startX={100}
                            color3={theme.colors.strong}
                            startY={0}
                          >
                            <Text
                              style={[
                                styles.Textc2034d34,
                                { color: theme.colors.surface },
                              ]}
                              numberOfLines={1}
                              ellipsizeMode={'tail'}
                            >
                              {listData?.name}
                            </Text>

                            <View style={styles.Viewf78a9190}>
                              <Text
                                style={[
                                  styles.Text76ab12a3,
                                  { color: theme.colors.surface },
                                ]}
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                              >
                                {listData?.type}
                              </Text>
                              <StarRating
                                onPress={newStarRatingValue => {
                                  const ratingValue = newStarRatingValue;
                                  try {
                                    setRatingValue(ratingValue);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                rating={listData?.rating}
                                starSize={16}
                                maxStars={5}
                                activeColor={theme.colors.background}
                                inactiveColor={theme.colors.light}
                              />
                            </View>
                          </LinearGradient>
                        </ImageBackground>
                      </View>
                    </Touchable>
                  );
                }}
                contentContainerStyle={styles.FlatList6728d304Content}
                numColumns={1}
              />
            </View>
          );
        }}
      </RestaurantListApi.FetchQueryGET>
      <Spacer top={16} right={8} bottom={16} left={8} />
      <RestaurantListApi.FetchFastestDeliveryGET>
        {({ loading, error, data, refetchFastestDelivery }) => {
          const nearYouData = data;
          if (!nearYouData || loading) {
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
            <View>
              <View style={styles.View9fa86917}>
                <Text
                  style={[styles.Textf90d72c6, { color: theme.colors.strong }]}
                >
                  {'Near You'}
                </Text>

                <Text style={{ color: theme.colors.strong }}>
                  {'Restaurants near your location'}
                </Text>
              </View>
              <FlatList
                data={data}
                listKey={'Yft1gOYN'}
                keyExtractor={({ item }) => item?.id || item?.uuid || item}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <>
                      <Touchable>
                        <View>
                          <View
                            style={[styles.View2760cf33, { borderRadius: 16 }]}
                          >
                            <Image
                              style={[
                                styles.Imageb42ed28f,
                                { borderRadius: theme.roundness },
                              ]}
                              source={{ uri: `${listData?.image}` }}
                              resizeMode={'cover'}
                            />
                          </View>

                          <View style={styles.View91edb4b3}>
                            <Text
                              style={[
                                styles.Text884ea74f,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {listData?.name}
                            </Text>
                            <StarRating
                              onPress={newStarRatingValue => {
                                const ratingValue = newStarRatingValue;
                                try {
                                  setRatingValue(ratingValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              rating={listData?.rating}
                              starSize={16}
                              maxStars={5}
                              activeColor={theme.colors.strong}
                              inactiveColor={theme.colors.divider}
                            />
                          </View>
                        </View>
                      </Touchable>
                      <Spacer top={0} right={10} bottom={0} left={10} />
                    </>
                  );
                }}
                contentContainerStyle={styles.FlatListcd3e18ecContent}
                numColumns={1}
                data={data}
                horizontal={true}
              />
            </View>
          );
        }}
      </RestaurantListApi.FetchFastestDeliveryGET>
      <Spacer top={8} right={8} bottom={8} left={8} />
      <RestaurantListApi.FetchToday$sOffersGET>
        {({ loading, error, data, refetchToday$sOffers }) => {
          const freeDeliveryData = data;
          if (!freeDeliveryData || loading) {
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
            <View>
              <View style={styles.View9fa86917}>
                <Text
                  style={[styles.Textf90d72c6, { color: theme.colors.strong }]}
                >
                  {'Free Delivery'}
                </Text>

                <Text style={{ color: theme.colors.strong }}>
                  {'These restaurants offer free delivery'}
                </Text>
              </View>
              <FlatList
                data={data}
                listKey={'ND3WxG9b'}
                keyExtractor={({ item }) => item?.id || item?.uuid || item}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <>
                      <Touchable>
                        <View>
                          <View
                            style={[styles.View2760cf33, { borderRadius: 16 }]}
                          >
                            <Image
                              style={[
                                styles.Imageb42ed28f,
                                { borderRadius: theme.roundness },
                              ]}
                              source={{ uri: `${listData?.image}` }}
                              resizeMode={'cover'}
                            />
                          </View>

                          <View style={styles.View91edb4b3}>
                            <Text
                              style={[
                                styles.Text884ea74f,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {listData?.name}
                            </Text>

                            <Text
                              style={[
                                styles.Textdb189077,
                                { color: theme.colors.medium },
                              ]}
                            >
                              {listData?.city}
                            </Text>
                          </View>
                        </View>
                      </Touchable>
                      <Spacer top={0} right={10} bottom={0} left={10} />
                    </>
                  );
                }}
                contentContainerStyle={styles.FlatListcd3e18ecContent}
                numColumns={1}
                data={data}
                horizontal={true}
              />
            </View>
          );
        }}
      </RestaurantListApi.FetchToday$sOffersGET>
      <Spacer top={8} right={8} bottom={8} left={8} />
      <RestaurantListApi.FetchQueryGET
        limit={6}
        parameter={'type'}
        query={'French'}
      >
        {({ loading, error, data, refetchQuery }) => {
          const bestFrenchCuisineData = data;
          if (!bestFrenchCuisineData || loading) {
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
            <View>
              <View style={styles.View9fa86917}>
                <Text
                  style={[styles.Textf90d72c6, { color: theme.colors.strong }]}
                >
                  {'Best French Cuisine'}
                </Text>

                <Text style={{ color: theme.colors.strong }}>
                  {'The finest French cuisine outside of France'}
                </Text>
              </View>
              <FlatList
                data={data}
                listKey={'bWmP1mIX'}
                keyExtractor={({ item }) => item?.id || item?.uuid || item}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <>
                      <Touchable>
                        <View>
                          <View
                            style={[styles.View2760cf33, { borderRadius: 16 }]}
                          >
                            <Image
                              style={[
                                styles.Imageb42ed28f,
                                { borderRadius: theme.roundness },
                              ]}
                              source={{ uri: `${listData?.image}` }}
                              resizeMode={'cover'}
                            />
                          </View>

                          <View style={styles.View91edb4b3}>
                            <Text
                              style={[
                                styles.Text884ea74f,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {listData?.name}
                            </Text>

                            <Text
                              style={[
                                styles.Textdb189077,
                                { color: theme.colors.medium },
                              ]}
                            >
                              {listData?.city}
                            </Text>
                          </View>
                        </View>
                      </Touchable>
                      <Spacer top={0} right={10} bottom={0} left={10} />
                    </>
                  );
                }}
                contentContainerStyle={styles.FlatListcd3e18ecContent}
                numColumns={1}
                data={data}
                horizontal={true}
              />
            </View>
          );
        }}
      </RestaurantListApi.FetchQueryGET>
      <Spacer top={12} right={0} bottom={12} left={0} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Text93742bfd: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    paddingRight: 16,
  },
  View9fa86917: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Textf90d72c6: {
    fontSize: 24,
    fontFamily: 'System',
    fontWeight: '600',
  },
  Text34e0cb74: {
    marginTop: 10,
  },
  Imageb42ed28f: {
    width: 250,
    height: 150,
  },
  View2760cf33: {
    overflow: 'hidden',
  },
  Text884ea74f: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '600',
  },
  Textdb189077: {
    fontSize: 12,
    marginTop: 4,
  },
  View91edb4b3: {
    marginTop: 8,
  },
  FlatListcef0b366Content: {
    flexDirection: 'row',
    paddingLeft: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  Textc2034d34: {
    fontSize: 20,
  },
  Text76ab12a3: {
    fontSize: 16,
  },
  Viewf78a9190: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LinearGradientd132bfba: {
    width: '100%',
    height: '100%',
    paddingLeft: 16,
    paddingBottom: 16,
    paddingRight: 16,
    paddingTop: 16,
    justifyContent: 'flex-end',
  },
  ImageBackgroundd0d5dfbd: {
    width: '100%',
    height: 240,
    overflow: 'hidden',
  },
  FlatList6728d304Content: {
    marginTop: 16,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  FlatListcd3e18ecContent: {
    flexDirection: 'row',
    marginTop: 16,
    paddingLeft: 16,
    marginBottom: 16,
  },
});

export default withTheme(OrderScreen);
