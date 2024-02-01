import React from "react";
import classnames from "classnames";

export default function Section({
  children,
  className = "",
  divider = false,
  narrow = false,
  tight = false,
  loose = false,
  id,
}) {
  return (
    <div className="w-full">
      {divider &&
        (typeof divider === "object" ? (
          divider
        ) : (
          <hr
            className={`hr-horizontal ${
              typeof divider === "string" ? divider : "border-brite"
            }`}
          />
        ))}
      <section
        className={classnames(
          {
            "layout-narrow": narrow,
            "w-full": !narrow,
            "pt-5": divider,
            "space-y-5": tight && !loose,
            "space-y-5 md:space-y-[1.875rem]": !tight && !loose,
            "space-y-5 md:space-y-[1.875rem] lg:space-y-[3.75rem]":
              !tight && loose,
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
