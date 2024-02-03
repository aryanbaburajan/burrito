"use client";

import { useState } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import styles from "./node.module.css";

const getNodeRender = (node) => {
  switch (node.type) {
    case "text":
      if (node.data.scale == "auto") {
        return <p style={{}}>{node.data.content}</p>;
      }
      break;

    case "img":
      return (
        <img
          className="pointer-events-none"
          width={node.scale.x}
          height={node.scale.y}
          src={node.data.src}
        />
      );
      break;

    default:
      break;
  }
};

const Node = ({ node, selected, setSelected, setDragging, panning }) => {
  const margin = 50;

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
        setDragging(true);
        if (selected != node.id) setSelected(node.id);
      }}
      onStop={(e, data) => {
        setDragging(false);
      }}
      disabled={panning}
    >
      <div
        style={{
          position: "absolute",
          width: "auto",
          height: "auto",
          transformOrigin: "center",
        }}
        onClick={(e) => {
          setSelected(node.id);
          e.stopPropagation();
        }}
      >
        {selected === node.id && (
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
                  fill: "white",
                  strokeWidth: 3,
                  stroke: "black",
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
