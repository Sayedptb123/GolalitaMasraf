import React from 'react';
import {Text, View} from 'react-native';
import {SizedBox} from '../../../../components/DeliveryComp/sized_box';
import {CallIcon, DeliveryIcon} from '../../../../assets/delivery_assets';

function RestaurantPreparingTime() {
  return (
    <View>
      <SizedBox size={20} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#000',
          }}>
          Burger King
        </Text>

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              borderColor: '#FFB800',
              paddingHorizontal: 12,
              borderWidth: 1,
              borderRadius: 20,
            }}>
            <Text style={{fontSize: 18, color: '#FFB800'}}>* 4.5 </Text>
          </View>
          <SizedBox size={4} />
          <View
            style={{
              borderColor: '#999CAD',
              paddingHorizontal: 12,
              borderWidth: 1,
              borderRadius: 20,
              flexDirection: 'row',
            }}>
            <CallIcon style={{width: 10, height: 10, fill: '#999CAD'}} />
            <Text style={{fontSize: 18, color: '#999CAD'}}>Call</Text>
          </View>
        </View>
      </View>
      <SizedBox size={16} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <View>
          <Text
            style={{
              fontSize: 10,
              fontWeight: '400',
              color: '#999CAD',
            }}>
            Minimum Spend
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#000',
            }}>
            100.00 QR
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
          }}>
          <DeliveryIcon style={{width: 4, height: 4, fill: '#999CAD'}} />
          <SizedBox size={4} />
          <Text style={{fontSize: 14, color: '#999CAD'}}>10.00 QR</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <DeliveryIcon style={{width: 4, height: 4, fill: '#999CAD'}} />
          <SizedBox size={4} />
          <Text style={{fontSize: 14, color: '#999CAD'}}>29 min</Text>
        </View>
      </View>
      <SizedBox size={20} />
    </View>
  );
}

export default RestaurantPreparingTime;
