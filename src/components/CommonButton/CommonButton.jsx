import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { colors } from "../colors";
import { BALOO_SEMIBOLD } from "../../redux/types";
import { TypographyText } from "../Typography";
import { mainStyles } from "../../styles/mainStyles";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../ThemeProvider";

const CommonButton = ({
  label,
  isError,
  style,
  icon,
  textColor,
  loading,
  ...props
}) => {
  const { isDark } = useTheme();
  return (
    <LinearGradient
      style={[
        styles.button,
        style,
        isError && {
          backgroundColor: colors.lightGrey,
          ...mainStyles.lightShadow,
        },
        { backgroundColor: colors.navyBlue },
      ]}
      colors={
        isError
          ? [colors.grey, colors.grey]
          : style?.backgroundColor
          ? [style.backgroundColor, style.backgroundColor]
          : isDark
          ? [colors.navyBlue, colors.navyBlue]
          : [colors.darkBlue, colors.darkBlue]
      }
    >
      <TouchableOpacity
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          ...mainStyles.centeredRow,
        }}
        activeOpacity={0.6}
        disabled={!!loading}
        {...props}
      >
        {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
        <TypographyText
          title={label}
          textColor={textColor || colors.white}
          size={18}
          font={BALOO_SEMIBOLD}
          style={{ marginTop: 5 }}
        />

        {loading && (
          <ActivityIndicator
            color={isDark ? "white" : colors.white}
            style={styles.loader}
          />
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    ...mainStyles.shadow,
    flexDirection: "row",
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkBlue,
    borderRadius: 8,
  },
  loader: {
    marginLeft: 15,
  },
});

export default CommonButton;
