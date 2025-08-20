import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SizedBox} from '../../../../components/DeliveryComp/sized_box';
import {DeliveryIcon, ForwardArrowIcon} from '../../../../assets/delivery_assets';

function RestaurantCartSummary() {
  const navigation = useNavigation() ;
  return (
    <View style={{backgroundColor: '#b49056', flex: 1, margin: 16}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <DeliveryIcon fill={'white'} />
          <SizedBox size={8} />
          <Text style={{color: 'white', fontSize: 14}}>Delivery Cart</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('cartSummary')}>
          <ForwardArrowIcon stroke={'white'} />
        </TouchableOpacity>
      </View>
      <SizedBox size={20} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 24,
              height: 24,
              backgroundColor: 'white',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#b49056',
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              3
            </Text>
          </View>
          <SizedBox size={8} />
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
            Items
          </Text>
        </View>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
          45.00 QR
        </Text>
      </View>
    </View>
  );
}

export default RestaurantCartSummary;
