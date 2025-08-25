import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { colors } from "../colors";
import { LUSAIL_REGULAR } from "../../redux/types";
import { TypographyText } from "../Typography";
import { useTheme } from "../ThemeProvider";
import { getFlexDirection, isRTL } from "../../../utils";

const IconButton = ({ icon, label, color, style, textColor, ...props }) => {
  const { isDark } = useTheme();
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          styles.button,
          getFlexDirection(),
          isDark && { borderColor: colors.green },
          color && { borderColor: color },
          style,
        ]}
        {...props}
      >
        {icon}
        <TypographyText
          textColor={color ? color : isDark ? colors.green : colors.grey}
          size={12}
          font={LUSAIL_REGULAR}
          title={label}
          style={
            icon && [
              isRTL() ? { marginRight: 6 } : { marginLeft: 6 },
              { fontWeight: "700" },
            ]
          }
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.grey,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //marginLeft: -10
  },
});

export default IconButton;
