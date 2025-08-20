import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../../components/ThemeProvider";
import { colors } from "../../../../components/colors";
import { BALOO_REGULAR, BALOO_SEMIBOLD } from "../../../../redux/types";
import { TypographyText } from "../../../../components/Typography";
import { useTranslation } from "react-i18next";
import HTMLRenderer from "../../../../components/HTMLRenderer";

const Description = ({ style, description }) => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const handleTermsPress = () => {};

  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.titleWrapper}>
        <TouchableOpacity onPress={handleTermsPress}>
          <TypographyText
            title={`${t("Vouchers.terms")}`}
            textColor={isDark ? colors.white : colors.darkBlue}
            size={18}
            font={BALOO_SEMIBOLD}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.descriptionWrapper}>
        <HTMLRenderer value={description} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionWrapper: {
    alignItems: "center",
    marginTop: 16,
  },
});

export default Description;
