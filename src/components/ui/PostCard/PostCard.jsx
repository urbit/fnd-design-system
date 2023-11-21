import React from "react";
import Link from "next/link";
import classnames from "classnames";
import { defaultTarget } from "../utils";

export default function PostCard({
  className,
  title,
  description,
  date,
  authorName,
  authorPlanet,
  href,
  target,
  imgSrc,
}) {
  const style = imgSrc ? { backgroundImage: `url(${imgSrc})` } : {};

  return (
    <Link
      className={`flex flex-col aspect-[1.5/2] max-w-xs sm:max-w-md md:max-w-lg md-exclude ${className}`}
      href={href}
      target={target || defaultTarget(href)}
    >
      <div
        className="h-2/3 bg-gray bg-center bg-cover rounded-t-lg p-4"
        style={style}
      >
        <h3
          className="text-lite h2 md-exclude"
          style={{
            "-webkit-text-stroke-width": "1px",
            "-webkit-text-stroke-color": "var(--gray)",
          }}
        >
          {title}
        </h3>
      </div>
      <div className="flex flex-col h-1/3 bg-brite text-gray rounded-b-lg p-4">
        <p className="flex-1 body-sm md-exclude font-semibold overflow-hidden mb-auto">
          {description}
        </p>
        {(date || authorName || authorPlanet) && (
          <div className="h-1/3">
            <hr className="hr-horizontal border-gray mb-0.5 md:mb-2 xl:mb-3.5" />
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
