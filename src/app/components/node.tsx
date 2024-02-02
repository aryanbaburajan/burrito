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
          outlineStyle: selected == node.id ? "solid" : "none",
          outlineWidth: "3px",
          outlineColor: "black",
          transformOrigin: "center",
        }}
        onClick={(e) => {
          setSelected(node.id);
          e.stopPropagation();
        }}
      >
        {getNodeRender(node)}
      </div>
    </Draggable>
  );
};

export default Node;
