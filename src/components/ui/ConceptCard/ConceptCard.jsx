import React from "react";
import Link from "next/link";
import Icon from "../Icon";

export default function ConceptCard({
  className = "",
  title,
  description,
  icon,
  href,
  small = false,
}) {
  return (
    <Link
      className={`flex flex-col justify-between xs:w-10/12 sm:w-full max-w-2xl rounded-2xl text-2xl text-gray p-4 bg-brite md-exclude ${className}`}
      href={href}
    >
      <div className="flex mb-3.5">
        <Icon className="h-full bg-gray mr-1.5" name={icon} />
        <h3 className={`${small ? "h3" : "h2"} md-exclude`}>{title}</h3>
      </div>
      <p
        className={`${
          small ? "text-xl" : "text-2xl"
        } mb-3.5 md-exclude font-semibold`}
      >
        {description}
      </p>
    </Link>
  );
}
