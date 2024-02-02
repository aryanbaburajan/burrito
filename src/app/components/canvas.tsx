"use client";

import { useState, useEffect } from "react";
import Node from "./node";
import Draggable from "react-draggable";

const Canvas = ({ state }) => {
  const [selected, setSelected] = useState("");
  const [transform, setTransform] = useState({
    position: { x: 0, y: 0 },
    scale: 1,
  });
  const [panning, setPanning] = useState(false);
  const [dragging, setDragging] = useState(false);

  return (
    <div
      tabIndex={0}
      className={`w-full h-full overflow-hidden
      ${panning ? "cursor-grab" : "cursor-default"} 
      `}
      onClick={(e) => {
        if (!dragging) setSelected("");
      }}
      onKeyDown={(e) => {
        if (e.key === " ") setPanning(true);
      }}
      onKeyUp={(e) => {
        if (e.key === " ") setPanning(false);
      }}
    >
      <Draggable
        position={transform.position}
        onDrag={(e, data) => {
          transform.position = {
            x: transform.position.x + data.deltaX,
            y: transform.position.y + data.deltaY,
          };
        }}
        disabled={!panning}
      >
        <div>
          {state.nodes.map((node) => {
            return (
              <Node
                node={node}
                selected={selected}
                setSelected={setSelected}
                setDragging={setDragging}
                panning={panning}
              />
            );
          })}
        </div>
      </Draggable>
    </div>
  );
};

export default Canvas;
