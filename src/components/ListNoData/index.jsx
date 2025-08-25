import { View } from "react-native";
import { TypographyText } from "../Typography";
import { LUSAIL_REGULAR } from "../../redux/types";
import { useTheme } from "../ThemeProvider";
import { colors } from "../colors";

const ListNoData = (props) => {
  const { isDark } = useTheme();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <TypographyText
        title={props.text}
        textColor={isDark ? "white" : colors.darkBlue}
        size={16}
        font={LUSAIL_REGULAR}
        style={{ fontWeight: "700" }}
      />
    </View>
  );
};

export default ListNoData;
