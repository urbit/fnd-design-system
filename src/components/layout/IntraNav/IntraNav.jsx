import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";

function ActiveLink({ children, href, className, currentPath, dark = false }) {
  const firstCrumb = currentPath.split("/")[1];

  const activeClassName = !dark
    ? classnames({
        "text-lite": "/" + firstCrumb === href,
        "text-brite": "/" + firstCrumb !== href,
      })
    : classnames({
        "text-black": "/" + firstCrumb === href,
        "text-gray": "/" + firstCrumb !== href,
      });

  return (
    <Link className={`${className} ${activeClassName}`} href={href} passHref>
      {children}
    </Link>
  );
}

export default function IntraNav({ sites, ourSite, pages }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentPath = useRouter().asPath;

  return (
    <div className="sticky top-0 z-50 flex flex-col items-center w-full bg-gray">
      <div className="w-full text-black text-xl font-medium">
        <div className="layout h-16 px-8 mx-auto relative">
          <div className="flex justify-between items-center h-full">
            <div className="flex h-full items-center">
              <div className="flex relative h-full w-52 items-center">
                <a
                  className="flex flex-1 relative h-full items-center pr-auto bg-brite text-gray"
                  href="/"
                >
                  <span className="absolute flex items-center h-full w-12 pl-5 top-1/2 -left-12 transform -translate-y-1/2 bg-brite text-gray leading-none">
                    ~
                  </span>
                  {ourSite.title}
                </a>
                <button
                  className="h-full w-12 bg-brite text-gray"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {(isDropdownOpen && "↑") || "↓"}
                </button>
                {isDropdownOpen && (
                  <div className="hidden md:block absolute top-full w-full">
                    {sites.map((site) => (
                      <a
                        className={
                          "flex relative h-16 w-full pr-4 items-center " +
                          "hover:opacity-100 bg-brite text-gray " +
                          site.theme
                        }
                        href={site.href}
                        key={site.title}
                      >
                        <div
                          className={
                            "absolute flex items-center h-16 w-12 bg-brite " +
                            "top-1/2 -left-12 transform -translate-y-1/2 " +
                            site.theme
                          }
                        ></div>
                        {site.title}
                      </a>
                    ))}
                    <a
                      className="flex whitespace-nowrap relative h-16 pr-4 items-center hover:opacity-100 bg-gray text-lite leading-none"
                      target="_blank"
                      href="https://network.urbit.org"
                    >
                      <div className="absolute flex items-center h-16 w-12 top-1/2 -left-12 transform -translate-y-1/2  bg-gray text-lite"></div>
                      Network Explorer ↗
                    </a>
                  </div>
                )}
                {isDropdownOpen && (
                  <div className="block md:hidden z-20 w-screen h-screen top-0 -left-8 absolute top-full w-full top-1/2 bg-brite w-full ">
                    {sites.map((site) => (
                      <a
                        className={
                          "flex relative h-16 w-full items-center px-8 " +
                          "hover:opacity-100 hover:bg-brite text-gray " +
                          site.theme
                        }
                        href={site.href}
                        key={site.title}
                      >
                        {site.title}
                      </a>
                    ))}
                    <a
                      className="flex whitespace-nowrap relative h-16 px-8 items-center text-gray leading-none"
                      target="_blank"
                      href="https://network.urbit.org"
                    >
                      Network Explorer ↗
                    </a>
                    <div className="h-0.5 w-full rounded-full my-6 bg-gray" />
                    {pages.map((page) => (
                      <ActiveLink
                        currentPath={currentPath}
                        className="flex relative h-16 w-full items-center px-8"
                        href={page.href}
                        key={page.title}
                        dark
                      >
                        {page.title}
                      </ActiveLink>
                    ))}
                  </div>
                )}
              </div>
              <nav className="flex items-center hidden md:flex">
                {pages.map((page) => (
                  <ActiveLink
                    currentPath={currentPath}
                    className="ml-5 type-ui"
                    href={page.href}
                    key={page.title}
                  >
                    {page.title}
                  </ActiveLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
