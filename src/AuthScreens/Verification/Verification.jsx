import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../components/colors";
import { getPixel, mainStyles, SCREEN_HEIGHT } from "../../styles/mainStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BackgroundSvg from "../../assets/login_bg.svg";
import { TypographyText } from "../../components/Typography";
import { BALOO_MEDIUM } from "../../redux/types";
import { Formik } from "formik";
import * as Yup from "yup";
import CommonButton from "../../components/CommonButton/CommonButton";
import { useTheme } from "../../components/ThemeProvider";
import { useTranslation } from "react-i18next";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { connect } from "react-redux";
import { verify } from "../../redux/auth/auth-thunks";

const Verification = ({ route, navigation, verify, profileLoading }) => {
  let params = route.params;

  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const titleText = params.phone
    ? t("Login.enter4DigitsPhone")
    : t("Login.enter4DigitsEmail");

  useEffect(() => {
    if (!params.isForgotPassword) {
      setLoading(true);
      verify(
        {
          params: {
            otp: "0000",
            phone: params?.phone,
            email: params?.email,
            mode: "noOTP",
          },
        },
        navigation,
        t,
        params?.registerBody,
        params?.isForgotPassword
      );
    }
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDark ? colors.darkBlue : colors.white,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View
      scrollEnabled={Platform.OS === "android"}
      style={{
        backgroundColor: isDark ? colors.darkBlue : colors.bg,
        height: SCREEN_HEIGHT,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
          <TouchableOpacity
            activeOpacity={1}
            onPress={Keyboard.dismiss}
            style={{ flex: 1 }}
          >
            <BackgroundSvg style={styles.bg} />
            <View
              style={[
                mainStyles.centeredRow,
                { marginTop: getPixel(10), flexDirection: "column" },
              ]}
            >
              <Image
                source={require("../../assets/shield.png")}
                style={mainStyles.registerIcon}
              />
              <TypographyText
                title={titleText}
                textColor={isDark ? colors.white : colors.darkBlue}
                size={18}
                font={BALOO_MEDIUM}
                style={[
                  mainStyles.centeredText,
                  { marginTop: 20, paddingHorizontal: 50 },
                ]}
              />
            </View>
            <View style={[mainStyles.p20, { marginTop: getPixel(7) }]}>
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
                      {errors.code && (
                        <TypographyText
                          title={errors.code}
                          textColor={"#FF406E"}
                          size={14}
                          font={BALOO_MEDIUM}
                          style={{ marginBottom: 60 }}
                        />
                      )}
                      <CommonButton
                        onPress={handleSubmit}
                        label={t("Login.verify")}
                        loading={profileLoading}
                      />
                    </>
                  );
                }}
              </Formik>
            </View>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  codeWrapper: {
    marginBottom: 80,
    paddingHorizontal: 30,
  },
  cellWrapper: {
    ...mainStyles.cell,
    ...mainStyles.lightShadow,
    borderWidth: 0,
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  cell: {
    color: "#312B3E",
    fontSize: 24,
    fontFamily: BALOO_MEDIUM,
    textAlign: "center",
  },
});

export default connect(
  (state) => ({
    profileLoading: state.authReducer.profileLoading,
  }),
  { verify }
)(Verification);
