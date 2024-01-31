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
        {
          "flex-col space-y-5 md:space-y-8 lg:space-y-[3.75rem] layout-px":
            singleColumn,
        },
        className
      )}
    >
      {children}
    </main>
  );
}
