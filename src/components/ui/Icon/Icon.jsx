import React from "react";

export default function Icon({
  className = "h-full bg-brite",
  name,
  weight = "regular",
}) {
  const iconUrl = `https://media.urbit.org/icons/${weight}/${name}.svg`;
  const iconStyle = {
    "-webkit-mask-image": `url(${iconUrl})`,
    "mask-image": `url(${iconUrl})`,
  };

  return (
    <div
      className={`inline-block aspect-square ${className}`}
      style={iconStyle}
    />
  );
}
