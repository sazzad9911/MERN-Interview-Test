import React, { useEffect, useState } from "react";
import { Circle, Line, Rect, Text, Transformer } from "react-konva";
import { setNewValues } from "../functions/basics";
import { EditableTextInput } from "./EditableTextInput";
const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

export default function Texts({
  data,
  onChange,
  array,
  index,
  onClick,
  isSelected,
  onSelect,
  draggable,
}) {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [isEditable, setIsEditable] = useState(false);

  function handleEscapeKeys(e) {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      setIsEditable(false);
    }
  }
  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
    if (!isSelected) {
      setIsEditable(false);
    }
  }, [isSelected]);

  if (isEditable && !draggable) {
    return (
      <EditableTextInput
        onChange={(e) => {
          onChange({
            ...data,
            text: e.target.value,
          });
        }}
        onKeyDown={handleEscapeKeys}
        value={data.text}
        x={data.x}
        fontSize={data.fontSize}
        y={data.y}
      />
    );
  }

  return (
    <React.Fragment>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        onDragStart={() => {
          onChange({
            ...data,
            isDragging: true,
          });
        }}
        onDragEnd={(e) => {
          onChange({
            ...data,
            x: e.target.x(),
            y: e.target.y(),
            isDragging: false,
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...data,
            x: node.x(),
            y: node.y(),
            fontSize: node.fontSize() * scaleX,
          });
        }}
        onDblClick={() => {
          setIsEditable((v) => !v);
        }}
        onDblTap={() => {
          setIsEditable((v) => !v);
        }}
        points={data.points}
        x={data.x}
        strokeWidth={0}
        text={data.text}
        fontSize={data.fontSize}
        //width={data.width}
        //height={data.height}
        y={data.y}
        draggable={draggable ? false : true}
        fill={data.color}
      />
      {isSelected && (
        <Transformer
          enabledAnchors={["top-left", "bottom-right"]}
          ref={trRef}
          flipEnabled={false}
        />
      )}
    </React.Fragment>
  );
}
