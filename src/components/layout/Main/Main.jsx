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
        "flex flex-1 layout",
        { "flex-col space-y-16 layout-px": singleColumn },
        className
      )}
    >
      {children}
    </main>
  );
}
