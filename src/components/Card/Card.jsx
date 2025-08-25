import React from "react";
import { ImageBackground, View } from "react-native";
import styles from "./styles";
import { colors } from "../colors";
import { LUSAIL_REGULAR } from "../../redux/types";
import { TypographyText } from "../Typography";
import { mainStyles } from "../../styles/mainStyles";
import { useTranslation } from "react-i18next";
import { getFlexDirection } from "../../../utils";

const Card = ({
  availablePoints,
  name,
  expiryDate,
  lname,
  renderHeader,
  isVIP,
  isMainUser,
  index,
}) => {
  const { t } = useTranslation();

  const cardBorderStyle = { borderWidth: 1, borderColor: colors.mainDarkMode };
  const imageBackground =
    isMainUser && index === 0
      ? require("../../assets/card_bg_new.jpg")
      : require("../../assets/card_bg.jpg");

  return (
    <View>
      {renderHeader?.()}
      <View style={[styles.wrapper, cardBorderStyle]}>
        <ImageBackground
          source={imageBackground}
          style={styles.card}
          resizeMode="stretch"
        >
          <View
            style={{
              height: "100%",
              justifyContent: "space-between",
              position: "absolute",
              top: 10,
              left: 20,
            }}
          >
            <View style={[mainStyles.betweenRow, getFlexDirection()]}>
              <View style={styles.textWrapper}>
                {/* <TypographyText
                textColor={colors.white}
                size={14}
                font={LUSAIL_REGULAR}
                title={t("CardPage.availablePoint")}
              />
              <TypographyText
                textColor={colors.white}
                size={18}
                font={LUSAIL_REGULAR}
                title={"Golalita members"}
                style={{ fontWeight: "700" }}
              /> */}
              </View>
            </View>
            <View
              style={[
                mainStyles.betweenRow,
                { alignItems: "flex-end" },
                getFlexDirection(),
              ]}
            >
              <View style={styles.textWrapper}>
                <View>
                  <TypographyText
                    textColor={colors.white}
                    size={14}
                    font={LUSAIL_REGULAR}
                    title={t("CardPage.exp")}
                  />
                  <TypographyText
                    textColor={colors.white}
                    size={16}
                    font={LUSAIL_REGULAR}
                    title={expiryDate}
                    style={{ marginTop: -4, fontWeight: "700" }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              mainStyles.centeredRow,
              {
                //marginTop: 5, marginBottom: 15,
              },
            ]}
          >
            <TypographyText
              textColor={colors.white}
              size={24}
              font={LUSAIL_REGULAR}
              title={name}
              style={{ fontWeight: "700" }}
              numberOfLines={1}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Card;
