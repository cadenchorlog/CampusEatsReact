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

export const authMeGET = Constants =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/auth/me`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['auth_header'],
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useAuthMeGET = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/auth/me`, {
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      Authorization: Constants['auth_header'],
      'Content-Type': 'application/json',
    },
  });
};

export const FetchAuthMeGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/auth/me`, {
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      Authorization: Constants['auth_header'],
      'Content-Type': 'application/json',
    },
  });

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

  return children({ loading, data, error, refetchAuthMe: refetch });
};

export const getItemsGET = (Constants, { order_id }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/orderItems/${
      order_id ?? ''
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

export const useGetItemsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['userOrders', args], () => getItemsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetItemsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  order_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetItemsGET(
    { order_id },
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

  return children({ loading, data, error, refetchGetItems: refetch });
};

export const loginPOST = (Constants, { email, password }) =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/auth/login`, {
    body: JSON.stringify({ email: email, password: password }),
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

export const signUpPOST = (Constants, { email, name, password }) =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/auth/signup`, {
    body: JSON.stringify({ name: name, email: email, password: password }),
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

export const addChatPOST = (Constants, { isDriver, message, session }) =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/newMessage`, {
    body: JSON.stringify({
      session_id: session,
      message: message,
      isDriver: isDriver,
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

export const useAddChatPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => addChatPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('chat', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('chat');
        queryClient.invalidateQueries('chats');
      },
    }
  );
};

export const addDriverPOST = (Constants, { orderID, userID }) =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/addDriver`, {
    body: JSON.stringify({ driverID: userID, orderID: orderID }),
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

export const useAddDriverPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => addDriverPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('userOrders', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('userOrder');
        queryClient.invalidateQueries('userOrders');
      },
    }
  );
};

export const addTipPOST = (Constants, { tip, user_id }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/user/${
      user_id ?? ''
    }/addTip`,
    {
      body: JSON.stringify({ tipAmount: tip }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
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

export const useAddTipPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => addTipPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('userOrders', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('userOrder');
        queryClient.invalidateQueries('userOrders');
      },
    }
  );
};

