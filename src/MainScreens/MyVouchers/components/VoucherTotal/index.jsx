import { StyleSheet, View } from "react-native";
import { BALOO_BOLD, BALOO_REGULAR } from "../../../../redux/types";
import { useTheme } from "../../../../components/ThemeProvider";
import { TypographyText } from "../../../../components/Typography";
import { colors } from "../../../../components/colors";
import { useTranslation } from "react-i18next";

const VoucherTotal = (props) => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const { amount = 0, deliveryCharge, bankCharge, style, total, cash } = props;

  const renderValue = (item) => {
    if (!item.value) {
      return null;
    }

    return (
      <View style={styles.itemWrapper} key={item.title}>
        <TypographyText
          title={item.title}
          textColor={isDark ? colors.white : colors.darkBlue}
          size={16}
          font={item.isTotal ? BALOO_BOLD : BALOO_REGULAR}
        />
        <TypographyText
          title={item.value}
          textColor={isDark ? colors.white : colors.mainDarkModeText}
          size={16}
          font={item.isTotal ? BALOO_BOLD : BALOO_REGULAR}
        />
      </View>
    );
  };

  let config = [];

  if (!cash) {
    config = [
      {
        title: t("Vouchers.price"),
        value: `QAR ${amount?.toFixed(2) || "0.00"}`,
      },
      {
        title: t("Vouchers.deliveryCharge"),
        value: `QAR ${deliveryCharge?.toFixed(2) || "0.00"}`,
      },
      {
        title: t("Vouchers.bankCharge"),
        value: `QAR ${bankCharge?.toFixed(2) || "0.00"}`,
      },
    ];
  } else {
    config = [
      {
        title: t("Vouchers.price"),
        value: `QAR ${amount?.toFixed(2) || "0.00"}`,
      },
      {
        title: t("Vouchers.cash"),
        value: "True",
      },
    ];
  }

  const totalConfig = {
    title: t("Vouchers.orderTotal"),
    value: `${total.toFixed(2)} QAR`,
    isTotal: true,
  };

  return (
    <View style={style}>
      <View style={styles.wrapper}>{config.map(renderValue)}</View>
      {renderValue(totalConfig)}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBlue,
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
});

export default VoucherTotal;
