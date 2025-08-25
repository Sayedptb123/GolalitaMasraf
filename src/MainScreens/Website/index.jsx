import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, View,BackHandler } from "react-native";
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
  
    if (url.startsWith("https://emtiazpaystatus.com/")) {
      console.log("URL intercepted in onNavigationStateChange:", url);
    navigation.navigate("myVouchers", {
      screen: "myVouchers-list",
    })
      // // Extract values from the URL manually
      // const getQueryParams = (queryString) => {
      //   const params = {};
      //   const pairs = queryString.split("&");
  
      //   pairs.forEach((pair) => {
      //     const [key, value] = pair.split("=");
      //     params[key] = decodeURIComponent(value || "");
      //   });
  
      //   return params;
      // };
  
      // const queryString = url.split("?")[1];
      // if (queryString) {
      //   const queryParams = getQueryParams(queryString);
      //   console.log("Extracted values:");
      //   console.log("ID:", queryParams.id);
      //   console.log("Status ID:", queryParams.statusId);
      //   console.log("Status:", queryParams.status);
      //   console.log("Transaction ID:", queryParams.transId);
      //   console.log("Custom1:", queryParams.custom1);
      // }
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
