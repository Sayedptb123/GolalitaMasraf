import React, { useCallback, useRef, useState } from "react";
import {
  Image,
  Text,
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";

import i18next from "i18next";
import { colors } from "../../components/colors";
import { getPixel, mainStyles, SCREEN_HEIGHT } from "../../styles/mainStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TypographyText } from "../../components/Typography";
import { LUSAIL_REGULAR } from "../../redux/types";
import { Formik } from "formik";
import Input from "../../components/Input/Input";
import CommonButton from "../../components/CommonButton/CommonButton";
import { useTheme } from "../../components/ThemeProvider";
import { useTranslation } from "react-i18next";
import authApi from "../../redux/auth/auth-api";
import { getValidationSchema } from "./validation";
import ContinueAsGuestBtn from "../component/ContinueAsGuestBtn";
import AuthLayout from "../component/AuthLayout";
import { connect } from "react-redux";
import { register, validate_code, verifyEmail, verifyPhone } from "../../redux/auth/auth-thunks";
import BackBtn from "../../components/Btns/BackBtn";
import Confirmationcode from "../../components/Form/Confirmationcode";
import PhoneInput from "../../components/Form/PhoneInput";
import {useValidation} from "../../hooks/useValidation";
import { showMessage } from "react-native-flash-message";

import { useVerify } from "../../hooks/useVerify";
const Register = ({ route, navigation, register,validate_code }) => {
  const { isDark } = useTheme();
  const ref_to_input2 = useRef();
  const ref_to_input3 = useRef();
  const ref_to_input4 = useRef();
  const ref_to_input5 = useRef();
  const ref_to_input6 = useRef();

  let params = route?.params;
console.log("Register params:",params)
  const [isAgreed, setIsAgreed] = useState(false);
  const { getRegisterValidationSchema } = useValidation();
  const validation = getValidationSchema();
  const {
    generatedCode,
    onVerify,
    isModalVisible,
    setModalVisible,
    type,
    verifyHandler,
  } = useVerify(validate_code,verifyEmail,verifyPhone, t);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState("notverified");
  const [phoneVerified, setPhoneVerified] = useState("notverified");

  const language = i18n.language;
  const logo = isDark
    ? require("../../assets/horizontal_logo_white.png")
    : require("../../assets/horizontal_logo.png");

  const toLogin = useCallback(() => {
    navigation.navigate("Login");
  }, []);

  return (
    <AuthLayout light>
      <Formik
        initialValues={{
          name: params?.data?.firstNameEn,
          last_name: params?.data?.lastNameEn,
          login: "",
          email: params?.email || "",
          phone: "+974",
          password: "",
          repeatPassword: "",
        }}
        onSubmit={async (values, { setFieldError }) => {
          if (!isAgreed) {
            alert("Kindly Agree Terms & Conditions");
            return;
          }

          try {
            setLoading(true);

            const { name, last_name, email, phone } = values;

            const res = await authApi.checkEmail({
              params: { email },
            });

            if (res.data.result?.error) {
              setFieldError("email", t("Profile.emailExists"));
              throw "err";
            }

            const phoneRes = await authApi.checkPhone({
              params: { phone },
            });

            if (phoneRes.data.result?.error) {
              setFieldError("phone", t("Profile.phoneExists"));
              throw "err";
            }

            const registerBody = {
              name,
              last_name,
              email,
              phone,
              parent_id: "6603",
              password: values.password,
            };

            console.log("registerBodyregisterBody:", registerBody);
            register(registerBody);
          } catch (err) {
            console.log(err, "err");
            setLoading(false);
          }
        }}
        validationSchema={validation}
      >
        {({ values, handleChange, handleSubmit, errors, submitCount }) => {
          errors = submitCount > 0 ? errors : {};

          return (
            <View
              scrollEnabled={Platform.OS === "android"}
              style={{
                height: SCREEN_HEIGHT,
              }}
            >
              <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAwareScrollView
                  contentContainerStyle={styles.contentContainerStyle}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      Keyboard.dismiss();
                    }}
                    style={{ flex: 1 }}
                  >
                     <BackBtn onPress={()=>navigation?.goBack()} noTitle/>
                    <View
                      style={[
                        mainStyles.centeredRow,
                        { flexDirection: "column" },
                      ]}
                    >
                      <Image source={logo} style={styles.main_logo} />
                    </View>
                    <View style={[mainStyles.p20, { flex: 1 }]}>
                      <>
                        <View
                          style={{
                            flexDirection: "row",
                            flex: 1,
                          }}
                        >
                          <Input
                            label={t("Login.yourName")}
                            placeholder={t("Login.yourNamePlaceholder")}
                            value={values.name}
                            onChangeText={handleChange("name")}
                            error={errors.name}
                            returnKeyType={"next"}
                            onSubmitEditing={() =>
                              ref_to_input2.current.focus()
                            }
                            wrapperStyle={{
                              marginBottom: 12,
                              flex: 1,
                              marginRight: 20,
                            }}
                            //editable={false}
                            style={{ fontSize: 16 }}
                          />

                          <Input
                            label={t("Login.lastName")}
                            innerRef={ref_to_input2}
                            placeholder={t("Login.lastNamePlaceholder")}
                            value={values.last_name}
                            onChangeText={handleChange("last_name")}
                            error={errors.last_name}
                            returnKeyType={"next"}
                            onSubmitEditing={() =>
                              ref_to_input3.current.focus()
                            }
                            wrapperStyle={{
                              marginBottom: 12,
                              flex: 1,
                              marginLeft: 20,
                            }}
                            style={{ fontSize: 16 }}
                            //  editable={false}
                          />
                        </View>

                        {/* <Input
                          label={t("Login.cardNo")}
                          innerRef={ref_to_input4}
                          placeholder={t("Login.cardNo")}
                          value={values.cardNumber}
                          onChangeText={handleChange("last_name")}
                          error={errors.cardNumber}
                          returnKeyType={"next"}
                          onSubmitEditing={() => ref_to_input5.current.focus()}
                          wrapperStyle={{ marginBottom: 12 }}
                          //editable={false}
                          style={{ fontSize: 16 }}
                        /> */}

                        <Input
                          label={t("Login.email")}
                          placeholder={t("Login.emailPlaceholder")}
                          value={values.email}
                          onChangeText={(e) =>{
                            setEmailVerified("notverified"),
                            handleChange("email")(e.toLowerCase())
                          }}
                          editable={false}
                          innerRef={ref_to_input3}
                          error={errors.email}
                          returnKeyType={"next"}
                          autoCapitalize="none"
                          onSubmitEditing={() => ref_to_input4.current.focus()}
                          wrapperStyle={{ marginBottom: 12 }}
                          // keyboardType={
                          //   Platform.OS === "android"
                          //     ? "visible-password"
                          //     : undefined
                          // }
                          style={{ fontSize: 16 }}
                          //verified={values.email &&emailVerified}
                          //onPressNotVerified={() =>verifyHandler(validation, values, "email",false)}
                          />
                        <PhoneInput
                         label={t("ContactUs.mobileNumber")}
                         value={values.phone}
                         error={errors.phone}
                         onChange={handleChange("phone")}
                         defaultPhoneSchema={"+974"}
                         onChangeText={(e) => {
                           setPhoneVerified("notverified"),
                           handleChange("phone")(e.toLowerCase());
                         }}
                        // verified={values.phone.length > 4 && phoneVerified}
                         //onPressNotVerified={() =>verifyHandler(validation, values, "phone",false)}
                       />
                        {/* <Input
                          label={t("ContactUs.mobileNumber")}
                          placeholder={t("Login.yourPhone")}
                          initialValue={values.phone}
                          onChangePhoneNumber={handleChange("phone")}
                          innerRef={ref_to_input4}
                          error={errors.phone}
                          returnKeyType={"next"}
                          onSubmitEditing={() => ref_to_input5.current.focus()}
                          disableInputRtl
                          style={{ fontSize: 16, marginBottom: 12 }}
                        /> */}

                        <Input
                          label={t("Login.password")}
                          placeholder={t("Login.passwordPlaceholder")}
                          value={values.password}
                          onChangeText={handleChange("password")}
                          error={errors.password}
                          keyboardType={"ascii-capable"}
                          returnKeyType={"next"}
                          secureTextEntry={true}
                          innerRef={ref_to_input5}
                          onSubmitEditing={() => ref_to_input6.current.focus()}
                          style={{ fontSize: 16 }}
                          wrapperStyle={{ marginBottom: 12 }}
                        />
                        <Input
                          label={t("Profile.confirmPassword")}
                          placeholder={t("Login.confirmPasswordPlaceholder")}
                          innerRef={ref_to_input6}
                          value={values.repeatPassword}
                          onChangeText={handleChange("repeatPassword")}
                          error={errors.repeatPassword}
                          secureTextEntry={true}
                          returnKeyType={"next"}
                          onSubmitEditing={Keyboard.dismiss}
                          wrapperStyle={{ marginBottom: 12 }}
                          style={{ fontSize: 16 }}
                        />

                        <View
                          style={styles.bottom}
                          onPress={toLogin}
                        >
                          <TypographyText
                            title={t("Login.haveAccount")}
                            textColor={
                              isDark ? colors.white : colors.mainDarkModeText
                            }
                            size={14}
                            font={LUSAIL_REGULAR}
                          />

                          <TouchableOpacity style={styles.link}
                          onPress={toLogin}>
                            <TypographyText
                              title={t("Login.logIn")}
                              textColor={
                                isDark ? colors.mainDarkMode : colors.darkBlue
                              }
                              size={16}
                              style={[mainStyles.underline, { margin: 6 }]}
                              font={LUSAIL_REGULAR}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 16,
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: 11,
                              height: 22,
                              borderRadius: 6,
                              width: 22,
                              // padding: 1,
                              borderWidth: 2,
                              borderColor: isDark
                                ? colors.mainDarkMode
                                : colors.darkBlue,
                              overflow: "hidden",
                              // backgroundColor:'red'
                            }}
                            onPress={() => setIsAgreed(!isAgreed)}
                          >
                            {isAgreed ? (
                              <View
                                style={{
                                  //=flex: 1,
                                  width: "110%",
                                  height: "110%",
                                  //borderRadius: 6,
                                  //  overflow: "hidden",
                                }}
                              >
                                {isDark ? (
                                  <Image
                                    source={require("../../assets/Checkbox1.png")}
                                    style={[
                                      styles.logo,
                                      {
                                        tintColor: isDark
                                          ? colors.white
                                          : colors.darkBlue,
                                      },
                                    ]}
                                  />
                                ) : (
                                  <Image
                                    source={require("../../assets/Checkbox2.png")}
                                    style={[
                                      styles.logo,
                                      {
                                        tintColor: isDark
                                          ? colors.white
                                          : colors.darkBlue,
                                      },
                                    ]}
                                  />
                                )}
                              </View>
                            ) : (
                              <View
                                style={{
                                  backgroundColor: isDark
                                    ? colors.darkBlue
                                    : colors.white,
                                  flex: 1,
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: 6,
                                  overflow: "hidden",
                                }}
                              ></View>
                            )}
                          </TouchableOpacity>
                          {language == "ar" ? (
                            <TouchableOpacity
                              style={{ flex: 1, flexDirection: "row" }}
                              onPress={() => {
                                navigation.navigate("PrivacyPolicy");
                              }}
                            >
                              <Text style={{ color: "blue" }}>
                                {t("Profile.privacypPolicy")}
                              </Text>

                              <TouchableOpacity>
                                <Text
                                  style={{
                                    color: isDark
                                      ? colors.white
                                      : colors.mainDarkModeText,
                                    fontSize: 16,
                                  }}
                                >
                                  {t("Profile.agreeTo")}{" "}
                                </Text>
                              </TouchableOpacity>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={{ flex: 1, flexDirection: "row" }}
                            >
                              {console.log("languagelanguage:", language)}
                              <Text
                                style={{
                                  color: isDark
                                    ? colors.white
                                    : colors.mainDarkModeText,
                                }}
                              >
                                {t("Profile.agreeTo")}{" "}
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate("PrivacyPolicy");
                                }}
                              >
                                <Text
                                  style={{
                                    color: isDark
                                      ? colors.mainDarkMode
                                      : colors.darkBlue,
                                  }}
                                >
                                  {t("Profile.privacypPolicy")}
                                </Text>
                              </TouchableOpacity>
                            </TouchableOpacity>
                          )}
                        </View>

                        <CommonButton
                          onPress={handleSubmit}
                          label={t("Login.register")}
                          loading={loading}
                          textColor={colors.white}
                        />

                        <ContinueAsGuestBtn />
                      </>
                    </View>
                  </TouchableOpacity>
                </KeyboardAwareScrollView>
              <Confirmationcode
                      isModalVisible={isModalVisible}
                      method={type}
                      setModalVisible={setModalVisible}
                      setEmailVerified={setEmailVerified}
                      setPhoneVerified={setPhoneVerified}
                      generatedCode={generatedCode}
                      onVerify={onVerify}
                    />
              </SafeAreaView>
            </View>
          );
        }}
      </Formik>
    </AuthLayout>
  );
};

const styles = {
  bg: {
    position: "absolute",
    left: "5%",
    right: "5%",
    top: 0,
    width: "100%",
  },
  bottom: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  link: {
    paddingVertical: 5,
  },
  contentContainerStyle: {
    paddingBottom: 30,
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
  logo: {
    width: "100%",
    height: "100%",
    // borderRadius: 50,
    resizeMode: "contain",
    // marginTop: 16,
  },
  main_logo: {
    width: 250,
    height: 150,
    // borderRadius: 50,
    resizeMode: "contain",
  },
};

const mapStateToProps = (state) => ({
  loading: state.authReducer.loginLoading,
});

export default connect(mapStateToProps, { register,validate_code })(Register);
