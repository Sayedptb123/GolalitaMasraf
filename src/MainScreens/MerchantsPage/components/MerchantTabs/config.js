import i18next from "i18next";

export const TABS = {
  NEARBY: "nearby",
  ALPHABETICAL: "alphabetical",
};

export const getTabsConfig = () => {
  return [
    {
      name: i18next.t("Merchants.nearby"),
      id: TABS.NEARBY,
    },
    {
      name: i18next.t("Merchants.alphabetical"),
      id: TABS.ALPHABETICAL,
    },
  ];
};
