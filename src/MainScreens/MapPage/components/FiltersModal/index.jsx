import React, { useMemo, useRef, useCallback } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Portal from "../../../../components/Portal";
import { useTheme } from "../../../../components/ThemeProvider";
import { colors } from "../../../../components/colors";
import FiltersBtn from "../FiltersBtn";
import FiltersForm from "../FiltersForm";
import { isRTL } from "../../../../../utils";
import { TypographyText } from "../../../../components/Typography";
import { BALOO_MEDIUM } from "../../../../redux/types";

const FiltersModal = ({ onGetFilters, filters }) => {
  const { isDark } = useTheme();
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", "65%"], []);
  const name = "map-filters";

  const handleFilterBtnPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleSheetChanges = (index) => {
    if (!index) {
      bottomSheetModalRef.current?.close();
    }
  };

  const handleSubmit = (filters) => {
    bottomSheetModalRef.current?.close();
    onGetFilters(filters);
  };

  const handlePresentModalclose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  return (
    <>
      <FiltersBtn onPress={handleFilterBtnPress} />
      <Portal name={name}>
        <BottomSheetModalProvider key={name}>
          <View style={styles.container}>
            <BottomSheetModal
              key={name}
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              enablePanDownToClose={true}
              onChange={handleSheetChanges}
              backgroundStyle={{
                backgroundColor: isDark ? colors.darkBlue : colors.white,
              }}
              topInset={250}
            >
              <View
                style={{
                  width: "100%",
                  alignItems: isRTL() ? "flex-start" : "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => handlePresentModalclose()}
                  style={{
                    paddingHorizontal: 25,
                  }}
                >
                  <TypographyText
                    title={"X"}
                    textColor={isDark ? colors.white : colors.darkBlue}
                    size={21}
                    font={BALOO_MEDIUM}
                  />
                </TouchableOpacity>
              </View>
              <FiltersForm onSubmit={handleSubmit} filters={filters} />
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FiltersModal;
