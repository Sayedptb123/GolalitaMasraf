import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { TypographyText } from "../../../../../components/Typography";
import { useTranslation } from "react-i18next";
import InfoTab from "./InfoTab";
import MapTab from "./MapTab";
import { useState } from "react";
import { colors } from "../../../../../components/colors";
import { useTheme } from "../../../../../components/ThemeProvider";
import i18next from "i18next";

const InfoTabs = ({ merchantDetails }) => {
  const [isInfo, setIsInfo] = useState(true);
  const { isDark } = useTheme();
  const { t } = useTranslation();
const isRTL = () => i18next.dir(i18next.language) === "rtl";

  return (
    <>
      <View style={{ flexDirection: isRTL ? "row-reverse" : "row", paddingTop: 15 }}>
        <TouchableOpacity
          style={[
            styles.tab,
            {
              borderColor: isInfo
                ? isDark
                  ? colors.mainDarkMode
                  : colors.darkBlue
                : isDark
                ? colors.borderGrey
                : colors.lightGrey,
            },
          ]}
          onPress={() => setIsInfo(true)}
        >
          <TypographyText
            textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
            size={15}
            style={{ fontWeight: "700" }}
            title={t("Merchants.info")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            {
              borderColor: !isInfo
                ? isDark
                  ? colors.mainDarkMode
                  : colors.darkBlue
                : isDark
                ? colors.borderGrey
                : colors.lightGrey,
            },
          ]}
          onPress={() => setIsInfo(false)}
        >
          <TypographyText
            textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
            size={15}
            style={{ fontWeight: "700" }}
            title={t("Merchants.location")}
          />
        </TouchableOpacity>
      </View>

      {isInfo && <InfoTab merchantDetails={merchantDetails} />}
      {!isInfo && <MapTab merchantDetails={merchantDetails} />}
    </>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    borderBottomWidth: 2.5,
  },
});

export default InfoTabs;
