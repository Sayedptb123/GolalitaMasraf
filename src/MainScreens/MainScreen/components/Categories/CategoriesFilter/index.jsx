import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { TypographyText } from "../../../../../components/Typography";
import { useTheme } from "../../../../../components/ThemeProvider";
import { colors } from "../../../../../components/colors";
import { useTranslation } from "react-i18next";
import { getFlexDirection } from "../../../../../../utils";

const CategoriesFilter = ({ type, onChange, style }) => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const getWrapperStyle = (itemType) => {
    const isActive = type === itemType;

    if (isActive) {
      return isDark ? styles.activeWrapperDark : styles.activeWrapperLight;
    }

    return isDark ? styles.passiveWrapperDark : styles.passiveWrapperLights;
  };

  const getTextColor = (itemType) => {
    const isActive = type === itemType;

    if (isActive) {
      return colors.white;
    }

    return isDark ? colors.white : colors.darkBlue;
  };

  const config = [
    {
      label: t("MainScreen.localCategories"),
      value: "local",
      isActive: type === "local",
    },
    {
      label: t("MainScreen.globalCategories"),
      value: "global",
      isActive: type === "global",
    },
  ];

  return (
    <View style={[styles.wrapper, style, getFlexDirection()]}>
      {config.map((data, index) => (
        <TouchableOpacity
          style={[
            styles.filterBtn,
            getWrapperStyle(data.value),
            { marginLeft: !index ? 0 : 10 },
          ]}
          onPress={() => onChange(data.value)}
        >
          <TypographyText
            title={data.label}
            textColor={getTextColor(data.value)}
            size={14}
            style={styles.text}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeWrapperLight: {
    backgroundColor: colors.navyBlue,
  },
  passiveWrapperLight: {},
  activeWrapperDark: {
    backgroundColor: colors.mainDarkMode,
  },
  passiveWrapperDark: {
    backgroundColor: colors.mainDarkModeText,
  },

  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  text: {
    fontWeight: "600",
  },
});

export default CategoriesFilter;
