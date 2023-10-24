import React from "react";
import Link from "next/link";
import Icon from "../Icon";

export default function ConceptCard({
  className = "",
  title,
  description,
  label,
  icon,
  href,
  small = false,
}) {
  return (
    <div
      className={`flex flex-col justify-between aspect-[2/1] max-w-2xl rounded-2xl text-2xl text-gray p-4 bg-brite md-exclude ${className}`}
      href={href}
    >
      <div className="flex mb-8">
        <Icon className="h-full bg-gray" name={icon} />
        <h3 className={small ? "h3" : "h2"}>{title}</h3>
      </div>
      <div>
        <p
          className={`${
            small ? "body-xs" : "body-sm"
          } mb-3.5 md-exclude font-semibold`}
        >
          {description}
        </p>
        <Link className={`${small ? "btn-xs" : "btn-sm"} btn-dark`} href={href}>
          {label}
        </Link>
      </div>
    </div>
  );
}
