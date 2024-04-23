import React, { useState } from "react";
import Link from "next/link";
import classnames from "classnames";
import Icon from "../Icon";
import { defaultTarget } from "../utils";

export default function ConceptCard({
  className = "",
  title,
  description,
  icon,
  href,
  target,
  small = false,
}) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      className={classnames(
        "flex flex-col rounded-2xl w-full p-2.5 md-exclude",
        className,
        { "text-brite bg-gray": hover, "text-gray bg-brite": !hover },
      )}
      href={href}
      target={target || defaultTarget(href)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex mb-3.5">
        <h3 className="h3 md-exclude">{title}</h3>
        <Icon
          className={classnames("h-full ml-[0.25em]", {
            "bg-brite": hover,
            "bg-gray": !hover,
          })}
          name={icon}
          weight="semibold"
        />
      </div>
      <p className={"body-md md-exclude"}>{description}</p>
    </Link>
  );
}
