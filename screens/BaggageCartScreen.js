import React from 'react';
import * as AddCostApi from '../apis/AddCostApi.js';
import * as CheckoutApi from '../apis/CheckoutApi.js';
import * as TestServiceDraftbitApi from '../apis/TestServiceDraftbitApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
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
  Image,
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

  const { theme } = props;
  const { navigation } = props;

  const checkoutPOST = CheckoutApi.useCheckoutPOST();
  const setPricePOST = AddCostApi.useSetPricePOST();

  const [isCard, setIsCard] = React.useState(true);
  const [isPlan, setIsPlan] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer hasTopSafeArea={false}>
      <View style={styles.ViewUk}>
        <Row justifyContent={'flex-start'} alignItems={'center'}>
          <Text style={[styles.Texth3, { color: theme.colors.strong }]}>
            {'Your Bag'}
          </Text>
        </Row>
      </View>

      <ScrollView
        style={styles.ScrollViewTm}
        contentContainerStyle={styles.ScrollViewTmContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <TestServiceDraftbitApi.FetchGetProductsGET>
          {({ loading, error, data, refetchGetProducts }) => {
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
                      <View style={styles.View_3q}>
                        <View
                          style={[
                            styles.ViewXO,
                            {
                              backgroundColor:
                                theme.colors.custom_rgb245_245_247,
                              borderRadius: 10,
                            },
                          ]}
                        >
                          <Image
                            style={styles.ImagexF}
                            source={Images.ShoppingCart}
                            resizeMode={'contain'}
                          />
                        </View>

                        <View style={styles.View_7z}>
                          <Text
                            style={[
                              styles.TextwE,
                              { color: theme.colors.primaryTitleUiBaeg },
                            ]}
                          >
                            {'Mila Kunista'}
                          </Text>

                          <View style={styles.ViewpG}>
                            <Text
                              style={[
                                styles.TextMH,
                                { color: theme.colors.primaryTitleUiBaeg },
                              ]}
                            >
                              {'$42'}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.ViewWa}>
                          <IconButton
                            style={styles.IconButtonfZ}
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
                        style={styles.Divider_4I}
                        color={theme.colors.divider}
                      />
                    </>
                  );
                }}
                contentContainerStyle={styles.FlatLista7Content}
                numColumns={1}
              />
            );
          }}
        </TestServiceDraftbitApi.FetchGetProductsGET>
      </ScrollView>

      <View
        style={[styles.ViewJG, { backgroundColor: theme.colors.background }]}
      >
        <Divider style={styles.DividerRG} color={theme.colors.primary} />
        <View style={styles.View_1a}>
          <View style={styles.ViewAi}>
            <Text
              style={[
                styles.Texta2,
                { color: theme.colors.custom_rgb189_198_212 },
              ]}
            >
              {'Subtotal'}
            </Text>

            <Text
              style={[
                styles.TextWZ,
                { color: theme.colors.primaryTitleUiBaeg },
              ]}
            >
              {'$420'}
            </Text>
          </View>

          <View style={styles.ViewwP}>
            <Text
              style={[
                styles.Textiv,
                { color: theme.colors.custom_rgb189_198_212 },
              ]}
            >
              {'Taxes/Fees'}
            </Text>

            <Text
              style={[
                styles.Textyu,
                { color: theme.colors.primaryTitleUiBaeg },
              ]}
            >
              {'$420'}
            </Text>
          </View>

          <View style={styles.View_9F}>
            <Text
              style={[
                styles.TextYy,
                { color: theme.colors.custom_rgb189_198_212 },
              ]}
            >
              {'Delivery Fee'}
            </Text>

            <Text
              style={[
                styles.Textp9,
                { color: theme.colors.primaryTitleUiBaeg },
              ]}
            >
              {'$420'}
            </Text>
          </View>
          <Divider style={styles.DividerTh} color={theme.colors.divider} />
          <View style={styles.ViewHm}>
            <Text
              style={[
                styles.Text_4n,
                { color: theme.colors.custom_rgb189_198_212 },
              ]}
            >
              {'Total Price'}
            </Text>

            <Text
              style={[
                styles.Text_69,
                { color: theme.colors.primaryTitleUiBaeg },
              ]}
            >
              {'$420'}
            </Text>
          </View>

          <View style={styles.ViewXU}>
            <ButtonSolid
              onPress={() => {
                try {
                  setShowModal(true);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.ButtonSolidSw,
                {
                  backgroundColor: theme.colors.primary,
                  borderColor: theme.colors.strongInverse,
                },
              ]}
              title={'Checkout'}
            />
          </View>
        </View>
      </View>
      <>
        {!showModal ? null : (
          <Modal animationType={'slide'} presentationStyle={'pageSheet'}>
            <View style={styles.ViewLI}>
              <View style={styles.Viewx0}>
                <Row justifyContent={'flex-start'} alignItems={'center'}>
                  <IconButton
                    onPress={() => {
                      try {
                        setShowModal(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={styles.IconButtonJO}
                    icon={'Ionicons/ios-chevron-back'}
                    size={32}
                  />
                  <Text style={[styles.TextFG, { color: theme.colors.strong }]}>
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
                  <View style={styles.ViewfM}>
                    <Text
                      style={[styles.TextmV, { color: theme.colors.strong }]}
                    >
                      {'Choose Payment Method'}
                    </Text>
                  </View>

                  <View style={styles.ViewzA}>
                    <View style={styles.ViewfZ}>
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
                            styles.ViewCr,
                            {
                              borderColor: theme.colors.internalBorder,
                              borderRadius: 12,
                            },
                          ]}
                        >
                          <View style={styles.Viewgz}>
                            <View style={styles.ViewqS}>
                              <Icon
                                name={'Ionicons/ios-card'}
                                size={24}
                                color={theme.colors.communityMediumBlack}
                              />
                            </View>

                            <View style={styles.Viewqt}>
                              <Text
                                style={[
                                  styles.Text_1r,
                                  { color: theme.colors.internalPrimaryBold },
                                ]}
                              >
                                {'Card Payment'}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.ViewuO}>
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

                    <View style={styles.ViewaC}>
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
                            styles.ViewUg,
                            {
                              borderColor: theme.colors.internalBorder,
                              borderRadius: 12,
                            },
                          ]}
                        >
                          <View style={styles.ViewOK}>
                            <View style={styles.View_2Q}>
                              <Icon
                                name={'Ionicons/school'}
                                size={24}
                                color={theme.colors.communityMediumBlack}
                              />
                            </View>

                            <View style={styles.View_8s}>
                              <Text
                                style={[
                                  styles.TextQb,
                                  { color: theme.colors.internalPrimaryBold },
                                ]}
                              >
                                {'Meal Plan'}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.ViewGE}>
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
                    <View style={styles.Viewmq}>
                      <Text
                        style={[styles.TextxW, { color: theme.colors.strong }]}
                      >
                        {'Have a coupon code?'}
                      </Text>
                    </View>

                    <View style={styles.Viewbl}>
                      <View
                        style={[
                          styles.Viewhv,
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
                          style={styles.TextFieldVn}
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
                          styles.ButtonSolidVC,
                          { backgroundColor: theme.colors.primary },
                        ]}
                        title={'Apply'}
                      />
                    </View>
                  </View>
                  <Divider
                    style={styles.DividerJL}
                    color={theme.colors.divider}
                  />
                  <View style={styles.Viewix}>
                    <Text
                      style={[
                        styles.Text_16,
                        { color: theme.colors.custom_rgb189_198_212 },
                      ]}
                    >
                      {'Driver Tip'}
                    </Text>
                    <Spacer top={8} right={12} bottom={8} left={12} />
                    <ButtonOutline
                      style={styles.ButtonOutline_9T}
                      title={'10%'}
                    />
                    <ButtonOutline
                      style={styles.ButtonOutline_5h}
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
                        styles.TextInputs6,
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

              <View style={styles.ViewCE}>
                <View style={styles.ViewJa}>
                  <ButtonSolid
                    onPress={async () => {
                      try {
                        setShowModal(false);
                        const cost = await setPricePOST.mutateAsync({
                          price: 299,
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
                      styles.ButtonSolidvc,
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
  Texth3: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
  },
  ViewUk: {
    marginTop: 60,
    marginBottom: 20,
  },
  ImagexF: {
    width: 52,
    height: 52,
  },
  ViewXO: {
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextwE: {
    fontSize: 15,
    textTransform: 'capitalize',
    fontFamily: 'Poppins_400Regular',
  },
  TextMH: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    marginRight: 12,
  },
  ViewpG: {
    flexDirection: 'row',
  },
  View_7z: {
    marginLeft: 10,
    justifyContent: 'space-between',
    marginTop: 11,
    marginBottom: 13,
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
  },
  IconButtonfZ: {
    marginRight: 8,
  },
  ViewWa: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  View_3q: {
    minHeight: 75,
    maxHeight: 75,
    marginLeft: 12,
    marginRight: 25,
    flexDirection: 'row',
    marginBottom: 12,
  },
  Divider_4I: {
    height: 1,
    marginLeft: '5%',
    marginRight: '5%',
  },
  FlatLista7Content: {
    flex: 1,
  },
  Fetchfa: {
    minHeight: 40,
  },
  ScrollViewTm: {
    flexGrow: 1,
  },
  ScrollViewTmContent: {
    marginTop: 21,
    flexShrink: 0,
    paddingBottom: 21,
    marginBottom: 200,
  },
  DividerRG: {
    height: 1,
  },
  Texta2: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  TextWZ: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
  },
  ViewAi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  Textiv: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  Textyu: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
  },
  ViewwP: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextYy: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  Textp9: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
  },
  View_9F: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DividerTh: {
    height: 1,
    marginTop: 10,
  },
  Text_4n: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
  Text_69: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
  },
  ViewHm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  ButtonSolidSw: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
  },
  ViewXU: {
    flexGrow: 1,
    flexShrink: 0,
    marginTop: 18,
  },
  View_1a: {
    flexGrow: 1,
    flexShrink: 0,
    marginLeft: 12,
    marginRight: 12,
    justifyContent: 'flex-end',
  },
  ViewJG: {
    paddingBottom: 20,
    bottom: 0,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  IconButtonJO: {
    marginLeft: 16,
  },
  TextFG: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
  },
  Viewx0: {
    marginTop: 20,
    marginBottom: 20,
  },
  TextmV: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  ViewfM: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  ViewqS: {
    justifyContent: 'center',
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    paddingRight: 8,
  },
  Text_1r: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
  },
  Viewqt: {
    justifyContent: 'center',
    marginLeft: 12,
  },
  Viewgz: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 0,
  },
  ViewuO: {
    justifyContent: 'center',
  },
  ViewCr: {
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
  ViewfZ: {
    flexGrow: 1,
    flexShrink: 0,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
  },
  View_2Q: {
    justifyContent: 'center',
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    paddingRight: 8,
  },
  TextQb: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 13,
  },
  View_8s: {
    justifyContent: 'center',
    marginLeft: 12,
  },
  ViewOK: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 0,
  },
  ViewGE: {
    justifyContent: 'center',
  },
  ViewUg: {
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
  ViewaC: {
    flexGrow: 1,
    flexShrink: 0,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
  },
  ViewzA: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
  },
  TextxW: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  Viewmq: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  TextFieldVn: {
    fontFamily: 'Poppins_400Regular',
  },
  Viewhv: {
    flexGrow: 1,
    flexShrink: 0,
  },
  ButtonSolidVC: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: -10,
    width: 120,
  },
  Viewbl: {
    marginLeft: 12,
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 0,
    marginRight: 12,
  },
  DividerJL: {
    height: 1,
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  Text_16: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  ButtonOutline_9T: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    height: 45,
  },
  ButtonOutline_5h: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    height: 45,
  },
  TextInputs6: {
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
  Viewix: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
  },
  ButtonSolidvc: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 12,
    marginRight: 12,
  },
  ViewJa: {
    flexGrow: 0,
    flexShrink: 0,
  },
  ViewCE: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  ViewLI: {
    height: '100%',
  },
});

export default withTheme(BaggageCartScreen);
