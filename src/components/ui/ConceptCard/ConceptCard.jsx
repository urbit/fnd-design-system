import React from "react";
import Link from "next/link";
import Icon from "../Icon"

export default function ConceptCard({
  className = "",
  title,
  description,
  label,
  icon,
  href,
}) {
  return (
    <div
      className={`flex flex-col justify-between aspect-[2/1] max-w-2xl rounded-2xl text-2xl text-gray p-4 bg-brite md-exclude ${className}`}
      href={href}
    >
      <h3 className="flex">
        <Icon className="h-full bg-gray" name="Identity" />
        <span className="h2">{title}</span>
      </h3>
      <div>
        <p className="body-sm mb-3.5 md-exclude font-semibold">{description}</p>
        <Link className="btn-sm btn-dark" href={href}>
          {label}
        </Link>
      </div>
    </div>
  );
}
