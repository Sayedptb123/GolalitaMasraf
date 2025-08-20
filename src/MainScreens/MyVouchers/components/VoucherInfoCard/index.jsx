import { StyleSheet, View, Image } from "react-native";
import { TypographyText } from "../../../../components/Typography";
import { useTheme } from "../../../../components/ThemeProvider";
import { colors } from "../../../../components/colors";
import { useTranslation } from "react-i18next";

const VoucherInfoCard = (props) => {
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();
  const voucher = props.voucher;
  const isArabic = i18n.language === "ar";

  return (
    <View style={styles.wrapper}>
      {voucher?.x_merchant_logo && (
        <View style={styles.logoWrapper}>
          <Image
            source={{ uri: `data:image/png;base64,${voucher.x_merchant_logo}` }}
            style={styles.image}
          />
        </View>
      )}
      <View style={styles.textWrapper}>
        <TypographyText
          title={isArabic ? voucher.name_arabic : voucher.name}
          textColor={isDark ? colors.mainDarkMode : colors.mainDarkModeText}
          size={15}
          style={styles.name}
        />
        <TypographyText
          title={`${t("Vouchers.expiry")}: ${voucher.expiry_date}`}
          textColor={isDark ? colors.white : colors.mainDarkModeText}
          size={15}
          style={styles.name}
        />
        <TypographyText
          title={`${t("Vouchers.price")}: ${voucher.voucher_amount}`}
          textColor={isDark ? colors.mainDarkMode : colors.mainDarkModeText}
          size={15}
          style={styles.name}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 40,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: "contain",
  },
  wrapper: {
    flexDirection: "row",
    marginTop: 30,
  },
  textWrapper: {
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  name: {},
});

export default VoucherInfoCard;
