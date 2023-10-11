import React from "react";
import classnames from "classnames";

export default function Section({
  children,
  className = "",
  divider = false,
  narrow = false,
}) {
  const width = classnames();
  return (
    <>
      {divider && <hr className="hr-horizontal border-gray my-4" />}
      <div
        className={classnames(
          "mb-16",
          { "layout-narrow": narrow, "w-full": !narrow },
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
