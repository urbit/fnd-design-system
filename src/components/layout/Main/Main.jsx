import React from "react";
import classnames from "classnames";

export default function Main({
  className = "",
  children,
  singleColumn = false,
  responsiveSpace = false,
}) {
  return (
    <main
      className={classnames(
        "flex flex-1 layout",
        {
          "flex-col layout-px": singleColumn,
          "space-y-5 md:space-y-10 lg:space-y-[3.75rem]":
            responsiveSpace && singleColumn,
          "space-y-[3.75rem]": !responsiveSpace && singleColumn,
        },
        className
      )}
    >
      {children}
    </main>
  );
}
