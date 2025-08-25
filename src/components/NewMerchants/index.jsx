import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { TypographyText } from "../Typography";
import PremiumSvg from "../../assets/premium.svg";
import { SCREEN_HEIGHT, mainStyles } from "../../styles/mainStyles";
import { colors } from "../colors";
import { LUSAIL_REGULAR } from "../../redux/types";
import { sized } from "../../Svg";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../../utils";
import {
  getLocalClients,
  getMerchantDisscountForOffers,
} from "../../api/merchants";
import CardWithNesetedItems from "../../components/CardWithNestedItems";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourites } from "../../redux/merchant/merchant-thunks";
import { getToggleBtns } from "../../MainScreens/MerchantsPage/components/MerchantList/helpers";
import OfferItem from "../../MainScreens/MerchantsPage/components/OfferItem";
import BranchItem from "../../MainScreens/MerchantsPage/components/BranchItem";
import ListNoData from "../ListNoData";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import { HEADER_HEIGHT } from "../../constants";

const IMAGE_SIZE = 120;
const PremiumIcon = sized(PremiumSvg, 24, 24, "white");

const NewMerchants = (props) => {
  const { title, onPress, isDark } = props;
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { favouriteMerchants } = useSelector(
    (state) => state.favouriteMerchantsReducer
  );

  const language = i18n.language;
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocalClients()
      .then(async (i) => {
        const updatedClients = await Promise.all(
          i.map(async (client) => {
            const discountData = await getMerchantDisscountForOffers(
              client.merchant_id
            );
            return { ...client, ...discountData };
          })
        );
        setData(updatedClients);
      })
      .catch((error) => {
        console.error("Error fetching or updating client data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const renderLocalClient = useCallback(
    ({ item }) => {
      const isSaved = favouriteMerchants.some(
        (o) => o.merchant_id === item.merchant_id
      );
      delete item.banners;

      const isOrganization = item.org_name;
      const isBusinessHotel = item.is_business_hotel;

      const toggleBtns = getToggleBtns(item);
      const isOffersVisible = !isOrganization;
      const isBranchesVisible = !isOrganization && !isBusinessHotel;

      return (
        <CardWithNesetedItems
          toggleBtns={toggleBtns}
          onPress={() => onPress(item.merchant_id)}
          parentProps={{
            onPress: () => onPress(item.merchant_id),
            uri: item.merchant_logo,
            name: language === "ar" ? item?.x_arabic_name : item.merchant_name,
            description:
              language === "ar" ? item.x_ribbon_text_arabic : item.ribbon_text,
            new: true,
            onPressFavourite: () =>
              dispatch(toggleFavourites(item.merchant_id)),
            isSaved,
          }}
        >
          {isOffersVisible && <OfferItem merchant={item} type={"offers"} />}
          {isBranchesVisible && (
            <BranchItem merchantId={item.merchant_id} type={"branches"} />
          )}
        </CardWithNesetedItems>
      );
    },
    [title, isDark, i18n.language, favouriteMerchants?.length]
  );

  return (
    <View>
      {!!title && (
        <View
          style={[
            mainStyles.row,
            styles.titleWrapper,
            { alignSelf: isRTL() ? "flex-end" : "flex-start" },
          ]}
        >
          <PremiumIcon color="white" />
          <TypographyText
            textColor={isDark ? colors.white : "#000"}
            size={20}
            font={LUSAIL_REGULAR}
            title={title}
            style={{ marginHorizontal: 12 }}
          />
        </View>
      )}

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderLocalClient}
        keyExtractor={(item) => `${item.merchant_id}`}
        contentContainerStyle={styles.contentContainerStyle}
        ListFooterComponent={() =>
          loading && <FullScreenLoader style={styles.loader} />
        }
        ListEmptyComponent={!loading && <ListNoData style={styles.loader} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    marginBottom: 16,
  },
  item: {
    width: "100%",
    marginBottom: 11,
    position: "relative",
    flexDirection: "row",
  },
  logoWrapper: {
    ...mainStyles.generalShadow,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  logo: {
    width: IMAGE_SIZE - 20,
    aspectRatio: 1,
  },
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
  name: {
    paddingRight: 16,
    fontWeight: "700",
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 160,
  },
  listEmptyLoader: {
    paddingVertical: 50,
    alignSelf: "center",
    width: "100%",
  },
  loader: {
    width: "100%",
    height: Dimensions.get("window").height,
    top: -HEADER_HEIGHT,
  },
});

export default NewMerchants;
