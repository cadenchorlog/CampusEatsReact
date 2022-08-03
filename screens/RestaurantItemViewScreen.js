import React from 'react';
import Images from '../config/Images';
import {
  Divider,
  FAB,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const RestaurantItemViewScreen = props => {
  const { theme } = props;
  const { navigation } = props;

  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.surface }}
      scrollable={false}
      hasSafeArea={false}
    >
      <FAB
        onPress={() => {
          try {
            navigation.goBack();
          } catch (err) {
            console.error(err);
          }
        }}
        style={styles.FABbB}
        size={32}
        iconName={'Ionicons/md-chevron-back'}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={'never'}
      >
        <ScrollView
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.roundness,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          horizontal={false}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          bounces={true}
        >
          <Image
            style={styles.Imagenw}
            source={Images.Guac}
            resizeMode={'cover'}
          />
          <View style={styles.Viewqt}>
            <>
              <Text
                style={[
                  theme.typography.headline5,
                  styles.TextTd,
                  { color: theme.colors.strong },
                ]}
              >
                {'Guacamole - Regular'}
              </Text>
              <Divider style={styles.DivideroF} color={theme.colors.medium} />
              <Text style={[styles.TextCW, { color: theme.colors.medium }]}>
                {
                  'Fresh avocados, diced tomatoes mixed with Spanish onions, diced jalapenos, coriander and a squeeze of lemon juice. '
                }
              </Text>
            </>
          </View>

          <View
            style={[styles.ViewKF, { backgroundColor: theme.colors.divider }]}
          >
            <Text
              style={[
                theme.typography.overline,
                { color: theme.colors.medium },
              ]}
            >
              {'SPECIAL INSTRUCTIONS'}
            </Text>
          </View>

          <View style={[styles.ViewF5, { borderColor: theme.colors.divider }]}>
            <TextInput
              onChangeText={newTextInputValue => {
                const textInputValue = newTextInputValue;
                try {
                  setTextInputValue(textInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles.TextInputiG}
              editable={true}
              placeholder={'Add a note (extra sauce, no onion, etc)'}
              multiline={true}
              color={theme.colors.strong}
              value={textInputValue}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <Touchable style={styles.Touchable_6z}>
        <View
          style={[
            styles.Viewro,
            {
              borderRadius: theme.roundness,
              backgroundColor: theme.colors.primary,
            },
          ]}
        >
          <Text
            style={[
              theme.typography.button,
              styles.TextC4,
              { color: theme.colors.surface },
            ]}
          >
            {'Add To Cart'}
          </Text>
        </View>
      </Touchable>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  FABbB: {
    marginTop: 60,
    marginLeft: 16,
    marginBottom: 10,
  },
  Imagenw: {
    width: '100%',
    height: 250,
  },
  TextTd: {
    textAlign: 'center',
  },
  DivideroF: {
    height: 1,
    alignSelf: 'center',
    width: 32,
    marginTop: 16,
    marginBottom: 16,
  },
  TextCW: {
    textAlign: 'center',
  },
  FetchSh: {
    minHeight: 40,
  },
  Viewqt: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
    paddingTop: 24,
  },
  ViewKF: {
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 8,
    paddingTop: 8,
  },
  TextInputiG: {
    marginLeft: 16,
  },
  ViewF5: {
    borderBottomWidth: 1,
    paddingRight: 16,
    paddingBottom: 16,
    marginTop: 16,
  },
  TextC4: {
    textAlign: 'center',
  },
  Viewro: {
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  Touchable_6z: {
    paddingLeft: 16,
    paddingBottom: 16,
    marginBottom: 16,
    paddingTop: 16,
    paddingRight: 16,
  },
});

export default withTheme(RestaurantItemViewScreen);
