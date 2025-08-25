import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { mainStyles, SCREEN_HEIGHT } from "../../../styles/mainStyles";
import IconButton from "../../../components/IconButton/IconButton";
import FilterSvg from "../../../assets/filter.svg";
import sized from "../../../Svg/sized";
import FilterDarkSvg from "../../../assets/filter_dark.svg";
import { useTheme } from "../../../components/ThemeProvider";
import { connect } from "react-redux";
import {
  getOffers,
  getProducts,
} from "../../../redux/merchant/merchant-thunks";
import { colors } from "../../../components/colors";
import { LUSAIL_REGULAR } from "../../../redux/types";
import { TypographyText } from "../../../components/Typography";
import { useTranslation } from "react-i18next";

const FilterIcon = sized(FilterSvg, 14);
const FilterDarkIcon = sized(FilterDarkSvg, 14);

const Offers = ({
  // merchantOffers,
  merchantDetails,
  // getOffers,
  // getProducts,
}) => {
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (merchantDetails) {
  //     getOffers({
  //       merchant_id: merchantDetails.id,
  //       page: 1,
  //     });

  //     getProducts({ merchant_id: merchantDetails.id, page: 1 });
  //   }
  // }, [merchantDetails]);
  const { isDark } = useTheme();
  return (
    <>
      {merchantDetails?.offer_products?.length > 0 ? (
        <ScrollView style={[{ paddingTop: 19, marginBottom: 5 }]}>
          <View style={mainStyles.p20}>
            <View style={[mainStyles.betweenRow, { marginBottom: 15 }]}>
              <View />
              {/*<IconButton icon={isDark ? <FilterDarkIcon/> : <FilterIcon />} label={'Filter by'} />*/}
            </View>
            {merchantDetails?.offer_products?.map?.((offer, index) => (
              <ProductItem
                key={index}
                product={offer}
                discount={offer.discount}
              />
            ))}
            {/*<ProductItem isDiscount={true} />*/}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TypographyText
            textColor={isDark ? colors.white : colors.darkBlue}
            size={16}
            font={LUSAIL_REGULAR}
            title={t("MainScreen.offersNotFound")}
          />
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  // merchantOffers: state.merchantReducer.merchantOffers,
  merchantDetails: state.merchantReducer.merchantDetails,
});

export default connect(mapStateToProps, { getOffers, getProducts })(Offers);
