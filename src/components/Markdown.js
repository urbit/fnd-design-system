import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Markdoc, { Ast } from "@urbit/markdoc";
import { heading } from "../schema/heading.markdoc";
import { footnoteRef } from "../schema/footnoteRef.markdoc";
import { footnoteItem } from "../schema/footnoteItem.markdoc";
import { link } from "../schema/link.markdoc";
import { math } from "../schema/math.markdoc";
import { image } from "../schema/image.markdoc";
import { sup } from "../schema/superscript.markdoc";
import { fence } from "../schema/fence.markdoc";
import { tab, tabs } from "../schema/tabs.markdoc";
import { html } from "../schema/html.markdoc";
import { button } from "../schema/button.markdoc";
import { callout } from "../schema/callout.markdoc";
import { div } from "../schema/div.markdoc";
import { iframe } from "../schema/iframe.markdoc";
import { imagecard } from "../schema/imagecard.markdoc";
import { iconcard } from "../schema/iconcard.markdoc";
import { contentcard } from "../schema/contentcard.markdoc";
import { grid } from "../schema/grid.markdoc";
import { video } from "../schema/video.markdoc";
import { tooltip } from "../schema/tooltip.markdoc";
import Tabs from "./markdown/Tabs";
import Tab from "./markdown/Tab";
import Button from "./markdown/Button";
import Callout from "./markdown/Callout";
import Fence from "./markdown/Fence";
import ImageCard from "./ui/ImageCard/ImageCard";
import IconCard from "./ui/IconCard/IconCard";
import ContentCard from "./ui/ContentCard/ContentCard";
import Video from "./markdown/Video";
import tooltipWrapper from "./markdown/Tooltip";
import FatBlock from "./layout/FatBlock";
import parse from "html-react-parser";

const Math = dynamic(() => import("./markdown/Math"), {
  ssr: false,
});
const RenderHtml = ({ content }) => {
  return parse(content);
};

const superscript = ({ children }) => <sup>{children}</sup>;

const NextLink = ({ href, target, children }) => {
  return (
    <Link href={href} target={target}>
      {children}
      {href.charAt(0) !== "/" &&
        href.charAt(0) !== "#" &&
        typeof children[0] === "string" && <span>↗</span>}
    </Link>
  );
};

const Div = ({ className, id = "", title = "", children }) => {
  return (
    <div className={className} id={id} title={title}>
      {children}
    </div>
  );
};

const Grid = ({ children }) => {
  return (
    <FatBlock>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md-spacing">
        {children}
      </div>
    </FatBlock>
  );
};

const Iframe = ({ className, width, height, src, children }) => {
  return <iframe width={width} height={height} src={src} />;
};

export function MarkdownParse({ post, variables = {} }) {
  const tokeniser = new Markdoc.Tokenizer({ html: true, linkify: true });
  const tokens = tokeniser.tokenize(post.content);
  const ast = Markdoc.parse(tokens);
  const footnotedAst = footnoteParse(ast);
  const finalAst = uniqHead(footnotedAst);
  return Markdoc.transform(finalAst, {
    nodes: {
      fence,
      heading,
      image,
      link,
      footnoteItem,
      footnoteRef,
      html,
      sup,
    },
    tags: {
      tabs,
      tab,
      button,
      callout,
      RenderHtml,
      superscript,
      link,
      div,
      iframe,
      math,
      imagecard,
      iconcard,
      contentcard,
      grid,
      video,
      tooltip,
    },
    variables,
  });
}

export function MarkdownRender({ content, tooltipData = {} }) {
  return Markdoc.renderers.react(content, React, {
    components: {
      IconCard,
      ImageCard,
      ContentCard,
      Fence,
      Tabs,
      Tab,
      Button,
      Callout,
      RenderHtml,
      NextLink,
      Div,
      Iframe,
      Math,
      Grid,
      Video,
      Tooltip: tooltipWrapper(tooltipData),
    },
  });
}

