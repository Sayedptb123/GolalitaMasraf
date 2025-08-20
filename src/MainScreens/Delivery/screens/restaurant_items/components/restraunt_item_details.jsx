import React, {useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from 'react-native';
import {
  CloseIcon,
  DecreaseQuantityIcon,
  IncreaseQuantityIcon,
} from '../../../../assets/delivery_assets';
import {SizedBox} from '../../../../components/DeliveryComp/sized_box';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {} from 'react-native-gesture-handler';

function RestaurantItemDetails({
  closeBottomSheet,
  onAddRemoveFromToCart,
}) {
  return (
    <View
      style={{
        marginHorizontal: 20,
        backgroundColor: '#f3f3f3',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={closeBottomSheet}>
          <CloseIcon
            stroke={'#999CAD'}
            style={{width: 20, height: 20, stroke: '#999CAD'}}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: '600', color: '#b49056'}}>
          Whopper XXL
        </Text>
        <SizedBox size={1} />
      </View>
      <SizedBox size={24} />
      <Image
        source={{
          uri: 'https://cdn.sanity.io/images/czqk28jt/prod_bk/f4dc27eb7337f7cbd12d3ccd840e6a031fcba622-360x270.jpg',
        }}
        style={{height: 200, borderRadius: 16}}
      />
      <SizedBox size={24} />
      <Text
        numberOfLines={2}
        style={{
          fontSize: 14,
          fontWeight: '400',
          color: '#350d05',
        }}>
        Burgers, Fast food, American sadkfjdsafndsjklf ndskjfdsnkj
        sadjkfsdnfldsafnodis;al
      </Text>
      <SizedBox size={24} />
      <Text
        numberOfLines={2}
        style={{
          fontSize: 14,
          fontWeight: '400',
          color: '#350d05',
        }}>
        Special instructions
      </Text>
      <SizedBox size={12} />

      <View style={styles.inputField}>
        <TextInput placeholder="Search by restaurant or meal" />
      </View>
      <SizedBox size={24} />

      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 0.4,
        }}
      />
      <SizedBox size={24} />
      <View
        style={{
          flexDirection: 'row',
          margin: 8,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#999CAD',
              textDecorationLine: 'line-through',
            }}>
            18.00 QR
          </Text>
          <SizedBox size={12} />

          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#b49056',
            }}>
            16.00 QR
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => onAddRemoveFromToCart(0)}>
            <DecreaseQuantityIcon />
          </TouchableOpacity>
          <SizedBox size={12} />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '200',
              color: '#b49056',
            }}>
            0
          </Text>
          <SizedBox size={12} />
          <TouchableOpacity onPress={() => onAddRemoveFromToCart(2)}>
            <IncreaseQuantityIcon />
          </TouchableOpacity>
        </View>
      </View>
      <SizedBox size={24} />
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: '#08003B',
            paddingHorizontal: 24,
            paddingVertical: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 8,
          }}>
          <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
            Add to Cart
          </Text>
          <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
            45.00 QR
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default RestaurantItemDetails;

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
});
