import React, { useCallback } from "react";
import {
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { colors } from "../../components/colors";
import Input from "../../components/Input/Input";
import { connect, useDispatch } from "react-redux";
import { getPixel, mainStyles, SCREEN_HEIGHT } from "../../styles/mainStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TypographyText } from "../../components/Typography";
import { LUSAIL_REGULAR } from "../../redux/types";
import { Formik } from "formik";
import * as Yup from "yup";
import CommonButton from "../../components/CommonButton/CommonButton";
import { useTheme } from "../../components/ThemeProvider";
import { useTranslation } from "react-i18next";
import authApi from "../../redux/auth/auth-api";
import { verifyRegisterCode } from "../../redux/auth/auth-thunks";
import TopCircleShadow from "../../components/TopCircleShadow";
import BackBtn from "../../components/Btns/BackBtn";
import { setRegisterationcodeLoading } from "../../redux/auth/auth-actions";

const RegCodeVerification = ({
  route,
  navigation,
  verifyRegisterCode,
  registrationcodeLoading,
}) => {
  let params = route.params;
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const toLogin = useCallback(() => {
    navigation.navigate("Login");
  }, []);
  return (
    <View
      scrollEnabled={Platform.OS === "android"}
      style={{
        backgroundColor: isDark ? colors.darkBlue : colors.bg,
        height: SCREEN_HEIGHT,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
          <TopCircleShadow />
          <TouchableOpacity
            activeOpacity={1}
            onPress={Keyboard.dismiss}
            style={{ flex: 1 }}
          >
            <View style={styles.goldShadeWrapper}></View>
            <BackBtn onPress={() => navigation?.goBack()} noTitle />
            <View
              style={[
                mainStyles.centeredRow,
                { marginTop: getPixel(10), flexDirection: "column", flex: 1 },
              ]}
            >
              <TypographyText
                title={t("Login.enterRegisterCode")}
                textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
                size={23}
                font={LUSAIL_REGULAR}
                style={[
                  mainStyles.centeredText,
                  { marginTop: 20, paddingHorizontal: 50, fontWeight: "700" },
                ]}
              />
            </View>
            <View style={[mainStyles.p20, { marginTop: getPixel(7), flex: 2 }]}>
              <Formik
                initialValues={{
                  registration_code: "",
                  email: "",
                }}
                onSubmit={async (values, { setFieldError }) => {
                  console.log("here");
                  try {
                    dispatch(setRegisterationcodeLoading(true));

                    const { email } = values;

                    const res = await authApi.checkEmail({
                      params: { email },
                    });

                    if (res.data.result?.error) {
                      setFieldError("email", t("Profile.emailExists"));
                      throw "err";
                    }
                    verifyRegisterCode(
                      {
                        params: {
                          code: values.registration_code,
                          email: values.email,
                        },
                      },
                      navigation,
                      setFieldError,
                      t,
                      params?.registerBody,
                      params?.isForgotPassword
                    );
                  } catch (err) {
                    console.log(err, "error");
                  } finally {
                    dispatch(setRegisterationcodeLoading(false));
                  }
                }}
                validationSchema={Yup.object({
                  registration_code: Yup.string().required(t("Login.required")),
                  email: Yup.string()
                    .email(t("Login.invalidEmail"))
                    .required(t("Login.required")),
                })}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  errors,
                  submitCount,
                }) => {
                  errors = submitCount > 0 ? errors : {};

                  return (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "space-between",
                        paddingBottom: 26,
                        marginBottom: 19,
                      }}
                    >
                      <View
                        style={{
                          //flex: 1,
                          height: "30%",
                          paddingVertical: 26,
                          marginBottom: 19,
                        }}
                      >
                        <Input
                          label={t("Login.code")}
                          placeholder={t("Login.code")}
                          value={values.registration_code}
                          onChangeText={handleChange("registration_code")}
                          error={errors.registration_code}
                          returnKeyType={"next"}
                        />

                        <Input
                          label={t("Login.email")}
                          placeholder={t("Login.emailPlaceholder")}
                          value={values.email}
                          onChangeText={(e) => {
                            handleChange("email")(e.toLowerCase());
                          }}
                          error={errors.email}
                          returnKeyType={"next"}
                          autoCapitalize="none"
                          wrapperStyle={{ marginTop: 20 }}
                          style={{ fontSize: 16 }}
                        />
                      </View>
                      <View>
                        <CommonButton
                          onPress={handleSubmit}
                          label={t("Login.verify")}
                          textColor={"white"}
                          loading={registrationcodeLoading}
                        />

                        <TouchableOpacity
                          style={styles.bottom}
                          onPress={toLogin}
                        >
                          <TypographyText
                            title={t("Login.haveAccount")}
                            textColor={
                              isDark
                                ? colors.mainDarkMode
                                : colors.mainDarkModeText
                            }
                            size={14}
                            font={LUSAIL_REGULAR}
                          />

                          <View style={styles.link}>
                            <TypographyText
                              title={t("Login.signInShort")}
                              textColor={
                                isDark ? colors.mainDarkMode : colors.darkBlue
                              }
                              size={18}
                              style={mainStyles.underline}
                              font={LUSAIL_REGULAR}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
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
    color: "#072536",
    fontSize: 24,
    fontFamily: LUSAIL_REGULAR,
    textAlign: "center",
    fontWeight: "700",
  },
  bottom: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  goldShadeWrapper: {
    width: 500,
    height: 500,
    borderRadius: 250,
    position: "absolute",
    right: -260,
    top: -230,
    shadowColor: "#DDBD6B",
    shadowOffset: {
      width: 120,
      height: 120,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 55,
    zIndex: 10000,
  },
});

export default connect(
  (state) => ({
    registrationcodeLoading: state.authReducer.registrationcodeLoading,
  }),
  { verifyRegisterCode }
)(RegCodeVerification);
