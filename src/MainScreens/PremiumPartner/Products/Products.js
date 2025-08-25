import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { mainStyles } from "../../../styles/mainStyles";
import IconButton from "../../../components/IconButton/IconButton";
import ProductItem from "../../../components/ProductItem/ProductItem";
import sized from "../../../Svg/sized";
import FilterSvg from "../../../assets/filter.svg";
import FilterDarkSvg from "../../../assets/filter_dark.svg";
import { useTheme } from "../../../components/ThemeProvider";
import { connect } from "react-redux";
// import {getProducts} from "../../../redux/merchant/merchant-thunks";
import { TypographyText } from "../../../components/Typography";
import { colors } from "../../../components/colors";
import { LUSAIL_REGULAR } from "../../../redux/types";
import { useTranslation } from "react-i18next";

const FilterIcon = sized(FilterSvg, 14);
const FilterDarkIcon = sized(FilterDarkSvg, 14);

const Products = ({ merchantDetails }) => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  if (!merchantDetails) return null;
  return (
    <>
      {merchantDetails.products?.length > 0 ? (
        <ScrollView style={{ paddingTop: 19, marginBottom: 5 }}>
          <View style={mainStyles.p20}>
            <View style={[mainStyles.betweenRow, { marginBottom: 15 }]}>
              <View />
              {/*<IconButton icon={isDark ? <FilterDarkIcon/> : <FilterIcon />} label={'Filter by'} />*/}
            </View>
            {merchantDetails.products?.map?.((product, index) => (
              <ProductItem
                key={index}
                product={product}
                discount={product.discount}
              />
            ))}
            <View style={{ marginBottom: 50 }} />
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
            title={t("MainScreen.productsNotFound")}
          />
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  // merchantProducts: state.merchantReducer.merchantProducts,
  merchantDetails: state.merchantReducer.merchantDetails,
});

export default connect(mapStateToProps, {})(Products);
