import DateTimePickerModal from "react-native-modal-datetime-picker";
import Input from "../../Input/Input";
import { Keyboard, Platform } from "react-native";
import i18next from "i18next";
import { useState } from "react";
import { Field } from "formik";

const getDateStringPayload = (date) => {
  if (!date?.getFullYear) return "";

  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

const toArabicNumbers = (value) => {
  return value.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
};

const getDateString = (date) => {
  if (!date) return "";

  const transformedDate = getDateStringPayload(date);

  if (i18next.language === "ar") {
    return toArabicNumbers(transformedDate);
  }

  return transformedDate;

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  const langFormat = i18next.language === "ar" ? "ar-EG" : "en-GB";

  console.log(langFormat, "");

  const formattedDate = new Date(date).toLocaleDateString(langFormat, options);

  console.log(formattedDate, "formattedDate");

  return formattedDate;
};

// Utility function to convert numbers to Arabic numerals

const FormikDateSelect = ({ name, mode = "date", placeholder, error }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Field name={name}>
      {({ field: { value }, form: { setFieldValue } }) => {
        return (
          <>
            <DateTimePickerModal
              isVisible={isVisible}
              mode={mode}
              onConfirm={(date) => {
                Keyboard.dismiss();
                setIsVisible(false);
                setFieldValue(name, date);
              }}
              onCancel={() => setIsVisible(false)}
            />
            <Input
              placeholder={placeholder}
              value={getDateString(value)}
              onPressIn={() => {
                setIsVisible(true);
              }}
              editable={Platform.OS === "ios" ? false : true}
              error={error}
              wrapperStyle={{ marginBottom: 10 }}
              showSoftInputOnFocus={false}
            />
          </>
        );
      }}
    </Field>
  );
};

export default FormikDateSelect;
