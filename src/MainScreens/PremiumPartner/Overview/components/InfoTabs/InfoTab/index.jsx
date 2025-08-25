import { Linking, StyleSheet } from 'react-native';
import CommonButton from '../../../../common/CommonButton';
import { View } from 'react-native';
import { colors } from '../../../../../../components/colors';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../../../components/ThemeProvider';
import MenuBookSvg from '../../../../../../assets/menu-book.svg';
import CallSvg from '../../../../../../assets/call.svg';
import HTMLRenderer from '../../../../../../components/HTMLRenderer';
import { sized } from '../../../../../../Svg';
import { TypographyText } from '../../../../../../components/Typography';
import { TouchableOpacity } from 'react-native';
import { getWorkingHours } from './helpers';
import ContractBtn from './ContractBtn';
import TermsAndConditions from './TermsAndConditions';

const InfoTab = ({ merchantDetails }) => {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();

  const isArabic = i18n.language === 'ar';

  const backgroundColor = isDark ? colors.navyBlue : '#fff';
  const btnColor = isDark ? colors.mainDarkMode : colors.darkBlue;

  const CallIcon = sized(CallSvg, 16, 16, btnColor);

  const renderInfo = (title, value, onPress, isHtml) => {
    if (!value) {
      return null;
    }

    if (onPress) {
      return (
        <TouchableOpacity style={styles.infoItem} onPress={onPress}>
          <View style={styles.infoItemTitleWrapper}>
            <View
              style={[
                styles.infoItemTitle,
                { backgroundColor: isDark ? colors.navyBlue : '#fff' },
              ]}
            >
              <TypographyText
                textColor={btnColor}
                size={15}
                style={{ fontWeight: '700' }}
                title={title}
              />
            </View>
          </View>

          {!!value && (
            <TypographyText
              textColor={isDark ? colors.white : colors.darkBlue}
              size={18}
              title={value}
              style={styles.infoItemValue}
            />
          )}
        </TouchableOpacity>
      );
    }

    if (isHtml) {
      return (
        <View style={styles.infoItem}>
          <View style={styles.infoItemTitleWrapper}>
            <View
              style={[
                styles.infoItemTitle,
                { backgroundColor: isDark ? colors.navyBlue : '#fff' },
              ]}
            >
              <TypographyText
                textColor={btnColor}
                size={15}
                style={{ fontWeight: '700' }}
                title={title}
              />
            </View>
          </View>

          <HTMLRenderer
            value={
              isArabic
                ? merchantDetails.x_terms_condition_arabic_new
                : merchantDetails.x_terms_condition_new
            }
          />
        </View>
      );
    }

    return (
      <View style={styles.infoItem}>
        <View style={styles.infoItemTitleWrapper}>
          <View
            style={[
              styles.infoItemTitle,
              { backgroundColor: isDark ? colors.navyBlue : '#fff' },
            ]}
          >
            <TypographyText
              textColor={btnColor}
              size={16}
              style={{ fontWeight: '700' }}
              title={title}
            />
          </View>
        </View>

        {!!value && (
          <TypographyText
            textColor={isDark ? colors.white : colors.darkBlue}
            size={14}
            title={value}
            style={styles.infoItemValue}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.controllBtns,
          {
            backgroundColor,
          },
        ]}
      >
        <CommonButton
          disabled={!merchantDetails?.phone}
          text={t('Merchants.phone')}
          icon={<CallIcon />}
          onPress={() => {
            Linking.openURL(`tel:${merchantDetails.phone}`);
          }}
          textStyle={{
            color: btnColor,
            fontSize: 11,
            marginLeft: 4,
          }}
          wrapperStyle={{
            borderColor: btnColor,
            paddingHorizontal: 10,
          }}
        />
        <ContractBtn merchantId={merchantDetails.id} />
      </View>

      {renderInfo(
        t('ProductPage.workingHours'),
        getWorkingHours(isArabic, merchantDetails),
      )}

      <TermsAndConditions
        title={t('ProductPage.terms')}
        merchantId={merchantDetails.id}
      />

      {renderInfo(
        t('ProductPage.address'),
        isArabic
          ? `${merchantDetails.x_arabic_name || ''}${
              merchantDetails.x_street_ar
                ? `,\n${merchantDetails.x_street_ar}`
                : ''
            }${
              merchantDetails.x_city_ar ? `,\n${merchantDetails.x_city_ar}` : ''
            }${
              merchantDetails.x_country_ar
                ? `, ${merchantDetails.x_country_ar}`
                : ''
            }`
          : merchantDetails.address,
      )}

      {renderInfo(t('ProductPage.email'), merchantDetails.email, () => {
        Linking.openURL(`mailto:${merchantDetails.email}`);
      })}

      {renderInfo(t('ProductPage.website'), merchantDetails.website, () =>
        Linking.openURL(merchantDetails.website),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  controllBtns: {
    flexDirection: 'row',
    marginTop: 20,
  },
  infoItem: {
    marginTop: 40,
  },
  infoItemTitleWrapper: {
    width: '100%',
  },
  infoItemTitle: {
    borderRadius: 10,
  },
  infoItemValue: {
    marginTop: 3,
  },
});

export default InfoTab;
