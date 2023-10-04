import React from "react";

export default function Video({ src, type }) {
  return (
    <div className="-mx-2">
      <video className="mx-auto max-h-[32rem] rounded" controls>
        <source src={src} type={type} />
      </video>
    </div>
  );
}
