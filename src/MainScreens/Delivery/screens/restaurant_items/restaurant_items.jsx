import React, { useCallback, useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetRefProps } from "../bottom_sheet/bottom_sheet";
import RestaurantCartSummary from "./components/restaurant_cart_summary";

import RestaurantCategories from "./components/restaurant_categories";
import RestaurantListItem from "../_shared/componenets/restaurant_list_item";
import RestaurantPreparingTime from "./components/restaurant_preparing_time";
import RestaurantItemDetails from "./components/restraunt_item_details";
import RestaurantItemsHeader from "./components/resturant_items_header";
import {
  CartIcon,
  DecreaseQuantityIcon,
  IncreaseQuantityIcon,
  LocationIcon,
} from "../../../assets/delivery_assets";
import { SizedBox } from "../../../components/DeliveryComp/sized_box";
import { getRestaurantsItems } from "../../..//redux/delivery/delivery-thunks";

const categories = ["category1", "category2", "category3"];
const RestaurantItems = ({
  merchant_id,
  restaurntsItems,
  getRestaurantsItems,
}) => {
  useEffect(() => {
    getRestaurantsItems(merchant_id);
  }, []);
  //function RestaurantItems() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const cartRef = useRef(null);
  const itemRef = useRef(null);

  const onAddRemoveItemFromToCart = useCallback((count) => {
    if (count <= 0) {
      cartRef?.current?.scrollTo(0);
    } else {
      cartRef?.current?.scrollTo(-200);
    }
  }, []);
  const onSelectItem = useCallback((isShowItem) => {
    if (!isShowItem) {
      itemRef?.current?.scrollTo(0);
    } else {
      itemRef?.current?.scrollTo(-700);
    }
  }, []);
  const _renderItem = ({ item }) => {
    return (
      <View
        style={{
          padding: 8,
          margin: 16,
          backgroundColor: "#ffffff",
          borderRadius: 8,
          shadowOffset: {
            width: 4,
            height: 4,
          },
          elevation: 8,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 3,
          position: "relative",
        }}
      >
        <TouchableOpacity /*onPress={onSelectItem}}*/>
          <View style={{ flexDirection: "row", margin: 8 }}>
            <Image
              source={{
                uri: item.image_url,
              }}
              style={{ width: 64, height: 64, borderRadius: 16 }}
            />
            <SizedBox size={16} />

            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#b49056",
                }}
              >
                {item.name}
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 14,
                  fontWeight: "200",
                  color: "#999CAD",
                }}
              >
                {item.description_sale}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <SizedBox size={16} />
        <View
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: 0.4,
          }}
        />
        <SizedBox size={8} />
        <View
          style={{
            flexDirection: "row",
            margin: 8,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#999CAD",
                textDecorationLine: "line-through",
              }}
            >
              18.00 QR
            </Text>
            <SizedBox size={12} />

            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#b49056",
              }}
            >
              16.00 QR
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity /* onPress={() => onAddRemoveFromToCart(0)}*/>
              <DecreaseQuantityIcon />
            </TouchableOpacity>
            <SizedBox size={12} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "200",
                color: "#b49056",
              }}
            >
              0
            </Text>
            <SizedBox size={12} />
            <TouchableOpacity /*onPress={() => onAddRemoveFromToCart(2)}*/>
              <IncreaseQuantityIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>
        <View style={{ backgroundColor: "white" }}>
          <RestaurantItemsHeader />
          <RestaurantPreparingTime />
          <RestaurantCategories
            options={categories}
            selectOption={setSelectedCategory}
            selectedOption={selectedCategory}
          />
          <FlatList
            data={restaurntsItems}
            renderItem={_renderItem}
            // keyExtractor={item => item.merchant_id}
          />
          {/* <FlatList
            data={restaurntsItems}
            renderItem={_renderItem}
            renderItem={item => (
            <RestaurantListItem
                onAddRemoveFromToCart={(count) =>
                  onAddRemoveItemFromToCart(count)
                }
                onSelectItem={() => onSelectItem(true)}
                title={selectedCategory}
              />

               )}
          >
          
          </FlatList>*/}
        </View>
      </View>
      <BottomSheet backgroundColor="#b49056" ref={cartRef}>
        <RestaurantCartSummary />
      </BottomSheet>
      <BottomSheet ref={itemRef} backgroundColor="#f3f3f3">
        <RestaurantItemDetails
          onAddRemoveFromToCart={() => {}}
          closeBottomSheet={() => {
            onSelectItem(false);
          }}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

//export default RestaurantItems;

const mapStateToProps = (state) => ({
  restaurntsItems: state.restaurntReducer.restaurntsItems,
});
export default connect(mapStateToProps, { getRestaurantsItems })(
  RestaurantItems
);
