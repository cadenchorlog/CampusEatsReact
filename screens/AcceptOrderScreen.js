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

  const addDriverPOST = XanoApi.useAddDriverPOST();

  return (
    <ScreenContainer scrollable={false} hasSafeArea={true}>
      <View style={styles.View0bb8b0a3} />
      <View style={styles.View19e468f9}>
        <Icon name={'FontAwesome/angle-double-down'} size={80} />
        <Text style={[styles.Text0e732d29, { color: theme.colors.strong }]}>
          {'Accept this order?'}
        </Text>

        <Text style={[styles.Text30c802d7, { color: theme.colors.medium }]}>
          {'You cannot undo this action.'}
        </Text>
      </View>

      <View style={styles.Viewb1d9ece6}>
        <Touchable
          onPress={() => {
            try {
              navigation.goBack();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Text style={[styles.Text1b7e3f61, { color: theme.colors.light }]}>
            {'Cancel'}
          </Text>
        </Touchable>
        <ButtonSolid
          onPress={async () => {
            try {
              await addDriverPOST.mutateAsync({
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
          }}
          style={[
            styles.ButtonSolid1a5f45df,
            { backgroundColor: theme.colors.primary },
          ]}
          title={'Accept'}
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
