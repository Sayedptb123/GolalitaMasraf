import { SafeAreaView, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import { useTheme } from "../../components/ThemeProvider";
import { useTranslation } from "react-i18next";
import { colors } from "../../components/colors";
import FullScreenLoader from "../../components/Loaders/FullScreenLoader";

const PrivacyPolicy = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

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
          style={{ backgroundColor: isDark ? colors.darkBlue : undefined }}
        />
        <WebView
          startInLoadingState
          source={{
            uri: "https://golalita.com/privacy-policy/Masraf-Al-Rayan-Rewards",
          }}
          style={styles.webView}
          renderLoading={() => <FullScreenLoader />}
        />
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
});

export default PrivacyPolicy;
