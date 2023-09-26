import React from "react";
import classnames from "classnames";

export default function Card({
  className,
  colorScheme,
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
          "text-lite bg-gray": colorScheme === "gray",
          "text-gray bg-brite": colorScheme === "brite",
          "text-black bg-lite": colorScheme === "lite",
          "bg-center bg-cover": backgroundImage,
        }
      )}
      style={style}
    >
      <h3 className="md-exclude">{title}</h3>
      <p className="md-exclude font-semibold">{description}</p>
    </div>
  );
}
