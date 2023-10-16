import React, { Children, useState } from "react";
import FatBlock from "../FatBlock";
import Section from "../Section";

export default function ExpandSection({ className = "", title, children }) {
  const [expand, setExpand] = useState(false);

  return (
    <Section divider>
      <h2 className="h2 text-brite mb-24">{title}</h2>
      <FatBlock className="grid md:hidden grid-cols-2 gap-3.5 mb-16">
        {!expand && Children.toArray(children).slice(0, 2)}
        {expand && children}
      </FatBlock>
      <FatBlock className="hidden md:grid xl:hidden grid-cols-3 gap-5 mb-16">
        {!expand && Children.toArray(children).slice(0, 3)}
        {expand && children}
      </FatBlock>
      <FatBlock className="hidden xl:grid grid-cols-4 gap-7 mb-16">
        {!expand && Children.toArray(children).slice(0, 4)}
        {expand && children}
      </FatBlock>
      <div className="flex flex-col items-center">
        <button
          className="text-brite body-md"
          onClick={() => setExpand(!expand)}
        >
          {expand ? "Close ↑" : "Show more ↓"}
        </button>
      </div>
    </Section>
  );
}
