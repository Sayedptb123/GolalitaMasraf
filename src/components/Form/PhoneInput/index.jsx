import React from "react";
import { View, StyleSheet,TouchableOpacity } from "react-native";
import FlagModal from "../../FlagModal/FlagModal";
import { isRTL } from "../../../../utils";
import { colors } from "../../colors";
import { BALOO_MEDIUM, BALOO_REGULAR,LUSAIL_REGULAR } from "../../../redux/types";
import { mainStyles } from "../../../styles/mainStyles";
import { TypographyText } from "../../Typography";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../ThemeProvider";

const PhoneInput = ({
  style,
  verified,
  onPressNotVerified,
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
  const { t } = useTranslation();

  const isRtl = !disableInputRtl && isRTL();

  style = {
    ...style,
    backgroundColor: isDark ? colors.secBlue : colors.white,
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
   
  <View style={{flexDirection:isRTL() ? "row-reverse" : "row" ,justifyContent:'space-between',flex:1}}>
  {label && (
        <TypographyText
          title={label}
          textColor={isDark ? colors.white : colors.darkBlue}
          size={14}
          font={BALOO_REGULAR}
          style={{
            marginBottom: 3,
           // width: "100%",
            textAlign: isRTL() ? "right" : "left",
            fontWeight: "700",
          }}
        />
      )}
 {verified == "verified" && <TypographyText
        title={ t("Login.verified")}
        textColor={
          error ? "#FF406E" : "green"
        }
        size={11}
        font={LUSAIL_REGULAR}
        style={{
          marginHorizontal: 3,
          //width: "100%",
          textAlign: isRTL() ? "right" : "left",
          fontWeight: "700",
        }}
      />}
      {verified == "notverified" &&
         <TouchableOpacity 
         style={{borderWidth:1.5,borderRadius:11,padding:3,borderStyle:"dotted",borderColor:'lightgrey',marginBottom:3}}
         onPress={() => onPressNotVerified()} >
         <TypographyText
         title={ t("Login.notverified")}
         textColor={
           error ? "#FF406E" : "red"
         }
         size={11}
         font={LUSAIL_REGULAR}
         style={{
           marginHorizontal: 3,
           //width: "100%",
           textAlign: isRTL() ? "right" : "left",
           fontWeight: "700",
         }}
       />
       </TouchableOpacity>
      }
      </View>
      <FlagModal
        style={[styles.input, style]}
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
          style={{ fontWeight: "700" }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  input: {
    ...mainStyles.lightShadow,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontFamily: BALOO_REGULAR,
    fontSize: 18,
    height: 54,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    textAlign: "left",
    zIndex: 0,
    marginBottom: 10,
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
