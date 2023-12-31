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
      className={`flex flex-col xs:w-10/12 sm:w-full rounded-2xl text-2xl text-gray p-4 bg-brite md-exclude ${className}`}
      href={href}
      target={target || defaultTarget(href)}
    >
      <div className="flex mb-3.5">
        <Icon className="h-full bg-gray mr-1.5" name={icon} />
        <h3 className={`${small ? "h3" : "h2"} md-exclude`}>{title}</h3>
      </div>
      <p
        className={`${
          small ? "body-md" : "body-lg"
        } mb-3.5 md-exclude font-semibold`}
      >
        {description}
      </p>
    </Link>
  );
}
