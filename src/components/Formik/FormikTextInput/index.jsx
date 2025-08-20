import React from "react";
import { StyleSheet } from "react-native";
import { Field } from "formik";
import { BALOO_REGULAR } from "../../../redux/types";
import Input from "../../Input/Input";

const FormikTextInput = (props) => {
  const { name, ...restProps } = props;

  return (
    <Field name={name}>
      {({ field: { value }, form: { setFieldValue } }) => {
        return (
          <>
            <Input
              {...restProps}
              value={value}
              onChangeText={(val) => {
                setFieldValue(name, val);
              }}
            />
          </>
        );
      }}
    </Field>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: "#999CAD",
    height: 36,
    paddingLeft: 10,
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: BALOO_REGULAR,
  },
});

export default FormikTextInput;
