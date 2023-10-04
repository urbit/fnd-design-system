import React, { useState } from "react";
import classnames from "classnames";

export default function MenuTray({ children }) {
  const [isOpen, setOpen] = useState(false);

  if (typeof document !== "undefined") {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }

  return (
    <>
      {isOpen && (
        <div className="flex md:hidden fixed z-50 left-0 top-0 w-screen h-screen text-4xl text-lite bg-[rgba(0,0,0,0.7)]">
          <div className="w-9/12 h-full overflow-y-auto type-ui text-gray bg-black p-5">
            {children}
          </div>
        </div>
      )}
      <button
        className={classnames(
          "flex md:hidden fixed bottom-4 right-4 items-center justify-center leading-none w-12 h-12 text-4xl text-lite bg-tint border border-gray rounded-full",
          { "z-50": isOpen, "z-40": !isOpen }
        )}
        onClick={() => setOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.39382 13.7045C-0.131273 14.2296 -0.131274 15.081 0.39382 15.6061C0.918913 16.1312 1.77026 16.1312 2.29535 15.6061L7.99999 9.90142L13.7047 15.6061C14.2297 16.1312 15.0811 16.1312 15.6062 15.6061C16.1313 15.081 16.1313 14.2296 15.6062 13.7046L9.90152 7.99989L15.6061 2.29535C16.1312 1.77026 16.1312 0.918913 15.6061 0.39382C15.081 -0.131273 14.2296 -0.131273 13.7045 0.39382L7.99999 6.09836L2.29548 0.393844C1.77038 -0.131249 0.919038 -0.13125 0.393945 0.393844C-0.131148 0.918937 -0.131148 1.77028 0.393945 2.29537L6.09846 7.99989L0.39382 13.7045Z"
              className="fill-white"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 17"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="16" height="3" rx="1.5" className="fill-white" />
            <rect y="7" width="16" height="3" rx="1.5" className="fill-white" />
            <rect
              y="14"
              width="16"
              height="3"
              rx="1.5"
              className="fill-white"
            />
          </svg>
        )}
      </button>
    </>
  );
}
