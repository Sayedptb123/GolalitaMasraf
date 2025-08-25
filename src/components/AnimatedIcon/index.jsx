import { Animated, View } from "react-native";
import CompassSvg from "../../assets/compass.svg";
import { useEffect } from "react";
import { sized } from "../../Svg";

const animation = new Animated.Value(0);
const Icon = ({ color }) => {
  const CompassSvgIcon = sized(CompassSvg, 24, 24);

  return (
    <View
      style={{
        width: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderColor: color,
          borderWidth: 1.5,
          borderRadius: 24,
        }}
      >
        <CompassSvgIcon color={color} />
      </View>
    </View>
  );
};

const AnimatedIcon = ({ animated = true, color }) => {
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
      <Icon color={color} />
    </Animated.View>
  );
};

export default AnimatedIcon;
