import React, { useEffect, useState } from "react";
import {
  FaGripLines,
  FaLocationArrow,
  FaRedoAlt,
  FaRegCircle,
  FaSave,
  FaTextWidth,
  FaUndo,
} from "react-icons/fa";
import { Button, Tooltip, ConfigProvider, Dropdown, Space, Input } from "antd";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoRemoveOutline, IoTriangleOutline } from "react-icons/io5";

const shapes = [
  {
    icon: <MdOutlineCheckBoxOutlineBlank />,
    path: "rectangle",
  },
  {
    icon: <FaRegCircle />,
    path: "circle",
  },
  {
    icon: <IoTriangleOutline />,
    path: "triangle",
  },
];

const lines = [
  {
    icon: <IoRemoveOutline />,
    path: "line",
  },
  {
    icon: <img className="w-8 h-8" src={require("./tt.png")} />,
    path: "curve",
  },
];

export default function SideBar({ onSelect, onSave, isWriting,onWriteEnd }) {
  const [type, setType] = useState();
  const [text,setText]=useState()
  useEffect(() => {
    isWriting && setType(null);
  }, [isWriting]);
  return (
    <div className="grid bg-blue-700 py-1 h-[100px] justify-center  absolute z-50 w-full">
      <div className="bg-blue-300 h-[40px] flex gap-3 px-3 py-1 my-1 rounded-md">
        <Menu
          type={type}
          value={"text"}
          onClick={() => {
            setType("text");
            onSelect && onSelect("text");
          }}
          icon={<FaTextWidth />}
          title={"Text"}
        />
        <Menu
          type={type}
          value={"shapes"}
          onClick={() => setType("shapes")}
          icon={<MdOutlineCheckBoxOutlineBlank />}
          title={"Shapes"}
        />

        <Menu
          type={type}
          value={"lines"}
          onClick={() => setType("lines")}
          icon={<FaGripLines />}
          title={"Lines"}
        />

        <Menu
          type={type}
          value={"save"}
          onClick={() => {
            setType("save")
            onSave&&onSave()
          }}
          icon={<FaSave />}
          title={"Save"}
        />
      </div>
      {type === "shapes" && <Shapes onSelect={onSelect} items={shapes} />}
      {type === "lines" && <Shapes onSelect={onSelect} items={lines} />}
      {isWriting && (
        <Space.Compact
          style={{
            width: "100%",
          }}
        >
          <Input value={text} onChange={e=>setText(e.target.value)} placeholder="Text gone here"/>
          <Button onClick={()=>{
            onWriteEnd(text)
            setText("")
            
          }} style={{height:"100%"}} type="primary" danger>Done</Button>
        </Space.Compact>
      )}
    </div>
  );
}
export const Menu = ({ title, icon, onClick, type, value, placement }) => {
  return (
    <Tooltip title={title} placement={placement || "topLeft"}>
      <div
        style={{
          backgroundColor: type === value ? "orange" : null,
        }}
        onClick={onClick}
        className="bg-gray-100 rounded-sm hover:bg-orange-100 w-8 h-8 flex items-center justify-center"
      >
        {icon}
      </div>
    </Tooltip>
  );
};
const Shapes = ({ items, onSelect }) => {
  return (
    <div className="flex gap-4 h-[40px]  bg-blue-200 py-1 px-2 rounded-md">
      {items?.map((d) => (
        <div
          onClick={() => onSelect && onSelect(d.path)}
          className="bg-gray-200 w-8 h-8 rounded-sm flex justify-center items-center hover:bg-orange-100"
        >
          {d.icon}
        </div>
      ))}
    </div>
  );
};
