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
        "aspect-[1.5/1] flex flex-col justify-between rounded-2xl max-w-sm sm:max-w-md md:max-w-lg text-2xl p-4 md-exclude",
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
      <h4 className="md-exclude h3">{title}</h4>
      <p className="md-exclude text-xl">{description}</p>
    </Link>
  );
}
