import { StyleSheet, Platform } from "react-native";
import { useTheme } from "../../../components/ThemeProvider";
import { colors } from "../../../components/colors";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/auth/auth-thunks";
import { useTranslation } from "react-i18next";
import CommonButton from "../../../components/CommonButton/CommonButton";
import { useEffect, useState } from "react";
import axios from "axios";

const ContinueAsGuestBtn = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const color = isDark ? colors.white : colors.grey;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    axios
      .post("https://www.golalita.com/api/go/get_test_value", {
        params: { token: "" },
      })
      .then((res) => {
        const testGolalita = res.data?.result?.[0]?.testGolalita;

        if (typeof testGolalita === "boolean" && testGolalita !== isVisible) {
          setIsVisible(testGolalita);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  const handleContinueLikeGuestPress = () => {
    dispatch(
      login({
        login: "test@masrif.com",
        password: "abc123123",
        device_type: Platform.OS,
      })
    );
  };

  if (!isVisible) {
    return null;
  }

  return (
    <CommonButton
      style={{ ...styles.btn, borderColor: color, elevation: 0 }}
      textColor={color}
      onPress={handleContinueLikeGuestPress}
      label={t("Login.continueAsGuest")}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "transparent",
    marginTop: 10,
    borderWidth: 1,
  },
});

export default ContinueAsGuestBtn;
