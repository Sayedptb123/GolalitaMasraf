import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import i18next from "i18next";
import { colors } from "../components/colors";
import Logo from "../assets/logo.svg";
import { getPixel, mainStyles, SCREEN_HEIGHT } from "../styles/mainStyles";
import { TypographyText } from "../components/Typography";
import { LUSAIL_REGULAR } from "../redux/types";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input/Input";
import CommonButton from "../components/CommonButton/CommonButton";
import { useTheme } from "../components/ThemeProvider";
import { useTranslation } from "react-i18next";
import ModalInfo from "../components/ModalInfo/ModalInfo";
import { connect } from "react-redux";
import { sendOTP, sendOTPEmail } from "../redux/auth/auth-thunks";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { phoneRegExp } from "../../utils";
import TwoButtons from "../components/TwoButtons/TwoButtons";
import BackSvg from "../assets/back_white.svg";
import { sized } from "../Svg";
import PhoneInput from "../components/Form/PhoneInput";

const INPUT_TYPES = {
  email: "email",
  phone: "phone",
};

const ForgotPassword = ({ navigation, sendOTP, sendOTPEmail }) => {
  const [isSuccessSend, setIsSuccessSend] = useState(false);

  const [inputType, setInputType] = useState(INPUT_TYPES.email);
  const { isDark } = useTheme();
  const BackIcon = sized(
    BackSvg,
    22,
    22,
    isDark ? colors.white : colors.darkBlue
  );
  const { t } = useTranslation();

  let validationSchema;

  if (inputType === INPUT_TYPES.email) {
    validationSchema = Yup.object({
      email: Yup.string().required(t("Login.required")),
    });
  }

  if (inputType === INPUT_TYPES.phone) {
    validationSchema = Yup.object({
      phone: Yup.string()
        .matches(phoneRegExp, t("Login.invalidPhone"))
        .required(t("Login.required")),
    });
  }

  const handleSubmit = ({ phone, email }, { setFieldError }) => {
    if (inputType === INPUT_TYPES.email) {
      sendOTPEmail(email, setFieldError);

      return;
    }

    sendOTP({ phone }, {}, false, navigation, setFieldError, t, true);
  };

  return (
    <>
      {isSuccessSend && (
        <ModalInfo
          isSuccess={true}
          onCancel={() => {
            setIsSuccessSend(false);
            navigation.goBack();
          }}
          onSubmit={() => {
            setIsSuccessSend(false);
            navigation.goBack();
          }}
          title={t("Login.emailSent")}
          description={t("Login.linkSentOnEmail")}
        />
      )}
      <View
        scrollEnabled={Platform.OS === "android"}
        style={{
          backgroundColor: isDark ? colors.darkBlue : colors.bg,
          height: SCREEN_HEIGHT,
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={{ transform: [], padding: 11 }}
              onPress={navigation.goBack}
            >
              <BackIcon />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={Keyboard.dismiss}
              style={{ flex: 1 }}
            >
              <View style={styles.goldShadeWrapper}></View>
              {/* <BackgroundSvg style={styles.bg} /> */}
              <View
                style={[
                  mainStyles.centeredRow,
                  { marginTop: getPixel(10), flexDirection: "column" },
                ]}
              >
                <View style={styles.logo}>
                  <Logo
                    color={isDark ? colors.mainDarkMode : colors.darkBlue}
                  />
                </View>
                <TypographyText
                  title={t("Login.pleaseEnterData")}
                  textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
                  size={18}
                  font={LUSAIL_REGULAR}
                  style={[
                    mainStyles.centeredText,
                    mainStyles.p20,
                    { fontWeight: "700" },
                  ]}
                />
              </View>

              <View style={[mainStyles.p20, { marginTop: getPixel(7) }]}>
                <Formik
                  initialValues={{
                    phone: "+974",
                    email: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    submitCount,
                    setFieldValue,
                  }) => {
                    errors = submitCount > 0 ? errors : {};

                    return (
                      <>
                        <TwoButtons
                          isLight={!isDark}
                          selectedButton={
                            inputType === INPUT_TYPES.email ? 0 : 1
                          }
                          onPress1={() => {
                            if (inputType !== INPUT_TYPES.email) {
                              setInputType(INPUT_TYPES.email);
                              handleChange("phone")("");
                            }
                          }}
                          onPress2={() => {
                            if (inputType !== INPUT_TYPES.phone) {
                              setInputType(INPUT_TYPES.phone);
                              handleChange("email")("");
                              setFieldValue("phone", "+974");
                            }
                          }}
                          label1={t("Login.email")}
                          label2={t("Login.phone")}
                        />
                        {inputType === INPUT_TYPES.phone && (
                          <PhoneInput
                            placeholder={t("Login.yourPhone")}
                            value={values.phone}
                            error={errors.phone}
                            onChange={handleChange("phone")}
                            defaultPhoneSchema={"+974"}
                            wrapperStyle={{ marginTop: 17 }}
                            disableInputRtl
                          />
                        )}

                        {inputType === INPUT_TYPES.email && (
                          <Input
                            // label={t("Login.email")}
                            placeholder={t("Login.emailPlaceholder")}
                            value={values.email}
                            onChangeText={(e) =>
                              handleChange("email")(e.toLowerCase())
                            }
                            error={errors.email}
                            returnKeyType={"next"}
                            autoCapitalize="none"
                            wrapperStyle={
                              {
                                //marginBottom: 60
                                // backgroundColor:'green'
                              }
                            }
                            keyboardType={
                              Platform.OS === "android"
                                ? "visible-password"
                                : undefined
                            }
                            secureTextEntry={
                              Platform.OS === "android" ? true : false
                            }
                          />
                        )}
                        <CommonButton
                          onPress={handleSubmit}
                          label={t("OnBoarding.next")}
                          style={{ marginTop: 40 }}
                          textColor={isDark ? colors.black : colors.white}
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
    </>
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
    width: "100%",
    alignItems: "center",
    marginTop: getPixel(25),
  },
  link: {
    paddingVertical: 5,
  },
  logo: {
    height: "30%",
  },
  goldShadeWrapper: {
    width: 500,
    height: 500,
    borderRadius: 250,
    // paddingTop: 100,
    // paddingBottom: 85,
    //backgroundColor: "#DDBD6B",
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
};

export default connect(null, { sendOTP, sendOTPEmail })(ForgotPassword);
