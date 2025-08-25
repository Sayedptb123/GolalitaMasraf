import React, { createContext, useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import CardPageHeader from "./CardPageHeader/CardPageHeader";
import { mainStyles } from "../../styles/mainStyles";
import { SceneMap, TabView } from "react-native-tab-view";
import { View } from "react-native";
import { colors } from "../../components/colors";
import QrCode from "./QrCode";
import Transactions from "./Transactions/Transactions";
import CashOut from "./CashOut/CashOut";
import Redeem from "./Redeem/Redeem";
import { connect } from "react-redux";
import { getTransactions } from "../../redux/transactions/transactions-thunks";
import useIsGuest from "../../hooks/useIsGuest";

const routes = [
  { key: "first" },
  { key: "second" },
  { key: "third" },
  { key: "fourth" },
];

const renderScene = SceneMap({
  first: QrCode,
  second: Transactions,
  third: CashOut,
  fourth: Redeem,
});

export const CardContext = createContext(null);

const CardPage = ({ route, getTransactions }) => {
  let params = route?.params;
  const [index, setIndex] = React.useState(params?.screen ?? 0);
  const [cardData, setCardData] = useState(null);
  const isGuest = useIsGuest();

  useEffect(() => {
    getTransactions();
  }, []);

  const handleChangeCard = (cardData) => {
    setCardData(cardData);
  };

  return (
    <MainLayout
      outsideScroll={true}
      headerChildren={<CardPageHeader onChangeCard={handleChangeCard} />}
    >
      <CardContext.Provider value={cardData}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: "100%" }}
          renderTabBar={(props) => {
            return (
              <View
                key={index}
                style={[mainStyles.centeredRow, { marginVertical: 16 }]}
              >
                {props.navigationState.routes.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      mainStyles.dot,
                      {
                        backgroundColor:
                          props.navigationState.index === index
                            ? colors.green
                            : colors.lightGrey,
                      },
                    ]}
                  />
                ))}
              </View>
            );
          }}
        />
      </CardContext.Provider>
    </MainLayout>
  );
};

export default connect(null, { getTransactions })(CardPage);
