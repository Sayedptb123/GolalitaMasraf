import React from "react";
import { View, ScrollView } from "react-native";
import { colors } from "../../../components/colors";
import { LUSAIL_REGULAR } from "../../../redux/types";
import { TypographyText } from "../../../components/Typography";

import { useTheme } from "../../../components/ThemeProvider";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import TransactionItem from "./TransactionItem";

const Transactions = ({ transactions }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  return (
    <ScrollView>
      <View style={{ marginBottom: 120 }}>
        <View style={{ alignItems: "center" }}>
          <TypographyText
            textColor={isDark ? colors.white : colors.darkBlue}
            size={18}
            font={LUSAIL_REGULAR}
            title={t("CardPage.transactions")}
            style={{ fontWeight: "700" }}
          />
          <TypographyText
            textColor={colors.grey}
            size={14}
            font={LUSAIL_REGULAR}
            title={t("CardPage.today")}
          />
        </View>
        {transactions.map((transaction, index) => (
          <TransactionItem key={index} transaction={transaction} />
        ))}
      </View>
    </ScrollView>
  );
};

const mapStateTopProps = (state) => ({
  transactions: state.transactionsReducer.transactions,
});

export default connect(mapStateTopProps, {})(Transactions);
