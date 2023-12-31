export const contentcard = {
  render: "ContentCard",
  attributes: {
    className: {
      type: String,
      default: "my-6"
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
    imgSrc: {
      type: String,
    },
    small: {
      type: Boolean,
      default: true,
    }
  },
};
