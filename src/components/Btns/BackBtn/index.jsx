import { StyleSheet, TouchableOpacity } from "react-native";
import BackSvg from "../../../assets/back.svg";
import { TypographyText } from "../../Typography";
import { useTranslation } from "react-i18next";
import { BALOO_SEMIBOLD } from "../../../redux/types";
import { colors } from "../../colors";
import { useTheme } from "../../ThemeProvider";
import { sized } from "../../../Svg";

const BackBtn = ({ onPress, style, noTitle }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const BackIcon = sized(
    BackSvg,
    20,
    20,
    isDark ? colors.white : colors.darkBlue
  );

  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
      <BackIcon />

      {!noTitle && <TypographyText
        textColor={isDark ? colors.white : colors.darkBlue}
        size={14}
        font={BALOO_SEMIBOLD}
        title={t("General.back")}
        style={styles.text}
      />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal:16
  },
  text: {
    marginLeft: 5,
  },
});

export default BackBtn;
