import React, { useMemo } from "react";
import Select from "../../../../../../components/Form/Select";
import useMerchants from "../../../../hooks/useMerchants";
import { useTranslation } from "react-i18next";

const transformCategories = (categories,isArabic) => {

  return categories?.map((item) => ({
    value: item.merchant_name,
    label: !isArabic ? item.merchant_name :item.x_arabic_name,
  }));
};

const MerchantsSelect = ({
  locationId,
  onChange,
  value,
  placeholder,
  latitude,
  longitude,
}) => {
  const { isLoading, data } = useMerchants(latitude, longitude);

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const options = useMemo(() => {
    const transformedData = transformCategories(data,isArabic) || [];

    return transformedData;
  }, [data?.length, locationId]);

  return (
    <Select
      name="map-merchants-select"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClearPress={() => {
        onChange(null);
      }}
      single={true}
      loading={isLoading}
      options={options}
      allowClear
    />
  );
};

export default MerchantsSelect;
