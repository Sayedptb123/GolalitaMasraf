import React, { useCallback, useState, useRef } from "react";
import {
  Keyboard,
  Platform,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import i18next from "i18next";
import { colors } from "../../components/colors";
import Input from "../../components/Input/Input";
import { mainStyles, SCREEN_HEIGHT } from "../../styles/mainStyles";
import { TypographyText } from "../../components/Typography";
import { LUSAIL_REGULAR } from "../../redux/types";
import { Formik } from "formik";
import * as Yup from "yup";
import CommonButton from "../../components/CommonButton/CommonButton";
import { useTheme } from "../../components/ThemeProvider";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { verifyMoiCode } from "../../redux/auth/auth-thunks";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";
import FormikDateSelect from "../../components/Formik/FormikDateSelect";

const RegCodeVerification = ({ route, navigation, verifyMoiCode }) => {
  let params = route.params;
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const ref_to_input3 = useRef(null);

  const toLogin = useCallback(() => {
    navigation.navigate("Login");
  }, []);

  const getDateStringPayload = (date) => {
    if (!date?.getFullYear) return "";
    console.log(
      "ffff",
      `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
    );
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <MainLayout
      outsideScroll={true}
      headerChildren={<Header label={""} btns={["back"]} />}
      headerHeight={50}
      contentStyle={{ flex: 1 }}
      style={{ backgroundColor: isDark ? colors.darkBlue : colors.white }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}
        >
          <View
            style={[
              mainStyles.centeredRow,
              { marginTop: 30, flexDirection: "column" },
            ]}
          >
            <TypographyText
              title={t("Login.enterRegisterCode")}
              textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
              size={23}
              font={LUSAIL_REGULAR}
              style={[
                mainStyles.centeredText,
                { marginTop: 30, paddingHorizontal: 50, fontWeight: "700" },
              ]}
            />

            <TypographyText
              title={t("Login.registerCodeHint")}
              textColor={isDark ? colors.darkGrey : colors.darkGrey}
              size={16}
              font={LUSAIL_REGULAR}
              style={[
                mainStyles.centeredText,
                { marginTop: 5, paddingHorizontal: 50, fontWeight: "700" },
              ]}
            />
          </View>
          <View style={[mainStyles.p20, { marginTop: 20, flex: 1 }]}>
            <Formik
              initialValues={{
                registration_code: "",
                qidExpiry: "",
              }}
              onSubmit={(values, { setFieldError }) => {
                verifyMoiCode(
                  {
                    params: {
                      activationCode: values.registration_code,
                      idCardExpDate: getDateStringPayload(values.qidExpiry),
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
                registration_code: Yup.string().required(t("Login.required")),
                qidExpiry: Yup.string().required(t("Login.required")),
              })}
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
                    <Input
                      innerRef={ref_to_input3}
                      placeholder={t("Login.code")}
                      value={values.registration_code}
                      onChangeText={handleChange("registration_code")}
                      error={errors.registration_code}
                      returnKeyType={"next"}
                      wrapperStyle={{ marginBottom: 10 }}
                    />

                    <FormikDateSelect
                      name="qidExpiry"
                      placeholder={t("Login.qidExpDate")}
                      error={errors.qidExpiry}
                    />

                    <View style={{ marginTop: 50 }}>
                      <CommonButton
                        onPress={handleSubmit}
                        label={t("Login.verify")}
                        textColor={
                          isDark ? colors.mainDarkModeText : colors.white
                        }
                      />

                      <TouchableOpacity style={styles.bottom} onPress={toLogin}>
                        <TypographyText
                          title={t("Login.haveAccount")}
                          textColor={isDark ? colors.mainDarkMode : colors.grey}
                          size={14}
                          font={LUSAIL_REGULAR}
                        />

                        <View style={styles.link}>
                          <TypographyText
                            title={t("Login.login")}
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
                  </>
                );
              }}
            </Formik>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  contentHeight: {
    height: SCREEN_HEIGHT - 120,
  },
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

export default connect(null, { verifyMoiCode })(RegCodeVerification);
