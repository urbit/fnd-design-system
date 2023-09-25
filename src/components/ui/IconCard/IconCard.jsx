import React from "react";
import Link from "next/link";

export default function IconCard({
  className,
  title,
  description,
  label,
  href,
  icon,
  weight = "regular",
}) {
  const iconUrl = `https://media.urbit.org/icons/${weight}/${icon}.svg`;
  const iconStyle = {
    "-webkit-mask-image": `url(${iconUrl})`,
    "mask-image": `url(${iconUrl})`,
  };

  return (
    <div className="text-2xl text-lite">
      <div className="relative h-60 p-5 rounded-t-2xl bg-tint">
        <h3>{title}</h3>
        <div
          className="absolute w-32 h-32 bg-brite m-auto left-0 right-0 top-0 bottom-0"
          style={iconStyle}
        />
      </div>
      <div className="flex flex-col justify-between min-h-[9.5rem] p-5 rounded-b-2xl bg-gray">
        <p className="font-semibold pb-2">{description}</p>
        <Link
          className="px-2 py-1 w-fit rounded-xl text-gray bg-brite hover:bg-lite"
          href={href}
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
