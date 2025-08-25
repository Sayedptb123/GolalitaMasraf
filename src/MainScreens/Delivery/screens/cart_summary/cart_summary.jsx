import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SizedBox} from '../../../components/DeliveryComp/sized_box';
import {DeliveryIcon, VoucherChecked, VoucherIcon} from '../../../assets/delivery_assets';
import BottomSheet, {BottomSheetRefProps} from '../bottom_sheet/bottom_sheet';
import RestaurantListItem from '../_shared/componenets/restaurant_list_item';

const items = [1, 2];

function CartSummary() {
  const navigation = useNavigation();
  const cartRef = useRef(null);

  useEffect(() => {
    cartRef?.current?.scrollTo(-180);
  }, []);

  return (
    <View>
      <ScrollView>
        <SizedBox size={16} />
        <View style={{flexDirection: 'row', marginHorizontal: 16}}>
          <DeliveryIcon fill="#350d05" />
          <SizedBox size={8} />
          <Text style={{fontSize: 14, fontWeight: '600', color: '#350d05'}}>
            Delivery to Ar rumaylah
          </Text>
        </View>
        {items.map(e => (
          <RestaurantListItem
            key={e}
            onAddRemoveFromToCart={
              (count) => {}
              //   onAddRemoveItemFromToCart(count)
            }
            onSelectItem={() => {}}
            title={e.toString()}
          />
        ))}
        <SizedBox size={12} />
        <Text
          numberOfLines={2}
          style={{
            marginHorizontal: 16,
            fontSize: 14,
            fontWeight: '400',
            color: '#350d05',
          }}>
          Special Instructions
        </Text>
        <SizedBox size={12} />
        <View style={styles.inputField}>
          <TextInput
            placeholderTextColor={'#DDDFE4'}
            placeholder="Write your instructions here..."
          />
        </View>
        <SizedBox size={24} />
        <Text
          numberOfLines={2}
          style={{
            marginHorizontal: 16,
            fontSize: 14,
            fontWeight: '400',
            color: '#350d05',
          }}>
          Special Instructions
        </Text>
        <SizedBox size={12} />
        <View style={styles.voucherCode}>
          <VoucherIcon fill={'#999CAD'} />
          <SizedBox size={20} />
          <Text style={{color: '#999CAD', fontSize: 18, fontWeight: '400'}}>
            Enter Voucher Code
          </Text>
          <View style={{flex: 1}} />
          <VoucherChecked stroke={'#1CC0A0'} />
        </View>
        <SizedBox size={40} />
        <View style={{marginHorizontal: 16}}>
          <Text style={{fontSize: 14, fontWeight: '400', color: '#999CAD'}}>
            Total Summary
          </Text>
          <SizedBox size={8} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#b49056'}}>
              Subtotal
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#b49056'}}>
              45.00 QR
            </Text>
          </View>
          <SizedBox size={8} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#b49056'}}>
              Subtotal
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#b49056'}}>
              45.00 QR
            </Text>
          </View>
          <SizedBox size={8} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#b49056'}}>
              Discount
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#E32251'}}>
              - 5.00 QR
            </Text>
          </View>
          <SizedBox size={20} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#b49056'}}>
              Total Amount
            </Text>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#b49056'}}>
              30.01 QR
            </Text>
          </View>
        </View>

        <SizedBox size={200} />
      </ScrollView>
      <BottomSheet ref={cartRef} backgroundColor="#b49056">
        <View style={{backgroundColor: '#b49056'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginHorizontal: 16, flex: 1}}>
              <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
                <View
                  style={{
                    backgroundColor: '#350d05',
                    borderRadius: 16,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
                    Checkout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginHorizontal: 16, flex: 1}}>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: '#b49056',
                    borderRadius: 16,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: 'white',
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
                    + Add Items
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

export default CartSummary;

const styles = StyleSheet.create({
  inputField: {
    marginHorizontal: 16,
    backgroundColor: 'white',
    height: 200,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  voucherCode: {
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
});
