import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  Icon,
  IconButton,
  Row,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { StyleSheet, Text, View } from 'react-native';

const AccountScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;

  return (
    <ScreenContainer scrollable={true} hasSafeArea={false}>
      <View style={styles.ViewOY}>
        <Row justifyContent={'flex-start'} alignItems={'center'}>
          <IconButton
            style={styles.IconButtonaC}
            icon={'Ionicons/ios-chevron-back'}
            size={32}
          />
          <Text style={[styles.Textbc, { color: theme.colors.strong }]}>
            {'Hi '}
            {Constants['user_name']}
            {'!'}
          </Text>
        </Row>
      </View>

      <View style={styles.ViewyF} needsOffscreenAlphaCompositing={false}>
        <Touchable style={styles.TouchableUg}>
          <View
            style={[
              styles.Viewdz,
              {
                borderRadius: theme.roundness,
                borderColor: theme.colors.divider,
                backgroundColor: theme.colors.background,
              },
            ]}
          >
            <View style={styles.Viewub}>
              <Text
                style={[
                  theme.typography.headline6,
                  styles.Text_3f,
                  { color: theme.colors.strong },
                ]}
                allowFontScaling={true}
              >
                {'Address'}
              </Text>

              <Text
                style={[
                  theme.typography.subtitle1,
                  styles.TextuC,
                  { color: theme.colors.medium },
                ]}
                allowFontScaling={true}
              >
                {'Edit'}
              </Text>
            </View>

            <View style={styles.ViewT1}>
              <Icon
                style={styles.IconYe}
                size={24}
                color={theme.colors.strong}
                name={'Entypo/home'}
              />
            </View>
          </View>
        </Touchable>

        <Touchable style={styles.TouchablevW}>
          <View
            style={[
              styles.View_55,
              {
                borderColor: theme.colors.divider,
                backgroundColor: theme.colors.background,
                borderRadius: theme.roundness,
              },
            ]}
          >
            <View style={styles.ViewrI}>
              <Text
                style={[
                  theme.typography.headline6,
                  styles.TextL3,
                  { color: theme.colors.strong },
                ]}
                allowFontScaling={true}
              >
                {'CampusLink'}
              </Text>

              <Text
                style={[
                  theme.typography.subtitle1,
                  styles.TextIv,
                  { color: theme.colors.medium },
                ]}
                allowFontScaling={true}
              >
                {'Manage'}
              </Text>
            </View>

            <View style={styles.ViewrK}>
              <Icon
                style={styles.Iconbd}
                color={theme.colors.strong}
                size={24}
                name={'Ionicons/school'}
              />
            </View>
          </View>
        </Touchable>

        <Touchable style={styles.Touchablexz}>
          <View
            style={[
              styles.ViewUM,
              {
                borderColor: theme.colors.divider,
                backgroundColor: theme.colors.background,
                borderRadius: theme.roundness,
              },
            ]}
          >
            <View style={styles.ViewM9}>
              <Text
                style={[
                  theme.typography.headline6,
                  styles.TextZt,
                  { color: theme.colors.strong },
                ]}
                allowFontScaling={true}
              >
                {'Courier Settings'}
              </Text>
            </View>

            <View style={styles.ViewbY}>
              <Icon
                style={styles.IconPZ}
                color={theme.colors.strong}
                size={24}
                name={'MaterialIcons/delivery-dining'}
              />
            </View>
          </View>
        </Touchable>

        <Touchable style={styles.Touchablee0}>
          <View
            style={[
              styles.ViewbQ,
              {
                borderRadius: theme.roundness,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.divider,
              },
            ]}
          >
            <View style={styles.View_5z}>
              <Text
                style={[
                  theme.typography.headline6,
                  styles.TextNB,
                  { color: theme.colors.strong },
                ]}
                allowFontScaling={true}
              >
                {'Edit Your \nInfo'}
              </Text>
            </View>

            <View style={styles.ViewgI}>
              <Icon
                style={styles.IconNs}
                size={24}
                name={'MaterialCommunityIcons/card-account-details-outline'}
                color={theme.colors.strong}
              />
            </View>
          </View>
        </Touchable>

        <Touchable style={styles.TouchableZJ}>
          <View
            style={[
              styles.ViewXl,
              {
                borderRadius: theme.roundness,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.divider,
              },
            ]}
          >
            <View style={styles.ViewUh}>
              <Text
                style={[
                  theme.typography.headline6,
                  styles.TextUY,
                  { color: theme.colors.error },
                ]}
                allowFontScaling={true}
              >
                {'Delete Account'}
              </Text>
            </View>

            <View style={styles.Viewfz}>
              <Icon
                style={styles.IconXi}
                size={24}
                name={'AntDesign/deleteuser'}
                color={theme.colors.error}
              />
            </View>
          </View>
        </Touchable>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  IconButtonaC: {
    marginLeft: 16,
  },
  Textbc: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
  },
  ViewOY: {
    marginTop: 60,
    marginBottom: 20,
  },
  Text_3f: {
    textAlign: 'left',
  },
  TextuC: {
    textAlign: 'left',
  },
  Viewub: {
    marginBottom: 24,
  },
  IconYe: {
    width: 24,
    height: 24,
  },
  ViewT1: {
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
  },
  Viewdz: {
    width: '100%',
    height: 140,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 14,
    paddingTop: 14,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  TouchableUg: {
    width: '45%',
    marginBottom: 14,
    marginTop: 14,
    alignSelf: 'stretch',
  },
  TextL3: {
    textAlign: 'left',
  },
  TextIv: {
    textAlign: 'left',
  },
  ViewrI: {
    marginBottom: 24,
  },
  Iconbd: {
    height: 24,
    width: 24,
  },
  ViewrK: {
    justifyContent: 'center',
    width: 42,
    height: 42,
    alignItems: 'center',
  },
  View_55: {
    paddingRight: 14,
    paddingBottom: 14,
    paddingTop: 14,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    width: '100%',
    height: 140,
    paddingLeft: 14,
  },
  TouchablevW: {
    alignSelf: 'stretch',
    marginTop: 14,
    marginBottom: 14,
    width: '45%',
  },
  TextZt: {
    textAlign: 'left',
  },
  ViewM9: {
    marginBottom: 24,
  },
  IconPZ: {
    height: 24,
    width: 24,
  },
  ViewbY: {
    justifyContent: 'center',
    width: 42,
    height: 42,
    alignItems: 'center',
  },
  ViewUM: {
    paddingRight: 14,
    paddingBottom: 14,
    paddingTop: 14,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    width: '100%',
    height: 140,
    paddingLeft: 14,
  },
  Touchablexz: {
    alignSelf: 'stretch',
    marginTop: 14,
    marginBottom: 14,
    width: '45%',
  },
  TextNB: {
    textAlign: 'left',
  },
  View_5z: {
    marginBottom: 24,
  },
  IconNs: {
    height: 24,
    width: 24,
  },
  ViewgI: {
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
  },
  ViewbQ: {
    borderRightWidth: 1,
    width: '100%',
    height: 140,
    paddingLeft: 14,
    borderBottomWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingTop: 14,
    paddingBottom: 14,
    paddingRight: 14,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  Touchablee0: {
    alignSelf: 'stretch',
    marginTop: 14,
    marginBottom: 14,
    width: '45%',
  },
  TextUY: {
    textAlign: 'left',
  },
  ViewUh: {
    marginBottom: 24,
  },
  IconXi: {
    width: 24,
    height: 24,
  },
  Viewfz: {
    justifyContent: 'center',
    width: 42,
    height: 42,
    alignItems: 'center',
  },
  ViewXl: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingRight: 14,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    paddingLeft: 14,
    height: 140,
    width: '100%',
    borderRightWidth: 1,
  },
  TouchableZJ: {
    alignSelf: 'stretch',
    marginTop: 14,
    marginBottom: 14,
    width: '95%',
  },
  ViewyF: {
    justifyContent: 'space-evenly',
    paddingLeft: 32,
    alignItems: 'flex-start',
    paddingRight: 32,
    flexWrap: 'wrap',
    paddingBottom: 72,
    flexDirection: 'row',
    top: 20,
  },
});

export default withTheme(AccountScreen);
