import React, { useEffect, useState } from "react";
import { Circle, Line, Rect, Transformer } from "react-konva";
import { setNewValues } from "../functions/basics";

export default function Triangle({
  data,
  onChange,
  array,
  index,
  onClick,
  isSelected,
  onSelect,
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
      <Line
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
          let arr=[]
          arr.push(node.points()[0]*scaleX)
          arr.push(node.points()[1]*scaleY)
          arr.push(node.points()[2]*scaleX)
          arr.push(node.points()[3]*scaleY)
          arr.push(node.points()[4]*scaleX)
          arr.push(node.points()[5]*scaleY)
          onChange({
            ...data,
            x: node.x(),
            y: node.y(),
            points:arr
          });
          
        }}
        points={data.points}
        x={data.x}
        tension={0}
        //width={data.width}
        //height={data.height}
        y={data.y}
        draggable
        closed
        fill={data.color}
      />
      {isSelected && <Transformer ref={trRef} flipEnabled={false} />}
    </React.Fragment>
  );
}
