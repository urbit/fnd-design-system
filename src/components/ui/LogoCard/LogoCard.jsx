import React from "react";
import Link from "next/link";
import { defaultTarget } from "../utils";

export default function LogoCard({ title, href, target, imgSrc }) {
  return (
    <Link
      className="relative flex flex-col aspect-square bg-brite rounded-xl px-4 py-1 md:py-4"
      href={href}
      target={target || defaultTarget(href)}
    >
      <h3 className="absolute text-black h2">{title}</h3>
      <div className="flex-1 flex text-center items-center" key={href}>
        <img className="w-1/2 m-auto" src={imgSrc} />
      </div>
    </Link>
  );
}
