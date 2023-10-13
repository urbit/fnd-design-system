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
    <div className="aspect-square max-w-xs md:max-w-sm xl:max-w-lg text-2xl font-semibold text-lite">
      <div className="relative h-2/3 p-4 rounded-t-2xl bg-tint">
        <h4 className="md-exclude">{title}</h4>
        <div
          className="absolute w-32 h-32 bg-brite m-auto left-0 right-0 top-0 bottom-0"
          style={iconStyle}
        />
      </div>
      <div className="flex flex-col items-start justify-between h-1/3 p-4 rounded-b-2xl bg-gray">
        <p className="body-sm md-exclude pb-2">{description}</p>
        <Link
          className="md-exclude btn-sm btn-light"
          href={href}
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
