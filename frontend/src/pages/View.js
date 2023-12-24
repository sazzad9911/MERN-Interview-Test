import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";
import { randomId, setNewValues } from "../functions/basics";
import Rectangle from "../components/Rectangle";
import StepBar from "../components/StepBar";
import Circles from "../components/Circle";
import Triangle from "../components/Triangle";
import Curve from "../components/Curve";
import Lines from "../components/Lines";
import Texts from "../components/Text";
import { createDrawing, getDrawingsById } from "../api";
import dataURLtoFile from "../functions/dataURItoBlob";
import { toast } from "react-toastify";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

export default function View() {
  const [data, setData] = useState();
  const [selectedId, selectShape] = React.useState(null);
  const stageRef = React.useRef(null);
  const { id } = useParams();
  useEffect(() => {
    getDrawingsById(id).then((res) => {
      setData(res.data.models);
    });
  }, []);

  if(!data) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <div className=" text-lg">Loading...</div>
      </div>
    );
  }
  return (
    <div className=" grid justify-center items-center">
      <Stage
        style={{
          backgroundColor: "#F7FFFF",
        }}
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight - 40}>
        <Layer>
          {data.map((d, i) =>
            d.type === "rectangle" ? (
              <Rectangle
                key={i}
                data={d}
                draggable
                index={i}
                array={data}
              />
            ) : d.type === "circle" ? (
              <Circles
                key={i}
                data={d}
                draggable
                index={i}
                array={data}
              />
            ) : d.type === "triangle" ? (
              <Triangle
                key={i}
                data={d}
                draggable
                index={i}
                array={data}
              />
            ) : d.type === "curve" ? (
              <Curve
                key={i}
                data={d}
                draggable
                index={i}
                array={data}
              />
            ) : d.type === "line" ? (
              <Lines
                key={i}
                data={d}
                draggable
                index={i}
                array={data}
              />
            ) : (
              <Texts
                key={i}
                data={d}
                draggable
                index={i}
                array={data}
              />
            )
          )}
        </Layer>
      </Stage>
    </div>
  );
}
