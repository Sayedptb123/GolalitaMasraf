import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TypographyText } from "../../../Typography";
import { LUSAIL_REGULAR } from "../../../../redux/types";
import LogoutSvg from "../../../../assets/logout.svg";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/auth/auth-thunks";
import { isRTL } from "../../../../../utils";

const LogOutBtn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => dispatch(logout())}
      style={[
        styles.wrapper,
        { flexDirection: isRTL() ? "row-reverse" : "row" },
      ]}
    >
      <TypographyText
        textColor={"#EA3434"}
        size={18}
        font={LUSAIL_REGULAR}
        title={t("Drawer.logout")}
        style={styles.text}
      />

      <LogoutSvg
        height={20}
        width={20}
        style={{ transform: [{ rotate: isRTL() ? "180deg" : "0deg" }] }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 40,
  },
  text: {
    marginRight: 8,
    marginLeft: 8,
  },
});

export default LogOutBtn;
