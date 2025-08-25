import { StyleSheet, View, FlatList, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../../../components/ThemeProvider';
import { TypographyText } from '../../../../components/Typography';
import { LUSAIL_REGULAR } from '../../../../redux/types';
import { colors } from '../../../../components/colors';
import { useNavigation } from '@react-navigation/native';
import FullScreenLoader from '../../../../components/Loaders/FullScreenLoader';
import { setCategoriesType } from '../../../../redux/merchant/merchant-actions';
import { getParentCategories } from '../../../../redux/merchant/merchant-thunks';
import { useEffect } from 'react';
import CategoriesFilter from './CategoriesFilter';
import ListNoData from '../../../../components/ListNoData';

const IMAGE_SIZE = 70;

const Categories = () => {
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const parentCategories = useSelector(
    state => state.merchantReducer.parentCategories,
  );
  const loading = useSelector(
    state => state.merchantReducer.parentCategoriesLoading,
  );
  const dispatch = useDispatch();
  const { categoriesType } = useSelector(state => state.merchantReducer);

  const language = i18n.language;

  const navigateToMerchant = category => {
    if (!category.x_if_have_child_cat) {
      navigation.navigate('merchants', {
        screen: 'merchants-list',
        params: {
          selectedCategoryId: category.id,
          parentCategoryId: category?.parent_id?.[0],
          parentCategoryName:
            language === 'ar' ? category?.x_name_arabic : category.name,
        },
      });

      return;
    }

    navigation.navigate('merchants', {
      screen: 'categories-child',
      params: {
        parentCategoryId: category.id,
        parentCategoryName:
          language === 'ar' ? category?.x_name_arabic : category.name,
      },
    });
  };

  useEffect(() => {
    if (categoriesType) {
      dispatch(getParentCategories(categoriesType));
    }
  }, [categoriesType]);

  const handleTypeChange = type => {
    dispatch(setCategoriesType(type));
  };

  console.log(loading, 'loading');

  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: isDark ? colors.darkBlue : colors.white,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TypographyText
          title={t('Categories.title')}
          textColor={isDark ? colors.mainDarkMode : '#000'}
          size={26}
          font={LUSAIL_REGULAR}
        />

        <CategoriesFilter onChange={handleTypeChange} type={categoriesType} />
      </View>

      <FlatList
        data={!loading ? parentCategories : []}
        numColumns={3}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={
          !loading ? (
            <ListNoData title={t('General.noData')} />
          ) : (
            <FullScreenLoader />
          )
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigateToMerchant(item)}
            style={styles.listItem}
          >
            <View
              style={[
                styles.imageWrapper,
                {
                  backgroundColor: isDark
                    ? colors.categoryGrey
                    : colors.highlatedGrey,
                },
              ]}
            >
              <Image
                style={[
                  styles.categoryImage,
                  {
                    tintColor: isDark ? colors.mainDarkMode : colors.darkBlue,
                  },
                ]}
                source={{ uri: item.image3 }}
                tintColor={isDark ? colors.mainDarkMode : colors.darkBlue}
              />
            </View>
            <TypographyText
              textColor={isDark ? colors.white : '#000'}
              size={15}
              font={LUSAIL_REGULAR}
              title={(() => {
                const words = (
                  language === 'ar' ? item.x_name_arabic : item.name
                ).split(' ');

                if (words.length === 2) {
                  // If there are two words, place the second word in the second line
                  return `${words[0]}\n${words[1]}`;
                } else if (words.length === 3) {
                  // If there are three words, apply the logic based on word lengths
                  if (words[0].length > words[2].length) {
                    return `${words[0]}\n${words.slice(1).join(' ')}`;
                  } else {
                    return `${words[0]} ${words[1]}\n${words[2]}`;
                  }
                } else {
                  // Default behavior for other cases
                  return words.join(' ');
                }
              })()}
              style={styles.categoryName}
              // numberOfLines={2}
              textBreakStrategy="simple"
              lineBreakStrategyIOS="none"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minHeight: 200,
    minWidth: '100%',
    marginTop: 25,
  },
  listItem: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderRadius: 32,
  },
  categoryName: {
    marginTop: 4,
    flex: 1,
    width: '100%',
    fontWeight: '700',
    width: 100,
    textAlign: 'center',
  },
  categoryItem: {
    marginRight: 16,
    flex: 1,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    marginTop: 16,
    paddingBottom: 40,
  },
  imageWrapper: {
    // flex:1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // ...mainStyles.generalShadow,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 46,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 32,
  },
  categoryImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 32,
  },
  contentContainerStyle: { flexGrow: 1 },
});

export default Categories;
