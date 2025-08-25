import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { TypographyText } from "../../../Typography";
import { colors } from "../../../colors";
import { LUSAIL_REGULAR } from "../../../../redux/types";
import { isRTL } from "../../../../../utils";
import { useTheme } from "../../../ThemeProvider";

const UserInfo = () => {
  const user = useSelector((state) => state.authReducer.user);
  const { isDark } = useTheme();
  const textColor = isDark ? colors.white : "#838383";

  return (
    <View
      style={[
        styles.wrapper,
        { alignItems: isRTL() ? "flex-end" : "flex-start" },
      ]}
    >
      <TypographyText
        title={`${user?.name || ""}  ${user?.x_moi_last_name || ""}`}
        textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
        size={24}
        font={LUSAIL_REGULAR}
        numberOfLines={1}
        style={{ flex: 1 }}
      />

      <TypographyText
        title={user?.barcode}
        textColor={textColor}
        size={15}
        font={LUSAIL_REGULAR}
        style={styles.barcode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
  },
  wrapperPoints: {
    flexDirection: "row",
  },
  barcode: {
    marginTop: 4,
  },
  pointItem: {
    flexDirection: "row",
  },
  label: {
    fontWeight: "900",
    marginRight: 5,
  },
});

export default UserInfo;
