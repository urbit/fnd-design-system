import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import classnames from "classnames";
import { join } from "path";
import { capitalize } from "../../lib/lib";

function Tooltip({ data, label }) {
  const [isOpen, setOpen] = useState(false);
  const [path, fragment] = data.slug.split("#");
  const slug = data.slug.replace(/^\//g, "").split("/");
  const ref = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickListener);
    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, []);

  const handleClickListener = (e) => {
    if (ref && ref.current?.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (isOpen) {
        document.body.style.overflow = "visible";
      }
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed flex items-center justify-center z-50 left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,0.7)]">
          <div className="flex items-center justify-center h-full layout">
            <div className="flex flex-col bg-gray modal" ref={ref}>
              <div className="flex w-full justify-between items-center">
                <div className="text-brite space-x-1">
                  {slug.map((crumb, i) => {
                    const isFirst = i === 0;
                    const isLast = i + 1 === slug.length;
                    return (
                      <>
                        {!isFirst && <span>/</span>}
                        {!isLast && (
                          <Link
                            className="md-exclude !no-underline"
                            href={"/" + join(...slug.slice(0, i + 1))}
                          >
                            {capitalize(crumb)}
                          </Link>
                        )}
                        {isLast && (
                          <Link
                            className="md-exclude !no-underline"
                            href={data.slug}
                          >
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
              <hr className="md-exclude hr-horizontal border-black my-4" />
              <h2
                className="md-exclude h2 text-black mb-8"
                dangerouslySetInnerHTML={{ __html: data.title }}
              />
              <div
                className="md-exclude space-y-4"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
              {/* <Link */}
              {/*   className="w-min mt-4 btn btn-light md-exclude" */}
              {/*   href={data.slug} */}
              {/* > */}
              {/*   Read More */}
              {/* </Link> */}
            </div>
          </div>
        </div>
      )}
      <span
        className="text-brite border border-brite rounded-lg px-1.5 relative cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        {label}
      </span>
    </>
  );
}

export default function tooltipWrapper(index = {}) {
  return ({ label, href }) => {
    if (index[href]) {
      return Tooltip({ data: index[href], label });
    } else {
      return (
        <Link
          className="text-brite border border-brite rounded-lg px-1.5 relative cursor-pointer md-exclude"
          href={href}
        >
          {label}
        </Link>
      );
    }
  };
}
