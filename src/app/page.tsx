"use client";

import React from "react";
import Canvas from "./components/canvas";
import workspaceState from "./workspace-state";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Canvas state={workspaceState} />
    </main>
  );
}
