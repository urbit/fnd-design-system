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
                  <div className="type-ui w-full relative leading-none">
                    <span className="absolute flex justify-center items-center h-full w-5 lg:w-10 xl:w-12 -ml-5 lg:-ml-10 xl:-ml-12">
                      ~
                    </span>
                    {section.title}
                  </div>
                )}
                <div className="pt-8 w-1/2 md:w-1/3 flex flex-col shrink">
                  {section.links.map((link) => {
                    return (
                      <Link
                        className="type-ui hover:text-brite pb-1"
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
        <section className="flex flex-col md:flex-row w-full pt-16 pb-8 ">
          {data?.[1]?.map((link) => {
            return (
              <div key={link.href} className="md:w-1/3">
                <Link
                  className="type-ui hover:text-brite"
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
