"use client";

import { useRef, useState } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import styles from "./node.module.css";

const getNodeRender = (node) => {
  switch (node.type) {
    case "text":
      if (node.data.scale == "auto") {
        return <p>{node.data.content}</p>;
      }
      break;

    case "img":
      return (
        <>
          <img
            className="object-fill"
            style={{ width: node.scale.x, height: node.scale.y }}
            src={node.data.src}
          />
          <h3>{node.scale.x}</h3>
        </>
      );
      break;

    default:
      break;
  }
};

const Node = ({
  node,
  isSelected,
  setIsSelected,
  setIsDragging,
  isPanning,
}) => {
  const margin = 50;
  const nodeRef = useRef(null);
  const [isScaling, setIsScaling] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialScale, setInitialScale] = useState({ x: 0, y: 0 });

  return (
    <Draggable
      position={node.position}
      onDrag={(e, data) => {
        node.position = {
          x: node.position.x + data.deltaX,
          y: node.position.y + data.deltaY,
        };
      }}
      onStart={(e, data) => {
        setIsDragging(true);
        if (isSelected != node.id) setIsSelected(node.id);
      }}
      onStop={(e, data) => {
        setIsDragging(false);
      }}
      disabled={isPanning || isScaling}
      nodeRef={nodeRef}
    >
      <div
        style={{
          position: "absolute",
          width: "auto",
          height: "auto",
          transformOrigin: "center",
        }}
        onClick={(e) => {
          setIsSelected(node.id);
          e.stopPropagation();
        }}
        ref={nodeRef}
      >
        {isSelected === node.id && (
          <svg
            className="absolute"
            style={{
              transform: `translate(${-margin / 2}px, ${-margin / 2}px)`,
            }}
            width={node.scale.x + margin}
            height={node.scale.y + margin}
          >
            <g>
              <rect
                width={node.scale.x}
                height={node.scale.y}
                x={margin / 2}
                y={margin / 2}
                style={{
                  fill: "none",
                  strokeWidth: 3,
                  stroke: "black",
                }}
              />
              // top left
              <circle
                r={6}
                cx={margin / 2}
                cy={margin / 2}
                style={{
                  fill: "white",
                  strokeWidth: 3,
                  stroke: "black",
                }}
              />
              // top
              <circle
                r={6}
                cx={margin / 2 + node.scale.x / 2}
                cy={margin / 2}
                style={{
                  fill: "white",
                  strokeWidth: 3,
                  stroke: "black",
                }}
              />
              // top right
              <circle
                r={6}
                cx={margin / 2 + node.scale.x}
                cy={margin / 2}
                style={{
                  fill: isScaling ? "black" : "white",
                  strokeWidth: 3,
                  stroke: "black",
                }}
                onMouseDown={(e) => {
                  setIsScaling(true);
                  setDragStart({ x: e.clientX, y: e.clientY });
                  setInitialScale(node.scale);
                  e.stopPropagation();
                }}
                onMouseMove={(e) => {
                  if (isScaling) {
                    console.log(node.scale);
                    node.scale = {
                      x: e.clientX,
                      y: Math.max(0, initialScale.y + e.clientY - dragStart.y),
                    };
                    console.log(node.scale);
                  }
                }}
                onMouseUp={(e) => {
                  setIsScaling(false);
                }}
              />
              // bottom left
              <circle
                r={6}
                cx={margin / 2}
                cy={margin / 2 + node.scale.y}
                style={{
                  fill: "white",
                  strokeWidth: 3,
                  stroke: "black",
                }}
              />
              // bottom right
              <circle
                r={6}
                cx={margin / 2 + node.scale.x}
                cy={margin / 2 + node.scale.y}
                style={{
                  fill: "white",
                  strokeWidth: 3,
                  stroke: "black",
                }}
              />
            </g>
          </svg>
        )}
        {getNodeRender(node)}
      </div>
    </Draggable>
  );
};

export default Node;
