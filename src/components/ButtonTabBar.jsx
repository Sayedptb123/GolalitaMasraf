import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { sized } from "../Svg";
import { TypographyText } from "./Typography";
import { colors } from "./colors";
import HomeSvg from "../assets/home.svg";
import CardSvg from "../assets/card.svg";
import OffersSvg from "../assets/offers.svg";
import { LUSAIL_REGULAR } from "../redux/types";
import { mainStyles } from "../styles/mainStyles";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "react-i18next";
import useIsGuest from "../hooks/useIsGuest";
import { showMessage } from "react-native-flash-message";
import ProfileSvg from "../assets/Profile.svg";
import { useSelector } from "react-redux";
import AnimatedIcon from "../components/AnimatedIcon";
import { navigate, navigationRef } from '../Navigation/navigationHelpers';
const HomeIcon = sized(HomeSvg, 28, 30);
const CardIcon = sized(CardSvg, 28, 30);
const OffersIcon = sized(OffersSvg, 30, 28);
const ProfileIcon = sized(ProfileSvg, 30, 28);

export let ButtonTabBar = ({ state, descriptors, navigation }) => {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const isGuest = useIsGuest();
  const parentCategories = useSelector(
    (state) => state.merchantReducer.parentCategories
  );

  const { language } = i18n;
  const mainScreens = ["Main", undefined];
  const categoryScreens = ["AllOffers"];
  const MapPageScreens = ["MapPage"];
  const cardPageScreens = ["card"];
  const profileScreens = ["Profile"];

  const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
  let focusedOptions = descriptors[state.routes[state.index].key].options;
  let routeName = focusedOptions.currentRoute;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const activeColor = isDark ? colors.navyBlue : colors.darkBlue;
  const passiveColor = isDark ? "white" : "black";
  const category = parentCategories?.find((item) => item.id === 60);
  const getColor = screenName => {
    return currentRouteName === screenName ? activeColor : passiveColor;
  };
  return (
    <View style={styles.TabView__wrapper}>
      <View
        style={[
          styles.TabView,
          { backgroundColor: isDark ? colors.darkBlue : "#FCFCFC" },
        ]}
      >
        <TouchableOpacity
          style={styles.TabView__item}
          onPress={() => navigate("Main")}
        >
          <View style={styles.iconWrapper}>
           
          <HomeIcon color={getColor('Main')} />
          </View>
          <TypographyText
            textColor={colors.lightGrey}
            size={13}
            font={LUSAIL_REGULAR}
            title={t("TabBar.home")}
            style={[
              styles.TabView__caption,{
                color: getColor('Main'),
              }
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.TabView__item}
          onPress={() => navigate("MapPage")}
        >
          <View style={styles.iconWrapper}>
            <AnimatedIcon
              color={getColor('MapPage')}
            />
          </View>
          <TypographyText
            textColor={colors.lightGrey}
            size={13}
            font={LUSAIL_REGULAR}
            title={t("Drawer.map")}
            style={[
              styles.TabView__caption,{
                color: getColor('MapPage'),
              }
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.TabView__item}
          onPress={() => {
            if (isGuest) {
              showMessage({
                type: "warning",
                message: t("Drawer.notForGuest"),
              });

              return;
            }

            navigate("card");
          }}
        >
          <View style={styles.iconWrapper}>
            
          <CardIcon color={getColor('card')} />
          </View>
          <TypographyText
            textColor={colors.lightGrey}
            size={13}
            font={LUSAIL_REGULAR}
            title={t("TabBar.card")}
            
            style={[
              styles.TabView__caption,{
                color: getColor('card'),
              }
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.TabView__item}
          onPress={() => {
            navigate("Profile");
            // navigation.openDrawer();
          }}
        >
          <View style={styles.iconWrapper}>
          <ProfileIcon color={getColor('Profile')} />
          </View>
          <TypographyText
            textColor={colors.lightGrey}
            size={13}
            font={LUSAIL_REGULAR}
            title={t("TabBar.profile")}
            style={[
              styles.TabView__caption,{
                color: getColor('Profile'),
              }
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TabView__wrapper: {},
  TabView: {
    ...mainStyles.shadow,
    backgroundColor: "#FFFFFF",
    height: 65,
    paddingHorizontal: Platform.OS === "ios" ? 20 : 10,
    bottom: 0,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 21 : 8,
    zIndex: -1,
  },
  TabView__item: {
    width: "20%",
    alignItems: "center",
  },
  TabView__caption: {
    // marginTop: 6
  },
  iconWrapper: {
    position: "relative",
  },
  cardButton: {
    width: 63,
    height: 63,
    backgroundColor: "red",
    borderRadius: 30,
    top: -15,
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#072536",
    borderColor: "#fff",
    borderWidth: 1,
  },
  TabView__notifications: {
    width: 10,
    height: 10,
    backgroundColor: "#FF406E",
    borderRadius: 50,
    position: "absolute",
    top: -5,
    right: -3,
    alignItems: "center",
    justifyContent: "center",
  },
});
