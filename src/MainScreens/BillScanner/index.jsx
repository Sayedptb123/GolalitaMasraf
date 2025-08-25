import { useTranslation } from "react-i18next";
import MainLayout from "../../components/MainLayout";
import {
  Dimensions,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native";
import Input from "../../components/Input/Input";
import { Formik } from "formik";
import Header from "../../components/Header";
import { SCREEN_HEIGHT } from "../../styles/mainStyles";
import * as Yup from "yup";
import CommonButton from "../../components/CommonButton/CommonButton";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/auth/auth-selectors";
import { saveBill } from "../../api/merchants";
import AsyncFormikMerchantSelect from "./componets/AsyncFormikMerchantSelect";
import FormikCameraPicker from "./componets/FormikCameraPicker";
import FormikDatePickers from "./componets/FormikDatePickers";
import FormikTextInput from "../../components/Formik/FormikTextInput";
import FullScreenLoader from "../../components/Loaders/FullScreenLoader";
import { showMessage } from "react-native-flash-message";
import { useState } from "react";
import { getCurrentLocation, requestLocationPermission } from "../../helpers";

const BillScanner = ({ navigation }) => {
  const { t } = useTranslation();
  const user = useSelector(userSelector);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values, "values");
    try {
      const status = await requestLocationPermission();

      if (status !== "granted") {
        showMessage({
          type: "danger",
          message: typeof err === "string" ? err : t("General.error"),
        });

        setTimeout(() => {
          if (Platform.OS === "ios") {
            Linking.openURL("app-settings:");
            return;
          }
          Linking.openSettings();
        }, 3000);
      }

      const location = await getCurrentLocation();

      if (!location) {
        throw "You need to allow location permission";
      }

      const geo_latitude = location?.coords?.latitude;
      const geo_longitude = location?.coords?.longitude;

      if (!geo_latitude || !geo_longitude) {
        throw "You need to allow location permission";
      }

      setLoading(true);

      const params = {
        customer_name: user.name,
        customer_id: user.partner_id,
        customer_phone: user.phone,
        customer_email: user.email,
        total_bill_amount: +values.total_bill_amount,
        merchant_name: values.merchant_name,
        date: values.date,
        time: values.time,
        discount: +values.discount,
        bill_image: values.bill_image,
        geo_latitude: geo_latitude,
        geo_longitude: geo_longitude,
      };

      const res = await saveBill(params);

      if (!res || res?.status === "error") {
        throw res?.message;
      }

      showMessage({
        type: "success",
        message: t("BillScanner.saveSuccess"),
      });

      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    } catch (err) {
      console.log(err, "err");
      showMessage({
        type: "danger",
        message: typeof err === "string" ? err : t("General.error"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MainLayout
        outsideScroll={true}
        headerHeight={0}
        headerChildren={<Header label={t("Drawer.scanBill")} btns={["back"]} />}
        contentStyle={{ height: SCREEN_HEIGHT - 120, padding: 20 }}
      >
        <Formik
          initialValues={{
            name: user.name,
            phone: user?.phone,
            email: user?.email,
            discount: undefined,
            total_bill_amount: undefined,
            merchant_name: "",
            bill_image: "",
            date: "",
            time: "",
          }}
          validationSchema={Yup.object({
            bill_image: Yup.string().required(t("Login.required")),
            merchant_name: Yup.string().required(t("Login.required")),
            discount: Yup.number()
              .required(t("Login.required"))
              .notOneOf([0], t("Login.required")),
            total_bill_amount: Yup.number()
              .required(t("Login.required"))
              .notOneOf([0], t("Login.required")),
            date: Yup.string().required(t("Login.required")),
            time: Yup.string().required(t("Login.required")),
          })}
          onSubmit={handleSubmit}
        >
          {({ values, handleSubmit, errors, submitCount }) => {
            errors = submitCount > 0 ? errors : {};

            return (
              <>
                <ScrollView
                  style={{ marginBottom: 10 }}
                  showsVerticalScrollIndicator={false}
                >
                  <TouchableOpacity activeOpacity={1}>
                    <View style={{ marginTop: 20, marginHorizontal: 4 }}>
                      <AsyncFormikMerchantSelect />

                      <FormikCameraPicker />

                      <FormikDatePickers />

                      <FormikTextInput
                        label={t("BillScanner.discountLabel")}
                        value={values.discount}
                        returnKeyType={"next"}
                        keyboardType="numeric"
                        wrapperStyle={{ marginBottom: 20 }}
                        name="discount"
                        error={errors?.["discount"]}
                      />

                      <FormikTextInput
                        label={t("BillScanner.amountLabel")}
                        value={values.total_bill_amount}
                        returnKeyType={"next"}
                        keyboardType="numeric"
                        wrapperStyle={{ marginBottom: 20 }}
                        name="total_bill_amount"
                        error={errors?.["total_bill_amount"]}
                      />

                      <Input
                        label={t("BillScanner.userNameLabel")}
                        value={values.name}
                        returnKeyType={"next"}
                        wrapperStyle={{ marginBottom: 20 }}
                      />
                      {values.phone && (
                        <Input
                          label={t("BillScanner.userPhone")}
                          value={values.phone}
                          returnKeyType={"next"}
                          wrapperStyle={{ marginBottom: 20 }}
                        />
                      )}

                      {values.email && (
                        <Input
                          label={t("BillScanner.userEmailLabel")}
                          value={values.email}
                          returnKeyType={"next"}
                          wrapperStyle={{ marginBottom: 20 }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>

                  <CommonButton
                    onPress={handleSubmit}
                    label={t("BillScanner.save")}
                  />
                </ScrollView>
              </>
            );
          }}
        </Formik>
      </MainLayout>
      {loading && <FullScreenLoader style={styles.loader} />}
    </>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default BillScanner;
