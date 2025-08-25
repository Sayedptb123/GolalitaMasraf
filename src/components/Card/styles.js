import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../../styles/mainStyles";

const styles = StyleSheet.create({
  wrapper: {
    width: (SCREEN_WIDTH / 100) * 86,
    overflow: "hidden",
    borderRadius: 8,
    //padding:13,
   // backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center',
    marginTop:76
  },
  card: {
    paddingHorizontal: 17,
    paddingVertical: 15,
    width: (SCREEN_WIDTH / 100) * 86,
   // left: -2,
    //bottom: -2,
    height: 220,
    justifyContent:"flex-end",
    borderRadius: 8,
    overflow:'hidden'
   // marginTop:16,
   // paddingTop:16
  },
  nameBlock: {
    flex: 1,flexDirection:'row',
    justifyContent: "flex-end",
    alignItems:'flex-end',
  },
  nameBlockAr: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    //alignItems:'flex-end'
  },
  cardNoBlock:{
    alignItems:'flex-end',
    marginBottom:11
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex:.3,
  },
  generalText: {
    fontWeight: "600",
  },
  cardNoText: {
    fontWeight: "700",
  },
  name: {
    marginBottom: -40,
  },
});

export default styles;
