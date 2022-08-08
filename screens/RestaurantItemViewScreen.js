import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
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
                            justifyContent={'space-around'}
                            alignItems={'center'}
                          >
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
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              style={styles.CheckboxRow3907ce30}
                              label={listData?.modificationName}
                              value={checkboxRowValue}
                            />
                            <Text
                              style={[
                                theme.typography.button,
                                styles.Text4ce7da72,
                                { color: theme.colors.primary },
                              ]}
                            >
                              {'$'}
                              {itemCost}
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

      <Touchable
        onPress={async () => {
          try {
            await updateCartPOST.mutateAsync({
              UID: Constants['user_id'],
              cost: itemCost,
              itemID: props.route?.params?.itemID ?? 1,
              itemName: itemName,
              modsList: customizations,
              storeID: props.route?.params?.storeID ?? 2,
              url: itemImage,
              user_id: Constants['user_id'],
            });
            navigation.goBack();
            Utils.showAlert({
              title: 'Success!',
              message: 'Item added to cart',
              buttonText: 'OK',
            });
          } catch (err) {
            console.error(err);
          }
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
          </Text>
        </View>
      </Touchable>
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
  CheckboxRow3907ce30: {
    minHeight: 50,
    textAlign: 'left',
    marginRight: 20,
  },
  Text4ce7da72: {
    textAlign: 'left',
    paddingRight: 20,
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
});

export default withTheme(RestaurantItemViewScreen);
