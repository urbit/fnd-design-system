import React from "react";
import Link from "next/link";

export default function Footer({ title = "", data = [] }) {
  return (
    <footer className="bg-tint text-lite text-xl font-normal mt-20 w-full flex justify-center z-10">
      <div className="layout layout-px">
        <section className="flex flex-row flex-wrap w-full pt-16 pb-8 ">
          {data?.[0]?.map((section, i) => {
            return (
              <React.Fragment key={i}>
                {i === 0 && (
                  <div className="body-sm w-full relative">
                    <span className="absolute flex justify-center items-center h-full w-5 lg:w-10 xl:w-12 -ml-5 lg:-ml-10 xl:-ml-12">
                      ~
                    </span>
                    {section.title}
                  </div>
                )}
                <div className="pt-8 xs:mr-5 w-1/2 xs:w-1/3 lg:w-48 xl:w-52 flex flex-col shrink">
                  {section.links.map((link) => {
                    return (
                      <Link
                        className="body-sm hover:text-brite"
                        key={link.href}
                        href={link.href}
                        passHref
                      >
                        {link.title}
                      </Link>
                    );
                  })}
                </div>
              </React.Fragment>
            );
          })}
        </section>
        <section className="flex flex-col xs:flex-row w-full pt-16 pb-8 ">
          {data?.[1]?.map((link, i) => {
            return (
              <div
                key={link.href}
                className={`w-1/2 xs:w-1/3 lg:w-48 xl:w-52 ${
                  i > 0 ? "xs:pl-5" : ""
                }`}
              >
                <Link
                  className="body-sm hover:text-brite"
                  href={link.href}
                  passHref
                >
                  {link.title}
                </Link>
              </div>
            );
          })}
        </section>
      </div>
    </footer>
  );
}
