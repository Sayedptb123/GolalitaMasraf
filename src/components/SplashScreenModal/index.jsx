import { useEffect } from 'react';
import { StyleSheet, View, Modal, Image, Platform } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../styles/mainStyles';

const SplashScreenModal = ({ isVisible }) => {
  useEffect(() => {
    BootSplash.hide();
  }, []);

  const logo = require('../../assets/golalita.gif');

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
