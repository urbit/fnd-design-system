import React, { useState } from "react";
import Link from "next/link";
import classnames from "classnames";
import Icon from "../Icon";
import { defaultTarget } from "../utils";

export default function IconCard({
  className,
  title,
  description,
  label,
  href,
  target,
  icon,
  weight = "regular",
  small = false,
}) {
  const [hover, setHover] = useState(false);
  const t = target || defaultTarget(href);

  return (
    <>
      {!small && (
        <Link
          className="flex rounded-2xl w-full"
          href={href}
          target={t}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {icon && (
            <div
              className={classnames(
                "relative flex items-center rounded-l-2xl",
                "h-full w-1/5 md:w-1/4 p-2.5 bg-tint",
                /* { "bg-gray": hover, "bg-tint": !hover }, */
              )}
            >
              <Icon className="flex-1 bg-brite mx-auto" name={icon} />
            </div>
          )}
          <div
            className={classnames(
              "flex-1 flex flex-col justify-between",
              "h-full p-2.5 md-exclude",
              {
                "rounded-r-2xl": icon,
                "rounded-2xl": !icon,
                "bg-tint": hover,
                "bg-gray": !hover,
              },
            )}
          >
            <h3 className="text-brite h3 mb-4 md-exclude">{title}</h3>
            <div className="flex flex-col justify-end min-h-[5em] text-lite body-md">
              <p className="md-exclude">{description}</p>
            </div>
          </div>
        </Link>
      )}
      {small && (
        <Link
          className={classnames(
            "flex flex-col p-2.5 rounded-2xl bg-gray w-full md-exclude",
            { "bg-tint": hover, "bg-gray": !hover },
          )}
          href={href}
          target={t}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="flex items-center h3 h-[1em] mb-3.5 md-exclude">
            <h3 className="text-brite md-exclude">{title}</h3>
            {icon && (
              <Icon
                className="h-full bg-brite ml-[0.25em]"
                name={icon}
                weight="semibold"
              />
            )}
          </div>
          <p className="text-lite body-md md-exclude">{description}</p>
        </Link>
      )}
    </>
  );
}
