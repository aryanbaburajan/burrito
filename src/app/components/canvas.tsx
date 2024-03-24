"use client";

import { useState, useEffect, useRef } from "react";
import Node from "./node";
import Draggable from "react-draggable";

const Canvas = ({ state }) => {
  const [isSelected, setIsSelected] = useState("");
  const [transform, setTransform] = useState({
    position: { x: 0, y: 0 },
    scale: 1,
  });
  const [isPanning, setisPanning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef(null);

  return (
    <div
      tabIndex={0}
      className={`w-full h-full overflow-hidden
      ${isPanning ? "cursor-grab" : "cursor-default"} 
      `}
      onClick={(e) => {
        if (!isDragging) setIsSelected("");
      }}
      onKeyDown={(e) => {
        if (e.key === " ") setisPanning(true);
      }}
      onKeyUp={(e) => {
        if (e.key === " ") setisPanning(false);
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
        disabled={!isPanning}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef}>
          {state.nodes.map((node) => {
            return (
              <Node
                node={node}
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                setIsDragging={setIsDragging}
                isPanning={isPanning}
                key={node.id}
              />
            );
          })}
        </div>
      </Draggable>
    </div>
  );
};

export default Canvas;
