import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { LUSAIL_REGULAR } from '../redux/types';
import { isRTL } from '../../utils';

export const TypographyText = props => {
  const {
    title,
    textColor = 'grey',
    size = 14,
    weight = 'normal',
    font = LUSAIL_REGULAR,
    transform,
    style,
    ...rest
  } = props;
  const textStyles = [
    {
      color: textColor,
      fontSize: size,
      textTransform: transform,
      fontFamily: font,
      textAlign: isRTL() ? 'right' : 'left',
    },
  ];

  return (
    <Text style={[textStyles, style]} {...rest}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  regular: {
    fontFamily: LUSAIL_REGULAR,
  },
  medium: {
    fontFamily: LUSAIL_REGULAR,
    fontWeight: '700',
  },
  semiBold: {
    fontFamily: LUSAIL_REGULAR,
    fontWeight: '700',
  },
  bold: {
    fontFamily: LUSAIL_REGULAR,
    fontWeight: '900',
  },
  extraBold: {
    fontFamily: LUSAIL_REGULAR,
    fontWeight: '900',
  },
});
