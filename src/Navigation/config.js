export const linking = {
  prefixes: ["alrayanrewards://"],
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
