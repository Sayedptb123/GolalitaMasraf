import { ActivityIndicator, StyleSheet } from "react-native";
import { getDistance } from "../../../../../../../utils";
import { useTheme } from "../../../../../../components/ThemeProvider";
import { TypographyText } from "../../../../../../components/Typography";
import useUserLocation from "../../../../../../hooks/useUserLocation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../../../components/colors";
import { View } from "react-native";

const Distance = ({ latitude, longitude }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const { requestLocation } = useUserLocation();
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(0);

  const countDistance = async () => {
    try {
      setLoading(true);
      const data = await requestLocation();

      const userLatitude = data.location.latitude;
      const userLongitude = data.location.longitude;

      if (userLatitude & userLongitude && latitude && longitude) {
        const distance = getDistance(
          latitude,
          longitude,
          userLatitude,
          userLongitude
        );

        if (distance) {
          setDistance(distance.toFixed(2));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    countDistance();
  }, [latitude, longitude]);

  if (!loading && !distance) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      {loading && (
        <ActivityIndicator
          color={isDark ? colors.mainDarkMode : colors.darkBlue}
        />
      )}
      {!loading && (
        <TypographyText
          title={`${distance} km`}
          textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
          size={14}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Distance;
