import React from "react";
import classnames from "classnames";

export default function Main({
  className = "",
  children,
  singleColumn = false,
}) {
  return (
    <main
      className={classnames(
        "flex flex-col flex-1 layout",
        {
          "layout-px": singleColumn,
        },
        className
      )}
    >
      {children}
    </main>
  );
}
