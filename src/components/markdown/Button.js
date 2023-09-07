import React from "react";
import Link from "next/link";

const Button = ({ label, link = "", color }) => {
  return (
    <Link className={"button-lg max-w-fit " + color} passHref href={link}>
      {label}
    </Link>
  );
};

export default Button;
