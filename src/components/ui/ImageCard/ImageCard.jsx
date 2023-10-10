import React from "react";
import Link from "next/link";
import classnames from "classnames";

export default function ImageCard({
  className,
  colorScheme,
  href,
  title,
  description,
  imgSrc,
}) {
  const style = imgSrc ? { backgroundImage: `url(${imgSrc})` } : {};

  return (
    <Link
      className={classnames(
        "flex flex-col justify-between rounded-2xl text-2xl p-4 h-64 md-exclude",
        className,
        {
          "text-lite bg-gray": colorScheme === "gray",
          "text-gray bg-brite": colorScheme === "brite",
          "text-black bg-lite": colorScheme === "lite",
          "bg-center bg-cover": imgSrc,
        }
      )}
      style={style}
      href={href}
    >
      <h3 className="md-exclude">{title}</h3>
      <p className="md-exclude font-semibold">{description}</p>
    </Link>
  );
}
