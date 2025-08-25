import React, { useEffect } from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawerContent from '../../components/CustomDrawer/CustomDrawerContent';
import { SCREEN_WIDTH } from '../../styles/mainStyles';
import { isRTL } from '../../../utils';
import { colors } from '../../components/colors';
import { useTheme } from '../../components/ThemeProvider';
import Settings from '../../MainScreens/Settings/Settings';
import { MainNavigator } from './MainNavigator';
import { setUserLocation } from '../../redux/global/global-actions';
import { useDispatch } from 'react-redux';
import useUserLocation from '../../hooks/useUserLocation';

const { Navigator, Screen } = createDrawerNavigator();
const { Navigator: StackNavigator, Screen: StackScreen } =
  createStackNavigator();

const DrawerNavigation = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: SCREEN_WIDTH,
          paddingHorizontal: 0,
        },
        drawerPosition: isRTL() ? 'right' : 'left',
      }}
      drawerContent={CustomDrawerContent}
    >
      <Screen name="Home" component={MainNavigator} />
    </Navigator>
  );
};

export const AuthorizedNavigators = () => {
  const isDark = useTheme();
  const dispatch = useDispatch();
  const { requestLocation } = useUserLocation();

  const getUserLocation = async () => {
    try {
      const location = await requestLocation();

      dispatch(setUserLocation(location));
    } catch (err) {
      console.log(err, 'get user location error');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.darkBlue : colors.white,
      }}
    >
      <StackNavigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <StackScreen name="Root" component={DrawerNavigation} />
        <StackScreen name="Settings" component={Settings} />
      </StackNavigator>
    </View>
  );
};
