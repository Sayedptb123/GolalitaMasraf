import React, { useRef } from "react";
import { Keyboard, SafeAreaView, TouchableOpacity, View } from "react-native";
import { colors } from "../../components/colors";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import { sized } from "../../Svg";
import MacDonaldsSvg from "../../assets/macdonalds.svg";
import Input from "../../components/Input/Input";
import CommonButton from "../../components/CommonButton/CommonButton";
import { mainStyles } from "../../styles/mainStyles";
import { useTheme } from "../../components/ThemeProvider";
import { connect, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/auth-thunks";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { merchantApi } from "../../redux/merchant/merchant-api";
import { showMessage } from "react-native-flash-message";
import i18next from "i18next";
import { setProfileLoading } from "../../redux/auth/auth-actions";
import Header from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MacDonaldsIcon = sized(MacDonaldsSvg, 38, 30);

const ChangePassword = ({ user, profileLoading }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const ref_to_input2 = useRef();
  const ref_to_input3 = useRef();
  const dispatch = useDispatch();

  if (!user?.name) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={Keyboard.dismiss}
      style={{
        backgroundColor: isDark ? colors.darkBlue : colors.white,
        flex: 1,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          label={t("Profile.changePassword")}
          btns={["back", "notifications"]}
        />

        <Formik
          initialValues={{
           // oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={Yup.object({
           // oldPassword: Yup.string().required(t("Login.required")),
            newPassword: Yup.string().required(t("Login.required")),
            confirmNewPassword:  Yup.string().oneOf(
              [Yup.ref("newPassword"), null],
              t("Login.passwordsMustMatch"))

          })}
          onSubmit={async (values, { setFieldError }) => {
            console.log("changePassword starts:")
            // if (values.newPassword !== values.confirmNewPassword) {
            //   setFieldError(
            //     "confirmNewPassword",
            //     t("Profile.passwordNotEqual")
            //   );

            //   return;
            // }

            try {
              dispatch(setProfileLoading(true));

              const token = await AsyncStorage.getItem("token");
              const res = await merchantApi.changePassword({
                params: {
                  login: user.email,
                  token: token,
                 // password: values.oldPassword,
                  new_password: values.newPassword,
                },
              });
      console.log("changePassword res.data:",res.data)
              if (res.data.result.error) {
                throw "err";
              }

              showMessage({
                message: t("Login.loginWithNewPassword"),
                type: "success",
              });

              dispatch(logout());
            } catch (err) {
              setFieldError("oldPassword", t("Profile.wrongPassword"));
            } finally {
              dispatch(setProfileLoading(false));
            }
          }}
        >
          {({ values, handleChange, handleSubmit, errors, submitCount }) => {
            errors = submitCount > 0 ? errors : {};
            return (
              <View
                style={[
                  {
                    flex: 1,
                    justifyContent: "space-between",
                    marginBottom: 30,
                  },
                ]}
              >
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={[mainStyles.p20, { marginTop: 20 }]}
                  >
                    {/* <Input
                      label={t("Profile.oldPassword")}
                      value={values.oldPassword}
                      onChangeText={handleChange("oldPassword")}
                      placeholder={t("Profile.enterOldPassword")}
                      returnKeyType={"next"}
                      error={errors.oldPassword}
                      onSubmitEditing={() => ref_to_input2.current.focus()}
                      wrapperStyle={mainStyles.mb20}
                      autoCorrect={false}
                      secureTextEntry={true}
                    /> */}
                    <Input
                      error={errors.confirmNewPassword}
                      value={values.newPassword}
                      onChangeText={handleChange("newPassword")}
                      innerRef={ref_to_input2}
                      returnKeyType={"next"}
                      onSubmitEditing={() => ref_to_input3.current.focus()}
                      label={t("Profile.newPassword")}
                      placeholder={t("Profile.enterNewPassword")}
                      wrapperStyle={mainStyles.mb20}
                      autoCorrect={false}
                      secureTextEntry={true}
                    />
                    <Input
                      error={errors.confirmNewPassword}
                      innerRef={ref_to_input3}
                      value={values.confirmNewPassword}
                      onChangeText={handleChange("confirmNewPassword")}
                      label={t("Profile.confirmPassword")}
                      placeholder={t("Profile.confirmPassword")}
                      autoCorrect={false}
                      secureTextEntry={true}
                    />
                  </TouchableOpacity>
                </KeyboardAwareScrollView>
                <View style={mainStyles.p20}>
                  <CommonButton
                    onPress={handleSubmit}
                    label={t("Product.save")}
                    textColor={colors.white}
                    loading={profileLoading}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  profileLoading: state.authReducer.profileLoading,
});

export default connect(mapStateToProps, {})(ChangePassword);
