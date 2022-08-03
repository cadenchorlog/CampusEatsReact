import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import usePrevious from '../utils/usePrevious';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const geocodeGET = (Constants, { api_key, city, state, street, zip }) =>
  fetch(
    `https://api.geocod.io/v1.7/geocode?api_key=${
      api_key ?? ''
    }&format=simple&limit=1&q=${street ?? ''} ${city ?? ''}, ${state ?? ''} ${
      zip ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useGeocodeGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['geoCode', args], () => geocodeGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['geoCodes']),
  });
};

export const FetchGeocodeGET = ({
  children,
  onData = () => {},
  refetchInterval,
  api_key,
  city,
  state,
  street,
  zip,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGeocodeGET(
    { api_key, city, state, street, zip },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchGeocode: refetch });
};
