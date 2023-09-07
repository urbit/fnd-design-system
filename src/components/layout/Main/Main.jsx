import React from "react";

export default function Main({ children }) {
  return (
    <main className="flex flex-col flex-1 layout">
      {children}
    </main>
  );
}
