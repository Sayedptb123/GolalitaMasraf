import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { View } from 'react-native';
import { TypographyText } from '../../components/Typography';
import Card from '../../components/Card/Card';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/auth/auth-selectors';
import Barcode from 'react-native-barcode-expo';
import { transformDisplayedExpiryDate } from './utils';
import { useTheme } from '../../components/ThemeProvider';
import { colors } from '../../components/colors';
import AddToWalletBtn from './components/AddToWalletBtn';

const CardPage = () => {
  const user = useSelector(userSelector);
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const expiryDate = transformDisplayedExpiryDate(user?.x_user_expiry);
  const mainnBackgroundColor = isDark ? colors.darkModeBackground : '#fff';
  const barcodeLineColor = isDark ? '#fff' : 'black';
  const barcodeBackgroundColor = isDark ? colors.darkModeBackground : '#fff';

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: mainnBackgroundColor,
        },
      ]}
    >
      <Header label={t('CardPage.card')} btns={['back']} />

      <Card
        name={user.name}
        lname={user.x_moi_last_name}
        nameAr={user.x_first_name_arbic}
        lnameAr={user.x_last_name_arbic}
        barcode={user.barcode}
        expiryDate={expiryDate}
        availablePoints={user.available_points || user.points}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            marginTop: 10,
            flex: 1,
            marginBottom: 5,
          }}
        >
          <Barcode
            value={user?.barcode}
            format="CODE128"
            width={2}
            height={70}
            lineColor="black"
            background="white"
          />

          <TypographyText
            textColor={barcodeLineColor}
            size={25}
            title={user?.barcode}
            style={{ fontWeight: '600' }}
          />
        </View>

        <AddToWalletBtn />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CardPage;
