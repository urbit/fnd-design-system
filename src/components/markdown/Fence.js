import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useCopyToClipboard } from "../../lib/hooks";
import Copy from "../../lib/icons/copy";
import Highlight, { defaultProps } from "prism-react-renderer";
import Prism from "prismjs";
import "prismjs/components/prism-hoon";
import "prismjs/components/prism-c";
import "prismjs/components/prism-clojure";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-groovy";
import "prismjs/components/prism-haskell";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-scala";
import "prismjs/components/prism-scheme";
import "prismjs/components/prism-swift";

function Buttons({
  copy,
  copyStatus,
  useCopy,
  fullscreen,
  isFullscreen,
  setFullscreen,
}) {
  return (
    <div className="absolute flex h-[21px] items-center justify-center space-x-1.5 top-3 right-3 z-10">
      {copy && (
        <button className="!m-0" onClick={useCopy}>
          {copyStatus === "inactive" ? (
            <Copy />
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM7.54325 11.4247L12.1498 5.66647L11.3169 5.00013L7.39013 9.90859L4.60812 7.59025L3.92526 8.40969L7.54325 11.4247Z"
                fill="#afaeab"
              />
            </svg>
          )}
        </button>
      )}
      {fullscreen && (
        <button
          className={classNames(
            "flex h-full aspect-square items-center justify-center text-[#afaeab] font-[21px]",
            {
              "rotate-45": isFullscreen,
            }
          )}
          onClick={() => setFullscreen(!isFullscreen)}
        >
          {isFullscreen ? (
            "＋"
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 384.97 384.97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M372.939,216.545c-6.123,0-12.03,5.269-12.03,12.03v132.333H24.061V24.061h132.333c6.388,0,12.03-5.642,12.03-12.03    S162.409,0,156.394,0H24.061C10.767,0,0,10.767,0,24.061v336.848c0,13.293,10.767,24.061,24.061,24.061h336.848    c13.293,0,24.061-10.767,24.061-24.061V228.395C384.97,221.731,380.085,216.545,372.939,216.545z"
                fill="#afaeab"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M372.939,0H252.636c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h91.382L99.635,268.432    c-4.668,4.668-4.668,12.235,0,16.903c4.668,4.668,12.235,4.668,16.891,0L360.909,40.951v91.382c0,6.641,5.39,12.03,12.03,12.03    s12.03-5.39,12.03-12.03V12.03l0,0C384.97,5.558,379.412,0,372.939,0z"
                fill="#afaeab"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

export default function Fence({
  children,
  language,
  copy = false,
  fullscreen = false,
  mode = "full",
}) {
  const [copyStatus, useCopy] = useCopyToClipboard(children);
  const [collapsed, setCollapse] = useState(Boolean(mode === "collapse"));
  const [isFullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    return () => (document.body.style.overflow = "visible");
  }, [isFullscreen]);

  return (
    <>
      {isFullscreen && (
        <div className="fixed p-4 z-50 top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.7)]">
          <Highlight
            {...defaultProps}
            key={language}
            language={language}
            code={children}
            theme={undefined}
            Prism={Prism}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={classNames(
                  "relative !py-4 !my-0 h-full w-full overflow-y-auto",
                  className
                )}
                style={style}
              >
                {tokens.slice(0, -1).map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
                <Buttons
                  copy={copy}
                  copyStatus={copyStatus}
                  useCopy={useCopy}
                  fullscreen={fullscreen}
                  isFullscreen={isFullscreen}
                  setFullscreen={setFullscreen}
                />
              </pre>
            )}
          </Highlight>
        </div>
      )}
      <div
        className={classNames("relative rounded-xl md-spacing z-0", {
          "max-h-60 overflow-hidden": collapsed,
        })}
      >
        {collapsed && (
          <>
            <div
              className="absolute w-full h-full bottom-0 overflow-hidden bg-black z-10 rounded-xl"
              style={{ opacity: "0.6" }}
            />
            <div
              className="absolute w-full h-full flex justify-center items-end z-20 cursor-pointer"
              onClick={() => setCollapse(false)}
            >
              <p className="!text-2xl" style={{ paddingBottom: "0.25rem" }}>
                Click to expand
              </p>
            </div>
          </>
        )}
        <Buttons
          copy={copy}
          copyStatus={copyStatus}
          useCopy={useCopy}
          fullscreen={fullscreen}
          isFullscree={isFullscreen}
          setFullscreen={setFullscreen}
        />
        <Highlight
          {...defaultProps}
          key={language}
          language={language}
          code={children}
          theme={undefined}
          Prism={Prism}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={classNames(className, "!py-4 !my-0", {
                "max-h-96 overflow-y-auto": Boolean(mode === "scroll"),
              })}
              style={style}
            >
              {tokens.slice(0, -1).map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </>
  );
}
