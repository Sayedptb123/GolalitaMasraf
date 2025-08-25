import { SafeAreaView, StyleSheet, View, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import { useTheme } from "../../components/ThemeProvider";
import { useTranslation } from "react-i18next";
import { colors } from "../../components/colors";
import FullScreenLoader from "../../components/Loaders/FullScreenLoader";

import Pdf from "react-native-pdf";

const privacyLinks = {
  ar: "https://golalita.com/web/static/src/policyAr.pdf",
  en: "https://golalita.com/web/static/src/policyEng.pdf",
};

const PrivacyPolicy = () => {
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();

  const uri = privacyLinks[i18n.language];

  // Determine the PDF file based on the selected language
  const pdfSource =
    i18n.language === "ar"
      ? require("../../assets/contracts/policyAr.pdf")
      : require("../../assets/contracts/policyEng.pdf");
  return (
    <View
      style={[
        {
          backgroundColor: isDark ? colors.darkBlue : colors.white,
        },
        styles.fullScreen,
      ]}
    >
      <SafeAreaView style={styles.fullScreen}>
        <CommonHeader
          isWhite={isDark}
          label={t("Drawer.privacyPolicy")}
          style={{
            backgroundColor: isDark ? colors.darkBlue : undefined,
            marginTop: 26,
          }}
        />
        <Pdf
           source={{ uri: uri, cache: true }}
          onError={(error) => {
            console.log(error, "err");
            // setError(true);
          }}
          style={styles.pdf}
          renderActivityIndicator={() => {
            return <FullScreenLoader style={styles.loader} />;
          }}
          trustAllCerts={false}
        />
        {/* <WebView
          startInLoadingState
          source={{
            uri,
          }}
          style={styles.webView}
          renderLoading={() => <FullScreenLoader />}
        /> */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  fullScreen: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
  },
});

export default PrivacyPolicy;
