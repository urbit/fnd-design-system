import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";

function ActiveLink({
  children,
  href,
  target,
  className,
  currentPath,
  dark = false,
}) {
  const firstCrumb = currentPath.split("/")[1];
  const activeClassName = !dark
    ? classnames({
        "text-lite": "/" + firstCrumb === href,
        "text-brite hover:text-lite": "/" + firstCrumb !== href,
      })
    : classnames({
        "text-black": "/" + firstCrumb === href,
        "text-gray hover:text-black": "/" + firstCrumb !== href,
      });

  return (
    <Link
      className={`${className} ${activeClassName}`}
      href={href}
      target={target}
      passHref
    >
      {children}
    </Link>
  );
}

function Dropdown({ className = "", label, items }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className={`relative flex h-full items-center bg-black w-1/2 md:w-52 lg:w-[14.5rem] xl:w-64 type-ui ${className}`}
    >
      {typeof label === "object" && (
        <Link
          className="flex flex-1 relative h-full items-center text-gray hover:opacity-80"
          href="/"
        >
          <div className="flex items-center h-full bg-black">
            <span className="flex justify-center items-center h-full w-5 md:w-8 lg:w-10 xl:w-12 bg-brite">
              ~
            </span>
          </div>
          <span className="flex items-center h-full w-full bg-brite text-gray">
            {label.title}
          </span>
        </Link>
      )}
      <button
        className={classnames(
          "flex items-center justify-center h-full hover:opacity-80",
          {
            "bg-brite text-gray w-12": typeof label === "object",
            "bg-gray text-brite w-full px-5": typeof label === "string",
          }
        )}
        onClick={() => setOpen(!isOpen)}
      >
        {typeof label === "string" && <span className="mr-auto">{label}</span>}
        <span>{(isOpen && "↑") || "↓"}</span>
      </button>
      {isOpen && (
        <div className="absolute top-full w-full bg-black max-h-content overflow-y-scroll">
          {items.map((item) => {
            return (
              <ActiveLink
                className={classnames(
                  "flex whitespace-nowrap relative h-16 items-center hover:opacity-80 leading-none",
                  (typeof label === "object" && "layout-pl") || "pl-5",
                  item.theme || "",
                  {
                    "bg-gray text-brite": !item.theme,
                    "bg-brite text-gray": item.theme,
                  }
                )}
                href={item.href}
                target={item.target || "_self"}
                currentPath={useRouter().asPath}
              >
                {item.title}
              </ActiveLink>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Pages({ className, pages }) {
  return (
    <nav
      className={classnames(
        "hidden lg:flex items-center nav-space-x-offset",
        className
      )}
    >
      {pages.map((page) => (
        <ActiveLink
          currentPath={useRouter().asPath}
          className="type-ui"
          href={page.href}
          key={page.title}
        >
          {page.title}
        </ActiveLink>
      ))}
    </nav>
  );
}

export default function IntraNav({ ourSite, sites, pages, search }) {
  return (
    <div className="sticky top-0 z-50 flex flex-col items-center w-full bg-gray">
      <div className="relative layout h-12 md:h-16">
        <div className="flex justify-between items-center h-full">
          <div className="flex h-full w-full items-center">
            <div className="flex flex-1 h-full items-center">
              <Dropdown label={ourSite} items={sites} />
              <Dropdown className="lg:hidden" label="Menu" items={pages} />
              <Pages
                className="w-1/2 md:flex-1 overflow-x-auto"
                pages={pages}
              />
            </div>
            {search && (
              <div className="h-full p-2 md:p-3 w-1/4 sm:w-1/3 md:w-52 lg:w-[14.5rem] xl:w-64 type-ui">
                {search}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
