import React from 'react';
import { mainStyles } from '../../styles/mainStyles';
import { TouchableOpacity, View } from 'react-native';
import { colors } from '../colors';
import { TypographyText } from '../Typography';
import { LUSAIL_REGULAR } from '../../redux/types';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../ThemeProvider';

const TwoButtons = ({
  icon1,
  icon2,
  icon3,
  label1,
  label2,
  label3,
  onPress1,
  onPress2,
  onPress3,
  selectedButton,
  isLight,
  isWhite,
}) => {
  const { isDark } = useTheme();

  const iconColor = isDark ? colors.white : colors.darkBlue;
  const iconPassiveColor = isDark ? colors.white : '#999CAD';

  const getBtnStyles = isSelected => {
    return {
      backgroundColor: isSelected
        ? isDark
          ? isLight
            ? colors.darkBlue
            : colors.darkModeBackground
          : isWhite
            ? colors.white
            : colors.darkBlue
        : colors.transparent,
    };
  };

  const getTextColor = isSelected => {
    return isSelected
      ? isWhite
        ? iconColor
        : isDark
          ? colors.mainDarkMode
          : 'white'
      : isLight
        ? isWhite
          ? iconPassiveColor
          : iconPassiveColor
        : colors.darkBlue;
  };

  return (
    <View style={mainStyles.centeredRow}>
      <View
        style={[
          mainStyles.twoButtons,
          {
            borderColor: isDark
              ? isLight
                ? '#444444'
                : colors.transparent
              : isWhite
                ? colors.white
                : colors.grey,
            marginVertical: 25,
            // flexDirection: isRTL() ? "row-reverse" : "row",
          },
          isDark && {
            backgroundColor: isLight ? colors.transparent : '#444444',
          },
        ]}
      >
        <View
          style={[
            mainStyles.twoButtons__item,
            selectedButton === 0 && { transform: [{ translateX: -1 }] },
            getBtnStyles(selectedButton === 0),
          ]}
        >
          <TouchableOpacity
            onPress={onPress1}
            style={mainStyles.twoButtons__button}
          >
            {icon1}
            <TypographyText
              textColor={getTextColor(selectedButton === 0)}
              size={12}
              font={LUSAIL_REGULAR}
              title={label1}
              style={{ marginLeft: 5, fontWeight: '700' }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            mainStyles.twoButtons__item,
            selectedButton === 1 && { transform: [{ translateX: 1 }] },
            getBtnStyles(selectedButton === 1),
          ]}
        >
          <TouchableOpacity
            onPress={onPress2}
            style={mainStyles.twoButtons__button}
          >
            {icon2}
            <TypographyText
              textColor={getTextColor(selectedButton === 1)}
              size={12}
              font={LUSAIL_REGULAR}
              title={label2}
              style={{ marginLeft: 5, fontWeight: '700' }}
            />
          </TouchableOpacity>
        </View>
        {label3 && (
          <View
            style={[
              mainStyles.twoButtons__item,
              selectedButton === 2 && { transform: [{ translateX: 1 }] },
              getBtnStyles(selectedButton === 2),
            ]}
          >
            <TouchableOpacity
              onPress={onPress3}
              style={mainStyles.twoButtons__button}
            >
              {icon3}
              <TypographyText
                textColor={getTextColor(selectedButton === 2)}
                size={12}
                font={LUSAIL_REGULAR}
                title={label3}
                style={{ marginLeft: 5, fontWeight: '700' }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default TwoButtons;
