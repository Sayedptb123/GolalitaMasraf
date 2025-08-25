import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Platform,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { TypographyText } from "../components/Typography";
import { LUSAIL_REGULAR } from "../redux/types";
import { colors } from "../components/colors";
import i18next from "i18next";
import Input from "../components/Input/Input";
import CommonButton from "../components/CommonButton/CommonButton";
import { useTheme } from "../components/ThemeProvider";
import { connect, useDispatch } from "react-redux";
import { getUserData, login, getInitialData } from "../redux/auth/auth-thunks";
import { Formik } from "formik";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import { showMessage } from "react-native-flash-message";
import "../pushNotifications/pushNotificationBootStrap";
import usePushNotifications from "../pushNotifications/usePushNotifications";
import TouchID from "react-native-touch-id";
import TwoButtons from "../components/TwoButtons/TwoButtons";
import { getFlexDirection, phoneRegExp } from "../../utils";
import {
  setIsAuthorized,
  setToken,
  setUserId,
} from "../redux/auth/auth-actions";
import authApi from "../redux/auth/auth-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContinueAsGuestBtn from "./component/ContinueAsGuestBtn";
import AuthLayout from "./component/AuthLayout";
import TopCircleShadow from "../components/TopCircleShadow";
import SaveMe from "./component/SaveMe";
import { getIsSaveMe, setIsSaveMe } from "../api/asyncStorage";
import PhoneInput from "../components/Form/PhoneInput";

const LOGIN_INPUT_TYPES = {
  email: "email",
  phone: "phone",
};

