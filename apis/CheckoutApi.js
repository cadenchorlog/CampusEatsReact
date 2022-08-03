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

export const checkoutPOST = (Constants, { UID, priceID }) =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:hBvJuMsa/sessions`, {
    body: JSON.stringify({
      UID: UID,
      success_url: 'https://www.kurbsi.com/success',
      cancel_url: 'https://www.kurbsi.com/success',
      line_items: [{ price: priceID, quantity: 1 }],
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

export const useCheckoutPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => checkoutPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('checkout', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('checkout');
        queryClient.invalidateQueries('checkouts');
      },
    }
  );
};
