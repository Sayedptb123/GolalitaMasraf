import { useEffect, useState } from "react";
import { StyleSheet, View,TouchableOpacity } from "react-native";
import { TypographyText } from "../../../../components/Typography";
import { BALOO_BOLD } from "../../../../redux/types";
import { useTheme } from "../../../../components/ThemeProvider";
import { colors } from "../../../../components/colors";
import { useTranslation } from "react-i18next";
import Range from "../../components/Amount/Range";
import BottomSheetComponent from "../../../../components/Form/BottomSheetComponent";
import { isRTL } from "../../../../../utils";
import ArrowDownSvg from "../../../../assets/arrow_down_thin.svg";
import { sized } from "../../../../Svg";

const getOptions = (denominations) => {
  return denominations.map((val) => ({
    value: val,
    label: val,
  }));
};

const CardmolaGiftCardAmount = ({
  onSlidingComplete,
  denominationType,
  denominations,
}) => {
  const { isDark } = useTheme();
  const [amount, setAmount] = useState(Math.ceil(denominations?.[0]) || 0);
  const { t } = useTranslation();

  useEffect(() => {
    if (denominations) {
      setAmount(denominations[0]);
      onSlidingComplete(denominations[0]);
    }
  }, [denominations?.[0]]);

  const ArrowIcon = sized(
    ArrowDownSvg,
    24,
    24,
    isDark ? "#838383" : colors.darkBlue
  );

  const handleValueChange = (value) => {
    setAmount(Math.ceil(+value));
  };

  const incrementValue = (value) => {
    console.log("incrementValueincrementValue",value)
    handleSlidingComplete(value);
      setAmount(value); // Adjust increment step as needed
  };
  const decrementValue = (sliderValue) => {
    if (amount - 1 > Math.ceil(denominations[0])) {
      handleSlidingComplete(sliderValue);
      setAmount(sliderValue); // Adjust decrement step as needed
    }
  };

  const handleSlidingComplete = (value) => {
    onSlidingComplete(Math.ceil(+value));
  };

  return (
    <View>
      <TypographyText
        title={t("Vouchers.giftCardAmount")}
        textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
        size={18}
        font={BALOO_BOLD}
        style={styles.priceTitle}
      />

      {denominationType === "Variable" && (
        <View>
          <Range
            minAmount={denominations[0]}
            maxAmount={denominations[1]}
            onValueChange={handleValueChange}
            onSlidingComplete={handleSlidingComplete}
            maximumTrackTintColor={
              isDark ? colors.mainDarkMode : colors.darkBlue
            }
            thumbTintColor={isDark ? colors.white : colors.darkBlue}
          />
<View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems:'center',
              //backgroundColor: "red",
              paddingTop:21
            }}
          >
            <TouchableOpacity
              style={styles.incridecriButton}
              onPress={() => decrementValue(amount - 1)}
            >
              <TypographyText
                title={`-`}
                textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
                size={22}
                font={BALOO_BOLD}
                style={{}}
              />
            </TouchableOpacity>
          <TypographyText
            title={`QAR ${amount}`}
            textColor={isDark ? colors.mainDarkMode : colors.mainDarkModeText}
            size={18}
            font={BALOO_BOLD}
            style={styles.price}
          />
          <TouchableOpacity
            style={styles.incridecriButton}
            onPress={() => {
              incrementValue(amount + 1);
            }}
          >
            <TypographyText
              title={`+`}
              textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
              size={22}
              font={BALOO_BOLD}
              style={{}}
            />
          </TouchableOpacity>
        </View>
      </View>
      )}

      {denominationType === "Fixed" && (
        <BottomSheetComponent
          name="cardmola-giftcard-amount"
          renderSelect={() => {
            return (
              <View
                style={[
                  styles.amountSelect,
                  {
                    flexDirection: isRTL() ? "row-reverse" : "row",
                    borderColor: isDark ? "#838383" : colors.darkBlue,
                  },
                ]}
              >
                <TypographyText
                  textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
                  size={16}
                  title={amount}
                  numberOfLines={1}
                />

                <ArrowIcon />
              </View>
            );
          }}
          options={getOptions(denominations)}
          onChange={(val) => {
            if (val) {
              setAmount(val);
              handleSlidingComplete(val);
            }
          }}
          onClearPress={() => {
            setAmount(null);
            handleSlidingComplete(val);
          }}
          single
          modalTitle={t("Vouchers.amount")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  amountSelect: {
    borderWidth: 1,
    borderColor: "red",
    padding: 14,
    borderRadius: 12,
    borderColor: "#838383",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceTitle: {
    marginTop: 24,
    marginBottom: 11,
  },
  price: {
    textAlign: "center",
    marginTop: 11,
  },
  select: {
    marginTop: 10,
  },
  incridecriButton:{
   // backgroundColor:'green',
    paddingHorizontal:19,
  }
});

export default CardmolaGiftCardAmount;
