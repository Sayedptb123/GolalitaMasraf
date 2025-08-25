import React, { useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import ProductItem from "../../components/ProductItem/ProductItem";
import { mainStyles, SCREEN_HEIGHT } from "../../styles/mainStyles";
import { colors } from "../../components/colors";
import { useTheme } from "../../components/ThemeProvider";
import { connect } from "react-redux";
import { getFavoriteOffers } from "../../redux/merchant/merchant-thunks";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import ListNoData from "../../components/ListNoData";

const Favorites = ({ favoriteOffers, isOffersLoading, getFavoriteOffers }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    getFavoriteOffers(false, null);
  }, []);

  const handleBackPress = () => {
    navigation.navigate("Main");
  };

  return (
    <View style={{ backgroundColor: isDark ? colors.darkBlue : colors.white }}>
      <SafeAreaView>
        <CommonHeader
          isWhite={isDark}
          label={t("Favorites.favorites")}
          style={{ backgroundColor: isDark ? colors.darkBlue : undefined }}
          onBackPress={handleBackPress}
        />
        <ScrollView style={{ height: SCREEN_HEIGHT }}>
          {isOffersLoading ? (
            <View style={[mainStyles.centeredRow, { marginTop: 30 }]}>
              <ActivityIndicator
                size={"large"}
                color={isDark ? colors.mainDarkMode : colors.darkBlue}
              />
            </View>
          ) : (
            <View style={{ marginBottom: 180 }}>
              {favoriteOffers?.map?.((offer, index) => (
                <ProductItem key={index} product={offer} isSaved={true} />
              ))}
            </View>
          )}
          {!isOffersLoading && !favoriteOffers?.length && (
            <ListNoData text={t("AllOffers.listNoData")} />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  favoriteOffers: state.merchantReducer.favoriteOffers,
  isOffersLoading: state.loadersReducer.isOffersLoading,
});

export default connect(mapStateToProps, { getFavoriteOffers })(Favorites);
