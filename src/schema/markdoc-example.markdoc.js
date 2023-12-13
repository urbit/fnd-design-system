import { Tag } from "@urbit/markdoc";

export const markdocExample =  {
  render: "Fence",
  attributes: {},
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const { content, language } = node.children[0].attributes;

    return new Tag(this.render, { ...attributes, language }, [content]);
  },
};
