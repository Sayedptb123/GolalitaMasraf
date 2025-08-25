export const getWorkingHours = (isArabic, merchantDetails) => {
  if (isArabic) {
    if (merchantDetails.x_time_from_ar && merchantDetails.x_time_to_ar) {
      return `${merchantDetails.x_time_from_ar} - ${merchantDetails.x_time_to_ar}`;
    }

    if (merchantDetails.x_time_from_ar) {
      return merchantDetails.x_time_from_ar;
    }

    if (merchantDetails.x_time_to_ar) {
      return merchantDetails.x_time_to_ar;
    }
  }

  if (merchantDetails.open_from && merchantDetails.open_till) {
    return `${merchantDetails.open_from} - ${merchantDetails.open_till}`;
  }

  if (merchantDetails.open_from) {
    return merchantDetails.open_from;
  }

  if (merchantDetails.open_till) {
  }

  return "";
};
