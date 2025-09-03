import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { View } from 'react-native';
import { TypographyText } from '../../components/Typography';
import Card from '../../components/Card/Card';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/auth/auth-selectors';
import Barcode from 'react-native-barcode-expo';
import { transformDisplayedExpiryDate } from './utils';
import { useTheme } from '../../components/ThemeProvider';
import { colors } from '../../components/colors';
import AddToWalletBtn from './components/AddToWalletBtn';
import { getFamilyMembers } from '../../redux/transactions/transactions-thunks';
import Swiper from 'react-native-swiper';
import { BALOO_REGULAR } from "../../redux/types";

const CardPage = () => {
  const user = useSelector(userSelector);
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const isMainUser = useSelector(state => state.authReducer.isMainUser);
  const familyMembers = useSelector(
    state => state.transactionsReducer.familyMembers,
  );
  const [data, setData] = useState([user]);
  const expiryDate = transformDisplayedExpiryDate(user?.x_user_expiry);
  const mainnBackgroundColor = isDark ? colors.darkBlue : '#fff';
  const barcodeLineColor = isDark ? '#fff' : 'black';

  useEffect(() => {
    if (familyMembers?.length && isMainUser) {
      // Create additional card for main member with special background
      const mainMemberSpecialCard = { ...user, isSpecialCard: true };
      setData([mainMemberSpecialCard, user, ...familyMembers]);
    } else if (isMainUser) {
      // Create additional card for main member with special background
      const mainMemberSpecialCard = { ...user, isSpecialCard: true };
      setData([mainMemberSpecialCard, user]);
    }
  }, [familyMembers?.length]);

  useEffect(() => {
    if (isMainUser) {
      dispatch(getFamilyMembers());
    }
  }, []);

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

      <View
        style={{
          height: 230,
          width: "90%",
          marginTop: 25,
        }}
      >
        <Swiper
          loop={false}
          showsButtons={false}
          showsPagination={false}
          scrollEnabled={data.length > 1}
        >
          {data.map((item, index) => (
            <Card
              key={item.id || item.partner_id || index}
              name={item.name}
              lname={item.x_moi_last_name}
              nameAr={item.x_first_name_arbic}
              lnameAr={item.x_last_name_arbic}
              barcode={item.barcode}
              expiryDate={expiryDate}
              availablePoints={item.available_points || item.points}
              isMainMember={!!item.partner_id}
              isSpecialCard={item.isSpecialCard}
              index={index}
              renderHeader={() => (
                <TypographyText
                  textColor={isDark ? colors.white : colors.darkBlue}
                  size={16}
                  font={BALOO_REGULAR}
                  title={
                    item.partner_id
                      ? t("CardPage.employeeCard")
                      : t("CardPage.familyCard")
                  }
                  style={styles.cardType}
                />
              )}
            />
          ))}
        </Swiper>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',justifyContent:'center',
            marginTop: 10,
            flex: 1,
            marginBottom: 5
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
            size={22}
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
  cardType: {
    alignSelf: "flex-end",
    fontWeight: "900",
    paddingRight: 6,
  }
});

export default CardPage;
