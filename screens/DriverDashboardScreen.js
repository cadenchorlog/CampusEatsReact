import React from 'react';
import * as DraftbitApi from '../apis/DraftbitApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  Circle,
  CircleImage,
  Icon,
  Link,
  ScreenContainer,
  Spacer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
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
      <View style={styles.ViewKY}>
        <View style={styles.ViewvY}>
          <Text style={[styles.TextUg, { color: theme.colors.light }]}>
            {'Welcome,'}
          </Text>

          <Text style={[styles.Text_7Q, { color: theme.colors.strong }]}>
            {Constants['user_name']}
          </Text>
        </View>
        <Spacer top={8} right={8} bottom={8} left={8} />
        <View>
          <Touchable>
            <CircleImage
              source={{
                uri: 'https://global-uploads.webflow.com/5e740d74e6787687577e9b38/5e826ae4a89f421c3a363704_Donald-Hruska.png',
              }}
              size={48}
            />
          </Touchable>
        </View>
      </View>
      <View />
      <View style={styles.ViewMx}>
        <View style={styles.ViewnW}>
          <View
            style={[
              styles.ViewOb,
              { backgroundColor: theme.colors.divider, borderRadius: 8 },
            ]}
          >
            <Icon
              name={'FontAwesome/dollar'}
              size={26}
              color={theme.colors.light}
            />
          </View>
          <Spacer right={4} left={4} />
          <View style={styles.ViewAV}>
            <Text style={[styles.Text_0i, { color: theme.colors.light }]}>
              {'Weekly Earnings'}
            </Text>

            <Text style={[styles.Text_01, { color: theme.colors.strong }]}>
              {'$3,227'}
            </Text>
          </View>
        </View>
        <Spacer top={8} right={8} bottom={8} left={8} />
        <View style={styles.ViewC1}>
          <View
            style={[
              styles.ViewMc,
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
          <View style={styles.ViewJS}>
            <Text style={[styles.Textj7, { color: theme.colors.light }]}>
              {'Current Balance'}
            </Text>

            <Text style={[styles.TextUE, { color: theme.colors.strong }]}>
              {'$6,333'}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.ViewYO,
          {
            borderTopLeftRadius: 48,
            borderTopRightRadius: 48,
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.divider,
          },
        ]}
      >
        <View>
          <View style={styles.ViewTz}>
            <Text style={[styles.TextvT, { color: theme.colors.strong }]}>
              {'History'}
            </Text>
            <Link
              style={[styles.Link_4o, { color: theme.colors.primary }]}
              title={'See all'}
            />
          </View>
          <Spacer top={12} bottom={12} />
          <DraftbitApi.FetchProductsGET limit={5}>
            {({ loading, error, data, refetchProducts }) => {
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
                  listKey={'ZkbUG5t3'}
                  keyExtractor={({ item }) => item?.id || item?.uuid || item}
                  renderItem={({ item }) => {
                    const listData = item;
                    return (
                      <>
                        <View style={styles.Viewp4}>
                          <Circle size={60} bgColor={theme.colors.divider}>
                            <Circle size={56} bgColor={theme.colors.background}>
                              <Icon
                                style={styles.Iconpk}
                                name={'Feather/tag'}
                                size={24}
                                color={theme.colors.light}
                              />
                            </Circle>
                          </Circle>
                          <Spacer right={6} left={6} />
                          <View style={styles.ViewuC}>
                            <Text
                              style={[
                                styles.Text_5l,
                                { color: theme.colors.light },
                              ]}
                            >
                              {'Apple Store'}
                            </Text>

                            <Text
                              style={[
                                styles.Text_8a,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {'iPhone 13 Pro'}
                            </Text>
                          </View>
                          <Spacer right={4} left={4} />
                          <View style={styles.ViewAD}>
                            <Text
                              style={[
                                styles.Text_71,
                                { color: theme.colors.medium },
                              ]}
                            >
                              {'$1,227.72'}
                            </Text>

                            <Text
                              style={[
                                styles.TextBc,
                                { color: theme.colors.medium },
                              ]}
                            >
                              {'4/20/2022'}
                            </Text>
                          </View>
                        </View>
                        <Spacer top={8} bottom={8} />
                        <View style={styles.VieweR}>
                          <Circle size={60} bgColor={theme.colors.divider}>
                            <Circle size={56} bgColor={theme.colors.background}>
                              <Icon
                                style={styles.IconHe}
                                name={'Feather/shopping-bag'}
                                size={24}
                                color={theme.colors.light}
                              />
                            </Circle>
                          </Circle>
                          <Spacer right={6} left={6} />
                          <View style={styles.View_8x}>
                            <Text
                              style={[
                                styles.TextfS,
                                { color: theme.colors.light },
                              ]}
                            >
                              {'Whole Foods'}
                            </Text>

                            <Text
                              style={[
                                styles.TextFL,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {'Groceries'}
                            </Text>
                          </View>
                          <Spacer right={4} left={4} />
                          <View style={styles.Viewig}>
                            <Text
                              style={[
                                styles.TextEJ,
                                { color: theme.colors.medium },
                              ]}
                            >
                              {'$314.15'}
                            </Text>

                            <Text
                              style={[
                                styles.TextAi,
                                { color: theme.colors.medium },
                              ]}
                            >
                              {'3/30/2022'}
                            </Text>
                          </View>
                        </View>
                        <Spacer top={8} bottom={8} />
                        <View style={styles.ViewP4}>
                          <Circle size={60} bgColor={theme.colors.divider}>
                            <Circle size={56} bgColor={theme.colors.background}>
                              <Icon
                                style={styles.IconDB}
                                name={'Feather/coffee'}
                                size={24}
                                color={theme.colors.light}
                              />
                            </Circle>
                          </Circle>
                          <Spacer right={6} left={6} />
                          <View style={styles.ViewC0}>
                            <Text
                              style={[
                                styles.Textbo,
                                { color: theme.colors.light },
                              ]}
                            >
                              {'Starbucks'}
                            </Text>

                            <Text
                              style={[
                                styles.Text_05,
                                { color: theme.colors.strong },
                              ]}
                            >
                              {'Morning Coffee'}
                            </Text>
                          </View>
                          <Spacer right={4} left={4} />
                          <View style={styles.ViewNZ}>
                            <Text
                              style={[
                                styles.Textk4,
                                { color: theme.colors.medium },
                              ]}
                            >
                              {'$7.27'}
                            </Text>

                            <Text
                              style={[
                                styles.TextsK,
                                { color: theme.colors.medium },
                              ]}
                            >
                              {'3/30/2022'}
                            </Text>
                          </View>
                        </View>
                        <Spacer top={8} bottom={8} />
                      </>
                    );
                  }}
                  contentContainerStyle={styles.FlatListZkContent}
                  numColumns={1}
                />
              );
            }}
          </DraftbitApi.FetchProductsGET>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  TextUg: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  Text_7Q: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    marginTop: 4,
  },
  ViewvY: {
    flex: 1,
    justifyContent: 'center',
  },
  ViewKY: {
    flexDirection: 'row',
    paddingLeft: 24,
    paddingTop: 32,
    paddingRight: 24,
    paddingBottom: 24,
  },
  ViewOb: {
    paddingLeft: 12,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  Text_0i: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  Text_01: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    marginTop: 2,
  },
  ViewAV: {
    flex: 1,
  },
  ViewnW: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ViewMc: {
    paddingLeft: 12,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  Textj7: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  TextUE: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    marginTop: 2,
  },
  ViewJS: {
    flex: 1,
  },
  ViewC1: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ViewMx: {
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  TextvT: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
  },
  Link_4o: {
    fontFamily: 'Inter_500Medium',
  },
  ViewTz: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Iconpk: {
    marginLeft: 4,
  },
  Text_5l: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  Text_8a: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginTop: 4,
  },
  ViewuC: {
    flex: 1,
  },
  Text_71: {
    fontFamily: 'Inter_700Bold',
  },
  TextBc: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginTop: 4,
  },
  ViewAD: {
    alignItems: 'flex-end',
  },
  Viewp4: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  IconHe: {
    marginLeft: 4,
  },
  TextfS: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  TextFL: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginTop: 4,
  },
  View_8x: {
    flex: 1,
  },
  TextEJ: {
    fontFamily: 'Inter_700Bold',
  },
  TextAi: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginTop: 4,
  },
  Viewig: {
    alignItems: 'flex-end',
  },
  VieweR: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  IconDB: {
    marginLeft: 4,
  },
  Textbo: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  Text_05: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginTop: 4,
  },
  ViewC0: {
    flex: 1,
  },
  Textk4: {
    fontFamily: 'Inter_700Bold',
  },
  TextsK: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginTop: 4,
  },
  ViewNZ: {
    alignItems: 'flex-end',
  },
  ViewP4: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  FlatListZkContent: {
    flex: 1,
  },
  Fetchgb: {
    minHeight: 40,
  },
  ViewYO: {
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
