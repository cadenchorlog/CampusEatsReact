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

export const setPricePOST = (Constants, { price }) =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:RRs79kGr/prices`, {
    body: JSON.stringify({
      price: {
        currency: 'usd',
        unit_amount: price,
        active: null,
        nickname: '',
        product: price,
        recurring: {
          interval: null,
          aggregate_usage: null,
          interval_count: null,
          usage_type: null,
        },
        tax_behavior: 'exclusive',
        tiers: [],
        tiers_mode: null,
        billing_scheme: null,
        lookup_key: null,
        product_data: {
          name: null,
          active: null,
          statement_descriptor: null,
          unit_label: null,
          metadata: null,
        },
        transfer_lookup_key: null,
        transform_quantity: { divide_by: null, round: null },
        unit_amount_decimal: null,
        metadata: null,
      },
    }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  })
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useSetPricePOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => setPricePOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('price', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('price');
        queryClient.invalidateQueries('prices');
      },
    }
  );
};
