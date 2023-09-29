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
      <div className="relative layout h-12 md:h-16">
        <div className="flex justify-between items-center h-full">
          <div className="flex h-full items-center">
            <div className="relative flex h-full side-bar-with-margin -ml-5 md:-ml-8 lg:-ml-10 xl:-ml-12 items-center bg-black">
              <a
                className="flex flex-1 relative h-full items-center text-gray hover:opacity-80"
                href="/"
              >
                <div className="flex items-center h-full bg-black">
                  <span className="flex justify-center items-center h-full w-5 md:w-8 lg:w-10 xl:w-12 bg-brite">
                    ~
                  </span>
                </div>
                <span className="flex items-center h-full w-full bg-brite">
                  {ourSite.title}
                </span>
              </a>
              <button
                className="h-full w-12 bg-brite text-gray hover:opacity-80 "
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {(isDropdownOpen && "↑") || "↓"}
              </button>
              {isDropdownOpen && (
                <div className="hidden md:block absolute top-full w-full bg-black">
                  {sites.map((site) => (
                    <a
                      className={
                        "flex relative h-16 w-full pl-12 pr-4 items-center " +
                        "hover:opacity-80 bg-brite text-gray " +
                        site.theme
                      }
                      href={site.href}
                      key={site.title}
                    >
                      {site.title}
                    </a>
                  ))}
                  <a
                    className="flex whitespace-nowrap relative h-16 pl-12 pr-4 items-center hover:opacity-80 bg-gray text-lite leading-none"
                    target="_blank"
                    href="https://network.urbit.org"
                  >
                    Network Explorer ↗
                  </a>
                </div>
              )}
              {isDropdownOpen && (
                <div
                  className="absolute block md:hidden z-20 w-screen top-0 -left-8 top-full bg-brite overflow-y-scroll"
                  style={{height: "calc(100vh - 3rem)"}}
                >
                  {sites.map((site) => (
                    <a
                      className={
                        "flex relative h-12 w-full items-center px-8 " +
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
                    className="flex whitespace-nowrap relative h-12 px-8 items-center text-gray hover:text-brite hover:bg-gray leading-none"
                    target="_blank"
                    href="https://network.urbit.org"
                  >
                    Network Explorer ↗
                  </a>
                  <div className="h-0.5 w-full rounded-full bg-gray mb-3" />
                  {pages.map((page) => (
                    <ActiveLink
                      currentPath={currentPath}
                      className="flex relative w-full items-center px-8 py-1"
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
            <nav className="flex items-center hidden md:flex nav-space-x-offset">
              {pages.map((page) => (
                <ActiveLink
                  currentPath={currentPath}
                  className="type-ui"
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
  );
}
