import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Card from "../../../components/Card/Card";
import { sized } from "../../../Svg";
import CodeSvg from "../../../assets/code.svg";
import { colors } from "../../../components/colors";
import { LUSAIL_REGULAR } from "../../../redux/types";
import { TypographyText } from "../../../components/Typography";
import QrCode from "../QrCode/index";
const CodeIcon = sized(CodeSvg, 250, 86);
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { useTheme } from "../../../components/ThemeProvider";
import { transformDisplayedExpiryDate } from "../utils";
import { getFamilyMembers } from "../../../redux/transactions/transactions-thunks";
import Header from "../../../components/Header";
import Carousel from "react-native-reanimated-carousel";
import { SCREEN_WIDTH } from "../../../styles/mainStyles";

const CardPageHeader = ({
  user,
  getFamilyMembers,
  familyMembers,
  onChangeCard,
}) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const isMainUser = useSelector((state) => state.authReducer.isMainUser);
  const [data, setData] = useState([user, user]);
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

  return (
    <View style={{ flex: 1 }}>
      <Header label={t("CardPage.card")} btns={["back"]} />
      <View style={styles.cardWrapper}>
        <View style={{ flex: 1 }}>
          <Carousel
            width={SCREEN_WIDTH}
            height={300}
            data={data}
            scrollAnimationDuration={1000}
            onScrollEnd={handleCardChange}
            renderItem={({ index, item }) => {
              const expiryDate = transformDisplayedExpiryDate(
                item.x_user_expiry
              );

              return (
                <View style={styles.cardWrapper}>
                  <Card
                    index={index}
                    isMainUser={isMainUser}
                    name={`${item.name || ""}  ${item.x_moi_last_name || ""}`}
                    expiryDate={expiryDate}
                    availablePoints={item.available_points || item.points}
                    renderHeader={() => (
                      <TypographyText
                        textColor={isDark ? colors.white : colors.darkBlue}
                        size={16}
                        font={LUSAIL_REGULAR}
                        title={
                          (isMainUser && index === 0) ||
                          (isMainUser && index === 1)
                            ? t("CardPage.employeeCard")
                            : t("CardPage.familyCard")
                        }
                        style={styles.cardType}
                      />
                    )}
                  />
                </View>
              );
            }}
          />
        </View>
        <View style={[styles.codeWrapper]}>
          <View style={{}}>
            <CodeIcon color={isDark ? colors.white : colors.borderGrey} />
          </View>
          <TypographyText
            textColor={isDark ? colors.white : colors.black}
            size={20}
            font={LUSAIL_REGULAR}
            title={user.barcode}
          />
        </View>

        <View style={{ flex: 0.5, justifyContent: "center" }}>
          <QrCode />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselWrapper: {
    marginTop: 15,
  },
  cardWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    //    backgroundColor:'red'
  },
  codeWrapper: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cardType: {
    alignSelf: "flex-end",
    fontWeight: "900",
  },
  cardWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({
  familyMembers: state.transactionsReducer.familyMembers,
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { getFamilyMembers })(CardPageHeader);
