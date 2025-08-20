import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getDeliveryInformationColor,
  getDeliveryInformationTextColor,
} from '../../../colors/app_colors';
import {SizedBox} from '../../../components/DeliveryComp/sized_box';
import {LocationIcon} from '../../../assets/delivery_assets';

function BluePlate() {
  return (
    <View style={{marginHorizontal: 16}}>
      <SizedBox size={20} />
      <View style={styles.layout}>
        <LocationIcon style={styles.locationIcon} />
        <View>
          <Text style={styles.subTitle}>Deliver to:</Text>
          <Text style={styles.title}>Lusail</Text>
        </View>
        <View style={{flex: 1}} />
        <Text style={[styles.title, {marginHorizontal: 12}]}>Change</Text>
      </View>
      <SizedBox size={24} />
      <Text
        numberOfLines={2}
        style={{
          fontSize: 14,
          fontWeight: '400',
          color: '#350d05',
        }}>
        Zone
      </Text>
      <SizedBox size={12} />
      <View style={styles.inputField}>
        <TextInput placeholder="Search by restaurant or meal" />
      </View>
      <SizedBox size={24} />
      <Text
        numberOfLines={2}
        style={{
          fontSize: 14,
          fontWeight: '400',
          color: '#350d05',
        }}>
        Street Name/Number
      </Text>
      <SizedBox size={12} />
      <View style={styles.inputField}>
        <TextInput placeholder="Search by restaurant or meal" />
      </View>
      <SizedBox size={24} />
      <Text
        numberOfLines={2}
        style={{
          fontSize: 14,
          fontWeight: '400',
          color: '#350d05',
        }}>
        Building/Villa Number
      </Text>
      <SizedBox size={12} />
      <View style={styles.inputField}>
        <TextInput placeholder="Search by restaurant or meal" />
      </View>
      <SizedBox size={24} />
      <Text
        numberOfLines={2}
        style={{
          fontSize: 14,
          fontWeight: '400',
          color: '#350d05',
        }}>
        Mobile number
      </Text>
      <SizedBox size={12} />
      <View style={styles.inputField}>
        <TextInput placeholder="Search by restaurant or meal" />
      </View>
      <SizedBox size={24} />
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: '#b49056',
            paddingHorizontal: 24,
            paddingVertical: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
          }}>
          <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
            Save Address
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: 'white',
    height: 64,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  layout: {
    flexDirection: 'row',
    borderRadius: 16,
    borderColor: getDeliveryInformationColor(),
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
  },
  locationIcon: {
    width: 20,
    height: 20,
    fill: getDeliveryInformationColor(),
    marginHorizontal: 12,
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 18,
    color: getDeliveryInformationTextColor(),
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: getDeliveryInformationTextColor(),
  },
});

export default BluePlate;
