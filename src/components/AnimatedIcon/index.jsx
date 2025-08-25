import { Animated, View } from "react-native";
import CompassSvg from "../../assets/compass.svg";
import { useTheme } from "../ThemeProvider";
import { useEffect } from "react";
import { colors } from "../colors";

const animation = new Animated.Value(0);

const Icon = () => {
  const { isDark } = useTheme();

  const backgroundColor = isDark ? colors.mainDarkMode : colors.darkBlue;
  const iconColor = isDark ? colors.darkBlue :colors.white;

  return (
    <View
      style={{
        width: 25,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: backgroundColor,
          borderRadius: 22,
        }}
      >
        <CompassSvg color={iconColor} />
      </View>
    </View>
  );
};

const AnimatedIcon = ({ animated = true }) => {
  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["-90deg", "270deg"],
  });

  useEffect(() => {
    if (animated) {
      Animated.loop(
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        })
      ).start();
    }
  }, [animated]);

  return (
    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
      <Icon />
    </Animated.View>
  );
};

export default AnimatedIcon;
