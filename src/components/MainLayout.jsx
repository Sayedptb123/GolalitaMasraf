import React from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "./colors";
import { mainStyles, SCREEN_HEIGHT } from "../styles/mainStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "./ThemeProvider";

const MainLayout = ({
  headerChildren,
  children,
  outsideScroll,
  headerHeight,
  customColors,
  contentStyle,
  style,
}) => {
  const { isDark } = useTheme();

  return (
    <View
      style={[{ flex: 1, backgroundColor: isDark ? "#0076a5" : "#fff" }, style]}
      colors={
        customColors
          ? customColors
          : [colors.green, colors.lightGreen, colors.lightGreen]
      }
    >
      <View style={styles.container}>
        <SafeAreaView>
          <View
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            style={[mainStyles.lightShadow, { height: SCREEN_HEIGHT }]}
          >
            <View style={{ minHeight: headerHeight ?? 200 }}>
              {headerChildren}
            </View>
            {!outsideScroll && (
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={[
                  styles.content,
                  isDark && { backgroundColor: colors.darkBlue },
                ]}
              >
                {children}
                <View style={{ marginBottom: 160 }} />
              </KeyboardAwareScrollView>
            )}
            {outsideScroll && (
              <View
                style={[
                  styles.content,
                  isDark && { backgroundColor: "#0076a5" },
                  contentStyle,
                ]}
              >
                {children}
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: SCREEN_HEIGHT - 250,
    paddingBottom: 70,
    overflow: "hidden",
  },
});

export default MainLayout;
