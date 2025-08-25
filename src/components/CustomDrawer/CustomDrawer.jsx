import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { colors } from '../colors';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Header from '../Header';
import UserInfo from './components/UserInfo';
import DrawerItemList from './components/DrawerItemsList';
import { useTheme } from '../ThemeProvider';
import { navigationRef } from '../../Navigation/navigationHelpers';
import { DrawerActions } from '@react-navigation/native';

const CustomDrawer = ({ styles }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const backgroundColor = isDark ? '#000' : colors.white;

  return (
    <View style={[localStyles.wrapper, { backgroundColor }]}>
      <DrawerContentScrollView showsVerticalScrollIndicator={true}>
        <View style={localStyles.drawerWrapper}>
          <View>
            <Header
              label={t('TabBar.menu')}
              style={{ paddingHorizontal: 0, paddingRight: 5 }}
              additionalBtnsProps={{
                back: {
                  onPress: () =>
                    navigationRef?.current.dispatch(
                      DrawerActions.closeDrawer(),
                    ),
                },
              }}
            />
            <UserInfo />

            <DrawerItemList />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  wrapper: {
    flex: 1,

    paddingTop: 20,
  },
  drawerWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoWrapper: {
    height: 60,
    marginBottom: 30,
    borderRadius: 30,
  },
  logoImage: { width: 60, height: 60, resizeMode: 'contain' },
  drawerItemWrapper: { marginLeft: -15, marginTop: 10 },
  passiveLang: {
    borderWidth: 1,
    borderColor: colors.white,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  itemText: {
    justifyContent: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    paddingVertical: 20,
  },
});

export default CustomDrawer;
