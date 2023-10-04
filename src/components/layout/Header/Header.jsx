import React from "react";
import classnames from "classnames";

export default function Header({ className = "", children }) {
  return (
    <div
      className={classnames(
        "relative flex flex-col h-12 md:h-16 overflow-x-auto",
        className
      )}
    >
      <div className="flex flex-1 w-full items-center space-x-2 whitespace-nowrap text-lite font-bold type-ui">
        {children}
      </div>
      <hr className="border-gray border-t-2 rounded-xl" />
    </div>
  );
}
