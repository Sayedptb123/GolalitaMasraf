import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

import { useState } from "react";
import { useTheme } from "../ThemeProvider";
import { colors } from "../colors";

const ImageWithLoader = (props) => {
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  return (
    <View style={props.style}>
      {loading && (
        <View style={[props.style, styles.loaderBlock]}>
          <ActivityIndicator
            color={isDark ? colors.mainDarkMode : colors.darkBlue}
          />
        </View>
      )}
      <Image
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderBlock: {
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageWithLoader;
