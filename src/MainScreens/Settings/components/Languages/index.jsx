import { useState } from "react";
import { View } from "react-native";
import { TypographyText } from "../../../../components/Typography";
import { LUSAIL_REGULAR } from "../../../../redux/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../../../components/ThemeProvider";
import i18next from "i18next";
import TwoButtons from "../../../../components/TwoButtons/TwoButtons";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../components/colors";
import { mainStyles } from "../../../../styles/mainStyles";
import { useNavigation } from "@react-navigation/native";

const Languages = () => {
  const { isDark } = useTheme();
  const { i18n, t } = useTranslation();
  const navigation = useNavigation();
  const [isEng, setIsEng] = useState(i18n.language === "en" ? true : false);

  return (
    <View>
      <TypographyText
        textColor={isDark ? colors.white : colors.darkBlue}
        size={18}
        font={LUSAIL_REGULAR}
        title={t("Settings.language")}
        style={[mainStyles.p20, { marginTop: 25, fontWeight: "700" }]}
      />

      <TwoButtons
        isLight={!isDark}
        selectedButton={isEng ? 0 : 1}
        onPress1={() => {
          setIsEng(true);

          i18next.changeLanguage("en");
          AsyncStorage.setItem("lang", "en");
        }}
        onPress2={() => {
          setIsEng(false);

          i18next.changeLanguage("ar");
          AsyncStorage.setItem("lang", "ar");
        }}
        label1={"English"}
        label2={"عربي"}
      />
    </View>
  );
};

export default Languages;
