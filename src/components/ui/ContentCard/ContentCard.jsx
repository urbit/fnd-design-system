import React from "react";
import Link from "next/link";
import classnames from "classnames";

export default function ContentCard({
  className,
  title,
  description,
  label,
  href,
  imgSrc,
  small = false,
}) {
  const width = small ? "w-11/12" : "w-11/12 md:w-5/6 xl:w-9/12"
  const img = small ? "h-44 lg:h-52 pl-44 lg:pl-52" : "h-44 sm:h-52 lg:h-80 pl-44 sm:pl-52 lg:pl-80"
  const style = imgSrc
    ? {
        backgroundImage: `url(${imgSrc})`,
      }
    : {};

  return (
    <div className={`flex-1 -mx-4 ${className}`}>
      <div className={`hidden sm:flex p-4 bg-gray rounded-lg ${width}`}>
        <div
          className={`${img} bg-center bg-cover`}
          style={style}
        />
        <div className="flex flex-col items-start justify-between pl-4">
          <p className="h2b md-exclude">{title}</p>
          <div>
            <p className="body-sm text-lite md-exclude font-semibold mb-5">
              {description}
            </p>
            <Link className="btn-sm md-exclude" href={href}>
              {label}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden flex-col items-start p-4 bg-gray rounded-lg space-y-4">
        <div
          className="w-full h-60 bg-center bg-cover"
          style={style}
          alt=""
          src={imgSrc}
        />
        <p className="h2b md-exclude">{title}</p>
        <p className="body-sm text-lite md-exclude font-semibold">{description}</p>
        <Link className="btn-sm md-exclude" href={href}>
          {label}
        </Link>
      </div>
    </div>
  );
}
