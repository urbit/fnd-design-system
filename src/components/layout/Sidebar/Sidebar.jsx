import React from "react";
import classnames from "classnames";

export default function Sidebar({
  className = "",
  children,
  left = false,
  right = false,
}) {
  return (
    <div
      className={classnames(
        "flex overflow-x-hidden overflow-y-auto",
        {
          "border-l-2 rounded-sm border-gray": right,
          "border-r-2 rounded-sm border-gray": left,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
