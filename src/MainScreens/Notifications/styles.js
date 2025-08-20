import { StyleSheet } from "react-native";
import { mainStyles } from "../../styles/mainStyles";
import { colors } from "../../components/colors";

const styles = StyleSheet.create({
  notification: {
    flexDirection: "row",
    alignItems: "center",
    ...mainStyles.p20,
    alignItems: "flex-start",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    borderStyle: "solid",
  },
  deleteButton: {
    backgroundColor: colors.darkBlue,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  descriptionWrapper: {
    marginHorizontal: 16,
    flex: 1,
    justifyContent: "center",
  },
  dateWrapper: {
    width: 70,
  },
  date: {
    flex: 1,
    marginTop: 5,
  },
  fullWidth: {
    flex: 1,
  },
  notificationIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