const uniqHead = (ast) => {
  const uniqueHeadings = new Map([]);
  function generateID(children, attributes) {
    if (attributes.id && typeof attributes.id === "string") {
      return attributes.id;
    }

    const getBottom = (children) => {
      if (children?.attributes?.content) {
        if (uniqueHeadings.has(children.attributes.content)) {
          uniqueHeadings.set(
            children.attributes.content,
            uniqueHeadings.get(children.attributes.content) + 1
          );
          return `${children.attributes.content}-${uniqueHeadings.get(
            children.attributes.content
          )}`;
        } else {
          uniqueHeadings.set(children.attributes.content, 0);
          return children.attributes.content;
        }
      } else if (children[0]?.children) {
        return children[0]?.children.flatMap((child) => getBottom(child));
      } else if (children?.children) {
        return children.children.flatMap((child) => getBottom(child));
      } else {
        return children;
      }
    };

    return getBottom(children)
      .join("")
      .replace(/[=?!><:;,+#^|$&~"*@\.%/]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  }

  let newAst = ast;
  newAst.children = ast.children.map((e) => {
    if (e.type === "heading") {
      return new Ast.Node(
        e.type,
        {
          ...e.attributes,
          id: generateID(e.children, e.attributes),
        },
        e.children
      );
    } else {
      return e;
    }
  });
  return newAst;
};

const footnoteParse = (partialAst) => {
  const endNotePattern = /\[\^(\d+)\]:\s/m;
  const inlineFnPattern = /\[\^(\d+)\](?!:)/gm;

  function* getFootnoteItemNodes(nodes) {
    let results = [];
    let itemsProcessed = 0;
    for (const n of nodes) {
      itemsProcessed += 1;
      if (n.type !== "softbreak") results.push(n);
      if (n.type === "softbreak" || itemsProcessed === nodes.length) {
        yield results;
        results = [];
      }
    }
  }

  function findFootnoteContainerNode(ast) {
    const generator = ast.walk();
    let container;
    let match = false;
    for (const node of generator) {
      if (
        node.attributes.content &&
        endNotePattern.test(node.attributes.content)
      ) {
        match = true;
        generator.return();
      }
      if (node.type === "inline") container = node;
    }
    return match ? container : undefined;
  }

  function processFootnotes(ast) {
    // Get a refrence to the node containing endNotes; if not present, early return
    const fnContainerNode = findFootnoteContainerNode(ast);
    if (!fnContainerNode) return;
    // We have footnotes, so create a new list node which will contain the list of endNotes
    const fnList = new Ast.Node("list", {
      ordered: true,
      class: "footnotes",
    });
    // Get the children nodes for each footnote item
    const fnItems = getFootnoteItemNodes(fnContainerNode.children);
    for (const fn of fnItems) {
      const token = endNotePattern.exec(fn[0].attributes.content);
      if (token) {
        // Remove the markdown footnote syntax (e.g. [^1]) from the string
        fn[0].attributes.content = fn[0].attributes.content.replace(
          token[0],
          ""
        );
        // Create a new footnote item and append to the fnList
        const id = token[1];
        const fnItem = new Ast.Node(
          "footnoteItem",
          {
            id: `fn${id}`,
            href: `#fnref${id}`,
          },
          fn
        );
        fnList.push(fnItem);
      }
    }
    ast.children.pop(); // remove the last paragraph in the doc being replaced by the fnList
    ast.push(fnList);
  }

  function processFootnoteRefs(ast) {
    let parent = ast;
    for (const node of ast.walk()) {
      if (node.attributes.content) {
        // Check if there's a footnote ref token
        const token = inlineFnPattern.exec(node.attributes.content);
        if (token) {
          // Break the string where the foonote ref is, assign first part of string to the current node content
          const [prevText, nextText] = node.attributes.content.split(token[0]);
          node.attributes.content = prevText;

          // Create a footnote node and insert it in the tree
          const id = token[1];
          const fn = new Ast.Node("footnoteRef", {
            id: `fnref${id}`,
            href: `#fn${id}`,
            label: `${id}`,
          });
          parent.push(fn);

          // Create a text node for the text which follows after the footnote and insert it in the tree
          const next = new Ast.Node("text", { content: nextText });
          parent.push(next);
        }
      }
      // If the node is of inline type, update parent
      if (node.type == "inline") parent = node;
    }
  }

  processFootnoteRefs(partialAst);
  processFootnotes(partialAst);
  return partialAst;
};

const Markdown = {
  parse: MarkdownParse,
  render: MarkdownRender,
};

export default Markdown;
