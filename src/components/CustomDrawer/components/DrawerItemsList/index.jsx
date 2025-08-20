import { StyleSheet, View } from "react-native";
import DrawerItem from "../DrawerItem";
import { useTheme } from "../../../ThemeProvider";
import { useMemo,useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useIsGuest from "../../../../hooks/useIsGuest";
import { sized } from "../../../../Svg";
import FavoritesSvg from "../../../../assets/favorites.svg";
import SettingsSvg from "../../../../assets/settings.svg";
import ContactUsSvg from "../../../../assets/contact_us.svg";
import ScanSvg from "../../../../assets/scan.svg";
import PlanetSvg from "../../../../assets/planet.svg";
import MerchantsSvg from "../../../../assets/merchants.svg";
import NewMerchantsSvg from "../../../../assets/newMerchants.svg";
import PremiumSvg from "../../../../assets/premium2.svg";
import Gopoint from "../../../../assets/goPoints.svg";
import VouchersSvg from "../../../../assets/vouchers.svg";
import FamilySvg from "../../../../assets/family.svg";
import { colors } from "../../../colors";
import { useTranslation } from "react-i18next";
import AnimatedIcon from "../../../AnimatedIcon";
import { useNavigation } from "@react-navigation/native";
import i18next from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OffersSvg from "../../../../assets/offers.svg";
import {
  getPremiumMerchantsCount,
  getGoPointMerchatnsCount,
} from "../../../../api/merchants";

const DrawerItemList = () => {
  const { isDark } = useTheme();
  const isMainUser = useSelector((state) => state.authReducer.isMainUser);
  const isGuest = useIsGuest();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const iconColor = isDark ? colors.mainDarkMode : colors.darkBlue;

  const FamilyIcon = sized(FamilySvg, 20, 20, iconColor);
  const FavoritesIcon = sized(FavoritesSvg, 20, 20, iconColor);
  const SettingsIcon = sized(SettingsSvg, 20, 20, iconColor);
  const ContactUsIcon = sized(ContactUsSvg, 20, 20, iconColor);
  const ScanIcon = sized(ScanSvg, 20, 20, iconColor);
  const PlanetIcon = sized(PlanetSvg, 20, 20, iconColor);
  const GopointIcon = sized(Gopoint, 20, 20, iconColor);
  const MerchantsIcon = sized(MerchantsSvg, 20, 20, iconColor);
  const NewMerchantsIcon = sized(NewMerchantsSvg, 20, 20, iconColor);
  const PremiumIcon = sized(PremiumSvg, 20, 20, iconColor);
  const VouchersIcon = sized(VouchersSvg, 20, 18, iconColor);
  const OffersIcon = sized(OffersSvg, 20, 20, iconColor);

  const [premiumMerchantsCount, setPremiumMerchantsCount] = useState(0);
  const [goPointsMerchantsCount, setGoPointsMerchantsCount] = useState(0);

  useEffect(() => {
    getPremiumMerchantsCount()
      .then(async (i) => {
        setPremiumMerchantsCount(i.total_premium_merchants);
      })
      .catch((error) => {
        console.error("Error :", error);
      })

      getGoPointMerchatnsCount()
    .then(async (i) => {
      setGoPointsMerchantsCount(i.total_gpoint_merchants);
    })
    .catch((error) => {
      console.error("Error :", error);
    })
  }, []);

  const drawerItems = [
    {
      icon: () => <VouchersIcon style={styles.iconWrapper} />, //routeName === 'Cart' ? <BagActiveIcon /> : <BagIcon />,
      title: t("Drawer.vouchersAndGiftCards"),
      onPress: () =>
        navigation.navigate("myVouchers", {
          screen: "myVouchers-list",
        }),
    },
    {
      icon: () => <FamilyIcon style={styles.iconWrapper} />, //routeName === 'Cart' ? <BagActiveIcon /> : <BagIcon />,
      title: t("Drawer.familyMembers"),
      onPress: () => navigation.navigate("Family"),
      hidden: !isMainUser,
    },
    {
      icon: () => <OffersIcon style={styles.iconWrapper} />, //(routeName === 'Main' || routeName === undefined) ? <HomeActiveIcon /> : <HomeIcon />,
      title: t("TabBar.allOffers"),
      onPress: () => navigation.navigate("AllOffers"),
    },
    {
      icon: () => <OffersIcon style={styles.iconWrapper} />, //(routeName === 'Main' || routeName === undefined) ? <HomeActiveIcon /> : <HomeIcon />,
      title: t("Drawer.B1G1"),
      onPress: () => navigation.navigate("B1G1"),
    },
    {
      icon: () => <MerchantsIcon style={styles.iconWrapper} />, //routeName === 'Discount' ? <DiscountsActiveIcon /> : <DiscountsIcon />,
      title: t("Drawer.allMerchants"),
      onPress: () =>
        navigation.navigate("merchants", {
          screen: "merchants-list",
          params: { selectedCategory: null },
        }),
    },
    {
      icon: () => <PremiumIcon style={styles.iconWrapper} />, //routeName === 'Discount' ? <DiscountsActiveIcon /> : <DiscountsIcon />,
      title:  t("Drawer.premiumMerchants"),
      onPress: () =>
        navigation.navigate("merchants", {
          screen: "premiumMerchants-list",
          params: { selectedCategory: null },
        }),
      counts:premiumMerchantsCount,
      hidden: premiumMerchantsCount == 0  
    },
    // {
    //   icon: () => <GopointIcon style={styles.iconWrapper} />, //routeName === 'Discount' ? <DiscountsActiveIcon /> : <DiscountsIcon />,
    //   title:  t("Drawer.goPoints"),
    //   onPress: () => //alert("Under development")
    //     navigation.navigate("merchants", {
    //       screen: "GoPointsMerchants-list",
    //       params: { selectedCategory: null },
    //     }),
    //    counts:goPointsMerchantsCount,
    //   hidden:goPointsMerchantsCount == 0
    // },
    {
      icon: () => <NewMerchantsIcon style={styles.iconWrapper} />, //routeName === 'Discount' ? <DiscountsActiveIcon /> : <DiscountsIcon />,
      title: t("Drawer.newMerchants"),
      onPress: () =>
        navigation.navigate("merchants", {
          screen: "newMerchants-list",
          params: { selectedCategory: null },
        }),
    },
    {
      icon: () => <FavoritesIcon style={styles.iconWrapper} />, //routeName === 'Discount' ? <DiscountsActiveIcon /> : <DiscountsIcon />,
      title: t("Favorites.favorites"),
      onPress: () => navigation.navigate("favouriteMerchants"),
      hidden: false, // isGuest,
    },
    // {
    //   icon: () => <AnimatedIcon />, //routeName === 'Discount' ? <DiscountsActiveIcon /> : <DiscountsIcon />,
    //   title: t("Drawer.map"),
    //   onPress: () => navigation.navigate("MapPage"),
    // },
    {
      icon: () => <SettingsIcon style={styles.iconWrapper} />, //routeName === 'ToUser' ? <InfoActiveIcon /> : <InfoIcon />,
      title: t("Settings.settings"),
      onPress: () => navigation.navigate("Settings"),
    },
    {
      icon: () => <PlanetIcon style={styles.iconWrapper} />, //routeName === 'ToUser' ? <InfoActiveIcon /> : <InfoIcon />,
      title: t("Drawer.language"),
      onPress: () => {
        const newLang = i18n.language === "ar" ? "en" : "ar";

        i18next.changeLanguage(newLang);
        AsyncStorage.setItem("lang", newLang);
      },
      isActive: false,
      languages: ["en", "ar"],
    },
    {
      icon: () => <ContactUsIcon style={styles.iconWrapper} />, //<LogoutIcon />,
      title: t("ContactUs.contactUs"),
      onPress: () => navigation.navigate("ContactUs"),
    },
    // {
    //   icon: () => <ScanIcon style={styles.iconWrapper} />,
    //   title: t("Drawer.scanCard"),
    //   onPress: () =>
    //     navigation.navigate("QrCodeScanner", {
    //       title: t("Drawer.scanCard"),
    //     }),
    // },
    // {
    //   icon: () => <ScanIcon style={styles.iconWrapper} />,
    //   title: t("Drawer.scanBill"),
    //   onPress: () =>
    //     navigation.navigate("BillScanner", {
    //       title: t("Drawer.scanBill"),
    //     }),
    // }
  ];
  const filteredDrawerItems = useMemo(() => {
    return drawerItems.filter((item) => !item.hidden);
  }, [isMainUser, i18n.language, isGuest, isDark,premiumMerchantsCount,goPointsMerchantsCount]);

  return (
    <View style={styles.drawerItems}>
      {filteredDrawerItems.map((item, index) => (
        <DrawerItem
          isDark={isDark}
          key={index}
          icon={item.icon}
          title={item.title}
          onPress={item.onPress}
          languages={item.languages}
          counts={item.counts}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerItems: {
    marginTop: 25,
  },
});

export default DrawerItemList;
