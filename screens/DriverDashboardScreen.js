import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import { Circle, Icon, ScreenContainer, Spacer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const DriverDashboardScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;

  return (
    <ScreenContainer scrollable={true} hasTopSafeArea={true}>
      {/* Header */}
      <View style={styles.Viewc037e9c3}>
        <View style={styles.View5cf968ba}>
          <Text style={[styles.Text74c7f382, { color: theme.colors.light }]}>
            {'Welcome,'}
          </Text>

          <Text style={[styles.Text7caf95ca, { color: theme.colors.strong }]}>
            {Constants['user_name']}
          </Text>
        </View>
        <Spacer top={8} right={8} bottom={8} left={8} />
      </View>
      {/* Cards */}
      <View />
      {/* Trends */}
      <View style={styles.Viewf32039c1}>
        <XanoApi.FetchGetUserRecordGET user_id={Constants['user_id']}>
          {({ loading, error, data, refetchGetUserRecord }) => {
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
              <View style={styles.Viewf734b5f3}>
                <View
                  style={[
                    styles.View299f7dc6,
                    { backgroundColor: theme.colors.divider, borderRadius: 8 },
                  ]}
                >
                  <Icon
                    name={'FontAwesome/bank'}
                    size={26}
                    color={theme.colors.light}
                  />
                </View>
                <Spacer right={4} left={4} />
                <View style={styles.Viewc992f941}>
                  <Text
                    style={[styles.Textaabf5915, { color: theme.colors.light }]}
                  >
                    {'Current Balance'}
                  </Text>

                  <Text
                    style={[
                      styles.Text77c80820,
                      { color: theme.colors.strong },
                    ]}
                  >
                    {'$'}
                    {fetchData?.driverBalance}
                  </Text>
                </View>
              </View>
            );
          }}
        </XanoApi.FetchGetUserRecordGET>
      </View>
      {/* Transactions */}
      <View
        style={[
          styles.View69fe1f2a,
          {
            borderTopLeftRadius: 48,
            borderTopRightRadius: 48,
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.divider,
          },
        ]}
      >
        <View>
          <View style={styles.View1de44df9}>
            <Text style={[styles.Textdc3e6c95, { color: theme.colors.strong }]}>
              {'Earning History'}
            </Text>
          </View>
          <Spacer top={12} bottom={12} />
          <XanoApi.FetchGetUserRecordGET user_id={Constants['user_id']}>
            {({ loading, error, data, refetchGetUserRecord }) => {
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
                  data={fetchData?.earningHistory}
                  listKey={'ZkbUG5t3'}
                  keyExtractor={item => item?.id || item?.uuid || item}
                  renderItem={({ item }) => {
                    const listData = item;
                    return (
                      <>
                        <View style={styles.View7d6a39b7}>
                          <Circle size={60} bgColor={theme.colors.divider}>
                            <Circle size={56} bgColor={theme.colors.background}>
                              <Icon
                                style={styles.Iconbabcec09}
                                name={'Feather/tag'}
                                size={24}
                                color={theme.colors.light}
                              />
                            </Circle>
                          </Circle>
                          <Spacer right={6} left={6} />
                          <View style={styles.Viewc992f941}>
                            <Text
                              style={[
                                styles.Textaabf5915,
                                { color: theme.colors.light },
                              ]}
                            >
                              {'Delivery Earnings'}
                            </Text>

                            <Text
                              style={[
                                styles.Texta04294cb,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {'Balance Increase'}
                            </Text>
                          </View>
                          <Spacer right={4} left={4} />
                          <View style={styles.Viewc65acab6}>
                            <Text
                              style={[
                                styles.Text7b405a32,
                                { color: theme.colors.medium },
                              ]}
                            >
                              {'$'}
                              {listData?.Earnings}
                            </Text>
                          </View>
                        </View>
                        <Spacer top={8} bottom={8} />
                      </>
                    );
                  }}
                  contentContainerStyle={styles.FlatListc992f941Content}
                  numColumns={1}
                />
              );
            }}
          </XanoApi.FetchGetUserRecordGET>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Text74c7f382: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  Text7caf95ca: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    marginTop: 4,
  },
  View5cf968ba: {
    flex: 1,
    justifyContent: 'center',
  },
  Viewc037e9c3: {
    flexDirection: 'row',
    paddingLeft: 24,
    paddingTop: 32,
    paddingRight: 24,
    paddingBottom: 24,
  },
  View299f7dc6: {
    paddingLeft: 12,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  Textaabf5915: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  Text77c80820: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    marginTop: 2,
  },
  Viewc992f941: {
    flex: 1,
  },
  Viewf734b5f3: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  Viewf32039c1: {
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  Textdc3e6c95: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
  },
  View1de44df9: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Iconbabcec09: {
    marginLeft: 4,
  },
  Texta04294cb: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginTop: 4,
  },
  Text7b405a32: {
    fontFamily: 'Inter_700Bold',
  },
  Viewc65acab6: {
    alignItems: 'flex-end',
  },
  View7d6a39b7: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  FlatListc992f941Content: {
    flex: 1,
  },
  View69fe1f2a: {
    paddingLeft: 32,
    paddingTop: 36,
    paddingRight: 32,
    paddingBottom: 36,
    flex: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
});

export default withTheme(DriverDashboardScreen);
