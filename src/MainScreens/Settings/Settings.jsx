import React from "react";
import MainLayout from "../../components/MainLayout";
import { SCREEN_HEIGHT } from "../../styles/mainStyles";
import Modes from "./components/Modes";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();

  return (
    <MainLayout
      headerHeight={50}
      headerChildren={<Header label={t("Settings.settings")} btns={["back"]} />}
      outsideScroll={false}
      contentStyle={{ height: SCREEN_HEIGHT - 120, paddingHorizontal: 20 }}
    >
      <Modes />
    </MainLayout>
  );
};

export default Settings;