const Login = ({
  navigation,
  login,
  isLoginError,
  user,
  isUserJustLogOut,
  loginLoading,
}) => {
  const { isDark } = useTheme();
  const [compatible, isCompatible] = useState(false);
  const ref_to_input2 = useRef();
  const isLoggedInWithCredentialsRef = useRef(false);
  const [loginInputType, setLoginInputType] = useState(LOGIN_INPUT_TYPES.email);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  usePushNotifications();
  const [isRememberMeActive, setIsRememberMeActive] = useState(false);

  const loginBg = isDark
    ? require("../assets/horizontal_logo_white.png")
    : require("../assets/horizontal_logo.png");

  useEffect(() => {
    TouchID.isSupported().then(() => {
      isCompatible(true);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const isUserLoggedOut = await AsyncStorage.getItem("isUserLoggedOut");
      const isRememberMe = await getIsSaveMe();

      setIsRememberMeActive(
        isRememberMe === "true" || isRememberMe === null ? true : false
      );
      if (isUserLoggedOut === "true" && !isUserJustLogOut) {
        authenticateWithTouchId();
      }
    })();
  }, [isCompatible]);

  const authenticateWithTouchId = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        showMessage({
          message: t("Login.loginMessage"),
          type: "danger",
        });

        return;
      }

      await TouchID.authenticate();

      try {
        const res = await authApi.getUserData({
          params: { token },
        });

        if (res?.data?.result?.error) {
          showMessage({
            message: t("Login.loginMessage"),
            type: "danger",
          });

          return;
        }

        const userId = await AsyncStorage.getItem("userId");

        if (userId) {
          dispatch(setUserId(userId));
        }

        dispatch(getUserData(token));
        dispatch(setToken(token));
        dispatch(getInitialData());
        dispatch(setIsAuthorized(true));

        await AsyncStorage.setItem("isUserLoggedOut", "false");
      } catch (err) {
        showMessage({
          message: t("Login.loginMessage"),
          type: "danger",
        });

        return;
      }
    } catch {
      showMessage({
        message: "Authentication Failed",
        type: "danger",
      });
    }
  };

  const handleSaveMeChange = async (val) => {
    await setIsSaveMe(val ? "true" : "false");

    setIsRememberMeActive(val);
  };

  let validationSchema;

  if (loginInputType === LOGIN_INPUT_TYPES.email) {
    validationSchema = Yup.object({
      email: Yup.string().required(t("Login.required")),
      password: Yup.string().required(t("Login.required")),
    });
  }

  if (loginInputType === LOGIN_INPUT_TYPES.phone) {
    validationSchema = Yup.object({
      phone: Yup.string()
        .matches(phoneRegExp, t("Login.invalidPhone"))
        .required(t("Login.required")),
      password: Yup.string().required(t("Login.required")),
    });
  }

  const logoColor = isDark ? colors.mainDarkMode : "white";

  return (
    <AuthLayout>
      <TouchableOpacity activeOpacity={1} style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={Keyboard.dismiss}
            style={{ flex: 1, justifyContent: "center" }}
          >
            <View style={styles.logoWrapper}>
              <Image source={loginBg} style={[styles.logo]} />
            </View>

            <View
              style={[
                styles.formikWrapper,
                {
                  backgroundColor: isDark ? colors.darkBlue : "#fff",
                },
              ]}
            >
              <Formik
                initialValues={{
                  email: "",
                  phone: "+974",
                  password: "",
                }}
                onSubmit={(values) => {
                  isLoggedInWithCredentialsRef.current = true;

                  let loginValue = values.email;

                  if (values.phone && values.phone.length > 4) {
                    loginValue = values.phone;
                  }

                  login({
                    login: loginValue.toLowerCase(),
                    password: values.password,
                    device_type: Platform.OS,
                  });
                }}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  errors,
                  submitCount,
                }) => {
                  errors = submitCount > 0 ? errors : {};
                  // if (isLoginError && !errors.password && !errors.password) setFieldError('password', t('Login.somethingWrong'))
                  return (
                    <>
                      <TwoButtons
                        isLight={!isDark}
                        selectedButton={
                          loginInputType === LOGIN_INPUT_TYPES.email ? 0 : 1
                        }
                        onPress1={() => {
                          if (loginInputType !== LOGIN_INPUT_TYPES.email) {
                            setLoginInputType(LOGIN_INPUT_TYPES.email);
                            handleChange("phone")("");
                          }
                        }}
                        onPress2={() => {
                          if (loginInputType !== LOGIN_INPUT_TYPES.phone) {
                            setLoginInputType(LOGIN_INPUT_TYPES.phone);
                            handleChange("email")("");
                          }
                        }}
                        label1={t("Login.email")}
                        label2={t("Login.phone")}
                        style={{ marginVertical: 0 }}
                      />

                      {loginInputType === LOGIN_INPUT_TYPES.email && (
                        <Input
                          label={t("Login.email")}
                          isLogin={true}
                          placeholder={t("Login.emailPlaceholder")}
                          value={values.email}
                          onChangeText={(e) =>
                            handleChange("email")(e.toLowerCase())
                          }
                          error={errors.email}
                          returnKeyType={"next"}
                          autoCapitalize="none"
                          onSubmitEditing={() => ref_to_input2.current.focus()}
                          keyboardType={
                            Platform.OS === "android"
                              ? "visible-password"
                              : undefined
                          }
                          secureTextEntry={
                            Platform.OS === "android" ? true : false
                          }
                          wrapperStyle={{ marginTop: 10 }}
                        />
                      )}

                      {loginInputType === LOGIN_INPUT_TYPES.phone && (
                        // <Input
                        //   initialValue={values.phone}
                        //   onChangePhoneNumber={handleChange("phone")}
                        //   error={errors.phone}
                        //   returnKeyType={"next"}
                        //   onSubmitEditing={() => ref_to_input2.current.focus()}
                        //   label={t("ContactUs.mobileNumber")}
                        //   placeholder={t("Login.yourPhone")}
                        //   disableInputRtl
                        //   wrapperStyle={{ marginTop: 10 }}
                        // />

                        <PhoneInput
                         label={t("ContactUs.mobileNumber")}
                         value={values.phone}
                         error={errors.phone}
                         onChange={handleChange("phone")}
                         defaultPhoneSchema={"+974"}
                       />
                      )}

                      <Input
                          isLogin={true}
                        label={t("Login.password")}
                        placeholder={t("Login.passwordPlaceholder")}
                        secureTextEntry={true}
                        innerRef={ref_to_input2}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        error={
                          isLoginError
                            ? t("Login.somethingWrong")
                            : errors.password
                        }
                        returnKeyType={"next"}
                        onSubmitEditing={Keyboard.dismiss}
                        wrapperStyle={{ marginTop: 20 }}
                      />

                      <View
                        style={[styles.horizontalBlock, getFlexDirection()]}
                      >
                        <SaveMe
                          isActive={isRememberMeActive}
                          onChange={handleSaveMeChange}
                        />

                        <TouchableOpacity
                          onPress={() => navigation.navigate("ForgotPassword")}
                          style={[
                            styles.forgotPasswordBtn,
                            {
                              borderBottomColor: isDark
                                ? colors.darkGrey
                                : colors.darkBlue,
                            },
                          ]}
                        >
                          <TypographyText
                            title={t("Login.forgotPassword")}
                            textColor={
                              isDark ? "white" : colors.mainDarkModeText
                            }
                            size={14}
                            font={LUSAIL_REGULAR}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.bottom}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("RegCodeVerification")
                          }
                          style={styles.link}
                        >
                          <TypographyText
                            title={t("Login.register")}
                            textColor={
                              isDark
                                ? colors.mainDarkMode
                                : colors.mainDarkModeText
                            }
                            size={14}
                            font={LUSAIL_REGULAR}
                            style={{ fontWeight: "700" }}
                          />
                        </TouchableOpacity>
                      </View>

                      <CommonButton
                        onPress={handleSubmit}
                        label={t("Login.login")}
                        loading={loginLoading}
                        textColor={colors.white}
                        style={styles.loginBtn}
                      />
                      <ContinueAsGuestBtn />
                    </>
                  );
                }}
              </Formik>
            </View>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </TouchableOpacity>
      <TopCircleShadow />
    </AuthLayout>
  );
};

const styles = {
  logoWrapper: {
    alignItems: "center",
    width: "100%",
    marginTop: 100,
  },
  goldShadeWrapper: {
    width: 500,
    height: 500,
    borderRadius: 250,
    position: "absolute",
    right: -200,
    top: -220,
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
  bg: {
    position: "absolute",
    left: "5%",
    right: "5%",
    top: 0,
    width: "100%",
  },
  bottom: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  link: {
    paddingVertical: 5,
  },
  logo: {
    width: 250,
    height: 150,
  },
  emtiyazWhiteLogo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  logo2: {},
  formikWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
  },
  bgtop: {
    width: "100%",
    height: "50%",
    position: "absolute",
    top: "0%",
    zIndex: -10,
  },
  horizontalBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  firstInput: {
    marginTop: 20,
  },
  loginBtn: {
    marginTop: 25,
  },
  forgotPasswordBtn: {
    borderBottomWidth: 1,
  },
};

const mapStateToProps = (state) => ({
  isLoginError: state.authReducer.isLoginError,
  token: state.authReducer.token,
  isUserJustLogOut: state.authReducer.isUserJustLogOut,
  loginLoading: state.authReducer.loginLoading,
});

export default connect(mapStateToProps, { login })(Login);
