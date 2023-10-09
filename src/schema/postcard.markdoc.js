export const postcard = {
  render: "PostCard",
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
    date: {
      type: String,
    },
    authorName: {
      type: String,
    },
    authorPlanet: {
      type: String,
    },
    href: {
      type: String,
    },
    imgSrc: {
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
  },
};
