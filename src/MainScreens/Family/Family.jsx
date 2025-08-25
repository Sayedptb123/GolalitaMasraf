import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import FamilyHeader from "./FamilyHeader";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { mainStyles } from "../../styles/mainStyles";
import { TypographyText } from "../../components/Typography";
import { colors } from "../../components/colors";
import { BALOO_BOLD, BALOO_MEDIUM, BALOO_REGULAR } from "../../redux/types";
import styles from "./styles";
import PlusSvg from "../../assets/plus.svg";
import { sized } from "../../Svg";
import Input from "../../components/Input/Input";
import CommonButton from "../../components/CommonButton/CommonButton";
import { useTheme } from "../../components/ThemeProvider";
import LinearGradient from "react-native-linear-gradient";
import PlusWhiteSvg from "../../assets/plus_white.svg";
import { connect } from "react-redux";
import {
  deleteFamilyMember,
  getFamilyMembers,
  transferAmount,
} from "../../redux/transactions/transactions-thunks";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { DialogWindow } from "../../components/DialogWindow/DialogWindow";
import ModalInfo from "../../components/ModalInfo/ModalInfo";
import { showMessage } from "react-native-flash-message";

const PlusIcon = sized(PlusSvg, 20, 20);
const PlusWhiteIcon = sized(PlusWhiteSvg, 20, 20);

