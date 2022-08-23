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
  const { navigation } = props;

  return (
    <ScreenContainer scrollable={true} hasSafeArea={false}>
      {/* Header */}
      <View style={styles.Viewf39cc81f}>
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
            size={32}
          />
          <Text style={[styles.Textd59ae7c0, { color: theme.colors.strong }]}>
            {'Hi '}
            {Constants['user_name']}
            {'!'}
          </Text>
        </Row>
      </View>
      {/* browse-grid */}
      <View style={styles.View467c9a69} needsOffscreenAlphaCompositing={false}>
        {/* Address */}
        <Touchable
          onPress={() => {
            try {
              navigation.navigate('UserSetAddressScreen');
            } catch (err) {
              console.error(err);
            }
          }}
          style={styles.Touchablef4217bc1}
        >
          <View
            style={[
              styles.View932db872,
              {
                borderRadius: theme.roundness,
                borderColor: theme.colors.divider,
                backgroundColor: theme.colors.background,
              },
            ]}
          >
            <View style={styles.View2d6d8dcf}>
              <Text
                style={[
                  theme.typography.headline6,
                  styles.Texta242a4cc,
                  { color: theme.colors.strong },
                ]}
                allowFontScaling={true}
              >
                {'Address'}
              </Text>

              <Text
                style={[
                  theme.typography.subtitle1,
                  styles.Textada04eb3,
                  { color: theme.colors.medium },
                ]}
                allowFontScaling={true}
              >
                {'Edit'}
              </Text>
            </View>

            <View style={styles.View4b7a0743}>
              <Icon
                style={styles.Icon9e5973b7}
                size={24}
                color={theme.colors.strong}
                name={'Entypo/home'}
              />
            </View>
          </View>
        </Touchable>
        {/* CampusLink */}
        <Touchable style={styles.Touchable8f61467f}>
          <View
            style={[
              styles.View3896efdd,
              {
                borderColor: theme.colors.divider,
                backgroundColor: theme.colors.background,
                borderRadius: theme.roundness,
              },
            ]}
          >
            <View style={styles.View2d6d8dcf}>
              <Text
                style={[
                  theme.typography.headline6,
                  styles.Text4b62e5ec,
                  { color: theme.colors.strong },
                ]}
                allowFontScaling={true}
              >
                {'CampusLink'}
              </Text>

              <Text
                style={[
                  theme.typography.subtitle1,
                  styles.Textada04eb3,
                  { color: theme.colors.medium },
                ]}
                allowFontScaling={true}
              >
                {'Manage'}
              </Text>
            </View>

            <View style={styles.Viewc76bc0e2}>
              <Icon
                style={styles.Icon33b61cb6}
                color={theme.colors.strong}
                size={24}
                name={'Ionicons/school'}
              />
            </View>
          </View>
        </Touchable>
        {/* Courier */}
        <Touchable style={styles.Touchable8f61467f}>
          <View
            style={[
              styles.View3896efdd,
              {
                borderColor: theme.colors.divider,
                backgroundColor: theme.colors.background,
                borderRadius: theme.roundness,
              },
            ]}
          >
            <View style={styles.View2d6d8dcf}>
              <Text
                style={[
                  theme.typography.headline6,
                  styles.Text4b62e5ec,
                  { color: theme.colors.strong },
                ]}
                allowFontScaling={true}
              >
                {'Courier Settings'}
              </Text>
            </View>

            <View style={styles.Viewc76bc0e2}>
              <Icon
                style={styles.Icon33b61cb6}
                color={theme.colors.strong}
                size={24}
                name={'MaterialIcons/delivery-dining'}
              />
            </View>
          </View>
        </Touchable>
        {/* UserInfo */}
        <Touchable style={styles.Touchable8f61467f}>
          <View
            style={[
              styles.View63455e03,
              {
                borderRadius: theme.roundness,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.divider,
              },
            ]}
          >
            <View style={styles.View2d6d8dcf}>
              <Text
                style={[
                  theme.typography.headline6,
                  styles.Textca4d6164,
                  { color: theme.colors.strong },
                ]}
                allowFontScaling={true}
              >
                {'Edit Your \nInfo'}
              </Text>
            </View>

            <View style={styles.View4b7a0743}>
              <Icon
                style={styles.Icon33b61cb6}
                size={24}
                name={'MaterialCommunityIcons/card-account-details-outline'}
                color={theme.colors.strong}
              />
            </View>
          </View>
        </Touchable>
        {/* Delete Account */}
        <Touchable style={styles.Touchable8cc81ad3}>
          <View
            style={[
              styles.View4fcb54fe,
              {
                borderRadius: theme.roundness,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.divider,
              },
            ]}
          >
            <View style={styles.View2d6d8dcf}>
              <Text
                style={[
                  theme.typography.headline6,
                  styles.Text8fd5a47f,
                  { color: theme.colors.error },
                ]}
                allowFontScaling={true}
              >
                {'Delete Account'}
              </Text>
            </View>

            <View style={styles.Viewc76bc0e2}>
              <Icon
                style={styles.Icon9e5973b7}
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
  IconButton897c6051: {
    marginLeft: 16,
  },
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
  Texta242a4cc: {
    textAlign: 'left',
  },
  Textada04eb3: {
    textAlign: 'left',
  },
  View2d6d8dcf: {
    marginBottom: 24,
  },
  Icon9e5973b7: {
    width: 24,
    height: 24,
  },
  View4b7a0743: {
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
  },
  View932db872: {
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
  Touchablef4217bc1: {
    width: '45%',
    marginBottom: 14,
    marginTop: 14,
    alignSelf: 'stretch',
  },
  Text4b62e5ec: {
    textAlign: 'left',
  },
  Icon33b61cb6: {
    height: 24,
    width: 24,
  },
  Viewc76bc0e2: {
    justifyContent: 'center',
    width: 42,
    height: 42,
    alignItems: 'center',
  },
  View3896efdd: {
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
  Touchable8f61467f: {
    alignSelf: 'stretch',
    marginTop: 14,
    marginBottom: 14,
    width: '45%',
  },
  Textca4d6164: {
    textAlign: 'left',
  },
  View63455e03: {
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
  Text8fd5a47f: {
    textAlign: 'left',
  },
  View4fcb54fe: {
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
  Touchable8cc81ad3: {
    alignSelf: 'stretch',
    marginTop: 14,
    marginBottom: 14,
    width: '95%',
  },
  View467c9a69: {
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
