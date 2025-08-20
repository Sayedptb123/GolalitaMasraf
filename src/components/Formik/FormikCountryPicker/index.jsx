import { Field } from "formik";
import CountryPicker from "../../Form/CountryPicker";
import { View } from "react-native";

const FormikCountryPicker = (props) => {
  const { wrapperStyle,value, name,onChangeCallback, ...restProps } = props;
  return (
    <View style={wrapperStyle}>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue } }) => {
          return (
            <CountryPicker
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

export default FormikCountryPicker;
