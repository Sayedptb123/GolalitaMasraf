import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  getDeliveryInformationColor,
  getDeliveryInformationTextColor,
} from '../../../colors/app_colors';
import {SizedBox} from '../../../components/DeliveryComp/sized_box';
import {
  DeliveryIcon,
  DeliveryTimeIcon,
  ForwardArrowIcon,
  LocationIcon,
  TakeawayIcon,
  TakeawayLocationIcon,
  VoucherChecked,
  VoucherIcon,
} from '../../../assets/delivery_assets';
import BottomSheet, {BottomSheetRefProps} from '../bottom_sheet/bottom_sheet';

function Checkout() {
  const checkoutRef = useRef(null);

  useEffect(() => {
    checkoutRef?.current?.scrollTo(-320);
  }, []);
  return (
    <View>
      <ScrollView style={{margin: 16}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: '#999CAD', fontSize: 14, fontWeight: '600'}}>
            Checkout
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.activeHalfContainer}>
              <DeliveryIcon fill={'white'} />
              <SizedBox size={8} />
              <Text style={styles.activeTitle}>Delivery</Text>
            </View>
            <View style={styles.unActiveHalfContainer}>
              <TakeawayIcon fill={'#999CAD'} />
              <SizedBox size={8} />
              <Text style={styles.title}>Takeaway</Text>
            </View>
            <SizedBox size={8} />
          </View>
        </View>
        <SizedBox size={16} />

        <View
          style={{
            borderColor: getDeliveryInformationColor(),
            borderWidth: 1,
            borderRadius: 16,
          }}>
          <Image
            style={{
              borderRadius: 16,
              height: 88,
            }}
            source={{
              uri: 'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg',
            }}></Image>
          <SizedBox size={16} />

          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <SizedBox size={16} />
            <LocationIcon />
            <SizedBox size={16} />

            <View>
              <Text style={{fontSize: 12, fontWeight: '600', color: '#b49056'}}>
                Deliver to: rumaylah
              </Text>
              <Text style={{fontSize: 12, fontWeight: '600', color: '#b49056'}}>
                839 st., east wing, zone 88
              </Text>
              <Text style={{fontSize: 12, fontWeight: '600', color: '#b49056'}}>
                +974 3333 4444
              </Text>
            </View>
            <View style={{flex: 1}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 12, fontWeight: '600', color: '#b49056'}}>
                Change
              </Text>
              <ForwardArrowIcon fill={'#b49056'} />
            </View>
            <SizedBox size={16} />
          </View>
          <SizedBox size={16} />
        </View>
        <SizedBox size={24} />
        <View
          style={{
            borderColor: getDeliveryInformationColor(),
            borderWidth: 1,
            borderRadius: 16,
            flexDirection: 'row',
            padding: 16,
          }}>
          <DeliveryTimeIcon stroke={'#999CAD'} />
          <SizedBox size={20} />
          <Text style={{color: '#999CAD', fontSize: 18, fontWeight: '400'}}>
            Expected delivery time
          </Text>
          <View style={{flex: 1}} />
          <Text style={{color: '#999CAD', fontSize: 18, fontWeight: '600'}}>
            30 min
          </Text>
        </View>
        <SizedBox size={24} />
        <Text style={{color: '#999CAD', fontSize: 14, fontWeight: '600'}}>
          By placing this order you agree to the terms and conditions.
        </Text>
      </ScrollView>
      <BottomSheet ref={checkoutRef} backgroundColor="#b49056">
        <View style={{backgroundColor: '#b49056'}}>
          <View style={{marginHorizontal: 16}}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#FFFFFF'}}>
              Total Summary
            </Text>
            <SizedBox size={8} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#FFFFFF'}}>
                Subtotal
              </Text>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#FFFFFF'}}>
                45.00 QR
              </Text>
            </View>
            <SizedBox size={8} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#FFFFFF'}}>
                Subtotal
              </Text>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#FFFFFF'}}>
                45.00 QR
              </Text>
            </View>
            <SizedBox size={8} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#FFFFFF'}}>
                Discount
              </Text>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#FFB6C7'}}>
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
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#350d05',
                  borderRadius: 16,
                  padding: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
                  Place Order
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

export default Checkout;

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    borderColor: getDeliveryInformationColor(),
    marginHorizontal: 8,
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
  },
  unActiveHalfContainer: {
    flexDirection: 'row',
    borderColor: getDeliveryInformationColor(),
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
    borderBottomEndRadius: 16,
    borderTopEndRadius: 16,
  },
  activeHalfContainer: {
    flexDirection: 'row',
    borderTopStartRadius: 16,
    borderBottomStartRadius: 16,

    color: getDeliveryInformationColor(),
    backgroundColor: getDeliveryInformationColor(),
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: getDeliveryInformationTextColor(),
  },
  activeTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: 'white',
  },
});
