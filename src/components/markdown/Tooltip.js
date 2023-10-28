import React, { useState } from "react";
import Link from "next/link";
import classnames from "classnames";
import { capitalize } from "../../lib/lib";

export default function Tooltip({ data, label }) {
  const [isOpen, setOpen] = useState(false);
  const [path, fragment] = data.link.split("#");
  const slug = data.link.replace(/^\//g, "").split("/");

  return (
    <>
      {isOpen && (
        <div className="fixed flex items-center justify-center z-50 left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,0.7)]">
          <div className="flex flex-col w-full sm:w-5/6 md:w-2/3 lg:w-3/6 p-4 mx-3 body-sm text-black bg-gray rounded-xl">
            <div className="flex w-full justify-between">
              <div className="space-x-1">
                {slug.map((crumb, i) => {
                  const isFirst = i === 0;
                  const isLast = i + 1 === slug.length;
                  return (
                    <>
                      {!isFirst && <span>/</span>}
                      {!isLast && <span>{capitalize(crumb)}</span>}
                      {isLast && (
                        <Link className="text-brite" href={data.link}>
                          {capitalize(crumb.split("#")[0])}
                        </Link>
                      )}
                    </>
                  );
                })}
              </div>
              <button className="text-brite" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <hr className="md-exclude hr-horizontal border-black mt-5 mb-3.5" />
            <h3 className="md-exclude h2 font-semibold">
              {data.symbol ? `${data.symbol} ("${data.name}")` : data.name}
            </h3>
            {data.usage && (
              <p className="font-medium">{data.usage}</p>
            )}
            <p
              className=""
              dangerouslySetInnerHTML={{ __html: data.desc }}
            />
          </div>
        </div>
      )}
      <span
        className="relative text-xl text-brite font-bold cursor-pointer underline"
        onClick={() => setOpen(!isOpen)}
      >
        {label || data.symbol || data.name}
      </span>
    </>
  );
}
