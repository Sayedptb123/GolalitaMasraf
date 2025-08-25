import { Field } from "formik";
import LocationPicker from "../../../MainScreens/MerchantsPage/MerchantsFilters/components/LocationPicker";
import { View } from "react-native";

const FormikLocationPicker = (props) => {
  const {
    wrapperStyle,
    name,
    onChangeCallback,
    selectedCountry,
    ...restProps
  } = props;
  return (
    <View style={wrapperStyle}>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue } }) => (
          <LocationPicker
            {...restProps}
            selectedCountry={selectedCountry}
            value={value}
            onChange={(val) => setFieldValue(name, val)}
          />
        )}
      </Field>
    </View>
  );
};

export default FormikLocationPicker;
