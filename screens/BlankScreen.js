import React from 'react';
import { Row, ScreenContainer, withTheme } from '@draftbit/ui';
import { StyleSheet, Text, View } from 'react-native';

const BlankScreen = props => {
  const { theme } = props;

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <View style={styles.Viewf39cc81f}>
        <Row justifyContent={'center'} alignItems={'center'}>
          <Text style={[styles.Textafa1699b, { color: theme.colors.strong }]}>
            {'Create Offer'}
          </Text>
        </Row>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Textafa1699b: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: '20%',
    alignSelf: 'center',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  Viewf39cc81f: {
    marginTop: 60,
    marginBottom: 20,
  },
});

export default withTheme(BlankScreen);
