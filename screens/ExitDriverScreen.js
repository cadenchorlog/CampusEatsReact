import React from 'react';
import { ScreenContainer } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';

const ExitDriverScreen = props => {
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      navigation.navigate('BottomTabNavigator');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return <ScreenContainer hasSafeArea={false} scrollable={false} />;
};

export default ExitDriverScreen;
