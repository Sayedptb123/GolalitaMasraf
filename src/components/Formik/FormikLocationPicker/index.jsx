import { Field } from "formik";
import LocationPicker from "../../../MainScreens/MerchantsPage/MerchantsFilters/components/LocationPicker";
import { View } from "react-native";

const FormikLocationPicker = (props) => {
  const { wrapperStyle, name,onChangeCallback, ...restProps } = props;
  return (
    <View style={wrapperStyle}>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue } }) => {
          return (
            <LocationPicker
              {...restProps}
              value={value}
              onChange={(val) => {
                setFieldValue(name, val);
                if (onChangeCallback) {
                  onChangeCallback(val); // Call the callback
                }
              }}
            />
          );
        }}
      </Field>
    </View>
  );
};

export default FormikLocationPicker;
