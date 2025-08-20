import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/mainStyles";
import { StyleSheet, View, Modal, Image } from "react-native";

const SplashScreenModal = ({ isVisible }) => {
  return (
    <Modal
      animationType="none"
      transparent={false}
      visible={isVisible}
      style={styles.main}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/sjc.gif")} style={styles.image} />
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
