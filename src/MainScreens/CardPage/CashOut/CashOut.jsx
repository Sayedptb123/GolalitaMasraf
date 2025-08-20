import React, { useRef } from "react";
import { Keyboard, View } from "react-native";
import { mainStyles } from "../../../styles/mainStyles";
import { TypographyText } from "../../../components/Typography";
import { colors } from "../../../components/colors";
import { LUSAIL_REGULAR } from "../../../redux/types";
import Input from "../../../components/Input/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CommonButton from "../../../components/CommonButton/CommonButton";
import { useTheme } from "../../../components/ThemeProvider";
import { useTranslation } from "react-i18next";

const CashOut = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const ref_to_input2 = useRef();
  return (
    <KeyboardAwareScrollView>
      <View>
        <View style={mainStyles.centeredRow}>
          <TypographyText
            textColor={isDark ? colors.white : colors.darkBlue}
            size={18}
            font={LUSAIL_REGULAR}
            title={t("CardPage.cashOut")}
            style={{ fontWeight: "700" }}
          />
        </View>
        <View style={[mainStyles.p20, { marginBottom: 50 }]}>
          <Input
            label={t("CardPage.from")}
            wrapperStyle={mainStyles.lightShadow}
            style={{ textAlign: "center" }}
            placeholder={`0 ${t("Product.points")}`}
            returnKeyType={"next"}
            onSubmitEditing={() => ref_to_input2.current.focus()}
            placeholderTextColor={isDark ? colors.white : colors.darkBlue}
          />
          <View style={[mainStyles.centeredRow, { marginVertical: 9 }]}>
            <TypographyText
              textColor={isDark ? colors.white : colors.darkBlue}
              size={14}
              font={LUSAIL_REGULAR}
              title={`${t("CardPage.currentBalance")}: `}
              style={{ fontWeight: "700" }}
            />
            <TypographyText
              textColor={isDark ? colors.white : colors.darkBlue}
              size={14}
              font={LUSAIL_REGULAR}
              title={`12 437 ${t("Product.points")}`}
              style={{ fontWeight: "900" }}
            />
          </View>
          <Input
            label={t("CardPage.to")}
            wrapperStyle={[mainStyles.lightShadow, { marginBottom: 32 }]}
            innerRef={ref_to_input2}
            returnKeyType={"next"}
            onSubmitEditing={Keyboard.dismiss}
            style={{ textAlign: "center" }}
            placeholder={"0 QAR"}
            placeholderTextColor={isDark ? colors.white : colors.darkBlue}
          />
          <CommonButton
            isError={true}
            label={t("CardPage.submit")}
            style={{ marginBottom: 180 }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CashOut;
