import * as React from "react";
// import {useColorScheme} from 'react-native-appearance';
import { Text, TouchableOpacity } from "react-native";
import { colors } from "./colors";
const darkColors = {
  mainBg: "#2F1539",
};

const lightColors = {
  mainBg: "#FFFFFF",
  secondaryBg: "#F4F3F5",
};

export const ThemeContext = React.createContext({
  isDark: true,
  colors: darkColors,
  setScheme: () => {},
});

export const ThemeProvider = (props) => {
  // Getting the device color theme, this will also work with react-native-web
  // const colorScheme = useColorScheme(); // Can be dark | light | no-preference
  const colorScheme = "light";
  /*
   * To enable changing the app theme dynamicly in the app (run-time)
   * we're gonna use useState so we can override the default device theme
   */
  const [isDark, setIsDark] = React.useState(colorScheme === "dark");

  // Listening to changes of device appearance while in run-time
  React.useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  const defaultTheme = {
    isDark,
    // Chaning color schemes according to theme
    colors: isDark ? darkColors : lightColors,
    // Overrides the isDark value will cause re-render inside the context.
    setScheme: (scheme) => {
      if (scheme === "dark") {
        colors.darkBlue = "#0076a5";
        colors.navyBlue = "#06b1d6";
      } else {
        colors.darkBlue = "#4cc1e1d9";
        colors.navyBlue = "#072536";
      }
      //#072536
      setIsDark(scheme === "dark");
    },
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useTheme = () => React.useContext(ThemeContext);
