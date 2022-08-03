import React from 'react';
import * as RestaurantListApi from '../apis/RestaurantListApi.js';
import {
  IconButton,
  LinearGradient,
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
  TextInput,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const OrderScreen = props => {
  const { theme } = props;

  const [ratingValue, setRatingValue] = React.useState(undefined);
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={true}
      hasTopSafeArea={true}
    >
      <Spacer top={12} right={0} bottom={12} left={0} />
      <View style={styles.ViewTk}>
        <View
          style={[
            styles.ViewZe,
            { backgroundColor: theme.colors.divider, borderRadius: 12 },
          ]}
        >
          <View style={styles.ViewRy}>
            <TextInput
              onChangeText={newSearchInputValue => {
                const textInputValue = newSearchInputValue;
                try {
                  setTextInputValue(textInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles.TextInputYc}
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
      </View>
      <Spacer top={12} right={8} bottom={12} left={8} />
      <RestaurantListApi.FetchQueryGET limit={6} parameter={'rating'} query={5}>
        {({ loading, error, data, refetchQuery }) => {
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
              <View style={styles.View_4g}>
                <Text style={[styles.Textmj, { color: theme.colors.strong }]}>
                  {'Popular Places'}
                </Text>

                <Text style={{ color: theme.colors.strong }}>
                  {'Five-star restaurants'}
                </Text>
              </View>
              <FlatList
                data={data}
                listKey={'lnONbxEq'}
                keyExtractor={({ item }) => item?.id || item?.uuid || item}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <>
                      <Touchable>
                        <View>
                          <View style={[styles.Viewr7, { borderRadius: 16 }]}>
                            <Image
                              style={[
                                styles.Imagejz,
                                { borderRadius: theme.roundness },
                              ]}
                              source={{ uri: `${listData?.image}` }}
                              resizeMode={'cover'}
                            />
                          </View>

                          <View style={styles.View_8f}>
                            <Text
                              style={[
                                styles.Text_6Y,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {listData?.name}
                            </Text>

                            <Text
                              style={[
                                styles.TextLD,
                                { color: theme.colors.medium },
                              ]}
                            >
                              {listData?.type}
                            </Text>
                          </View>
                        </View>
                      </Touchable>
                      <Spacer top={0} right={10} bottom={0} left={10} />
                    </>
                  );
                }}
                contentContainerStyle={styles.FlatListlnContent}
                numColumns={1}
                data={data}
                horizontal={true}
              />
            </View>
          );
        }}
      </RestaurantListApi.FetchQueryGET>
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
              <View style={styles.ViewkL}>
                <Text style={[styles.TextVw, { color: theme.colors.strong }]}>
                  {"Chef's Pick"}
                </Text>

                <Text style={{ color: theme.colors.strong }}>
                  {'Our recommendation of the week'}
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
                      <View style={styles.ViewXd}>
                        <ImageBackground
                          style={[
                            styles.ImageBackgrounddZ,
                            { borderRadius: 24 },
                          ]}
                          source={{ uri: `${listData?.image}` }}
                          resizeMode={'cover'}
                        >
                          <LinearGradient
                            style={styles.LinearGradientYB}
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
                                styles.Textwo,
                                { color: theme.colors.surface },
                              ]}
                              numberOfLines={1}
                              ellipsizeMode={'tail'}
                            >
                              {listData?.name}
                            </Text>

                            <View style={styles.ViewdX}>
                              <Text
                                style={[
                                  styles.Texthv,
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
                contentContainerStyle={styles.FlatListbbContent}
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
              <View style={styles.ViewCt}>
                <Text style={[styles.TextpG, { color: theme.colors.strong }]}>
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
                          <View style={[styles.ViewFu, { borderRadius: 16 }]}>
                            <Image
                              style={[
                                styles.Image_2b,
                                { borderRadius: theme.roundness },
                              ]}
                              source={{ uri: `${listData?.image}` }}
                              resizeMode={'cover'}
                            />
                          </View>

                          <View style={styles.View_41}>
                            <Text
                              style={[
                                styles.Textll,
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
                contentContainerStyle={styles.FlatListYfContent}
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
              <View style={styles.Viewzi}>
                <Text style={[styles.TextkG, { color: theme.colors.strong }]}>
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
                          <View style={[styles.ViewQA, { borderRadius: 16 }]}>
                            <Image
                              style={[
                                styles.Image_3l,
                                { borderRadius: theme.roundness },
                              ]}
                              source={{ uri: `${listData?.image}` }}
                              resizeMode={'cover'}
                            />
                          </View>

                          <View style={styles.ViewCb}>
                            <Text
                              style={[
                                styles.TextNu,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {listData?.name}
                            </Text>

                            <Text
                              style={[
                                styles.TextMl,
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
                contentContainerStyle={styles.FlatListNDContent}
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
              <View style={styles.Viewbw}>
                <Text style={[styles.TextiR, { color: theme.colors.strong }]}>
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
                          <View style={[styles.ViewrR, { borderRadius: 16 }]}>
                            <Image
                              style={[
                                styles.ImageFR,
                                { borderRadius: theme.roundness },
                              ]}
                              source={{ uri: `${listData?.image}` }}
                              resizeMode={'cover'}
                            />
                          </View>

                          <View style={styles.Viewub}>
                            <Text
                              style={[
                                styles.Textdr,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {listData?.name}
                            </Text>

                            <Text
                              style={[
                                styles.TextCr,
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
                contentContainerStyle={styles.FlatListbWContent}
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
  TextInputYc: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 18,
  },
  ViewRy: {
    flex: 1,
  },
  ViewZe: {
    paddingLeft: 12,
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewTk: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Textmj: {
    fontSize: 24,
    fontFamily: 'System',
    fontWeight: '600',
  },
  View_4g: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Imagejz: {
    width: 250,
    height: 150,
  },
  Viewr7: {
    overflow: 'hidden',
  },
  Text_6Y: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '600',
  },
  TextLD: {
    fontSize: 12,
    marginTop: 4,
  },
  View_8f: {
    marginTop: 8,
  },
  FlatListlnContent: {
    flexDirection: 'row',
    paddingLeft: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  TextVw: {
    fontSize: 24,
    fontFamily: 'System',
    fontWeight: '600',
  },
  ViewkL: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Textwo: {
    fontSize: 20,
  },
  Texthv: {
    fontSize: 16,
  },
  ViewdX: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LinearGradientYB: {
    width: '100%',
    height: '100%',
    paddingLeft: 16,
    paddingBottom: 16,
    paddingRight: 16,
    paddingTop: 16,
    justifyContent: 'flex-end',
  },
  ImageBackgrounddZ: {
    width: '100%',
    height: 240,
    overflow: 'hidden',
  },
  ViewXd: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  FlatListbbContent: {
    marginTop: 16,
  },
  FetchBY: {
    minHeight: 40,
  },
  TextpG: {
    fontSize: 24,
    fontFamily: 'System',
    fontWeight: '600',
  },
  ViewCt: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Image_2b: {
    width: 250,
    height: 150,
  },
  ViewFu: {
    overflow: 'hidden',
  },
  Textll: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '600',
  },
  View_41: {
    marginTop: 8,
  },
  FlatListYfContent: {
    flexDirection: 'row',
    marginTop: 16,
    paddingLeft: 16,
    marginBottom: 16,
  },
  TextkG: {
    fontSize: 24,
    fontFamily: 'System',
    fontWeight: '600',
  },
  Viewzi: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Image_3l: {
    width: 250,
    height: 150,
  },
  ViewQA: {
    overflow: 'hidden',
  },
  TextNu: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '600',
  },
  TextMl: {
    fontSize: 12,
    marginTop: 4,
  },
  ViewCb: {
    marginTop: 8,
  },
  FlatListNDContent: {
    flexDirection: 'row',
    marginTop: 16,
    paddingLeft: 16,
    marginBottom: 16,
  },
  TextiR: {
    fontSize: 24,
    fontFamily: 'System',
    fontWeight: '600',
  },
  Viewbw: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  ImageFR: {
    width: 250,
    height: 150,
  },
  ViewrR: {
    overflow: 'hidden',
  },
  Textdr: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '600',
  },
  TextCr: {
    fontSize: 12,
    marginTop: 4,
  },
  Viewub: {
    marginTop: 8,
  },
  FlatListbWContent: {
    flexDirection: 'row',
    marginTop: 16,
    paddingLeft: 16,
    marginBottom: 16,
  },
});

export default withTheme(OrderScreen);
