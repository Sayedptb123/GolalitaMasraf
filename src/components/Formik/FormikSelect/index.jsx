import React from "react";
import { Field } from "formik";
import Select from "../../Form/Select";
import { View } from "react-native";

const FormikSelect = (props) => {
  const { name, wrapperStyle, onChange, single, ...restProps } = props;

  return (
    <View style={wrapperStyle}>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue } }) => {
          return (
            //@ts-ignore
            <Select
              {...restProps}
              // defaultValue={value}
              active={value}
              value={value}
              onChange={(val) => {
                setFieldValue(name, val);
              }}
              onClearPress={() => {
                setFieldValue(name, single ? undefined : []);
              }}
              single={single}
            />
          );
        }}
      </Field>
    </View>
  );
};

export default FormikSelect;
