import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  ButtonSolid,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { StyleSheet, Text, View } from 'react-native';

const AcceptOrderScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const xanoAddDriverPOST = XanoApi.useAddDriverPOST();

  return (
    <ScreenContainer scrollable={false} hasSafeArea={true}>
      {/* Header Wrapper */}
      <View style={styles.View0bb8b0a3} />
      {/* Content Wrapper */}
      <View style={styles.View19e468f9}>
        <Icon
          style={styles.Icon7a33adf1}
          name={'FontAwesome/angle-double-down'}
          size={80}
          color={theme.colors.light}
        />
        {/* Permissions Name */}
        <Text style={[styles.Text0e732d29, { color: theme.colors.strong }]}>
          {'Accept this order?'}
        </Text>
        {/* Permissions Description */}
        <Text style={[styles.Text30c802d7, { color: theme.colors.medium }]}>
          {'You cannot undo this action.'}
        </Text>
      </View>
      {/* Footer Wrapper */}
      <View style={styles.Viewb1d9ece6}>
        {/* Skip Touchable */}
        <Touchable
          onPress={() => {
            try {
              navigation.goBack();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {/* goBack */}
          <Text style={[styles.Text1b7e3f61, { color: theme.colors.light }]}>
            {'Cancel'}
          </Text>
        </Touchable>
        {/* confrim */}
        <ButtonSolid
          onPress={() => {
            const handler = async () => {
              try {
                await xanoAddDriverPOST.mutateAsync({
                  orderID: props.route?.params?.orderID ?? '',
                  userID: Constants['user_id'],
                });
                setGlobalVariableValue({
                  key: 'courierActive',
                  value: true,
                });
                navigation.navigate('StackNavigator', {
                  screen: 'DriverNav',
                  params: { screen: 'AvailableOrdersScreen' },
                });
                setGlobalVariableValue({
                  key: 'driverPickupID',
                  value: props.route?.params?.orderID ?? '',
                });
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={[
            styles.ButtonSolid1a5f45df,
            { backgroundColor: theme.colors.primary },
          ]}
          title={'Confirm'}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  View0bb8b0a3: {
    flexGrow: 1,
    flexShrink: 0,
    minHeight: '33%',
    maxHeight: 33,
  },
  Icon7a33adf1: {
    opacity: 1,
  },
  Text0e732d29: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'System',
    fontWeight: '700',
  },
  Text30c802d7: {
    fontSize: 16,
    lineHeight: 24,
  },
  View19e468f9: {
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    minHeight: '33%',
    maxHeight: '34%',
  },
  Text1b7e3f61: {
    textAlign: 'center',
    textTransform: 'none',
    lineHeight: 24,
    fontFamily: 'System',
    fontWeight: '600',
  },
  ButtonSolid1a5f45df: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    fontFamily: 'System',
    fontWeight: '700',
    marginTop: 16,
  },
  Viewb1d9ece6: {
    paddingLeft: 12,
    paddingRight: 12,
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'flex-end',
    paddingBottom: 30,
    minHeight: '33%',
    maxHeight: '33%',
  },
});

export default withTheme(AcceptOrderScreen);
