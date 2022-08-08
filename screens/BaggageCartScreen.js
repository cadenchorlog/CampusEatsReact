import React from 'react';
import * as AddCostApi from '../apis/AddCostApi.js';
import * as CheckoutApi from '../apis/CheckoutApi.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  ButtonOutline,
  ButtonSolid,
  Checkbox,
  Divider,
  Icon,
  IconButton,
  Row,
  ScreenContainer,
  Spacer,
  TextField,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const BaggageCartScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const multiplyTotal = total => {
    const totalF = total * 100;

    return totalF; // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const { theme } = props;
  const { navigation } = props;

  const checkoutPOST = CheckoutApi.useCheckoutPOST();
  const setPricePOST = AddCostApi.useSetPricePOST();

  const [isCard, setIsCard] = React.useState(true);
  const [isPlan, setIsPlan] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [totalPrice, setTotalPrice] = React.useState(0);

  return (
    <ScreenContainer hasTopSafeArea={false}>
      <View style={styles.Viewf39cc81f}>
        <Row justifyContent={'flex-start'} alignItems={'center'}>
          <Text style={[styles.Textd59ae7c0, { color: theme.colors.strong }]}>
            {'Your Bag'}
          </Text>
        </Row>
      </View>

      <ScrollView
        style={styles.ScrollViewf26042a5}
        contentContainerStyle={styles.ScrollViewf26042a5Content}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <XanoApi.FetchGetUserCartGET UID={Constants['user_id']}>
          {({ loading, error, data, refetchGetUserCart }) => {
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
              <FlatList
                data={fetchData}
                listKey={'a7hYLwxc'}
                keyExtractor={({ item }) => item?.id || item?.uuid || item}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <>
                      <View style={styles.View12a773c5}>
                        <View
                          style={[
                            styles.View6e2b01f9,
                            {
                              backgroundColor:
                                theme.colors.custom_rgb245_245_247,
                            },
                          ]}
                        >
                          <ImageBackground
                            style={[
                              styles.ImageBackground25e3d6ef,
                              { borderRadius: 15 },
                            ]}
                            source={{ uri: `${listData?.itemImage}` }}
                            resizeMode={'cover'}
                          />
                        </View>

                        <View style={styles.Viewc46b8fec}>
                          <Text
                            style={[
                              styles.Textbfd3752d,
                              { color: theme.colors.primaryTitleUiBaeg },
                            ]}
                          >
                            {listData?.itemName}
                          </Text>

                          <View>
                            <Text
                              style={[
                                styles.Textbfd3df7a,
                                { color: theme.colors.primaryTitleUiBaeg },
                              ]}
                            >
                              {listData?.itemPrice}
                            </Text>

                            <Text
                              style={[
                                styles.Textbffce5db,
                                { color: theme.colors.primaryTitleUiBaeg },
                              ]}
                            >
                              {listData?.customizations}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.View6ff87234}>
                          <IconButton
                            style={styles.IconButton27d4405a}
                            icon={'Ionicons/ios-duplicate-outline'}
                            size={32}
                            color={theme.colors.light}
                          />
                          <IconButton
                            icon={'MaterialCommunityIcons/close'}
                            size={32}
                            color={theme.colors.error}
                          />
                        </View>
                      </View>
                      <Divider
                        style={styles.Dividerbed2bcba}
                        color={theme.colors.divider}
                      />
                    </>
                  );
                }}
                contentContainerStyle={styles.FlatListc992f941Content}
                numColumns={1}
              />
            );
          }}
        </XanoApi.FetchGetUserCartGET>
      </ScrollView>

      <View
        style={[
          styles.Viewe515c9dd,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Divider style={styles.Dividerde11d607} color={theme.colors.primary} />
        <XanoApi.FetchGetCartTotalsGET
          user_id={Constants['user_id']}
          onData={fetchData => {
            try {
              const finalTotal = multiplyTotal(fetchData?.total);
              setTotalPrice(finalTotal);
              console.log(finalTotal);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {({ loading, error, data, refetchGetCartTotals }) => {
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
              <View style={styles.Viewad2d300f}>
                <View style={styles.View0ae50d17}>
                  <Text
                    style={[
                      styles.Textf7bbdd1d,
                      { color: theme.colors.custom_rgb189_198_212 },
                    ]}
                  >
                    {'Items total'}
                  </Text>

                  <Text
                    style={[
                      styles.Text86ce3ba5,
                      { color: theme.colors.primaryTitleUiBaeg },
                    ]}
                  >
                    {'$'}
                    {fetchData?.subTotal}
                  </Text>
                </View>

                <View style={styles.View88c44c3e}>
                  <Text
                    style={[
                      styles.Textf7bbdd1d,
                      { color: theme.colors.custom_rgb189_198_212 },
                    ]}
                  >
                    {'Taxes/Fees'}
                  </Text>

                  <Text
                    style={[
                      styles.Text86ce3ba5,
                      { color: theme.colors.primaryTitleUiBaeg },
                    ]}
                  >
                    {'Calculated Next'}
                  </Text>
                </View>

                <View style={styles.View88c44c3e}>
                  <Text
                    style={[
                      styles.Textf7bbdd1d,
                      { color: theme.colors.custom_rgb189_198_212 },
                    ]}
                  >
                    {'Delivery Fee'}
                  </Text>

                  <Text
                    style={[
                      styles.Text86ce3ba5,
                      { color: theme.colors.primaryTitleUiBaeg },
                    ]}
                  >
                    {'$'}
                    {fetchData?.deliveryFee}
                  </Text>
                </View>
                <Divider
                  style={styles.Divider0e02aada}
                  color={theme.colors.divider}
                />
                <View style={styles.Viewddd27fdd}>
                  <Text
                    style={[
                      styles.Text5528eed5,
                      { color: theme.colors.custom_rgb189_198_212 },
                    ]}
                  >
                    {'Subtotal'}
                  </Text>

                  <Text
                    style={[
                      styles.Text4036ef9a,
                      { color: theme.colors.primaryTitleUiBaeg },
                    ]}
                  >
                    {'$'}
                    {fetchData?.total}
                  </Text>
                </View>

                <View style={styles.View7bb6e4d9}>
                  <ButtonSolid
                    onPress={() => {
                      try {
                        setShowModal(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={[
                      styles.ButtonSolidf0b1de94,
                      {
                        backgroundColor: theme.colors.primary,
                        borderColor: theme.colors.strongInverse,
                      },
                    ]}
                    title={'Checkout'}
                  />
                </View>
              </View>
            );
          }}
        </XanoApi.FetchGetCartTotalsGET>
      </View>
      <>
        {!showModal ? null : (
          <Modal animationType={'slide'} presentationStyle={'pageSheet'}>
            <View style={styles.View2200bac7}>
              <View style={styles.View7a993fb0}>
                <Row justifyContent={'flex-start'} alignItems={'center'}>
                  <IconButton
                    onPress={() => {
                      try {
                        setShowModal(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={styles.IconButton897c6051}
                    icon={'Ionicons/ios-chevron-back'}
                    size={32}
                  />
                  <Text
                    style={[
                      styles.Textd59ae7c0,
                      { color: theme.colors.strong },
                    ]}
                  >
                    {'Payment'}
                  </Text>
                </Row>
              </View>

              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps={'never'}
                extraScrollHeight={-150}
                enableAutomaticScroll={true}
              >
                <View>
                  <View style={styles.View12981c6a}>
                    <Text
                      style={[
                        styles.Textcd71a0f7,
                        { color: theme.colors.strong },
                      ]}
                    >
                      {'Choose Payment Method'}
                    </Text>
                  </View>

                  <View style={styles.View80a9a9a9}>
                    <View style={styles.Viewb7eaad51}>
                      <Touchable
                        onPress={() => {
                          try {
                            setIsPlan(false);
                            setIsCard(true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={[
                            styles.View1957b5f2,
                            {
                              borderColor: theme.colors.internalBorder,
                              borderRadius: 12,
                            },
                          ]}
                        >
                          <View style={styles.View43b593eb}>
                            <View style={styles.Viewa521a992}>
                              <Icon
                                name={'Ionicons/ios-card'}
                                size={24}
                                color={theme.colors.communityMediumBlack}
                              />
                            </View>

                            <View style={styles.Viewfeac12d8}>
                              <Text
                                style={[
                                  styles.Text14121fc4,
                                  { color: theme.colors.internalPrimaryBold },
                                ]}
                              >
                                {'Card Payment'}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.View6a955cc3}>
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setIsCard(newCheckboxValue);
                                  setIsPlan(false);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              status={isCard}
                              size={18}
                              checkedIcon={'Ionicons/radio-button-on'}
                              uncheckedIcon={
                                'MaterialIcons/radio-button-unchecked'
                              }
                              color={theme.colors.primary}
                              uncheckedColor={theme.colors.primary}
                            />
                          </View>
                        </View>
                      </Touchable>
                    </View>

                    <View style={styles.Viewb7eaad51}>
                      <Touchable
                        onPress={() => {
                          try {
                            setIsPlan(true);
                            setIsCard(false);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={[
                            styles.View1957b5f2,
                            {
                              borderColor: theme.colors.internalBorder,
                              borderRadius: 12,
                            },
                          ]}
                        >
                          <View style={styles.View43b593eb}>
                            <View style={styles.Viewa521a992}>
                              <Icon
                                name={'Ionicons/school'}
                                size={24}
                                color={theme.colors.communityMediumBlack}
                              />
                            </View>

                            <View style={styles.Viewfeac12d8}>
                              <Text
                                style={[
                                  styles.Text3e74d306,
                                  { color: theme.colors.internalPrimaryBold },
                                ]}
                              >
                                {'Meal Plan'}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.View6a955cc3}>
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setIsPlan(newCheckboxValue);
                                  setIsCard(false);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              status={isPlan}
                              size={18}
                              checkedIcon={'Ionicons/radio-button-on'}
                              uncheckedIcon={
                                'MaterialIcons/radio-button-unchecked'
                              }
                              color={theme.colors.primary}
                              uncheckedColor={theme.colors.primary}
                            />
                          </View>
                        </View>
                      </Touchable>
                    </View>
                  </View>

                  <View>
                    <View style={styles.View12981c6a}>
                      <Text
                        style={[
                          styles.Textcd71a0f7,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {'Have a coupon code?'}
                      </Text>
                    </View>

                    <View style={styles.View603e5d81}>
                      <View
                        style={[
                          styles.Viewb5c2cefd,
                          {
                            borderTopLeftRadius: 24,
                            borderBottomLeftRadius: 24,
                          },
                        ]}
                      >
                        <TextField
                          onChangeText={newStyledTextFieldValue => {
                            try {
                              setStyledTextFieldValue(newStyledTextFieldValue);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={styles.TextField04c2524d}
                          placeholder={'Voucher Code'}
                          value={styledTextFieldValue}
                          type={'solid'}
                          underlineColor={theme.colors.lightInverse}
                          returnKeyType={'done'}
                          contextMenuHidden={true}
                          caretHidden={true}
                        />
                      </View>
                      <ButtonSolid
                        style={[
                          styles.ButtonSolidce4d6f27,
                          { backgroundColor: theme.colors.primary },
                        ]}
                        title={'Apply'}
                      />
                    </View>
                  </View>
                  <Divider
                    style={styles.Divider79894792}
                    color={theme.colors.divider}
                  />
                  <View style={styles.View003a266c}>
                    <Text
                      style={[
                        styles.Texteafa8587,
                        { color: theme.colors.custom_rgb189_198_212 },
                      ]}
                    >
                      {'Driver Tip'}
                    </Text>
                    <Spacer top={8} right={12} bottom={8} left={12} />
                    <ButtonOutline
                      style={styles.ButtonOutline02263c6f}
                      title={'10%'}
                    />
                    <ButtonOutline
                      style={styles.ButtonOutline02263c6f}
                      title={'15%'}
                    />
                    <TextInput
                      onChangeText={newTextInputValue => {
                        try {
                          setTextInputValue(newTextInputValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={[
                        styles.TextInput795812dd,
                        {
                          borderColor: theme.colors.primary,
                          color: theme.colors.medium,
                        },
                      ]}
                      placeholder={'Custom'}
                      value={textInputValue}
                      placeholderTextColor={theme.colors.primary}
                      spellcheck={true}
                      keyboardType={'number-pad'}
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>

              <View style={styles.View45692adb}>
                <View style={styles.Viewdbf79098}>
                  <ButtonSolid
                    onPress={async () => {
                      try {
                        setShowModal(false);
                        const cost = await setPricePOST.mutateAsync({
                          price: totalPrice,
                          priceID: 299,
                        });
                        const prodID = cost.id;
                        const check = await checkoutPOST.mutateAsync({
                          UID: Constants['user_id'],
                          priceID: prodID,
                        });
                        const url = check.url;
                        navigation.navigate('CheckoutScreen', { url: url });
                        console.log(Constants['checkoutURL']);
                        console.log(url);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={[
                      styles.ButtonSolid7d2cfd44,
                      { backgroundColor: theme.colors.primary },
                    ]}
                    title={'Place Order'}
                  />
                </View>
              </View>
            </View>
          </Modal>
        )}
      </>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Textd59ae7c0: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
  },
  Viewf39cc81f: {
    marginTop: 60,
    marginBottom: 20,
  },
  ImageBackground25e3d6ef: {
    width: '75%',
    height: '75%',
    overflow: 'hidden',
  },
  View6e2b01f9: {
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Textbfd3752d: {
    fontSize: 15,
    textTransform: 'capitalize',
    fontFamily: 'Poppins_400Regular',
  },
  Textbfd3df7a: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    marginRight: 12,
  },
  Textbffce5db: {
    fontSize: 12,
    fontFamily: 'Poppins_300Light',
    marginRight: 12,
  },
  Viewc46b8fec: {
    marginLeft: 10,
    justifyContent: 'space-between',
    marginTop: 11,
    marginBottom: 13,
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
  },
  IconButton27d4405a: {
    marginRight: 8,
  },
  View6ff87234: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  View12a773c5: {
    minHeight: 75,
    maxHeight: 75,
    marginLeft: 12,
    marginRight: 25,
    flexDirection: 'row',
    marginBottom: 12,
  },
  Dividerbed2bcba: {
    height: 1,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 10,
  },
  FlatListc992f941Content: {
    flex: 1,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  ScrollViewf26042a5: {
    flexGrow: 1,
  },
  ScrollViewf26042a5Content: {
    marginTop: 21,
    flexShrink: 0,
    paddingBottom: 220,
  },
  Dividerde11d607: {
    height: 1,
  },
  Textf7bbdd1d: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  Text86ce3ba5: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
  },
  View0ae50d17: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  View88c44c3e: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Divider0e02aada: {
    height: 1,
    marginTop: 10,
  },
  Text5528eed5: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
  Text4036ef9a: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
  },
  Viewddd27fdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  ButtonSolidf0b1de94: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
  },
  View7bb6e4d9: {
    flexGrow: 1,
    flexShrink: 0,
    marginTop: 18,
  },
  Viewad2d300f: {
    flexGrow: 1,
    flexShrink: 0,
    marginLeft: 12,
    marginRight: 12,
    justifyContent: 'flex-end',
  },
  Viewe515c9dd: {
    paddingBottom: 20,
    bottom: 0,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  IconButton897c6051: {
    marginLeft: 16,
  },
  View7a993fb0: {
    marginTop: 20,
    marginBottom: 20,
  },
  Textcd71a0f7: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  View12981c6a: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  Viewa521a992: {
    justifyContent: 'center',
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    paddingRight: 8,
  },
  Text14121fc4: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
  },
  Viewfeac12d8: {
    justifyContent: 'center',
    marginLeft: 12,
  },
  View43b593eb: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 0,
  },
  View6a955cc3: {
    justifyContent: 'center',
  },
  View1957b5f2: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 0,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  Viewb7eaad51: {
    flexGrow: 1,
    flexShrink: 0,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
  },
  Text3e74d306: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 13,
  },
  View80a9a9a9: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
  },
  TextField04c2524d: {
    fontFamily: 'Poppins_400Regular',
  },
  Viewb5c2cefd: {
    flexGrow: 1,
    flexShrink: 0,
  },
  ButtonSolidce4d6f27: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: -10,
    width: 120,
  },
  View603e5d81: {
    marginLeft: 12,
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 0,
    marginRight: 12,
  },
  Divider79894792: {
    height: 1,
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  Texteafa8587: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  ButtonOutline02263c6f: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    height: 45,
  },
  TextInput795812dd: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    height: 45,
    width: 100,
  },
  View003a266c: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
  },
  ButtonSolid7d2cfd44: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 12,
    marginRight: 12,
  },
  Viewdbf79098: {
    flexGrow: 0,
    flexShrink: 0,
  },
  View45692adb: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  View2200bac7: {
    height: '100%',
  },
});

export default withTheme(BaggageCartScreen);
