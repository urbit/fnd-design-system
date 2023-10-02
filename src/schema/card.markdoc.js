export const card = {
  render: "Card",
  attributes: {
    className: {
      type: String,
    },
    colorScheme: {
      type: String,
      default: "gray",
      matches: ["gray", "brite", "lite"],
    },
    href: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    backgroundImage: {
      type: String,
    },
  },
};
