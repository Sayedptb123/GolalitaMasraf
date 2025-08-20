import { StyleSheet, Dimensions, Image, View } from "react-native";
import { colors } from "../../../../components/colors";
import { useTheme } from "../../../../components/ThemeProvider";
import { BALOO_REGULAR } from "../../../../redux/types";
import { TypographyText } from "../../../../components/Typography";

const { width } = Dimensions.get("screen");

const cardWidth = width - 32;

const Card = ({ uri, name, style }) => {
  const { isDark } = useTheme();

  return (
    <View style={[styles.wrapper, style]}>
      <Image source={{ uri }} style={styles.image} resizeMode="stretch" />
      <TypographyText
        title={name}
        textColor={isDark ? colors.white : colors.darkBlue}
        size={18}
        font={BALOO_REGULAR}
        style={styles.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: cardWidth,
    height: cardWidth - 130,
    borderRadius: 8,
    backgroundColor: colors.lightGrey,
  },
  name: {
    marginTop: 6,
  },
});

export default Card;
