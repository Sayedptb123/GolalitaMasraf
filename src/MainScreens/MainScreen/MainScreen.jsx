import React, { useEffect, useRef } from "react";
import { View, ActivityIndicator, Platform, ScrollView } from "react-native";
import MainLayout from "../../components/MainLayout";
import { SCREEN_HEIGHT } from "../../styles/mainStyles";
import { colors } from "../../components/colors";
import Categories from "./components/Categories";
import NotificationModal from "../../components/NotificationModal/NotificationModal";
import { useTheme } from "../../components/ThemeProvider";
import { connect } from "react-redux";
import {
  getMerchantDetails,
  trackBanner,
} from "../../redux/merchant/merchant-thunks";
import { useTranslation } from "react-i18next";
import { onBannerPress } from "../../../utils";
import { handleNotificationClick } from "../../pushNotifications/notificationClickHandler";
import AdwertSwiper from "../../components/AdwertSwiper/AdwertSwiper";
import RNBootSplash from "react-native-bootsplash";
import { setIsSplashScreenVisible } from "../../redux/auth/auth-actions";
import MerchantListHeader from "../MerchantsPage/components/MerchantsHeader";
import Header from "../../components/Header";

const MainScreen = ({
  navigation,
  user,
  getMerchantDetails,
  advert,
  clickedNotification,
  trackBanner,
}) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const isLoaded = !!advert;
  const getInitialDataRef = useRef(false);

  useEffect(() => {
    if (clickedNotification) {
      handleNotificationClick(clickedNotification);
    }
  }, [clickedNotification]);
  const handleBannerPress = (item) => {
    if(item.internal){
      getMerchantDetails(item.merchant_id, navigation, t);
    }
    else {
      onBannerPress(
        item.banner_url,
        getMerchantDetails,
        navigation,
        t,
        trackBanner,
        user,
        item.tracking_code
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (Platform.OS === "android") {
        RNBootSplash.hide({ fade: true });
      } else {
        setIsSplashScreenVisible(false);
      }
    }, 3000);
  }, [clickedNotification, isLoaded]);

  if (clickedNotification || !isLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator
          size={"large"}
          color={isDark ? colors.mainDarkMode : colors.darkBlue}
        />
      </View>
    );
  }

  return (
    <>
      <MainLayout
        outsideScroll={true}
        headerChildren={
          <Header label={"AI Rayan Rewards"} btns={["notifications"]} />
        }
        headerHeight={50}
        contentStyle={{ height: SCREEN_HEIGHT - 65, paddingHorizontal: 20 }}
      >
        <MerchantListHeader isHome={true} />
        {advert !== null && advert.ad_1 && advert.ad_1.length > 0 && (
          <AdwertSwiper
            data={advert.ad_1}
            onBannerPress={handleBannerPress}
            isDark={isDark}
            style={{ marginTop: 16, overflow: "hidden", borderRadius: 16 }}
          />
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <Categories />

          <NotificationModal />
        </ScrollView>
      </MainLayout>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  advert: state.merchantReducer.advert,
  clickedNotification: state.notificationsReducer.clickedNotification,
});

export default connect(mapStateToProps, {
  getMerchantDetails,
  trackBanner,
})(MainScreen);
