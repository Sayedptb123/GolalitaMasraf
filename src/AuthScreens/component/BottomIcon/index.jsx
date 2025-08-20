import { StyleSheet, View, Image } from "react-native";
import { useTheme } from "../../../components/ThemeProvider";
import { colors } from "../../../components/colors";

const goldredMoi = require("../../../assets/goldredmoi.png");
const goldredMoidark = require("../../../assets/goldredmoidark.png");

const BottomIcon = () => {
  const { isDark } = useTheme();

  return (
    <View style={[{ alignItems: "center" }]}>
      <Image
        source={isDark ? goldredMoidark : goldredMoi}
        style={styles.logo2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo2: {
    // width: 120,
    // height: 120,
  },
});

export default BottomIcon;