export const chatGET = (Constants, { session_id }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/chatSession/${
      session_id ?? ''
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

export const useChatGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['chats', args], () => chatGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchChatGET = ({
  children,
  onData = () => {},
  refetchInterval,
  session_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useChatGET(
    { session_id },
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

  return children({ loading, data, error, refetchChat: refetch });
};

export const checkOfferEnabledGET = (Constants, { courieroffers_id }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/courieroffers/${
      courieroffers_id ?? ''
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

export const useCheckOfferEnabledGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['userOrder', args],
    () => checkOfferEnabledGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['userOrders']),
    }
  );
};

export const FetchCheckOfferEnabledGET = ({
  children,
  onData = () => {},
  refetchInterval,
  courieroffers_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useCheckOfferEnabledGET(
    { courieroffers_id },
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

  return children({ loading, data, error, refetchCheckOfferEnabled: refetch });
};

export const courierOffersGET = (Constants, { driverLat, driverLong }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/getOffers/${
      driverLat ?? ''
    }/${driverLong ?? ''}`,
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

export const useCourierOffersGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['userOrders', args],
    () => courierOffersGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchCourierOffersGET = ({
  children,
  onData = () => {},
  refetchInterval,
  driverLat,
  driverLong,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useCourierOffersGET(
    { driverLat, driverLong },
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

  return children({ loading, data, error, refetchCourierOffers: refetch });
};

export const createDriverOfferPOST = (Constants, { storeID, uid }) =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/session`, {
    body: JSON.stringify({ storeID: storeID, driverUID: uid }),
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

export const useCreateDriverOfferPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => createDriverOfferPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('user', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('user');
        queryClient.invalidateQueries('users');
      },
    }
  );
};

export const createOfferSearchStoresGET = (
  Constants,
  { driverLat, driverLong, searchTerm }
) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/getStores/${
      driverLat ?? ''
    }/${driverLong ?? ''}/${searchTerm ?? ''}`,
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

export const useCreateOfferSearchStoresGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Stores', args],
    () => createOfferSearchStoresGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchCreateOfferSearchStoresGET = ({
  children,
  onData = () => {},
  refetchInterval,
  driverLat,
  driverLong,
  searchTerm,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useCreateOfferSearchStoresGET(
    { driverLat, driverLong, searchTerm },
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

  return children({
    loading,
    data,
    error,
    refetchCreateOfferSearchStores: refetch,
  });
};

export const getAllStoresGET = (Constants, { UID, onCampus }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/storeList/${UID ?? ''}/${
      onCampus ?? ''
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

export const useGetAllStoresGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['Stores', args], () => getAllStoresGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetAllStoresGET = ({
  children,
  onData = () => {},
  refetchInterval,
  UID,
  onCampus,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetAllStoresGET(
    { UID, onCampus },
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

  return children({ loading, data, error, refetchGetAllStores: refetch });
};

export const getCampusListGET = (Constants, { searchTerm }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/campuslist/${
      searchTerm ?? ''
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

export const useGetCampusListGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['users', args], () => getCampusListGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetCampusListGET = ({
  children,
  onData = () => {},
  refetchInterval,
  searchTerm,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetCampusListGET(
    { searchTerm },
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

  return children({ loading, data, error, refetchGetCampusList: refetch });
};

export const getCartTotalsGET = (Constants, { user_id }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/userCartTotal/${
      user_id ?? ''
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

export const useGetCartTotalsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['user', args], () => getCartTotalsGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });
};

export const FetchGetCartTotalsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetCartTotalsGET(
    { user_id },
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

  return children({ loading, data, error, refetchGetCartTotals: refetch });
};

export const getItemListGET = (Constants, { store_id }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/getStoreItems/${
      store_id ?? ''
    }/`,
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

export const useGetItemListGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['Stores', args], () => getItemListGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetItemListGET = ({
  children,
  onData = () => {},
  refetchInterval,
  store_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetItemListGET(
    { store_id },
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

  return children({ loading, data, error, refetchGetItemList: refetch });
};

export const getSpecificItemGET = (Constants, { itemID, stores_id }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/storesItems/${
      stores_id ?? ''
    }/${itemID ?? ''}`,
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

export const useGetSpecificItemGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['Store', args], () => getSpecificItemGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['Stores']),
  });
};

export const FetchGetSpecificItemGET = ({
  children,
  onData = () => {},
  refetchInterval,
  itemID,
  stores_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetSpecificItemGET(
    { itemID, stores_id },
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

  return children({ loading, data, error, refetchGetSpecificItem: refetch });
};

export const getStoreInfoGET = (Constants, { stores_id }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/stores/${stores_id ?? ''}`,
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

export const useGetStoreInfoGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['Store', args], () => getStoreInfoGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['Stores']),
  });
};

export const FetchGetStoreInfoGET = ({
  children,
  onData = () => {},
  refetchInterval,
  stores_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetStoreInfoGET(
    { stores_id },
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

  return children({ loading, data, error, refetchGetStoreInfo: refetch });
};

export const getUserCartGET = (Constants, { UID }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/getCart/${UID ?? ''}/`,
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

export const useGetUserCartGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['users', args], () => getUserCartGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetUserCartGET = ({
  children,
  onData = () => {},
  refetchInterval,
  UID,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetUserCartGET(
    { UID },
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

  return children({ loading, data, error, refetchGetUserCart: refetch });
};

export const getUserOrdersGET = (Constants, { UID }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/session/${
      UID ?? ''
    }/active`,
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

export const useGetUserOrdersGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['userOrder', args],
    () => getUserOrdersGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['userOrders']),
    }
  );
};

export const FetchGetUserOrdersGET = ({
  children,
  onData = () => {},
  refetchInterval,
  UID,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetUserOrdersGET(
    { UID },
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

  return children({ loading, data, error, refetchGetUserOrders: refetch });
};

export const getUserRecordGET = (Constants, { user_id }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/user/${user_id ?? ''}`,
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

export const useGetUserRecordGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['user', args], () => getUserRecordGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });
};

export const FetchGetUserRecordGET = ({
  children,
  onData = () => {},
  refetchInterval,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetUserRecordGET(
    { user_id },
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

  return children({ loading, data, error, refetchGetUserRecord: refetch });
};

export const isDeliveringGET = (Constants, { user_id }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/isDelivering/${
      user_id ?? ''
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

export const useIsDeliveringGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['userOrder', args], () => isDeliveringGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['userOrders']),
  });
};

export const FetchIsDeliveringGET = ({
  children,
  onData = () => {},
  refetchInterval,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useIsDeliveringGET(
    { user_id },
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

  return children({ loading, data, error, refetchIsDelivering: refetch });
};

export const markDeliveredPOST = (Constants, { driverID, orderID }) =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/markDelivered`, {
    body: JSON.stringify({ orderID: orderID, driverID: driverID }),
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

export const useMarkDeliveredPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => markDeliveredPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('userOrders', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('userOrder');
        queryClient.invalidateQueries('userOrders');
      },
    }
  );
};

export const markEnRoutePOST = (Constants, { driverUID, orderID }) =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/markEnRoute`, {
    body: JSON.stringify({ orderID: orderID, driverID: driverUID }),
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

export const useMarkEnRoutePOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => markEnRoutePOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('userOrders', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('userOrder');
        queryClient.invalidateQueries('userOrders');
      },
    }
  );
};

export const removeFromCartPOST = (Constants, { UID, itemID, itemMods }) =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/cartItem/remove`, {
    body: JSON.stringify({ user_id: UID, itemID: itemID, itemMods: itemMods }),
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

export const useRemoveFromCartPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => removeFromCartPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('userOrders', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('userOrder');
        queryClient.invalidateQueries('userOrders');
      },
    }
  );
};

