import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../components/colors";
import { SCREEN_HEIGHT } from "../../styles/mainStyles";
import { connect } from "react-redux";
import { getMerchantList } from "../../redux/merchant/merchant-thunks";
import { useTranslation } from "react-i18next";
import { setMerchants } from "../../redux/merchant/merchant-actions";
import MainLayout from "../../components/MainLayout";
import { useTheme } from "../../components/ThemeProvider";
import NewMerchants from "../../components/NewMerchants";
import { getMerchantDetails } from "../../redux/merchant/merchant-thunks";
import Header from "../../components/Header";
const NewMerchantsPage = ({
  route,
  getMerchantList,
  navigation,
  getMerchantDetails,
}) => {
  const { t, i18n } = useTranslation();
  let params = route?.params;
  const canGetMoreDataRef = useRef(true);
  const { isDark } = useTheme();

  const categoryId = params?.selectedCategoryId;

  useEffect(() => {
    canGetMoreDataRef.current = true;

    getMerchantList({
      page: 1,
      category: categoryId,
      filters: params?.filters,
      onGetData: (dataLength, limit) => {
        if (dataLength !== limit) {
          canGetMoreDataRef.current = false;
        }
      },
    });
  }, [categoryId, params?.filters]);

  return (
    <MainLayout
      outsideScroll={true}
      headerChildren={
        <Header label={t("MainScreen.localClients")}
          btns={["back"]}
          additionalBtnsProps={{
            back: {
              onPress: () => {
                navigation.navigate("Main");
              },
            },
          }}
          />
      }
      headerHeight={50}
      contentStyle={styles.contentStyle}
      style={{ backgroundColor: isDark ? colors.darkBlue : colors.white }}
    >
      <NewMerchants
        style={styles.clients}
        isDark={isDark}
        title={t("MainScreen.localClients")}
        onPress={(merchantId) => {
          getMerchantDetails(
            merchantId,
            navigation,
            t,
            t("MainScreen.localClient")
          );
        }}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    marginVertical: 30,
  },
  categoryWrapper: {
    marginTop: 16,
  },
  contentStyle: {
    height: SCREEN_HEIGHT, //- 120,
    paddingHorizontal: 20,
  },
  contentContainerStyle: {
    paddingBottom: 60,
    flexGrow: 1,
  },
  categoryTouchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  clients: {
    paddingBottom: 180,
  },
});

const mapStateToProps = (state) => ({
  organizations: state.merchantReducer.organizations,
});

export default connect(mapStateToProps, {
  getMerchantList,
  setMerchants,
  getMerchantDetails,
})(NewMerchantsPage);
