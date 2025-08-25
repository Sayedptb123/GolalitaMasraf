import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import CommonButton from "../../../components/CommonButton/CommonButton";
import { useTranslation } from "react-i18next";
import { SCREEN_WIDTH } from "../../../styles/mainStyles";
import { CardContext } from "../CardPage";
import useWalletCard from "../../../hooks/useWalletCard";
import { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";
import { colors } from "../../../components/colors";
import { useTheme } from "../../../components/ThemeProvider";

const QrCode = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const cardData = useContext(CardContext);
  const { addCardToWallet } = useWalletCard();
  const user = useSelector((state) => state.authReducer.user);
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    const { name, x_moi_last_name, x_user_expiry, barcode, photo, phone } =
      cardData;

    let fName = name + " " + x_moi_last_name;
    const data = {
      name: fName,
      x_user_expiry,
      organisation: user.organisation,
      available_points: 1,
      barcode
    };

    try {
      setLoading(true);

      const isCardAdded = await addCardToWallet(data);

      if (isCardAdded) {
        showMessage({
          type: "warning",
          message: t("CardPage.addedCardMsg"),
        });
      }
    } catch (err) {
      console.log(err, "err");
      showMessage({
        type: "danger",
        message: t("General.error"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <CommonButton
        label={t("CardPage.emtiazCard")}
        textColor={isDark ? colors.mainDarkMode : "white"}
        onPress={handlePress}
        style={{
          width: (SCREEN_WIDTH / 100) * 85,
          alignSelf: "center",
          marginTop: 20,
          borderStyle: "solid",
          borderWidth: 1,
          shadowColor: "rgba(0, 0, 0, 0)",
          marginBottom: 20,
          backgroundColor: isDark ? "transparent" : colors.darkBlue,
          borderColor: isDark ? colors.navyBlue : "transparent",
        }}
        loading={loading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  btn: {
    width: (SCREEN_WIDTH / 100) * 85,
    alignSelf: "center",
    marginTop: 20,
    borderStyle: "solid",
    borderWidth: 1,
    shadowColor: "rgba(0, 0, 0, 0)",
    marginBottom: 20,
    backgroundColor: "transparent",
  },
});

export default QrCode;
