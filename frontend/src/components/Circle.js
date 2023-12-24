import React from "react";
import { Circle, Rect, Transformer } from "react-konva";
import { setNewValues } from "../functions/basics";

export default function Circles({
  data,
  onChange,
  array,
  index,
  onClick,
  isSelected,
  onSelect,
  draggable
}) {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <React.Fragment>
      <Circle
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
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
        x={data.x}
        y={data.y}
        draggable={draggable?false:true}
        width={data.width}
        height={data.height}
        fill={data.color}
      />
      {isSelected && <Transformer ref={trRef} flipEnabled={false} />}
    </React.Fragment>
  );
}
