import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const BlankScreen = props => {
  const { theme } = props;

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <XanoApi.FetchGetAllStoresGET UID={9}>
        {({ loading, error, data, refetchGetAllStores }) => {
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
              listKey={'3urvImnO'}
              keyExtractor={item => item?.id || item?.uuid || item}
              renderItem={({ item }) => {
                const listData = item;
                return (
                  <Text style={{ color: theme.colors.strong }}>
                    {listData?.created_at}
                  </Text>
                );
              }}
              contentContainerStyle={styles.FlatListc992f941Content}
              numColumns={1}
            />
          );
        }}
      </XanoApi.FetchGetAllStoresGET>
      <XanoApi.FetchGetOnCampusStoresGET UID={9}>
        {({ loading, error, data, refetchGetOnCampusStores }) => {
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
              listKey={'NTUFqaGM'}
              keyExtractor={item => item?.id || item?.uuid || item}
              renderItem={({ item }) => {
                const listData = item;
                return (
                  <Text style={{ color: theme.colors.strong }}>
                    {listData?.storeName}
                  </Text>
                );
              }}
              contentContainerStyle={styles.FlatListc992f941Content}
              numColumns={1}
            />
          );
        }}
      </XanoApi.FetchGetOnCampusStoresGET>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  FlatListc992f941Content: {
    flex: 1,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
});

export default withTheme(BlankScreen);
