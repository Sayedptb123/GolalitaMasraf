import React from "react";
import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { colors } from "../../components/colors";
import { mainStyles } from "../../styles/mainStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TypographyText } from "../../components/Typography";
import { LUSAIL_REGULAR } from "../../redux/types";
import { Formik } from "formik";
import * as Yup from "yup";
import CommonButton from "../../components/CommonButton/CommonButton";
import { useTheme } from "../../components/ThemeProvider";
import { useTranslation } from "react-i18next";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { connect } from "react-redux";
import { verify } from "../../redux/auth/auth-thunks";
import ShieldSvg from "../../assets/shield.svg";
import AuthLayout from "../component/AuthLayout";
import { sized } from "../../Svg";
import TopCircleShadow from "../../components/TopCircleShadow";

import { isRTL } from "../../../utils";
import BackSvg from "../../assets/back_white.svg";
const Verification = ({ route, navigation, verify }) => {
  const { isDark } = useTheme();
  const BackIcon = sized(BackSvg, 22, 22, isDark ? colors.mainDarkMode : colors.darkBlue);
  const ShieldIcon = sized(ShieldSvg, 22, 22, isDark ? colors.mainDarkMode : colors.darkBlue);
  let params = route.params;
  const { t } = useTranslation();

  const titleText = params.phone
    ? t("Login.enter4DigitsPhone")
    : t("Login.enter4DigitsEmail");

  const verificationEntity = params.email || params.phone;

  return (
    <AuthLayout>
      <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
            style={{ transform: [{ rotate: isRTL() ? "180deg" : "0deg" }],padding:11 }}
            onPress={navigation.goBack}
          >
            <BackIcon />
          </TouchableOpacity>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={Keyboard.dismiss}
            style={{ flex: 1 }}
          >
            <Formik
              initialValues={{
                code: "",
              }}
              onSubmit={(values, { setFieldError }) => {
                verify(
                  {
                    params: {
                      otp: values.code,
                      phone: params?.phone,
                      email: params?.email,
                    },
                  },
                  navigation,
                  setFieldError,
                  t,
                  params?.registerBody,
                  params?.isForgotPassword
                );
              }}
              validationSchema={Yup.object({
                code: Yup.string().required(t("Login.required")),
              })}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                submitCount,
                setFieldError,
              }) => {
                errors = submitCount > 0 ? errors : {};
                return (
                  <>
                    <View style={styles.wrapper}>
                      <View style={styles.mainInfoWrapper}>
                        <ShieldIcon style={mainStyles.registerIcon} />
                        <TypographyText
                          title={t("Login.otpVerification")}
                          textColor={isDark ? colors.white : colors.darkBlue}
                          size={22}
                          style={styles.title}
                        />
                        <TypographyText
                          title={titleText}
                          textColor={isDark ? colors.white : colors.darkBlue}
                          size={18}
                          style={styles.description}
                        />

                        <TypographyText
                          title={verificationEntity}
                          textColor={isDark ? colors.white : colors.darkBlue}
                          size={18}
                          style={styles.description}
                        />

                        <View style={styles.codeWrapper}>
                          <CodeField
                            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                            value={values.code}
                            onChangeText={handleChange("code")}
                            cellCount={4}
                            rootStyle={[
                              styles.codeWrapper,
                              errors.code && { marginBottom: 20 },
                            ]}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                              <View style={styles.cellWrapper}>
                                <Text
                                  key={index}
                                  style={[
                                    styles.cell,
                                    isFocused && styles.focusCell,
                                    {
                                      backgroundColor: isDark
                                        ? colors.transparent
                                        : colors.white,
                                    },
                                  ]}
                                >
                                  {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                              </View>
                            )}
                          />
                        </View>
                      </View>

                      <View style={{width:"90%"}}>
                        {errors.code && (
                          <TypographyText
                            title={errors.code}
                            textColor={"#FF406E"}
                            size={14}
                            font={LUSAIL_REGULAR}
                            style={{ marginBottom: 60, fontWeight: "700" }}
                          />
                        )}

                        <CommonButton
                          onPress={handleSubmit}
                          label={t("Login.submit")}
                          textColor={
                            isDark ? colors.mainDarkModeText : colors.white
                          }
                        />
                      </View>
                    </View>
                  </>
                );
              }}
            </Formik>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <TopCircleShadow />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
    paddingBottom: 60,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  mainInfoWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 50,
  },
  description: {
    marginTop: 20,
    width: 250,
    textAlign: "center",
  },
  codeWrapper: {
    marginBottom: 80,
    paddingHorizontal: 30,
  },
  cellWrapper: {
    ...mainStyles.cell,
    ...mainStyles.lightShadow,
    borderWidth: 0,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  cell: {
    color: "#072536",
    fontSize: 24,
    fontFamily: LUSAIL_REGULAR,
    textAlign: "center",
    fontWeight: "700",
  },
  codeWrapper: {
    width: 250,
    marginTop: 20,
  },
});

export default connect(null, { verify })(Verification);
