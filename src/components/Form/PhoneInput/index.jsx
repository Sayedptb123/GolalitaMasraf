import React from "react";
import { View, StyleSheet } from "react-native";
import FlagModal from "../../FlagModal/FlagModal";
import { isRTL } from "../../../../utils";
import { colors } from "../../colors";
import { BALOO_MEDIUM, BALOO_REGULAR } from "../../../redux/types";
import { mainStyles } from "../../../styles/mainStyles";
import { TypographyText } from "../../Typography";
import { useTheme } from "../../ThemeProvider";

const PhoneInput = ({
  style,
  disableInputRtl,
  disabled,
  error,
  onChange,
  value,
  defaultPhoneSchema,
  onSubmitEditing,
  wrapperStyle = {},
  label,
  innerRef,
}) => {
  const { isDark } = useTheme();

  const isRtl = !disableInputRtl && isRTL();

  style = {
    ...style,
    backgroundColor: isDark ? colors.mainDarkModeText : colors.white,
    color: isDark ? colors.white : colors.darkBlue,
  };

  const validatePhone = (numberStr, code) => {
    if (defaultPhoneSchema && !numberStr.startsWith(code)) {
      return defaultPhoneSchema;
    }

    return numberStr;
  };

  const handlePhoneChange = (numberStr) => {
    onChange(validatePhone(numberStr, defaultPhoneSchema));
  };

  return (
    <View style={{ position: "relative", ...wrapperStyle }}>
      {label && (
        <TypographyText
          title={label}
          textColor={isDark ? colors.white : colors.darkBlue}
          size={14}
          font={BALOO_REGULAR}
          style={{
            marginBottom: 3,
            width: "100%",
            textAlign: isRTL() ? "right" : "left",
            fontWeight: "700",
          }}
        />
      )}

      <FlagModal
        style={[
          styles.input,
          style,
          {
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: isDark ? colors.darkGrey : "transparent",
          },
        ]}
        disableRtl={disableInputRtl}
        textStyle={[
          style,
          styles.inputText,
          isRtl && { textAlign: "right", marginRight: 40 },
          isDark && { color: colors.white },
        ]}
        value={value}
        initialValue={value}
        disabled={disabled}
        onChangePhoneNumber={handlePhoneChange}
        onSubmitEditing={onSubmitEditing}
        ref={innerRef}
      />

      {!!error && (
        <TypographyText
          title={error}
          textColor={"#FF406E"}
          size={14}
          font={BALOO_MEDIUM}
          style={{ fontWeight: "700", marginTop: 10 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  input: {
    ...mainStyles.lightShadow,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontFamily: BALOO_REGULAR,
    fontSize: 18,
    height: 52,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    textAlign: "left",
    zIndex: 0,
  },
  error: {
    backgroundColor: "#FFEBEB",
    borderColor: "#FF406E",
  },
  inputText: {
    fontFamily: BALOO_REGULAR,
    fontSize: 18,
    backgroundColor: colors.transparent,
  },
});

export default PhoneInput;
