import React from "react";
import Link from "next/link";
import classnames from "classnames";

export default function PostCard({
  className,
  title,
  description,
  date,
  authorName,
  authorPlanet,
  href,
  imgSrc,
  icon,
  weight = "regular",
}) {
  const iconUrl = `https://media.urbit.org/icons/${weight}/${icon}.svg`;
  const iconStyle = {
    "-webkit-mask-image": `url(${iconUrl})`,
    "mask-image": `url(${iconUrl})`,
  };

  const style = imgSrc ? { backgroundImage: `url(${imgSrc})` } : {};

  return (
    <Link
      className={`flex flex-col h-[41.5rem] md-exclude ${className}`}
      href={href}
    >
      <div
        className="h-2/3 bg-gray bg-center bg-cover rounded-t-lg p-4"
        style={style}
      >
        <h3 className="h2b md-exclude">{title}</h3>
      </div>
      <div className="flex flex-col h-1/3 bg-brite text-gray rounded-b-lg p-4">
        <p className="body-sm md-exclude font-semibold overflow-hidden mb-auto">
          {description}
        </p>
        {(date || authorName || authorPlanet) && (
          <div className="h-1/3">
            <hr className="hr-horizontal border-gray my-3.5" />
            <div className="flex justify-between text-base font-medium">
              <p>{date}</p>
              <div>
                {authorName && <p>{authorName}</p>}
                {authorPlanet && (
                  <p className="relative">
                    <span className="absolute -left-3">~</span>
                    {authorPlanet}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
