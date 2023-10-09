import React from "react";
import Link from "next/link";
import classnames from "classnames";

export default function EventCard({
  className,
  title,
  description,
  location,
  date,
  time,
  href,
  imgSrc,
}) {
  const style = imgSrc ? { backgroundImage: `url(${imgSrc})` } : {};

  return (
    <Link
      className={classnames(
        "flex flex-col rounded-lg p-4 h-[31rem]",
        "text-2xl text-lite bg-gray md-exclude",
        className,
        { "bg-center bg-cover": imgSrc }
      )}
      style={style}
      href={href}
    >
      <div className="mb-auto">
        <p className="h2b mb-4">{title}</p>
        <p className="body-sm">{description}</p>
      </div>
      <div className="h-1/6">
        <hr className="hr-horizontal border-lite my-3.5" />
        <div className="flex justify-between text-base font-medium">
          <p>{location}</p>
          <div>
            <p>{date}</p>
            <p>{time}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
