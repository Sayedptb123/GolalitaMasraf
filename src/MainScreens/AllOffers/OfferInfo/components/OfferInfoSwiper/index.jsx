import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import Swiper from "react-native-swiper";

const OfferInfoSwiper = ({ images, onImagePress }) => {
  return (
    <Swiper
      autoplay
      style={styles.swiper}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
      removeClippedSubviews={false}
    >
      {images.map((uri, index) => (
        <TouchableOpacity onPress={() => onImagePress(uri)} key={index}>
          <Image style={styles.image} source={{ uri }} resizeMode="stretch" />
        </TouchableOpacity>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  swiper: {
    maxHeight: 232,
  },
  image: {
    width: "100%",
    height: 230,
    borderRadius: 14,
  },
  dot: {},
  activeDot: {},
});

export default OfferInfoSwiper;
