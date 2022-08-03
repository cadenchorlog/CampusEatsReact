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

export const createProductPOST = (Constants, { price }) =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:GCrU48dS/products`, {
    body: JSON.stringify({
      product: {
        id: price,
        name: price,
        active: null,
        description: null,
        metadata: null,
        type: null,
        attributes: [],
        caption: null,
        deactivate_on: [],
        images: [],
        package_dimensions: {
          height: null,
          length: null,
          weight: null,
          width: null,
        },
        shippable: null,
        statement_descriptor: null,
        unit_label: null,
        url: null,
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

export const useCreateProductPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => createProductPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('product', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('product');
        queryClient.invalidateQueries('products');
      },
    }
  );
};
