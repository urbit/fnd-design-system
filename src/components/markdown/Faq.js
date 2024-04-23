import React, { useState } from "react";

export function FaqSection({ children, question, first = false }) {
  const [expand, setExpand] = useState(false);
  return (
    <div
      className={`${first ? "border-t " : ""}border-b border-gray`}
      onClick={() => setExpand(!expand)}
    >
      <p className="flex justify-between md-exclude py-1.5">
        {question} <span>{expand ? "↑" : "↓"}</span>
      </p>
      {expand && children}
    </div>
  );
}

export function Faq({ children }) {
  return <div className="w-full">{children}</div>;
}
