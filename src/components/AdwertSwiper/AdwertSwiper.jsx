import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { colors } from "../colors";

const AdwertSwiper = (props) => {
  const { isDark, data, onBannerPress, style } = props;

  return (
    <View style={[styles.wrapper, style]}>
      <Swiper
        autoplay={true}
        autoplayTimeout={5}
        dot={<View style={styles.dot} />}
        activeDot={
          <View
            style={{
              ...styles.dot,
              backgroundColor: isDark ? colors.green : colors.darkBlue,
            }}
          />
        }
        removeClippedSubviews={false}
      >
        {data.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            onPress={() => onBannerPress(item)}
            style={styles.swiperItem}
          >
            <Image
              source={{ uri: item.banner_image }}
              style={styles.swiperImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 145,
    width: "100%",
  },
  swiperImage: {
    height: 145,
    width: "100%",
    borderRadius: 8,
  },
  swiperItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 50,
    backgroundColor: colors.white,
    marginHorizontal: 3,
  },
});

export default AdwertSwiper;
