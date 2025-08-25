import { TouchableOpacity } from 'react-native';
import BackSvg from '../../../../assets/back.svg';
import { useTheme } from '../../../ThemeProvider';
import { colors } from '../../../colors';
import { navigationRef } from '../../../../Navigation/navigationHelpers';

const BackBtn = props => {
  const { isDark } = useTheme();

  const handlePress = () => {
    if (props?.onPress) {
      props.onPress();
      return;
    }

    navigationRef?.current?.goBack();
  };

  return (
    <TouchableOpacity
      style={{ padding: 11, paddingLeft: 0 }}
      onPress={handlePress}
    >
      <BackSvg
        color={isDark ? colors.white : '#202226'}
        height={16}
        width={16}
      />
    </TouchableOpacity>
  );
};

export default BackBtn;
