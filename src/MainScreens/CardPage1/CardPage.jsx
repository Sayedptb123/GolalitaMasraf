import React, { createContext, useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import CardPageHeader from "./CardPageHeader/CardPageHeader";
import { SCREEN_HEIGHT } from "../../styles/mainStyles";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { getTransactions } from "../../redux/transactions/transactions-thunks";

export const CardContext = createContext(null);

const CardPage = ({ route, getTransactions }) => {
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    getTransactions();
  }, []);

  const handleChangeCard = (cardData) => {
    setCardData(cardData);
  };

  return (
    <MainLayout
      outsideScroll={true}
      headerHeight={0}
      contentStyle={{ height: SCREEN_HEIGHT - 120 }}
    >
      <CardContext.Provider value={cardData}>
        <CardPageHeader onChangeCard={handleChangeCard} />
      </CardContext.Provider>
    </MainLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default connect(null, { getTransactions })(CardPage);
