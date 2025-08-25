import React,{useEffect} from "react";
import { ImageBackground, View } from "react-native";
import styles from "./styles";
import { colors } from "../colors";
import { LUSAIL_REGULAR } from "../../redux/types";
import { TypographyText } from "../Typography";
import { useTranslation } from "react-i18next";

const cardImage = require("../../assets/card.jpg");

const Card = ({
  availablePoints,
  name,
  expiryDate,
  barcode,
  lname,
  nameAr,
  lnameAr,
  renderHeader,
  isVIP,
}) => {
  const {i18n, t } = useTranslation();

  const language = i18n.language;
  useEffect(() => {

  }, [language]);
  return (
    <View>
      {/* {renderHeader?.()} */}
      <View style={styles.wrapper}>
        <ImageBackground
          source={cardImage}
          style={styles.card}
          resizeMode="stretch"
        >
          <View style={styles.cardNoBlock}>
            <TypographyText
              textColor={colors.white}
              size={24}
              font={LUSAIL_REGULAR}
              title={barcode.replace(/(.{4})(?=.)/g, "$1 ")}
              style={[
                styles.cardNoText, //, styles.name
              ]}
              numberOfLines={1}
            />
          </View>

          <View style={styles.bottomRow}>
            <View>
              <TypographyText
                textColor={colors.white}
                size={14}
                font={LUSAIL_REGULAR}
                title={null}
              />
              <TypographyText
                textColor={colors.white}
                size={16}
                font={LUSAIL_REGULAR}
                title={null}
                style={styles.generalText}
              />
            </View>

          <View style={{}}>
          <View style={styles.nameBlockAr}>
              <TypographyText
                textColor={colors.white}
                size={20}
                font={LUSAIL_REGULAR}
                title={nameAr}
                style={[
                  styles.generalText, //, styles.name
                ]}
                numberOfLines={1}
              />
              <TypographyText
                textColor={colors.white}
                size={20}
                font={LUSAIL_REGULAR}
                title={" "}
                style={[
                  styles.generalText, //, styles.name
                ]}
                numberOfLines={1}
              />
              <TypographyText
                textColor={colors.white}
                size={20}
                font={LUSAIL_REGULAR}
                title={lnameAr}
                style={[
                  styles.generalText, //, styles.name
                ]}
                numberOfLines={1}
              />
            </View>
            <View style={styles.nameBlock}>
              <TypographyText
                textColor={colors.white}
                size={20}
                font={LUSAIL_REGULAR}
                title={name}
                style={[
                  styles.generalText, //, styles.name
                ]}
                numberOfLines={1}
              />
              <TypographyText
                textColor={colors.white}
                size={20}
                font={LUSAIL_REGULAR}
                title={" "}
                style={[
                  styles.generalText, //, styles.name
                ]}
                numberOfLines={1}
              />
              <TypographyText
                textColor={colors.white}
                size={20}
                font={LUSAIL_REGULAR}
                title={lname}
                style={[
                  styles.generalText, //, styles.name
                ]}
                numberOfLines={1}
              />
            </View>
          </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Card;
