import { StyleSheet } from "react-native";
import { mainStyles, SCREEN_HEIGHT } from "../../styles/mainStyles";
import { colors } from "../../components/colors";
import { LUSAIL_REGULAR } from "../../redux/types";

export const styles = StyleSheet.create({
  container: {
    ...mainStyles.lightShadow,
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 30,
    minHeight: (SCREEN_HEIGHT / 100) * 72,
  },
  icon: {
    position: "absolute",
    top: -5,
    right: -5,
    zIndex: 100,
  },
  codeWrapper: {
    marginTop: 35,
  },
  cell: {
    borderWidth: 1,
    borderColor: colors.label,
    borderStyle: "solid",
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    color: colors.label,
    fontSize: 40,
    fontFamily: LUSAIL_REGULAR,
    fontWeight: "700",
    textAlign: "center",
  },
  label: {
    color: colors.grey,
    fontSize: 12,
    fontFamily: LUSAIL_REGULAR,
    textAlign: "center",
  },
  labelWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    fontSize: 5,
  },
  contentContainer: {
    paddingBottom: 60,
    flexGrow: 1,
  },
});
