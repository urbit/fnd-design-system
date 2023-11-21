import React from "react";
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
  big = false,
}) {
  const t = target || defaultTarget(href);

  return (
    <>
      {big && !small && (
        <Link
          className="aspect-square max-w-md sm:max-w-md md:max-w-lg text-2xl font-semibold text-lite"
          href={href}
          target={t}
        >
          <div className="relative h-2/3 p-4 rounded-t-2xl bg-tint">
            <h4 className="h3 md-exclude">{title}</h4>
            <Icon
              className="absolute w-32 h-32 bg-brite m-auto left-0 right-0 top-0 bottom-0"
              name={icon}
            />
          </div>
          <p className="h-1/3 p-4 rounded-b-2xl bg-gray text-xl md-exclude">
            {description}
          </p>
        </Link>
      )}
      {!small && !big && (
        <Link
          className="flex h-48 rounded-2xl xs:w-10/12 sm:w-full max-w-2xl"
          href={href}
          target={t}
        >
          {icon && (
            <div className="relative h-full w-1/5 md:w-1/4 rounded-l-2xl bg-tint">
              <Icon
                className="absolute w-3/4 bg-brite m-auto left-0 right-0 top-0 bottom-0"
                name={icon}
              />
            </div>
          )}
          <div
            className={classnames(
              "flex-1 flex flex-col justify-between",
              " h-full px-4 py-2 md:py-4 bg-gray md-exclude",
              { "rounded-r-2xl": icon, "rounded-2xl": !icon }
            )}
          >
            <h3 className="text-brite h3 mb-4 md-exclude">{title}</h3>
            <p className="text-lite text-xl md-exclude">{description}</p>
          </div>
        </Link>
      )}
      {small && (
        <Link
          className="flex flex-col justify-between p-4 rounded-2xl bg-gray dark:bg-tint xs:w-10/12 sm:w-full max-w-2xl md-exclude"
          href={href}
          target={t}
        >
          <div className="flex items-center h3 h-[1em] mb-3.5 md-exclude">
            {icon && <Icon className="h-full bg-brite mr-1.5" name={icon} />}
            <h3 className="text-brite font-semibold md-exclude">{title}</h3>
          </div>
          <p className="text-lite text-xl md-exclude">{description}</p>
        </Link>
      )}
    </>
  );
}
