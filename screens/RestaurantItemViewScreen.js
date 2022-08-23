import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  CheckboxRow,
  Divider,
  IconButton,
  Row,
  ScreenContainer,
  Stepper,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const RestaurantItemViewScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const modCostUpdate = (currentPrice, modCost) => {
    var newPrice = currentPrice + modCost;
    return newPrice; // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const modRemovePrice = (currentPrice, modPrice) => {
    var newPrice = currentPrice - modPrice;
    return newPrice; // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const addMod = (mod, currentString) => {
    return currentString + mod + ', ';
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const removeMod = (mod, currentCustom) => {
    var str = mod + ',';
    var custom = currentCustom;
    custom.replace(str, '');
    return custom; // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const { theme } = props;
  const { navigation } = props;

  const updateCartPOST = XanoApi.useUpdateCartPOST();

  const [addedToCart, setAddedToCart] = React.useState(false);
  const [checkboxRowValue, setCheckboxRowValue] = React.useState(undefined);
  const [customizations, setCustomizations] = React.useState('');
  const [itemCost, setItemCost] = React.useState('');
  const [itemImage, setItemImage] = React.useState('');
  const [itemName, setItemName] = React.useState('');
  const [stepperValue, setStepperValue] = React.useState(1);

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.surface }}
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={false}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={'never'}
      >
        <XanoApi.FetchGetSpecificItemGET
          itemID={props.route?.params?.itemID ?? 1}
          stores_id={props.route?.params?.storeID ?? 2}
          onData={fetchData => {
            try {
              setItemName(fetchData?.itemName);
              setItemCost(fetchData?.itemCost);
              setItemImage(fetchData?.itemImage);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {({ loading, error, data, refetchGetSpecificItem }) => {
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
              <ScrollView
                style={{ backgroundColor: theme.colors.surface }}
                horizontal={false}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                bounces={true}
              >
                <Image
                  style={styles.Image6ba238f9}
                  source={{ uri: `${fetchData?.itemImage}` }}
                  resizeMode={'cover'}
                />
                <View style={styles.View726c52e0}>
                  <Text
                    style={[
                      theme.typography.headline5,
                      styles.Text8a1b0d27,
                      { color: theme.colors.strong },
                    ]}
                  >
                    {fetchData?.itemName}
                  </Text>
                  <Divider
                    style={styles.Dividerbb78386c}
                    color={theme.colors.medium}
                  />
                  <Text
                    style={[
                      styles.Text1dba40c9,
                      { color: theme.colors.medium },
                    ]}
                  >
                    {fetchData?.itemDescription}
                  </Text>
                </View>

                <View
                  style={[
                    styles.View58640cdf,
                    { backgroundColor: theme.colors.divider },
                  ]}
                >
                  <Text
                    style={[
                      theme.typography.overline,
                      { color: theme.colors.medium },
                    ]}
                  >
                    {'Modifications'}
                  </Text>
                </View>

                <View style={styles.Viewecb0dde6}>
                  <FlatList
                    data={fetchData?.itemCustomizations}
                    listKey={'5KS5gtbz'}
                    keyExtractor={({ item }) => item?.id || item?.uuid || item}
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          <Row
                            justifyContent={'space-between'}
                            alignItems={'center'}
                          >
                            <View style={styles.View32b332f0}>
                              <CheckboxRow
                                onPress={newCheckboxRowValue => {
                                  const checkboxRowValue = newCheckboxRowValue;
                                  try {
                                    setCheckboxRowValue(checkboxRowValue);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                onCheck={() => {
                                  try {
                                    const result = addMod(
                                      listData?.modificationName,
                                      customizations
                                    );

                                    const valuexcUnfZ5k = result;
                                    setCustomizations(valuexcUnfZ5k);
                                    const resultRemove = valuexcUnfZ5k;
                                    const newPrice = modCostUpdate(
                                      itemCost,
                                      listData?.modCost
                                    );

                                    const valueRJY8da1C = newPrice;
                                    setItemCost(valueRJY8da1C);
                                    const priceReduction = valueRJY8da1C;
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                onUncheck={() => {
                                  try {
                                    const resultMod = removeMod(
                                      listData?.modificationName,
                                      customizations
                                    );
                                    setCustomizations(resultMod);
                                    const newCost = modRemovePrice(
                                      itemCost,
                                      listData?.modCost
                                    );
                                    setItemCost(newCost);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                style={styles.CheckboxRowab815695}
                                label={listData?.modificationName}
                                value={checkboxRowValue}
                              />
                            </View>

                            <Text
                              style={[
                                theme.typography.button,
                                styles.Textbf9dcb36,
                                { color: theme.colors.primary },
                              ]}
                            >
                              {listData?.modCost}
                              {' USD'}
                            </Text>
                          </Row>
                          <Divider
                            style={styles.Dividerde11d607}
                            color={theme.colors.divider}
                          />
                        </>
                      );
                    }}
                    contentContainerStyle={styles.FlatList38d6e1a7Content}
                    numColumns={1}
                  />
                </View>
              </ScrollView>
            );
          }}
        </XanoApi.FetchGetSpecificItemGET>
      </KeyboardAwareScrollView>
      <IconButton
        onPress={() => {
          try {
            navigation.goBack();
          } catch (err) {
            console.error(err);
          }
        }}
        style={styles.IconButtone2c78da7}
        icon={'Ionicons/ios-chevron-back'}
        size={40}
      />
      <Stepper
        onChange={newStepperValue => {
          try {
            setStepperValue(newStepperValue);
          } catch (err) {
            console.error(err);
          }
        }}
        style={styles.Stepperc0cb78a3}
        value={stepperValue}
        iconSize={24}
        iconColor={theme.colors.primary}
        min={1}
        max={5}
      />
      <View style={styles.View2d7a227d}>
        <Text
          style={[
            theme.typography.button,
            styles.Textb8d16385,
            { color: theme.colors.light },
          ]}
        >
          {'Quantity'}
        </Text>
      </View>
      <>
        {addedToCart ? null : (
          <Touchable
            onPress={() => {
              const handler = async () => {
                try {
                  await updateCartPOST.mutateAsync({
                    UID: Constants['user_id'],
                    cost: itemCost,
                    itemID: props.route?.params?.itemID ?? 1,
                    itemName: itemName,
                    modsList: customizations,
                    quantity: stepperValue,
                    storeID: props.route?.params?.storeID ?? 2,
                    url: itemImage,
                    user_id: Constants['user_id'],
                  });
                  setAddedToCart(true);
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={styles.Touchablec7f6c404}
          >
            <View
              style={[
                styles.View63956218,
                {
                  borderRadius: theme.roundness,
                  backgroundColor: theme.colors.primary,
                },
              ]}
            >
              <Text
                style={[
                  theme.typography.button,
                  styles.Textea3071f7,
                  { color: theme.colors.surface },
                ]}
              >
                {'Add To Cart'}
              </Text>

              <Text
                style={[
                  theme.typography.button,
                  styles.Textea3071f7,
                  { color: theme.colors.surface },
                ]}
              >
                {'$'}
                {itemCost}
                {' Each'}
              </Text>
            </View>
          </Touchable>
        )}
      </>
      {/* Proceed To Checkout */}
      <>
        {!addedToCart ? null : (
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('BottomTabNavigator', {
                  screen: 'BaggageCartScreen',
                });
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles.Touchablec7f6c404}
          >
            <View
              style={[
                styles.View04b5f8ca,
                {
                  borderRadius: theme.roundness,
                  backgroundColor: theme.colors.primary,
                },
              ]}
            >
              <Text
                style={[
                  theme.typography.button,
                  styles.Textea3071f7,
                  { color: theme.colors.surface },
                ]}
              >
                {'Proceed To Checkout'}
              </Text>
            </View>
          </Touchable>
        )}
      </>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Image6ba238f9: {
    width: '100%',
    height: 250,
  },
  Text8a1b0d27: {
    textAlign: 'center',
  },
  Dividerbb78386c: {
    height: 1,
    alignSelf: 'center',
    width: 32,
    marginTop: 16,
    marginBottom: 16,
  },
  Text1dba40c9: {
    textAlign: 'center',
  },
  View726c52e0: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
    paddingTop: 24,
  },
  View58640cdf: {
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 8,
    paddingTop: 8,
  },
  CheckboxRowab815695: {
    minHeight: 50,
    textAlign: 'left',
  },
  View32b332f0: {
    width: '80%',
  },
  Textbf9dcb36: {
    textAlign: 'left',
  },
  Dividerde11d607: {
    height: 1,
  },
  FlatList38d6e1a7Content: {
    flex: 1,
    marginRight: '5%',
    marginLeft: '5%',
  },
  Viewecb0dde6: {
    paddingBottom: 16,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  IconButtone2c78da7: {
    position: 'absolute',
    top: 56,
    left: 16,
  },
  Stepperc0cb78a3: {
    bottom: 110,
    position: 'absolute',
    left: 0,
    right: 0,
    width: '20%',
    marginLeft: '41%',
    marginRight: '41%',
    minWidth: '20%',
    maxWidth: '20%',
  },
  Textb8d16385: {
    textAlign: 'center',
  },
  View2d7a227d: {
    bottom: 95,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  Textea3071f7: {
    textAlign: 'center',
  },
  View63956218: {
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Touchablec7f6c404: {
    paddingLeft: 16,
    paddingBottom: 16,
    marginBottom: 16,
    paddingTop: 16,
    paddingRight: 16,
    marginTop: 50,
  },
  View04b5f8ca: {
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default withTheme(RestaurantItemViewScreen);
