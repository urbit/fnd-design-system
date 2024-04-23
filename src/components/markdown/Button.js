import React from "react";
import Link from "next/link";

const Button = ({ className="btn-light", label, link = "" }) => {
  return (
    <Link className={"btn !px-1.5 !py-0 " + className} href={link}>
      {label}
    </Link>
  );
};

export default Button;
