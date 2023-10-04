import React from "react";
import classnames from "classnames";

export default function SideBar({
  className = "",
  children,
  left = false,
  right = false,
}) {
  return (
    <div
      className={classnames(
        "sticky flex top-12 md:top-16 z-40 py-5 content-height side-bar",
        className,
        {
          "side-bar-with-margin": left || right,
          "layout-pl": left,
          "layout-pr": right,
        }
      )}
    >
      {right && <div className="w-0.5 h-100 rounded-sm bg-gray" />}
      {children}
      {left && <div className="w-0.5 h-100 rounded-sm bg-gray" />}
    </div>
  );
}
