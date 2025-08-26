export const linking = {
  prefixes: ["golalitamasraf://"],
  config: {
    screens: {
      Home: {
        screens: {
          TabsBar: {
            screens: {
              myVouchers: {
                screens: {
                  ["myVouchers-list"]: "giftcards",
                },
              },
            },
          },
        },
      },
    },
  },
};
