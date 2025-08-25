import { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import DrawerItem from '../DrawerItem';
import { useTheme } from '../../../ThemeProvider';
import { useSelector } from 'react-redux';
import useIsGuest from '../../../../hooks/useIsGuest';
import { sized } from '../../../../Svg';
import PremiumSvg from '../../../../assets/premium2.svg';
import Gopoint from '../../../../assets/goPoints.svg';
import FavoritesSvg from '../../../../assets/favorites.svg';
import ContactUsSvg from '../../../../assets/contact_us.svg';
import ScanSvg from '../../../../assets/scan.svg';
import MerchantsSvg from '../../../../assets/merchants.svg';
import VouchersSvg from '../../../../assets/vouchers.svg';
import { colors } from '../../../colors';
import { useTranslation } from 'react-i18next';
import AnimatedIcon from '../../../AnimatedIcon';
import {
  getPremiumMerchantsCount,
  getGoPointMerchatnsCount,
} from '../../../../api/merchants';
import { navigate } from '../../../../Navigation/navigationHelpers';

const DrawerItemList = () => {
  const { isDark } = useTheme();
  const isMainUser = useSelector(state => state.authReducer.isMainUser);
  const isGuest = useIsGuest();
  const { t, i18n } = useTranslation();

  const iconColor = isDark ? colors.mainDarkMode : colors.darkBlue;
  const FavoritesIcon = sized(FavoritesSvg, 22, 22, iconColor);
  const GopointIcon = sized(Gopoint, 24, 24, iconColor);
  const PremiumIcon = sized(PremiumSvg, 24, 24, iconColor);
  const ContactUsIcon = sized(ContactUsSvg, 24, 24, iconColor);
  const MerchantsIcon = sized(MerchantsSvg, 24, 24, iconColor);
  const VouchersIcon = sized(VouchersSvg, 24, 21, iconColor);
  const ScanIcon = sized(ScanSvg, 28, 28, iconColor);

  const [premiumMerchantsCount, setPremiumMerchantsCount] = useState(0);
  const [goPointsMerchantsCount, setGoPointsMerchantsCount] = useState(0);

  useEffect(() => {
    getPremiumMerchantsCount()
      .then(async i => {
        setPremiumMerchantsCount(i.total_premium_merchants);
      })
      .catch(error => {
        console.error('Error :', error);
      });

    getGoPointMerchatnsCount()
      .then(async i => {
        setGoPointsMerchantsCount(i.total_gpoint_merchants);
      })
      .catch(error => {
        console.error('Error :', error);
      });
  }, []);

  const drawerItems = [
    {
      icon: () => <VouchersIcon style={styles.iconWrapper} />, //routeName === 'Cart' ? <BagActiveIcon /> : <BagIcon />,
      title: t('Drawer.vouchersAndGiftCards'),
      onPress: () =>
        navigate('myVouchers', {
          screen: 'myVouchers-list',
        }),
      hidden: isGuest,
    },
    {
      icon: () => <MerchantsIcon style={styles.iconWrapper} />, //routeName === 'Discount' ? <DiscountsActiveIcon /> : <DiscountsIcon />,
      title: t('Drawer.newMerchants'),
      onPress: () =>
        navigate('merchants', {
          screen: 'newMerchants-list',
          params: { selectedCategory: null },
        }),
    },
    {
      icon: () => <PremiumIcon style={styles.iconWrapper} />, //routeName === 'Discount' ? <DiscountsActiveIcon /> : <DiscountsIcon />,
      title: t('Drawer.premiumMerchants'),
      onPress: () =>
        navigate('merchants', {
          screen: 'premiumMerchants-list',
          params: { selectedCategory: null },
        }),
      counts: premiumMerchantsCount,
      hidden: premiumMerchantsCount == 0,
    },
    {
      icon: () => <GopointIcon style={styles.iconWrapper} />, //routeName === 'Discount' ? <DiscountsActiveIcon /> : <DiscountsIcon />,
      title: t('Drawer.goPoints'),
      onPress: () =>
        navigate('merchants', {
          screen: 'GoPointsMerchants-list',
          params: { selectedCategory: null },
        }),
      counts: goPointsMerchantsCount,
      hidden: goPointsMerchantsCount == 0,
    },
    {
      icon: () => <AnimatedIcon />, //routeName === 'Discount' ? <DiscountsActiveIcon /> : <DiscountsIcon />,
      title: t('Drawer.map'),
      onPress: () => navigate('MapPage'),
    },
    {
      icon: () => <FavoritesIcon style={styles.iconWrapper} />, //routeName === 'Discount' ? <DiscountsActiveIcon /> : <DiscountsIcon />,
      title: t('Favorites.favorites'),
      onPress: () => navigate('favouriteMerchants'),
      hidden: isGuest,
    },
    {
      icon: () => <ScanIcon style={styles.iconWrapper} />,
      title: t('Drawer.scanBill'),
      onPress: () =>
        navigate('BillScanner', {
          title: t('Drawer.scanBill'),
        }),
    },
    {
      icon: () => <ContactUsIcon style={styles.iconWrapper} />, //<LogoutIcon />,
      title: t('ContactUs.contactUs'),
      onPress: () => navigate('ContactUs'),
    },
  ];

  const filteredDrawerItems = useMemo(() => {
    return drawerItems.filter(item => !item.hidden);
  }, [
    isMainUser,
    i18n.language,
    isGuest,
    isDark,
    premiumMerchantsCount,
    goPointsMerchantsCount,
  ]);

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
