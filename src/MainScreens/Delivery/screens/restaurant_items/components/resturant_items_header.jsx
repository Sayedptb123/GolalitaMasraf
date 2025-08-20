import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {SizedBox} from '../../../../components/DeliveryComp/sized_box';
import {sized} from "../../../../Svg";
import SearchSvg from '../../../../assets/search.svg';
const SearchIcon = sized(SearchSvg, 14)
function RestaurantItemsHeader() {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        height: 180,
        borderRadius: 16,
        shadowOffset: {
          width: 4,
          height: 4,
        },
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        position: 'relative',
      }}>
      
     <Image
        source={{
          uri: 'https://cdn.sanity.io/images/czqk28jt/prod_bk/f4dc27eb7337f7cbd12d3ccd840e6a031fcba622-360x270.jpg',
        }}
        style={{flex: 1, alignSelf: 'stretch', height: 180, borderRadius: 16}}
      />

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 40}}>{'<'}</Text>
        <SizedBox size={22} />
        <View style={styles.searchFiled}>
          <SearchIcon style={styles.searchIcon} />
          <TextInput
            style={{flex: 1}}
            placeholder="Search by restaurant or meal"
          />
        </View>
      </View>
      { /*   <View
        style={{
          position: 'absolute',
          top: 0,
          right: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Image
          style={styles.userProfileIcon}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
      </View>*/}
    </View>
  );
}

export default RestaurantItemsHeader;

const styles = StyleSheet.create({
  searchFiled: {
    width: 240,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d5d5d5',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  userProfileIcon: {
    marginStart: 16,
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});
