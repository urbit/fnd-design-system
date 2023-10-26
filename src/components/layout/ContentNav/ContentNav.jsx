import React, { useState } from "react";
import Link from "next/link";
import classnames from "classnames";
import { join } from "path";

function label(str, maxLen) {
  return str.length > maxLen ? str.slice(0, maxLen - 2).trim() + "..." : str;
}

function NavItem({
  type,
  level = 0,
  label,
  href,
  path,
  isUnderThis,
  collapsed,
  isOpen,
  setOpen,
}) {
  const isOnThis = path === href;
  const padding = classnames({
    "pl-2": level === 1,
    "pl-4": level === 2,
    "pl-6": level === 3,
    "pl-8": level === 4,
  });
  const sigAlignment = "pl-1.5 md:pl-3 lg:pl-4 xl:pl-5";

  if (type === "dir" && level < 0) {
    return (
      <Link
        className={classnames(
          "flex justify-between type-ui mb-2 layout-pl",
          {
            "text-gray hover:text-brite": !isUnderThis,
            "text-brite": isUnderThis,
          }
        )}
        href={href}
        onClick={(e) => {
          if (path === href) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setOpen(!isOpen);
          } else {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setOpen(true);
          }
        }}
      >
        {label}
      </Link>
    );
  } else if (type === "dir" && level >= 0) {
    return (
      <Link
        className={classnames(
          "flex justify-between w-full type-ui",
          sigAlignment,
          {
            "text-gray hover:text-brite": !isUnderThis,
            "text-brite": isUnderThis,
          }
        )}
        href={href}
        onClick={(e) => {
          if (path === href) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setOpen(!isOpen);
          } else {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setOpen(true);
          }
        }}
      >
        <span className={classnames(padding)}>{label}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </Link>
    );
  }
  return (
    <Link
      className={classnames("flex type-ui", sigAlignment, {
        "text-gray hover:text-brite": !isOnThis,
        "text-brite": isOnThis,
      })}
      href={href}
    >
      <span className={classnames(padding)}>{label}</span>
    </Link>
  );
}

function NavSection({
  children,
  posts,
  root,
  path,
  level = -1,
  divider = false,
}) {
  const isUnderThis = `${path}/`.includes(`${root}/`);
  const isUnderThisNotOn =
    `${path}/`.includes(`${root}/`) && `/${root}` !== path;
  const [isOpen, setOpen] = useState(posts.auto_expand || isUnderThis);

  return (
    <>
      {divider && (
        <div className="ml-1.5 md:ml-3 lg:ml-4 xl:ml-5">
          <hr className="hr-horizontal border-gray my-3.5" />
        </div>
      )}
      <NavItem
        type="dir"
        level={level}
        label={posts.title}
        href={`/${root}`}
        path={path}
        isUnderThis={isUnderThis}
        collapsed={!(posts.auto_expand || isUnderThis)}
        isOpen={isOpen}
        setOpen={setOpen}
      />
      {(isOpen || isUnderThisNotOn) &&
        posts.pages.map((page) => {
          const href = `/${root}/${page.slug}`;
          const isThisPage = path === href;
          return (
            <NavItem
              type="file"
              level={level + 1}
              label={page.title}
              href={`/${root}/${page.slug}`}
              path={path}
              isUnderThis={isUnderThis}
              collapsed={!(posts.auto_expand || isUnderThis)}
              key={href}
            />
          );
        })}
      {(isOpen || isUnderThisNotOn) &&
        posts.children &&
        Object.keys(posts.children).length !== 0 &&
        Object.entries(posts.children).map(([k, v], i) => {
          return (
            <NavSection
              posts={v}
              root={join(root, k)}
              path={path}
              level={level + 1}
              key={join(root, k)}
            />
          );
        })}
    </>
  );
}

export default function ContentNav({ posts, root, firstCrumb }) {
  return (
    <nav className="flex flex-col w-full overflow-y-auto overflow-x-hidden offset-r">
      {posts.pages.map((page) => {
        const href = `/${root}/${page.slug}`;
        return (
          <NavItem
            type="file"
            level={-1}
            label={page.title}
            href={href}
            path={firstCrumb}
            isUnderThis={`${firstCrumb}/`.includes(`${root}/`)}
            key={href}
          />
        );
      })}
      {posts.children &&
        Object.keys(posts.children).length !== 0 &&
        Object.entries(posts.children).map(([k, v], i) => {
          return (
            <NavSection
              posts={v}
              root={join(root, k)}
              path={firstCrumb}
              key={"tray-" + join(root, k)}
              divider={i > 0 || posts.pages.length !== 0}
            />
          );
        })}
    </nav>
  );
}
