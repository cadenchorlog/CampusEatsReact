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
  Stack,
  TextField,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const BaggageCartScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const getTipAmmount = (oneFifty, threeDollar) => {
    if (oneFifty) {
      return 1.5;
    } else if (threeDollar) {
      return 3;
    } else {
      return 0;
    } // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const addTipCost = (subTotal, oneFifty, threeDollar) => {
    if (oneFifty) {
      return subTotal + 150;
    } else if (threeDollar) {
      return subTotal + 300;
    } else {
      return subTotal;
    }

    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

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

  const xanoRemoveFromCartPOST = XanoApi.useRemoveFromCartPOST();
  const checkoutCheckoutPOST = CheckoutApi.useCheckoutPOST();
  const addCostSetPricePOST = AddCostApi.useSetPricePOST();
  const xanoAddTipPOST = XanoApi.useAddTipPOST();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setShowMessage(false);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [dashOpen, setDashOpen] = React.useState(false);
  const [isCard, setIsCard] = React.useState(true);
  const [isPlan, setIsPlan] = React.useState(false);
  const [noTip, setNoTip] = React.useState(false);
  const [numberInputValue, setNumberInputValue] = React.useState(' ');
  const [oneFifty, setOneFifty] = React.useState(true);
  const [showMessage, setShowMessage] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('0');
  const [threeDollar, setThreeDollar] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);

  return (
    <ScreenContainer hasTopSafeArea={false}>
      {/* Header */}
      <View style={styles.Viewf39cc81f}>
        <Row justifyContent={'space-between'} alignItems={'center'}>
          <Text style={[styles.Textd59ae7c0, { color: theme.colors.strong }]}>
            {'Your Bag'}
          </Text>
          <IconButton
            onPress={() => {
              try {
                setDashOpen(true);
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles.IconButton2c3e883b}
            icon={'Ionicons/grid'}
            size={32}
            color={theme.colors.light}
          />
        </Row>
      </View>
      {/* Scrolling Content Frame */}
      <ScrollView
        style={styles.ScrollViewf26042a5}
        contentContainerStyle={styles.ScrollViewf26042a5Content}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <XanoApi.FetchGetUserCartGET
          refetchInterval={250}
          UID={Constants['user_id']}
        >
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
                keyExtractor={item => item?.id || item?.uuid || item}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <>
                      {/* Shopping Cart List Frame */}
                      <View style={styles.View00740b37}>
                        {/* Cart Item Details Frame */}
                        <View style={styles.Viewc46b8fec}>
                          {/* Cart Item Title */}
                          <Text
                            style={[
                              styles.Textbfd3752d,
                              { color: theme.colors.primaryTitleUiBaeg },
                            ]}
                          >
                            {listData?.itemName}
                          </Text>
                          {/* Price Size Frame */}
                          <View>
                            {/* Cart Item Price */}
                            <Text
                              style={[
                                styles.Textbfd3df7a,
                                { color: theme.colors.primaryTitleUiBaeg },
                              ]}
                            >
                              {listData?.itemPrice}
                            </Text>
                            {/* customizations */}
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
                        {/* Toggle Frame */}
                        <View style={styles.View6ff87234}>
                          <IconButton
                            onPress={() => {
                              const handler = async () => {
                                try {
                                  console.log(listData);
                                  await xanoRemoveFromCartPOST.mutateAsync({
                                    UID: Constants['user_id'],
                                    itemID: listData?.itemID,
                                    itemMods: listData?.customizations,
                                  });
                                  await refetchGetUserCart();
                                  await refetchGetCartTotals();
                                } catch (err) {
                                  console.error(err);
                                }
                              };
                              handler();
                            }}
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
        <>
          {!showMessage ? null : (
            <View style={styles.View3316e76b}>
              <Text
                style={[styles.Text4c56df9c, { color: theme.colors.strong }]}
              >
                {'Your bag is empty. Add some items and check back here later.'}
              </Text>
            </View>
          )}
        </>
      </ScrollView>
      {/* Footer Frame */}
      <View
        style={[
          styles.Viewe515c9dd,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Divider style={styles.Dividerde11d607} color={theme.colors.primary} />
        <XanoApi.FetchGetCartTotalsGET
          refetchInterval={500}
          user_id={Constants['user_id']}
          onData={fetchData => {
            try {
              const finalTotal = multiplyTotal(fetchData?.total);
              setTotalPrice(finalTotal);
              console.log(finalTotal);
              if (fetchData?.subTotal !== 0) {
                return;
              }
              setShowMessage(true);
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
              <>
                {/* Content Frame */}
                <>
                  {!(fetchData?.subTotal !== 0) ? null : (
                    <View style={styles.Viewad2d300f}>
                      {/* Subtotal View */}
                      <View style={styles.View0ae50d17}>
                        {/* Total Price Title */}
                        <Text
                          style={[
                            styles.Textf7bbdd1d,
                            { color: theme.colors.custom_rgb189_198_212 },
                          ]}
                        >
                          {'Items total'}
                        </Text>
                        {/* Total Price */}
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
                      {/* Tax and Fees View */}
                      <View style={styles.View88c44c3e}>
                        {/* Total Price Title */}
                        <Text
                          style={[
                            styles.Textf7bbdd1d,
                            { color: theme.colors.custom_rgb189_198_212 },
                          ]}
                        >
                          {'Taxes/Fees'}
                        </Text>
                        {/* Total Price */}
                        <Text
                          style={[
                            styles.Text86ce3ba5,
                            { color: theme.colors.primaryTitleUiBaeg },
                          ]}
                        >
                          {'Calculated Next'}
                        </Text>
                      </View>
                      {/* Delivery Fee View */}
                      <View style={styles.View88c44c3e}>
                        {/* Total Price Title */}
                        <Text
                          style={[
                            styles.Textf7bbdd1d,
                            { color: theme.colors.custom_rgb189_198_212 },
                          ]}
                        >
                          {'Delivery Fee'}
                        </Text>
                        {/* Total Price */}
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
                      {/* Total Price Frame */}
                      <View style={styles.Viewddd27fdd}>
                        {/* Total Price Title */}
                        <Text
                          style={[
                            styles.Text5528eed5,
                            { color: theme.colors.custom_rgb189_198_212 },
                          ]}
                        >
                          {'Subtotal'}
                        </Text>
                        {/* Total Price */}
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
                      {/* Flex Property Button Frame */}
                      <View style={styles.View7bb6e4d9}>
                        <ButtonSolid
                          onPress={() => {
                            try {
                              setShowModal(true);
                              console.log(numberInputValue);
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
                  )}
                </>
              </>
            );
          }}
        </XanoApi.FetchGetCartTotalsGET>
      </View>
      {/* Payment Modal */}
      <>
        {!showModal ? null : (
          <Modal animationType={'slide'} presentationStyle={'pageSheet'}>
            {/* Payment */}
            <View style={styles.View2200bac7}>
              {/* Header */}
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
                {/* Content Frame */}
                <View>
                  {/* List Title Frame  */}
                  <View style={styles.View12981c6a}>
                    {/* Rich Text Title */}
                    <Text
                      style={[
                        styles.Textcd71a0f7,
                        { color: theme.colors.strong },
                      ]}
                    >
                      {'Choose Payment Method'}
                    </Text>
                  </View>
                  {/* Actions Frame */}
                  <View style={styles.View80a9a9a9}>
                    {/* Card Payment */}
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
                        {/* Button Frame */}
                        <View
                          style={[
                            styles.View1957b5f2,
                            {
                              borderColor: theme.colors.internalBorder,
                              borderRadius: 12,
                            },
                          ]}
                        >
                          {/* Left Side Frame */}
                          <View style={styles.View43b593eb}>
                            {/* Icon Flex Frame */}
                            <View style={styles.Viewa521a992}>
                              <Icon
                                name={'Ionicons/ios-card'}
                                size={24}
                                color={theme.colors.communityMediumBlack}
                              />
                            </View>
                            {/* Option Title Frame */}
                            <View style={styles.Viewfeac12d8}>
                              {/* Option Title */}
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
                          {/* Right Side Frame */}
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
                    {/* Flex Touchable */}
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
                        {/* Button Frame */}
                        <View
                          style={[
                            styles.View1957b5f2,
                            {
                              borderColor: theme.colors.internalBorder,
                              borderRadius: 12,
                            },
                          ]}
                        >
                          {/* Left Side Frame */}
                          <View style={styles.View43b593eb}>
                            {/* Icon Flex Frame */}
                            <View style={styles.Viewa521a992}>
                              <Icon
                                name={'Ionicons/school'}
                                size={24}
                                color={theme.colors.communityMediumBlack}
                              />
                            </View>
                            {/* Option Title Frame */}
                            <View style={styles.Viewfeac12d8}>
                              {/* Option Title */}
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
                          {/* Right Side Frame */}
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
                  {/* Voucher Frame */}
                  <View>
                    {/* List Title Frame  */}
                    <View style={styles.View12981c6a}>
                      {/* Rich Text Title */}
                      <Text
                        style={[
                          styles.Textcd71a0f7,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {'Have a coupon code?'}
                      </Text>
                    </View>
                    {/* Actions Input Frame */}
                    <View style={styles.View603e5d81}>
                      {/* Flex for Text Field */}
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
                  {/* Driver Tip */}
                  <View style={styles.View8cb92e19}>
                    {/* Total Price Title */}
                    <Text
                      style={[
                        styles.Texteafa8587,
                        { color: theme.colors.custom_rgb189_198_212 },
                      ]}
                    >
                      {'Driver Tip'}
                    </Text>
                    <Spacer top={8} right={12} bottom={8} left={12} />
                    {/* oneFiftyOutline */}
                    <>
                      {oneFifty ? null : (
                        <ButtonOutline
                          onPress={() => {
                            try {
                              setThreeDollar(false);
                              setNoTip(false);
                              setOneFifty(true);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={styles.ButtonOutline75c728b2}
                          title={'$1.50'}
                        />
                      )}
                    </>
                    {/* oneFiftySolid */}
                    <>
                      {!oneFifty ? null : (
                        <ButtonSolid
                          style={[
                            styles.ButtonSolid2d5f6a36,
                            { backgroundColor: theme.colors.primary },
                          ]}
                          title={'$1.50'}
                        />
                      )}
                    </>
                    {/* threeOutline */}
                    <>
                      {threeDollar ? null : (
                        <ButtonOutline
                          onPress={() => {
                            try {
                              setThreeDollar(true);
                              setOneFifty(false);
                              setNoTip(false);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={styles.ButtonOutline75c728b2}
                          title={'$3.00'}
                        />
                      )}
                    </>
                    {/* threeSolid */}
                    <>
                      {!threeDollar ? null : (
                        <ButtonSolid
                          style={[
                            styles.ButtonSolid2d5f6a36,
                            { backgroundColor: theme.colors.primary },
                          ]}
                          title={'$3.00'}
                        />
                      )}
                    </>
                    {/* noneOutline */}
                    <>
                      {noTip ? null : (
                        <ButtonOutline
                          onPress={() => {
                            try {
                              setNoTip(true);
                              setOneFifty(false);
                              setThreeDollar(false);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={styles.ButtonOutline75c728b2}
                          title={'None'}
                        />
                      )}
                    </>
                    {/* noneSolid */}
                    <>
                      {!noTip ? null : (
                        <ButtonSolid
                          style={[
                            styles.ButtonSolid2d5f6a36,
                            { backgroundColor: theme.colors.primary },
                          ]}
                          title={'None'}
                        />
                      )}
                    </>
                  </View>
                </View>
              </KeyboardAwareScrollView>
              {/* Footer Frame */}
              <View style={styles.View45692adb}>
                {/* Flex Touchable */}
                <View style={styles.Viewdbf79098}>
                  <ButtonSolid
                    onPress={() => {
                      const handler = async () => {
                        try {
                          const tipAmount = getTipAmmount(
                            oneFifty,
                            threeDollar
                          );
                          const logAddTip = await xanoAddTipPOST.mutateAsync({
                            tip: tipAmount,
                            user_id: Constants['user_id'],
                          });
                          const newTotalPrice = addTipCost(
                            totalPrice,
                            oneFifty,
                            threeDollar
                          );
                          const cost = await addCostSetPricePOST.mutateAsync({
                            price: newTotalPrice,
                            priceID: 299,
                          });
                          const prodID = cost.id;
                          const check = await checkoutCheckoutPOST.mutateAsync({
                            UID: Constants['user_id'],
                            priceID: prodID,
                          });
                          const url = check.url;
                          navigation.navigate('CheckoutScreen', { url: url });
                          console.log(Constants['checkoutURL']);
                          console.log(url);
                          setShowModal(false);
                          console.log(logAddTip);
                          console.log(numberInputValue);
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
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
      {/* dashboardModal */}
      <>
        {!dashOpen ? null : (
          <Modal animationType={'slide'} presentationStyle={'pageSheet'}>
            {/* Header */}
            <View style={styles.View40d56b89}>
              <Row justifyContent={'flex-start'} alignItems={'center'}>
                <IconButton
                  onPress={() => {
                    try {
                      setDashOpen(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={styles.IconButton897c6051}
                  icon={'AntDesign/close'}
                  size={40}
                />
                <Text
                  style={[styles.Textd59ae7c0, { color: theme.colors.strong }]}
                >
                  {'Dashboard'}
                </Text>
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
                    setDashOpen(false);
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
                    setDashOpen(false);
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
                    setDashOpen(false);
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
                    setDashOpen(false);
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
                    setDashOpen(false);
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
  Textd59ae7c0: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
  },
  IconButton2c3e883b: {
    marginRight: 16,
  },
  Viewf39cc81f: {
    marginTop: 60,
    marginBottom: 20,
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
  View6ff87234: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  View00740b37: {
    minHeight: 60,
    maxHeight: 60,
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
  Text4c56df9c: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 22,
    paddingLeft: 16,
    paddingRight: 16,
  },
  View3316e76b: {
    top: 100,
    position: 'absolute',
    left: 0,
    right: 0,
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
  ButtonOutline75c728b2: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
  },
  ButtonSolid2d5f6a36: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
  },
  View8cb92e19: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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

export default withTheme(BaggageCartScreen);
