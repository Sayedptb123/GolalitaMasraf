import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {SizedBox} from '../../../components/DeliveryComp/sized_box';
import {LocationIcon} from '../../../assets/delivery_assets';
import {SearchFiledWithProfilePhoto} from '../_shared/componenets/search_field_with_profile_photo';

function SelectLocationInMap() {
  const navigation = useNavigation() ;
  return (
    <View>
      <SearchFiledWithProfilePhoto />
      <SizedBox size={20} />
      <Image
        style={{height: '60%', width: '100%'}}
        source={{
          uri: 'https://www.codeproject.com/KB/HTML/1110761/selecting.png',
        }}></Image>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 16,
          paddingVertical: 20,
        }}>
        <Text style={{fontSize: 18, color: '#b49056'}}>Delivery Location</Text>
        <SizedBox size={8} />

        <View style={{flexDirection: 'row'}}>
          <LocationIcon />
          <SizedBox size={8} />
          <Text style={{fontSize: 18, fontWeight: '600', color: '#b49056'}}>
            Ar rumaylah
          </Text>
        </View>
      </View>
      <SizedBox size={12} />

      <TouchableOpacity onPress={() => navigation.navigate('bluePlate')}>
        <View
          style={{
            backgroundColor: '#b49056',
            paddingHorizontal: 24,
            paddingVertical: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginHorizontal: 16,
          }}>
          <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
            Confirm Delivery Address
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default SelectLocationInMap;
