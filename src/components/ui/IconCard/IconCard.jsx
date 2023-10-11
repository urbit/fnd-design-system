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
    <div className="text-2xl font-semibold text-lite">
      <div className="relative h-60 p-4 rounded-t-2xl bg-tint">
        <p className="md-exclude">{title}</p>
        <div
          className="absolute w-32 h-32 bg-brite m-auto left-0 right-0 top-0 bottom-0"
          style={iconStyle}
        />
      </div>
      <div className="flex flex-col items-start justify-between min-h-[9.5rem] p-4 rounded-b-2xl bg-gray">
        <p className="md-exclude pb-2">{description}</p>
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
