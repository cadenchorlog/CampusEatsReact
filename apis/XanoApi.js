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

export const newEndpointGET = (Constants, { user_id }) =>
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

export const useNewEndpointGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['userOrder', args], () => newEndpointGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['userOrders']),
  });
};

export const FetchNewEndpointGET = ({
  children,
  onData = () => {},
  refetchInterval,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useNewEndpointGET(
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

  return children({ loading, data, error, refetchNewEndpoint: refetch });
};

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

export const courierOffersGET = Constants =>
  fetch(`https://xmux-mtsn-zhrr.n7.xano.io/api:lCsAPjHl/getOffers`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })
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
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useCourierOffersGET(
    {},
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
