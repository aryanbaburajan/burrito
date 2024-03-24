"use client";

import React from "react";
import Canvas from "./components/canvas";
import workspaceState from "./workspace-state";
import StoreProvider from "./StoreProvider";

export default function Home() {
  return (
    <StoreProvider>
      <main className="w-screen h-screen">
        <Canvas state={workspaceState} />
      </main>
    </StoreProvider>
  );
}
