import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { TypographyText } from "../../../../../components/Typography";
import { useTheme } from "../../../../../components/ThemeProvider";
import { colors } from "../../../../../components/colors";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../../../../../utils";

const OtherFilterTypes = ({gopointsValue,premiumValue, value, type, onChange, style }) => {
  console.log("isGopoint:",value)
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const getWrapperStyle = (itemType) => {
   // console.log("isGopoint itemType:",itemType)
    const isActive = itemType;

    if (isActive) {
      return isDark ? styles.activeWrapperDark : styles.activeWrapperLight;
    }

    return isDark ? styles.passiveWrapperDark : styles.passiveWrapperLight;
  };

  const getTextColor = (itemType) => {
    const isActive =  itemType;

    if (isActive) {
      return colors.white;
    }

    return isDark ? colors.white : colors.darkBlue;
  };

  const config = [
    // {
    //   label: "Gopoints",
    //   value: gopointsValue,
    //   onPress: () => onChange("gopoints", !gopointsValue)
    // },
    {
      label: "Premium",
      labelAr: "الحصرية",
      value: premiumValue,
      onPress: () => onChange("premium", !premiumValue),
    },
  ];

  return (
    <View style={[styles.wrapper, style]}>
      {config.map((data, index) => (
        <TouchableOpacity
        key={index}
          style={[styles.filterBtn, getWrapperStyle(data.value),{borderColor:isDark ? colors.white : colors.darkBlue}]}
          onPress={data.onPress}
        >
          <TypographyText
            title={ isRTL() ? data.labelAr : data.label}
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
    marginTop:30
  },
  activeWrapperLight: {
    backgroundColor: colors.darkBlue,
  },
  passiveWrapperLight: {},
  activeWrapperDark: {
    backgroundColor: colors.navyBlue,
  },
  passiveWrapperDark: {},

  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 11,
    borderWidth:1,
    borderColor:colors.darkBlue
  },
  text: {
    fontWeight: "600",
  },
});

export default OtherFilterTypes;
