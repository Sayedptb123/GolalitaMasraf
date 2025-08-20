import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import CommonHeader from "../../../components/CommonHeader/CommonHeader";
import Card from "../../../components/Card/Card";
import { SCREEN_WIDTH } from "../../../styles/mainStyles";
import { sized } from "../../../Svg";
import CodeSvg from "../../../assets/code.svg";
import { colors } from "../../../components/colors";
import { LUSAIL_REGULAR } from "../../../redux/types";
import { TypographyText } from "../../../components/Typography";
import Carousel from "react-native-reanimated-carousel";

const CodeIcon = sized(CodeSvg, 227, 36);
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { useTheme } from "../../../components/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { transformDisplayedExpiryDate } from "../utils";
import { getFamilyMembers } from "../../../redux/transactions/transactions-thunks";
import { CARD_TYPES } from "../config";

const CardPageHeader = ({
  user,
  getFamilyMembers,
  familyMembers,
  onChangeCard,
}) => {
  console.log("CardPageHeader user:",user)
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigation = useNavigation();
  const isMainUser = useSelector((state) => state.authReducer.isMainUser);
  const [data, setData] = useState([user]);
  const isFamilyAdded = useRef(false);

  useEffect(() => {
    if (familyMembers?.length && isMainUser && !isFamilyAdded.current) {
      isFamilyAdded.current = true;
      setData((data) => [...data, ...familyMembers]);
    }
  }, [familyMembers?.length]);

  const handleCardChange = (index) => {
    onChangeCard?.(data[index]);
  };

  useEffect(() => {
    onChangeCard?.(data[0]);

    if (isMainUser) {
      getFamilyMembers();
    }
  }, []);

  const handleScanPress = () => {
    navigation.navigate("QrCodeScanner", {
      title: "Scan card",
    });
  };

  return (
    <View>
      <CommonHeader
        isScan={true}
        label={t("CardPage.card")}
        onScanPress={handleScanPress}
      />
      <View style={styles.carouselWrapper}>
        <Carousel
          removeClippedSubviews={false}
          width={SCREEN_WIDTH}
          height={270}
          data={data}
          scrollAnimationDuration={1000}
          onScrollEnd={handleCardChange}
          renderItem={({ index, item }) => {
            const expiryDate = transformDisplayedExpiryDate(item.x_user_expiry);

            console.log("CardPageHeader user: item",item)
            return (
              <View style={styles.cardWrapper} key={index}>
                <Card
                  isVIP={user?.employee_type === CARD_TYPES.VIP}
                  name={item.name}
                  lname={item.x_moi_last_name}
                  expiryDate={expiryDate}
                  availablePoints={item.available_points || item.points}
                  renderHeader={() => (
                    <TypographyText
                      textColor={isDark ? colors.white : colors.darkBlue}
                      size={16}
                      font={LUSAIL_REGULAR}
                      title={
                        isMainUser && index === 0
                          ? t("CardPage.employeeCard")
                          : t("CardPage.familyCard")
                      }
                      style={styles.cardType}
                    />
                  )}
                />
                <View style={[styles.codeWrapper]}>
                  <View style={{ backgroundColor: colors.white }}>
                    <CodeIcon />
                  </View>
                  <TypographyText
                    textColor={isDark ? colors.white : colors.darkBlue}
                    size={20}
                    font={LUSAIL_REGULAR}
                    title={item.barcode}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselWrapper: {
    marginTop: 15,
  },
  cardWrapper: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  codeWrapper: {
    marginTop: 10,
    marginBottom: 5,
    alignItems: "center"
  },
  cardType: {
    alignSelf: "flex-end",
    fontWeight: "900",
  },
});

const mapStateToProps = (state) => ({
  familyMembers: state.transactionsReducer.familyMembers,
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { getFamilyMembers })(CardPageHeader);
