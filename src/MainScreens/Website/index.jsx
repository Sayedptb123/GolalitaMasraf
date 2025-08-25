import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, View } from "react-native";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import { colors } from "../../components/colors";
import { useTheme } from "../../components/ThemeProvider";
import WebView from "react-native-webview";

const Website = (props) => {
  const { isDark } = useTheme();
  const navigation = useNavigation();

  let params = props.route?.params;

  const handleBackPress = () => {
    navigation.goBack ? navigation.goBack() : navigation.navigate("Main");
  };

  console.log(params.url, "params.url");
  const handleNavigationChange = (navState) => {
    console.log("navState onNavigationStateChange:", navState);
    const { url } = navState;
  
    if (url.startsWith("https://masrafpaystatus.com/")) {
      console.log("URL intercepted in onNavigationStateChange:", url);
    navigation.navigate("myVouchers", {
      screen: "myVouchers-list",
    })
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.darkBlue : colors.white,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <CommonHeader
          isWhite={isDark}
          label={params.title}
          onBackPress={handleBackPress}
          style={{ backgroundColor: isDark ? colors.darkBlue : undefined }}
        />

        <WebView
          source={{
            uri: params.url,
          }}
          startInLoadingState={true}
          allowUniversalAccessFromFileURLs={true}
          javaScriptEnabled={true}
          mixedContentMode={"always"}
          style={{ flex: 1 }}
          onNavigationStateChange={handleNavigationChange}
        />
      </SafeAreaView>
    </View>
  );
};

export default Website;
