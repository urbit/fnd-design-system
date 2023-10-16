import React, { Children, useState } from "react";

export default function ({ className = "", title, src = "" }) {
  return (
    <div className="flex flex-col aspect-[12/9] bg-tint rounded-xl">
      <video
        className="aspect-[16/9] rounded-t-xl"
        src={src}
        controls
      />
      <div className="flex-1 bg-gray p-4 rounded-b-xl">
        <h3 className="h2 text-brite">{title}</h3>
      </div>
    </div>
  );
}
