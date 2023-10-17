import React from "react";
import Link from "next/link";
import classnames from "classnames";
import FatBlock from "../../layout/FatBlock"

export default function ContentCard({
  className,
  title,
  description,
  label,
  href,
  imgSrc,
  small = false,
}) {
  const width = small ? "w-11/12" : "w-11/12 md:w-5/6 xl:w-9/12";
  const style = imgSrc
    ? {
        backgroundImage: `url(${imgSrc})`,
      }
    : {};

  return (
    <FatBlock className={className}>
      <div
        className={`aspect-[2.5/1] hidden sm:flex p-4 bg-gray rounded-lg ${width}`}
      >
        <div
          className={`${small ? "aspect-[2/3]" : "aspect-square"} h-full bg-center bg-cover`}
          style={style}
        />
        <div className="flex flex-col items-start justify-between pl-4">
          <h3
            className={classnames(
              { h3: small, h2: !small },
              "text-lite mb-3.5 md-exclude"
            )}
          >
            {title}
          </h3>
          <div>
            <p className="body-sm text-lite md-exclude font-semibold mb-5">
              {description}
            </p>
            <Link className="btn-sm btn-light md-exclude" href={href}>
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
        <h3 className="text-lite h2 md-exclude">{title}</h3>
        <p className="body-sm text-lite md-exclude font-semibold">
          {description}
        </p>
        <Link className="btn-sm btn-light md-exclude" href={href}>
          {label}
        </Link>
      </div>
    </FatBlock>
  );
}
