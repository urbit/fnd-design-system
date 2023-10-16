import React, { useState } from "react";
import FatBlock from "../FatBlock";
import Section from "../Section";

export default function CarouselSection({ className = "", title, children }) {
  const [expand, setExpand] = useState(false);

  return (
    <Section divider>
      <div className="flex justify-between h2 mb-24">
        <h2 className="text-brite">{title}</h2>
        {!expand && (
          <div className="text-gray">
            <span className="pl-3.5 pr-1 py-1.5 bg-brite rounded-l-xl">←</span>
            <span className="pr-3.5 pl-1 py-1.5 bg-brite rounded-r-xl">→</span>
          </div>
        )}
      </div>
      <FatBlock className="mb-16 overflow-x-auto">
        {!expand && (
          <div className="flex h-44 sm:h-52 md:h-72 xl:h-96 w-fit space-x-7">
            {children}
          </div>
        )}
        {expand && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {children}
          </div>
        )}
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
