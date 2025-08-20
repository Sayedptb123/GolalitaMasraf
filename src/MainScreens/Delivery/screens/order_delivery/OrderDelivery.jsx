import React from 'react';
import {connect} from "react-redux";
import {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, StatusBar, View, Image, Text} from 'react-native';
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import {getBackGroundColor} from '../../../colors/app_colors';
import {SizedBox} from '../../../components/DeliveryComp/sized_box';
import {BurgerKingImage, LocationIcon} from '../../../assets/delivery_assets';
import BottomSheet, {BottomSheetRefProps} from '../bottom_sheet/bottom_sheet';
import ChangeLocationBottomSheet from './components/change_location_bottom_sheet';
import DeliveryFilters from './components/delivery_filters';
import DeliveryInformation from './components/DeliveryInformation';
import DeliveryTabs from './components/delivery_tabs';
import RestaurantFilters from './components/restaurant_bottom_sheet';
import RestaurantItem from "./components/restaurant_item";
import {SearchFiledWithProfilePhoto} from '../_shared/componenets/search_field_with_profile_photo';
import TakeawayInformation from './components/TakeawayInformation';


 //const OrderDelivery = ({navigation,resturants,getRestaurants}:any) =>{
  function OrderDelivery({navigation}) {
  /*useEffect(() => {
    getRestaurants()
  }, [])

  useEffect(() => {  
  }, [resturants])
*/
  const filterRef = useRef(null);
  const locationRef = useRef(null);
  const [isDelivery, setIsDelivery] = useState(true);
  useEffect(() => {
    onPressFilter(true);
  }, []);
  const onPressFilter = useCallback((isOpen) => {
    if (!isOpen) {
      filterRef?.current?.scrollTo(0);
    } else {
      filterRef?.current?.scrollTo(-200);
    }
  }, []);

  const onChangeLocation = useCallback((isOpen) => {
    if (!isOpen) {
      locationRef?.current?.scrollTo(0);
    } else {
      locationRef?.current?.scrollTo(-400);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView
        style={{backgroundColor:`${getBackGroundColor()}`, flex: 1, marginTop: 20}}>
       <StatusBar backgroundColor= {getBackGroundColor()} barStyle={'light-content'} /> 
        <View style={{backgroundColor:`${getBackGroundColor()}`}}>
          <SearchFiledWithProfilePhoto />
          <DeliveryTabs isDelivery={isDelivery} setIsDelivery={setIsDelivery} />
        </View>
        <SizedBox size={16} />
        {isDelivery ? (
          <DeliveryInformation
            onChangeLocation={() => onChangeLocation(true)}
          />
        ) : (
          <TakeawayInformation />
        )}
        <SizedBox size={16} />
        <DeliveryFilters onOpen={() => onPressFilter(true)} />
        <RestaurantItem navigation={navigation}></RestaurantItem>
       {/**  <FlatList
          data={[{id: 'sdsa'}, {id: 'sdsa1'}, {id: 'sdsa2'}, {id: 'sdsa3'}]}
          keyExtractor={item => item.id}
          renderItem={item => (
            <RestaurantItem navigation={navigation}></RestaurantItem>
          )}
        />*/}
        <BottomSheet ref={filterRef}>
          <RestaurantFilters onClose={() => onPressFilter(false)} />
        </BottomSheet>
        <BottomSheet ref={locationRef}>
          <ChangeLocationBottomSheet
            onCloseSheet={() => onChangeLocation(false)}
          />
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
export default OrderDelivery;
/*const mapStateToProps = (state:any) => ({
  restaurnts: state.restaurntReducer.restaurnts,
})
export default connect(mapStateToProps,{getRestaurants})(OrderDelivery)*/
