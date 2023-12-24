import React, { useEffect, useState } from "react";
import { Circle, Line, Rect, Text, Transformer } from "react-konva";
import { setNewValues } from "../functions/basics";

export default function Texts({
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
  //   useEffect(()=>{
  //     let p1=0*data.width;
  //     let p2=0*data.height;
  //     let p3=100*data.width;
  //     let p4=0*data.height;
  //     let p5=100*data.width;
  //     let p6=100*data.height;
  //     setPoint([p1,p2,p3,p4,p5,p6])
  //   },[data.width,data.height])
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
            fontSize: node.fontSize()*scaleX,
          });
        }}
        points={data.points}
        x={data.x}
        strokeWidth={0}
        text={data.text}
        fontSize={data.fontSize}
        
        //width={data.width}
        //height={data.height}
        y={data.y}
        draggable={draggable?false:true}
        fill={data.color}
        
      />
      {isSelected && <Transformer ref={trRef} flipEnabled={false} />}
    </React.Fragment>
  );
}
