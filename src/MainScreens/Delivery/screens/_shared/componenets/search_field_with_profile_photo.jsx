import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import {SearchIconDark} from '../../../../assets/delivery_assets';
import {useTheme} from "../../../../components/ThemeProvider";
const ModeTest = () => 
{
    const isDarkMode = () => useTheme().isDark ;
    return isDarkMode()? true : false
};
export function SearchFiledWithProfilePhoto() {
  return (
    <View style={[styles.row, {paddingTop: 16}]}>
      <View style={styles.searchFiled}>
        <SearchIconDark  /> 
        <TextInput
         style={{marginLeft:5}}
          placeholder="Search by restaurant or meal"
        />
      </View>
      <Image
        style={styles.userProfileIcon}
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  searchFiled: {
    flexGrow: 1,
    height: 40,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#d5d5d5',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  searchIcon: {
    width: 10,
    height: 10,
  },
  userProfileIcon: {
    marginStart: 16,
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});
