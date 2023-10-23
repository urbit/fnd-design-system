import React from "react";

export default function Video({ src, type }) {
  return (
    <div className="-mx-4 my-6">
      <video className="mx-auto max-h-[33rem] rounded" controls>
        <source src={src} type={type} />
      </video>
    </div>
  );
}
