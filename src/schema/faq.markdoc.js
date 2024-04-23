import { Tag } from "@urbit/markdoc";

export const faqSection = {
  render: "FaqSection",
  attributes: {
    question: {
      type: String,
    },
    first: {
      type: Boolean,
    },
  },
};

export const faq = {
  render: "Faq",
  attributes: {},
  transform(node, config) {
    let count = 0;
    const children = node.transformChildren(config).map((c) => {
      const child = { ...c };
      if (c.name === "FaqSection" && count === 0) {
        count += 1;
        child.attributes.first = true;
      }
      return child;
    });

    return new Tag(this.render, {}, children);
  },
};
