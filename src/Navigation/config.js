export const linking = {
  prefixes: ["emtiazapp://"],
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
