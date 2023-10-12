import React from "react";
import classnames from "classnames";

export default function FatBlock({ children, className = "", narrow = false }) {
  const width = classnames();
  return (
    <div className={classnames("-mx-4", className)}>{children}</div>
  );
}
