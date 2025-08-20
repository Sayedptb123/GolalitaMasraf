import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import ExpandedCategoryBlocks from "../../../../components/ExpandedCategoryBlocks";
import { useTheme } from "../../../../components/ThemeProvider";
import { B1G1 } from "../../../../redux/types";
import { StyleSheet } from "react-native";
import { getNewOffers } from "../../../../api/offers";
import { transformOffersData } from "./utils";
import { useNavigation } from "@react-navigation/native";
import { getOffsetAndLimit, getStringDate } from "../../../../../utils";

const { width } = Dimensions.get("screen");
const itemWidth = (width - 64) / 3;

const LIMIT = 6;

const FollowUs = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigation = useNavigation();
  const [data, setData] = useState(null);

  const pageRef = useRef(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewOffers({ ...getOffsetAndLimit(pageRef.current, LIMIT) })
      .then((newOffers) => setData(transformOffersData(newOffers)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handlePress = (offerId, parentId, offer) => {
    if (offer.x_offer_type === B1G1) {
      navigation.navigate("Promocode", {
        merchant_name: offer.merchant_name,
        name: offer.name,
        expiryDate: offer.end_date
          ? getStringDate(offer.end_date.split(" ")[0])
          : null,
        merchant_logo: offer.merchant_logo,
        id: offer.id,
        promocode: offer.x_offer_type_promo_code,
        merchant_id: offer.merchant_id,
      });

      return;
    }

    navigation.navigate("ProductPage", {
      product: {
        ...offer,
        merchant_logo: offer.merchant_logo,
        merchant_id: offer.merchant_id,
        merchant_name: offer.merchant_name,
      },
    });
  };

  const handleShowMorePress = () => {
    navigation.navigate("AllOffers");
  };

  return (
    <ExpandedCategoryBlocks
      data={data}
      onPress={handlePress}
      title={t("MainScreen.followUs")}
      isDark={isDark}
      style={{ marginTop: 36 }}
      pagination={{
        onShowMorePress: handleShowMorePress,
        isShowMoreVisible: !loading,
        loading,
      }}
      isShowMoreBtn={false}
    />
  );
};

const styles = StyleSheet.create({
  newIcon: {
    position: "absolute",
    top: 10,
    right: 0,
    backgroundColor: "#E32251",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  newText: {
    color: "#fff",
  },
  allOffersIcon: {
    width: itemWidth,
    height: itemWidth,
    borderRadius: 8,
  },
});

export default FollowUs;
