import { useEffect } from "react";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/mainStyles";
import { StyleSheet, View, Modal, Image, Platform } from "react-native";
import RNBootSplash from "react-native-bootsplash";

const SplashScreenModal = ({ isVisible }) => {
  useEffect(() => {
    if (Platform.OS === "android") {
      RNBootSplash.hide({ fade: true });
    }
  }, []);

  const logo = Platform.OS === "ios" 
    ? require("../../assets/sjc.gif")
    : { uri: "golalita" };

  return (
    <Modal
      animationType="none"
      transparent={false}
      visible={isVisible}
      style={styles.main}
    >
      <View style={styles.main}>
        <Image source={logo} style={styles.image} resizeMode="stretch" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

export default SplashScreenModal;
