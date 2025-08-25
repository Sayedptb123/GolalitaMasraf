import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../components/ThemeProvider";
import { colors } from "../../../components/colors";
import { ScrollView } from "react-native";

const AuthLayout = (props) => {
  const { isDark } = useTheme();

  const bgColor = isDark
    ? colors.darkModeBackground
    : props.light
    ? "#fff"
    : colors.white;

  return (
    <View
      style={[styles.wrapper, { backgroundColor: bgColor }]}
      bounces={false}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default AuthLayout;
