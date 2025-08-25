import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../components/ThemeProvider";
import { colors } from "../../../components/colors";

const AuthLayout = (props) => {
  const { isDark } = useTheme();

  const bgColor = isDark
    ? colors.darkBlue
    : props.light
    ? "#fff"
    : colors.white;

  return (
    <View style={[styles.wrapper, { backgroundColor: bgColor }]}>
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