export const setLocationGET = (Constants, { lat, long, session }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/setPos/${lat ?? ''}/${
      long ?? ''
    }/${session ?? ''}`,
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

export const useSetLocationGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['userOrder', args], () => setLocationGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['userOrders']),
  });
};

export const FetchSetLocationGET = ({
  children,
  onData = () => {},
  refetchInterval,
  lat,
  long,
  session,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useSetLocationGET(
    { lat, long, session },
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

  return children({ loading, data, error, refetchSetLocation: refetch });
};

export const specificOrderViewGET = (Constants, { session_id }) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/session/${
      session_id ?? ''
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

export const useSpecificOrderViewGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['userOrder', args],
    () => specificOrderViewGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['userOrders']),
    }
  );
};

export const FetchSpecificOrderViewGET = ({
  children,
  onData = () => {},
  refetchInterval,
  session_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useSpecificOrderViewGET(
    { session_id },
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

  return children({ loading, data, error, refetchSpecificOrderView: refetch });
};

export const updateCartPOST = (
  Constants,
  { UID, cost, itemID, itemName, modsList, quantity, storeID, url, user_id }
) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/cart/${user_id ?? ''}`,
    {
      body: JSON.stringify({
        user_id: UID,
        storeID: storeID,
        itemID: itemID,
        itemName: itemName,
        modifications: modsList,
        itemCost: cost,
        itemImage: url,
        quantity: quantity,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
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

export const useUpdateCartPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => updateCartPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('user', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('user');
        queryClient.invalidateQueries('users');
      },
    }
  );
};

export const userAddressPOST = (Constants, { UID, addressString, lat, long }) =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/userAddress`, {
    body: JSON.stringify({
      user_id: UID,
      address: addressString,
      lat: lat,
      long: long,
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

export const useUserAddressPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => userAddressPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('user', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('user');
        queryClient.invalidateQueries('users');
      },
    }
  );
};

export const verifyStudentEnrollmentPOST = (
  Constants,
  { UID, campusID, studentEmail, studentID }
) =>
  fetch(
    `https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/verifyStudentEnrollment`,
    {
      body: JSON.stringify({
        studentID: studentID,
        studentEmail: studentEmail,
        campusID: campusID,
        UID: UID,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
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

export const useVerifyStudentEnrollmentPOST = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['user', args],
    () => verifyStudentEnrollmentPOST(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['users']),
    }
  );
};
