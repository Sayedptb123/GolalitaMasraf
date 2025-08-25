import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TypographyText } from "../../../../components/Typography";
import { BALOO_REGULAR } from "../../../../redux/types";
import { getFlexDirection } from "../../../../../utils";
import { colors } from "../../../../components/colors";
import { mainStyles } from "../../../../styles/mainStyles";
import { useTheme } from "../../../../components/ThemeProvider";

const redLogoIcon = require("../../../../../assets/small_red_logo.png");
const logoIcon = require("../../../../../assets/small_logo.png");

const TransactionItem = ({ isPoints, transaction }) => {
  const { isDark } = useTheme();
  
  return (
    <View style={[styles.item, getFlexDirection()]}>
      <View style={[mainStyles.row, getFlexDirection()]}>
        <View style={[mainStyles.logoWrapper, { width: 44, height: 44 }]}>
          <Image
            source={{
              uri:
                transaction.merchant_logo !== false
                  ? transaction.merchant_logo
                  : transaction.transfer_to_logo,
            }}
            style={{ width: 33, height: 33, borderRadius: 50 }}
          />
        </View>
        {transaction.category_image ? (
          <View style={{ marginLeft: 9 }}>
            <Image
              source={{ uri: transaction.category_image }}
              style={{ width: 20, height: 20, borderRadius: 10 }}
            />
          </View>
        ) : (
          <View style={{ width: 30 }} />
        )}
        <View>
          {(transaction.merchant_name || transaction.transfer_to) && (
            <TypographyText
              textColor={isDark ? colors.white : colors.darkBlue}
              size={14}
              font={BALOO_REGULAR}
              title={
                transaction.merchant_name !== false
                  ? transaction.merchant_name
                  : transaction.transfer_to
              }
              style={{ marginLeft: 15 }}
            />
          )}
          <TypographyText
            textColor={isDark ? colors.white : colors.darkBlue}
            size={14}
            font={BALOO_REGULAR}
            title={transaction.category_name}
            style={{ marginLeft: 15 }}
          />
        </View>
      </View>
      {!isPoints ? (
        <View style={[mainStyles.row, getFlexDirection()]}>
          <TypographyText
            textColor={isDark ? colors.white : colors.darkBlue}
            size={14}
            font={BALOO_REGULAR}
            title={transaction.debit !== 0 ? "-" : "+"}
          />
          <View style={{ marginHorizontal: 4 }}>
             <Image source={transaction.debit !== 0 ? redLogoIcon: logoIcon} style={styles.logo} resizeMode="contain"/> 
          </View>
          <TypographyText
            textColor={isDark ? colors.white : colors.darkBlue}
            size={14}
            font={BALOO_REGULAR}
            title={
              transaction.debit !== 0 ? transaction.debit : transaction.credit
            }
          />
        </View>
      ) : (
        <TypographyText
          textColor={isDark ? colors.white : colors.darkBlue}
          size={14}
          font={BALOO_REGULAR}
          title={`${transaction.debit !== 0 ? "-" : "+"} ${
            transaction.sale_amount
          } QAR`}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    ...mainStyles.betweenRow,
    ...mainStyles.p20,
    marginBottom: 20,
  },
  logo: {
    height: 16,
    width: 16
  }
});

export default TransactionItem;
