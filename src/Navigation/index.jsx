import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { navigationRef } from './navigationHelpers';
import { AuthorizedNavigators } from './AuthorizedNavigators';
import { NonUthorizedNavigators } from './NonAuthorizedNavigators';
import { useTheme } from '../components/ThemeProvider';
import { colors } from '../components/colors';

export const Root = ({ isAuthorized }) => {
  const { isDark } = useTheme();

  const MyCustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: isDark ? colors.darkModeBackground : '#fff',
    },
  };

  return (
    <NavigationContainer ref={navigationRef} theme={MyCustomTheme}>
      <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
      {isAuthorized ? <AuthorizedNavigators /> : <NonUthorizedNavigators />}
    </NavigationContainer>
  );
};
