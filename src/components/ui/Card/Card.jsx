import React from "react";
import classnames from "classnames";

export default function Card({
  className,
  title,
  description,
  backgroundImage,
}) {
  const style = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
      }
    : {};

  return (
    <div
      className={classnames(
        "flex flex-col justify-between rounded-2xl text-2xl p-5 h-64",
        className,
        {
          "bg-center bg-cover": backgroundImage,
        }
      )}
      style={style}
    >
      <h3>{title}</h3>
      <p className="font-semibold">{description}</p>
    </div>
  );
}
