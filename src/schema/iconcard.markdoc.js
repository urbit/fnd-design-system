export const iconcard = {
  render: "IconCard",
  attributes: {
    className: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    label: {
      type: String,
    },
    href: {
      type: String,
    },
    icon: {
      type: String,
    },
    weight: {
      type: String,
      default: "regular",
      matches: [
        "ultrathin",
        "thin",
        "light",
        "regular",
        "medium",
        "semibold",
        "bold",
      ],
    },
    small: {
      type: Boolean,
    },
  },
};
