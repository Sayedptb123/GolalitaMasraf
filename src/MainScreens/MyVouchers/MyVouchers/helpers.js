export const getCountryName = (countries, countryCode) => {
  return countries?.find((c) => {
    return c.code === countryCode;
  })?.name;
};

export const getCategoryName = (categories, categoryId) => {
  return categories?.find((c) => c.value === categoryId)?.label;
};
