import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../colors";
import { LUSAIL_REGULAR } from "../../redux/types";
import { TypographyText } from "../Typography";
import NotificationsBtn from "./components/NotificationsBtn";
import { useTheme } from "../ThemeProvider";
import BackBtn from "./components/BackBtn";
import FilterBtn from "./components/FilterBtn";
import { isRTL } from "../../../utils";

import { sized } from "../../Svg";
import SettingsSvg from "../../assets/settings.svg";
const Header = ({
  btns = ["back", "notifications"],
  label,
  style,
  additionalBtnsProps,
}) => {
  const { isDark } = useTheme();

  const iconColor = isDark ? colors.white : colors.black;
  const SettingsIcon = sized(SettingsSvg, 20, 20, iconColor);
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.leftBtns}>
        {btns.includes("back") && <BackBtn {...additionalBtnsProps?.back} />}
      </View>

      <View style={styles.titleWrapper}>
        <TypographyText
          textColor={isDark ? colors.white : "#202226"}
          size={18}
          font={LUSAIL_REGULAR}
          title={label}
          numberOfLines={1}
        />
      </View>
      <View style={styles.rightBtns}>
        {btns.includes("filter") && (
          <FilterBtn {...additionalBtnsProps?.filter} />
        )}
        {btns.includes("notifications") && (
          <NotificationsBtn {...additionalBtnsProps?.notifications} />
        )}
        {btns.includes("settings") && (
          <SettingsIcon {...additionalBtnsProps?.settings} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  leftBtns: {
    width: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rightBtns: {
    flexDirection: "row",
    alignItems: "center",
    width: 45,
    justifyContent: "flex-end",
  },
  titleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
