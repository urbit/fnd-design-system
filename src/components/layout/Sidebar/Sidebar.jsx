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
        "sticky flex top-12 md:top-16 z-40 py-5 content-height side-bar",
        className,
        {
          "sidebar-with-margin": left || right,
          "layout-pl": left,
          "layout-pr": right,
        }
      )}
    >
      {right && <hr className="hr-vertical border-gray" />}
      <div className="flex-1 overflow-x-hidden">{children}</div>
      {left && <hr className="hr-vertical border-gray" />}
    </div>
  );
}
