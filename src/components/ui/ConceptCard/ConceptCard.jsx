import React from "react";
import Link from "next/link";
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
  return (
    <Link
      className={`flex flex-col w-full rounded-2xl text-gray bg-brite p-2.5 md-exclude ${className}`}
      href={href}
      target={target || defaultTarget(href)}
    >
      <div className="flex mb-3.5">
        <h3 className="h3 md-exclude">{title}</h3>
        <Icon className="h-full bg-gray ml-[0.25em]" name={icon} weight="semibold" />
      </div>
      <p
        className={"body-md md-exclude"}
      >
        {description}
      </p>
    </Link>
  );
}
