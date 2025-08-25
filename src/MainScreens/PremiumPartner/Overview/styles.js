import { StyleSheet } from "react-native";
import { mainStyles } from "../../../styles/mainStyles";
import { colors } from "../../../components/colors";

const styles = StyleSheet.create({
  map: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDFE4",
    overflow: "hidden",
  },
  iconWrapper: {
    ...mainStyles.lightShadow,
    position: "absolute",
    top: 8,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 50,
  },
  notificationIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDFE4",
    borderRadius: 50,
  },
  shareIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDFE4",
    borderRadius: 50,
  },
  icon: {
    position: "absolute",
    top: -5,
    right: -5,
    zIndex: 100,
  },
  ribbon: {
    position: "absolute",
    zIndex: 100,
    width: 170,
    paddingVertical: 4,
    alignItems: "center",
    top: 0,
    left: -20,
  },
  p: { color: "white" },
  a: { color: "white" },
  h1: { color: "white" },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    // top: -32,
    //    backgroundColor:'red'
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
  },
  controllBtns: {
    flexDirection: "row",
    // alignItems: "center",
    // paddingHorizontal: 20,
    // width:'75%',
    marginVertical: 16,
  },
  imagesIndicator: {
    position: "absolute",
    bottom: 85,
    alignSelf: "center",
  },
  infoItem: {
    marginTop: 40,
    //borderWidth: 1.5,
    //borderRadius: 10,
    //borderColor: "rgba(211,211,211,0.3)",
    // padding: 12,
    // position: "relative",
    // paddingTop: 30,
  },
  infoItemTitleWrapper: {
    //padding: 6,
    // position: "absolute",
    // top: -30,
    width: "100%",
    // justifyContent: "center",
    //alignItems: "center",
  },
  infoItemTitle: {
    //borderWidth: 1.5,
    borderRadius: 10,
    // borderColor: "rgba(211,211,211,0.3)",
    //padding: 8,
  },
  infoItemValue: {
    marginTop: 3,
  },
  specialOfferBlock: {
    borderWidth: 1,
    borderColor: colors.grey,
    flexDirection: "row",
    borderRadius: 4,
    marginTop: 20,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  specialOfferBlockInfo: {
    padding: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    borderBottomWidth: 2.5,
    padding: 16,
  },
});

export default styles;
