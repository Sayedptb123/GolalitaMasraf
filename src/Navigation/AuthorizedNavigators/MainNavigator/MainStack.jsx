import React, { useLayoutEffect } from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { MainScreen } from '../../../MainScreens';
import Notifications from '../../../MainScreens/Notifications/Notifications';
import Profile from '../../../MainScreens/Profile/Profile';
import ChangePassword from '../../../MainScreens/Profile/ChangePassword';
import NotificationSettings from '../../../MainScreens/Notifications/NotificationSettings/NotificationSettings';
import ContactUs from '../../../MainScreens/ContactUs/ContactUs';
import MerchantsNavigator from '../../../MainScreens/MerchantsPage/MerchantsNavigator/index';
import BookHotel from '../../../MainScreens/BookHotel/BookHotel';
import Promocode from '../../../MainScreens/Promocode/Promocode';
import Voucher from '../../../MainScreens/Promocode/Voucher';
import OffersNavigator from '../../../MainScreens/AllOffers/OfferNavigator';
import MapPage from '../../../MainScreens/MapPage/MapPage';
import CardPage from '../../../MainScreens/CardPage';
import PrivacyPolicy from '../../../MainScreens/PrivacyPolicy';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import PremiumPartnerNavigator from '../../../MainScreens/PremiumPartner/PremiumPartnerNavigator';
import Website from '../../../MainScreens/Website';
import MyVouchersNavigator from '../../../MainScreens/MyVouchers/MyVouchersNavigator';
import FavouriteMerchants from '../../../MainScreens/FavouriteMerchants';
import BillScanner from '../../../MainScreens/BillScanner';
import Family from "../../../MainScreens/Family/Family";
import B1G1 from "../../../MainScreens/B1G1";
import ApplyCodeConfirmation from '../../../MainScreens/AllOffers/ApplyCodeConfirmation';

import CategoriesNavigator from "../../../MainScreens/Categories";
import ChildCategories from "../../../MainScreens/Categories/ChildCategories";



import Favorites from "../../../MainScreens/Favorites/Favorites";
import AddFamilyMember from "../../../MainScreens/Family/AddFamilyMember/AddFamilyMember";
import SocialMedia from "../../../MainScreens/SocialMedia/SocialMedia";
import Settings from "../../../MainScreens/Settings/Settings";
import ProductPage from "../../../MainScreens/ProductPage/ProductPage";

const MainStack = createStackNavigator();

export const MainStackScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    let routes = ['ProductItemPage', 'Cart', 'OrderConfirmation']; // routes without tabbar
    const routeName = getFocusedRouteNameFromRoute(route);
    navigation.setOptions({ currentRoute: routeName });
    if (routes.indexOf(routeName) !== -1 && routeName !== undefined) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);
  return (
    <MainStack.Navigator
      initialRouteName={'Main'}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <MainStack.Screen name={'Main'} component={MainScreen} />
      <MainStack.Screen
        name={'premiumPartner'}
        component={PremiumPartnerNavigator}
      />
      <MainStack.Screen name={'AllOffers'} component={OffersNavigator} />
      <MainStack.Screen name={'card'} component={CardPage} />
      <MainStack.Screen name={'MapPage'} component={MapPage} />
      <MainStack.Screen name={'Notifications'} component={Notifications} />
      <MainStack.Screen name={'Profile'} component={Profile} />
      <MainStack.Screen name={'ChangePassword'} component={ChangePassword} />
      <MainStack.Screen
        name={'NotificationSettings'}
        component={NotificationSettings}
      />
      <MainStack.Screen name={'ContactUs'} component={ContactUs} />
      <MainStack.Screen name={'merchants'} component={MerchantsNavigator} />
      <MainStack.Screen
        name={'favouriteMerchants'}
        component={FavouriteMerchants}
      />
      <MainStack.Screen name={'BookHotel'} component={BookHotel} />

      <MainStack.Screen name={'Promocode'} component={Promocode} />
      <MainStack.Screen name={'Voucher'} component={Voucher} />
      <MainStack.Screen name={'offer-apply-code-confirmation'} component={ApplyCodeConfirmation} />

      <MainStack.Screen name={'myVouchers'} component={MyVouchersNavigator} />
      <MainStack.Screen name={'PrivacyPolicy'} component={PrivacyPolicy} />
      <MainStack.Screen name={'Website'} component={Website} />

      <MainStack.Screen name={'BillScanner'} component={BillScanner} />
      <MainStack.Screen name={"Family"} component={Family} />
      <MainStack.Screen name={"AddFamilyMember"} component={AddFamilyMember} />
      <MainStack.Screen name={"B1G1"} component={B1G1} />
      <MainStack.Screen name={"categories"} component={CategoriesNavigator} />
      <MainStack.Screen
        name="categories-child-mainstack"
        component={ChildCategories}
      />




      <MainStack.Screen name={"ProductPage"} component={ProductPage} />
      <MainStack.Screen name={"Favorites"} component={Favorites} />
      <MainStack.Screen name={"Settings"} component={Settings} />
      <MainStack.Screen name={"SocialMedia"} component={SocialMedia} />
    </MainStack.Navigator>
  );
};