const Family = ({
  navigation,
  deleteFamilyMember,
  getFamilyMembers,
  familyMembers,
  ...props
}) => {
  const [isDialogWindow, setIsDialogWindow] = useState(false);
  const [isSubmitSend, setIsSubmitSend] = useState(false);
  const [isSuccessSend, setIsSuccessSend] = useState(false);
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [selectedFamily, setSelectedFamily] = useState(null);
  useEffect(() => {
    getFamilyMembers();
  }, []);
  let items = [
    {
      name: t("Profile.deleteMember"),
      func: () => {
        deleteFamilyMember(selectedFamily.id);
        setIsDialogWindow(false);
        setSelectedFamily(null);
      },
      color: colors.red,
    },
    {
      name: t("Profile.editMember"),
      func: () => {
        navigation.navigate("AddFamilyMember", {
          isEdit: true,
          selectedFamily,
        });
        setIsDialogWindow(false);
        setSelectedFamily(null);
      },
    },
  ];
  const handleAddFamilyMember = () => {
    if (familyMembers?.length === 10) {
      showMessage({
        message: t("Family.membersLimitError"),
        type: "danger",
      });

      return;
    }

    navigation.navigate("AddFamilyMember");
  };

  return (
    <Formik
      initialValues={{
        amount: "",
        member: "",
      }}
      onSubmit={(values, { setFieldError, resetForm }) => {
        let member = values.member;
        let isAnyError = false;
        if (+props.user.available_points < values.amount) {
          isAnyError = true;
          setFieldError("amount", t("Family.notEnoughFunds"));
        }
        let foundedMember = familyMembers.find((m) => m.name === values.member);
        if (
          foundedMember === undefined &&
          !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
            values.member
          )
        ) {
          isAnyError = true;
          setFieldError("member", t("Family.memberNotFound"));
        } else if (foundedMember) {
          member = foundedMember.phone;
        }
        if (!isAnyError) {
          setIsSubmitSend(true);
        }
      }}
      validationSchema={Yup.object({
        amount: Yup.string().required(t("Login.required")),
        member: Yup.string().required(t("Login.required")),
      })}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        errors,
        submitCount,
        setFieldValue,
        setFieldError,
        resetForm,
      }) => {
        errors = submitCount > 0 ? errors : {};
        return (
          <>
            {isDialogWindow && (
              <DialogWindow
                items={items}
                isVisible={isDialogWindow}
                onCancel={() => {
                  setSelectedFamily(null);
                  setIsDialogWindow(false);
                }}
              />
            )}
            {isSubmitSend && (
              <ModalInfo
                title={t("Family.sendPoints")}
                description={t("Family.isSureSend", {
                  amount: values.amount,
                  name: values.member,
                })}
                onCancel={() => setIsSubmitSend(false)}
                onSubmit={() => {
                  let foundedMember = familyMembers.find(
                    (m) => m.name === values.member
                  );
                  let member = foundedMember.phone;
                  props.transferAmount(
                    {
                      points: values.amount,
                      phone: member,
                    },
                    setFieldError,
                    setIsSubmitSend,
                    setIsSuccessSend
                  );
                }}
              />
            )}
            {isSuccessSend && (
              <ModalInfo
                title={t("Family.successPoints")}
                description={t("Family.successSend", {
                  amount: values.amount,
                  name: values.member,
                })}
                isSuccess={true}
                onSubmit={() => {
                  setIsSuccessSend(false);
                  resetForm();
                  setSelectedFamily(null);
                }}
                onCancel={() => {
                  setIsSuccessSend(false);
                  resetForm();
                  setSelectedFamily(null);
                }}
              />
            )}
            <MainLayout headerChildren={<FamilyHeader />} headerHeight={150}>
              <View style={mainStyles.p20}>
                <TypographyText
                  textColor={isDark ? colors.white : colors.mainDarkModeText}
                  size={18}
                  font={BALOO_MEDIUM}
                  title={t("Family.selectMember")}
                  style={{ marginBottom: 20 }}
                />
                <>
                  <ScrollView
                    style={{ marginTop: 12, marginBottom: 28 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <TouchableOpacity
                      onPress={handleAddFamilyMember}
                      style={styles.family}
                    >
                      <LinearGradient
                        colors={
                          isDark
                            ? [colors.green, colors.lightGreen]
                            : [colors.darkBlue, colors.darkBlue]
                        }
                        style={[
                          styles.circleFamily,
                          { backgroundColor: colors.darkBlue },
                        ]}
                      >
                        {isDark ? <PlusWhiteIcon /> : <PlusIcon />}
                      </LinearGradient>
                      <TypographyText
                        textColor={
                          isDark ? colors.white : colors.mainDarkModeText
                        }
                        size={14}
                        font={BALOO_REGULAR}
                        title={`${t("Family.add")} ( ${
                          10 - familyMembers?.length
                        } ${t("Family.left")} )`}
                        style={{ marginTop: 3 }}
                      />
                    </TouchableOpacity>
                    {familyMembers.map((item, index) => (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedFamily(item);
                          setFieldValue("member", item.name);
                        }}
                        onLongPress={() => {
                          setSelectedFamily(item);
                          setIsDialogWindow(true);
                        }}
                        key={index}
                        style={[styles.family, { borderRadius: 50 }]}
                      >
                        <View
                          style={[
                            styles.circleFamily,
                            selectedFamily?.id === item.id && {
                              borderWidth: 2,
                              borderStyle: "solid",
                              borderColor: colors.green,
                              borderRadius: 50,
                            },
                          ]}
                        >
                          <Image
                            style={{ width: 64, height: 64, borderRadius: 50 }}
                            source={{ uri: item.image_url }}
                          />
                        </View>
                        <TypographyText
                          textColor={
                            isDark
                              ? selectedFamily?.id === item.id
                                ? colors.green
                                : colors.white
                              : selectedFamily?.id === item.id
                              ? colors.mainDarkModeText
                              : colors.mainDarkModeText
                          }
                          size={14}
                          font={BALOO_REGULAR}
                          title={item.name}
                          style={{ marginTop: 3 }}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  <Input
                    label={t("Family.amountTransfer")}
                    wrapperStyle={[
                      mainStyles.lightShadow,
                      { marginBottom: 50 },
                    ]}
                    style={{ textAlign: "center" }}
                    placeholder={`0 ${t("Family.amountTransfer")}`}
                    placeholderTextColor={
                      isDark ? colors.lightGrey : colors.darkBlue
                    }
                    keyboardType={"numeric"}
                    value={values.amount}
                    onChangeText={handleChange("amount")}
                    error={errors.amount}
                  />

                  <CommonButton
                    onPress={handleSubmit}
                    label={t("ContactUs.send")}
                    style={{ marginBottom: 30 }}
                  />
                </>
              </View>
            </MainLayout>
          </>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  familyMembers: state.transactionsReducer.familyMembers,
  user: state.authReducer.user,
});

export default connect(mapStateToProps, {
  getFamilyMembers,
  transferAmount,
  deleteFamilyMember,
})(Family);
