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
import { createDrawing, getDrawingsById, updateDrawing } from "../api";
import dataURLtoFile from "../functions/dataURItoBlob";
import { toast } from "react-toastify";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

export default function Edit() {
  const [data, setData] = useState();
  const [selectedId, selectShape] = React.useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const stageRef = React.useRef(null);
  const navigate=useNavigate()
  const { id } = useParams();
  useEffect(() => {
    getDrawingsById(id).then((res) => {
      setData(res.data.models);
    });
  }, []);
  const rectangle = {
    id: randomId(),
    height: 100,
    width: 100,
    x: 10,
    y: 50,
    isDragging: false,
    color: "orange",
    type: "rectangle",
  };
  const circle = {
    id: randomId(),
    height: 100,
    width: 100,
    x: 100,
    y: 200,
    isDragging: false,
    color: "red",
    type: "circle",
  };
  const triangle = {
    id: randomId(),
    x: 100,
    y: 200,
    points: [1, 1, 100, 1, 100, 100],
    isDragging: false,
    color: "red",
    type: "triangle",
  };
  const curve = {
    id: randomId(),
    x: 100,
    y: 200,
    points: [1, 1, 100, 1, 100, 100],
    isDragging: false,
    color: "red",
    type: "curve",
  };
  const line = {
    id: randomId(),
    x: 100,
    y: 200,
    points: [1, 1, 100, 1],
    isDragging: false,
    color: "green",
    type: "line",
  };
  const text = {
    id: randomId(),
    x: 100,
    y: 200,
    isDragging: false,
    color: "black",
    type: "text",
    text: "This is the demo text",
    fontSize: 15,
  };
  const handleExport = async() => {
    try {
      
      const uri = stageRef?.current.toDataURL();
      //downloadURI(uri,"dsfs.png")
      //console.log(uri);
      //console.log(dataURItoBlob(uri));
      await updateDrawing(JSON.stringify(data),dataURLtoFile(uri,`${randomId()}.png`),id)
      toast("Success")
      navigate("/")
    } catch (error) {
      toast(error.response.data.error);
    }
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  if(!data) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <div className=" text-lg">Loading...</div>
      </div>
    );
  }
  return (
    <div className="h-full w-full">
      <SideBar
        onSelect={(e) => {
          if (e === "rectangle") {
            setData((d) => [...d, rectangle]);
          } else if (e === "circle") {
            setData((d) => [...d, circle]);
          } else if (e === "triangle") {
            setData((d) => [...d, triangle]);
          } else if (e === "curve") {
            setData((d) => [...d, curve]);
          } else if (e === "line") {
            setData((d) => [...d, line]);
          } else {
            setData((d) => [...d, text]);
          }
        }}
        onSave={handleExport}
        isWriting={isWriting&&selectedId?true:false}
        onWriteEnd={(e) => {
          const val = data.find((r) => r.id === selectedId);
          const i = data.indexOf(val);
          const rects = data.slice();
          rects[i] = { ...val, text: e };
          setData(rects);
          setIsWriting(false);
        }}
      />
      <div className=" grid justify-center items-center">
        <Stage
          style={{
            backgroundColor: "#F7FFFF",
            marginTop: 100,
          }}
          ref={stageRef}
          width={window.innerWidth - 10}
          height={window.innerHeight - 140}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {data.map((d, i) =>
              d.type === "rectangle" ? (
                <Rectangle
                  key={i}
                  data={d}
                  isSelected={d.id === selectedId}
                  onChange={(newAttrs) => {
                    const rects = data.slice();
                    rects[i] = newAttrs;
                    setData(rects);
                  }}
                  onSelect={() => {
                    selectShape(d.id);
                  }}
                  index={i}
                  array={data}
                />
              ) : d.type === "circle" ? (
                <Circles
                  key={i}
                  data={d}
                  isSelected={d.id === selectedId}
                  onChange={(newAttrs) => {
                    const rects = data.slice();
                    rects[i] = newAttrs;
                    setData(rects);
                  }}
                  onSelect={() => {
                    selectShape(d.id);
                  }}
                  index={i}
                  array={data}
                />
              ) : d.type === "triangle" ? (
                <Triangle
                  key={i}
                  data={d}
                  isSelected={d.id === selectedId}
                  onChange={(newAttrs) => {
                    const rects = data.slice();
                    rects[i] = newAttrs;
                    setData(rects);
                  }}
                  onSelect={() => {
                    selectShape(d.id);
                  }}
                  index={i}
                  array={data}
                />
              ) : d.type === "curve" ? (
                <Curve
                  key={i}
                  data={d}
                  isSelected={d.id === selectedId}
                  onChange={(newAttrs) => {
                    const rects = data.slice();
                    rects[i] = newAttrs;
                    setData(rects);
                  }}
                  onSelect={() => {
                    selectShape(d.id);
                  }}
                  index={i}
                  array={data}
                />
              ) : d.type === "line" ? (
                <Lines
                  key={i}
                  data={d}
                  isSelected={d.id === selectedId}
                  onChange={(newAttrs) => {
                    const rects = data.slice();
                    rects[i] = newAttrs;
                    setData(rects);
                  }}
                  onSelect={() => {
                    selectShape(d.id);
                  }}
                  index={i}
                  array={data}
                />
              ) : (
                <Texts
                  key={i}
                  data={d}
                  isSelected={d.id === selectedId}
                  onChange={(newAttrs) => {
                    const rects = data.slice();
                    rects[i] = newAttrs;
                    setData(rects);
                  }}
                  onSelect={() => {
                    selectShape(d.id);
                  }}
                  index={i}
                  array={data}
                />
              )
            )}
          </Layer>
        </Stage>
      </div>
      <div>
        {selectedId && (
          <StepBar
            onBack={() => {
              const items = data.slice();
              const item = items.find((i) => i.id === selectedId);
              const index = items.indexOf(item);
              items.splice(index, 1);
              let arr = [];
              arr.push(item);
              items.forEach((d) => {
                arr.push(d);
              });
              setData(arr);
            }}
            onFront={() => {
              const items = data.slice();
              const item = items.find((i) => i.id === selectedId);
              const index = items.indexOf(item);
              items.splice(index, 1);
              items.push(item);
              setData(items);
            }}
            setColor={(col) => {
              const val = data.find((r) => r.id === selectedId);
              const i = data.indexOf(val);
              const rects = data.slice();
              rects[i] = { ...val, color: col };
              setData(rects);
            }}
            onDelete={() => {
              const items = data.slice();
              const item = items.find((i) => i.id === selectedId);
              const index = items.indexOf(item);
              items.splice(index, 1);
              setData(items);
              selectShape(null);
            }}
            onEdit={() => setIsWriting(true)}
            color={data.find((r) => r.id === selectedId)?.color}
            text={
              data.find((r) => r.id === selectedId)?.type === "text"
                ? true
                : false
            }
          />
        )}
      </div>
    </div>
  );
}
