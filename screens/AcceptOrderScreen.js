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
      <View style={styles.View_7e} />
      <View style={styles.Viewpz}>
        <Icon name={'FontAwesome/angle-double-down'} size={80} />
        <Text style={[styles.Text_4a, { color: theme.colors.strong }]}>
          {'Accept this order?'}
        </Text>

        <Text style={[styles.Textrp, { color: theme.colors.medium }]}>
          {'You cannot undo this action.'}
        </Text>
      </View>

      <View style={styles.ViewlE}>
        <Touchable
          onPress={() => {
            try {
              navigation.goBack();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Text style={[styles.TextSf, { color: theme.colors.light }]}>
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
            styles.ButtonSolidhr,
            { backgroundColor: theme.colors.primary },
          ]}
          title={'Accept'}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  View_7e: {
    flexGrow: 1,
    flexShrink: 0,
    minHeight: '33%',
    maxHeight: 33,
  },
  Text_4a: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'System',
    fontWeight: '700',
  },
  Textrp: {
    fontSize: 16,
    lineHeight: 24,
  },
  Viewpz: {
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    minHeight: '33%',
    maxHeight: '34%',
  },
  TextSf: {
    textAlign: 'center',
    textTransform: 'none',
    lineHeight: 24,
    fontFamily: 'System',
    fontWeight: '600',
  },
  ButtonSolidhr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    fontFamily: 'System',
    fontWeight: '700',
    marginTop: 16,
  },
  ViewlE: {
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
