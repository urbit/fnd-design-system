import React from "react";
import classnames from "classnames";

export default function Section({
  children,
  className = "",
  divider = false,
  narrow = false,
  tight = false,
  id,
}) {
  return (
    <div className="w-full">
      {divider && <hr className="hr-horizontal border-brite" />}
      <section
        className={classnames(
          {
            "layout-narrow": narrow,
            "w-full": !narrow,
            "pt-5": divider,
            "space-y-5": tight,
            "space-y-8": !tight,
          },
          className
        )}
        id={id}
      >
        {children}
      </section>
    </div>
  );
}
