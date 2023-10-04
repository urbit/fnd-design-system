import React from "react";
import Link from "next/link";
import classnames from "classnames";
import { join } from "path";

function label(str, maxLen) {
  return str.length > maxLen ? str.slice(0, maxLen - 2).trim() + "..." : str;
}

function NavSection({
  children,
  posts,
  root,
  path,
  indent = 0,
  divider = false,
  labelMaxLength,
}) {
  const isUnderThisPage = `${path}/`.includes(`${root}/`);

  return (
    <>
      {divider && <div className="my-3.5 w-100 h-0.5 rounded-sm bg-gray" />}
      <Link
        className={classnames("font-bold", {
          "text-gray hover:text-brite": !isUnderThisPage,
          "text-brite": isUnderThisPage,
        })}
        style={{ paddingLeft: `${0.5 * indent}rem` }}
        href={`/${root}`}
      >
        {labelMaxLength
          ? label(posts.title, labelMaxLength - indent * 2)
          : posts.title}
      </Link>
      {isUnderThisPage &&
        posts.pages.map((page) => {
          const href = `/${root}/${page.slug}`;
          const isThisPage = path === href;
          return (
            <Link
              className={classnames("font-light", {
                "text-gray hover:text-brite": !isThisPage,
                "text-brite": isThisPage,
              })}
              style={{ paddingLeft: `${0.5 * (indent + 1)}rem` }}
              href={href}
              key={href}
            >
              {labelMaxLength
                ? label(page.title, labelMaxLength - (indent + 1) * 2)
                : page.title}
            </Link>
          );
        })}
      {isUnderThisPage &&
        posts.children &&
        Object.keys(posts.children).length !== 0 &&
        Object.entries(posts.children).map(([k, v], i) => {
          return (
            <NavSection
              posts={v}
              root={join(root, k)}
              path={path}
              indent={indent + 1}
              key={join(root, k)}
              labelMaxLength={labelMaxLength}
            />
          );
        })}
    </>
  );
}

export default function ContentNav({
  posts,
  root,
  firstCrumb,
  labelMaxLength,
}) {
  return (
    <nav
      className={classnames(
        "flex flex-col w-full overflow-y-auto overflow-x-hidden type-ui offset-r",
        {
          "whitespace-nowrap": labelMaxLength,
        }
      )}
    >
      {(posts.children &&
        Object.keys(posts.children).length !== 0 &&
        Object.entries(posts.children).map(([k, v], i) => {
          return (
            <NavSection
              posts={v}
              root={join(root, k)}
              path={firstCrumb}
              key={"tray-" + join(root, k)}
              divider={i > 0}
              labelMaxLength={labelMaxLength}
            />
          );
        })) || (
        <NavSection posts={posts} root={root} path={firstCrumb} longLabels />
      )}
    </nav>
  );
}
