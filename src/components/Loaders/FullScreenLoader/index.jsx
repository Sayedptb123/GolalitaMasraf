import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { colors } from "../../colors";
import { useTheme } from "../../ThemeProvider";

const FullScreenLoader = (props) => {
  const { isDark } = useTheme();

  if (props.absolutePosition) {
    return (
      <View style={[styles.absoluteWrapper, props?.style]}>
        <ActivityIndicator
          color={isDark ? colors.mainDarkMode : colors.darkBlue}
        />
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, props?.style]}>
      <ActivityIndicator
        color={isDark ? colors.mainDarkMode : colors.darkBlue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteWrapper: {
    position: "absolute",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default FullScreenLoader;
