import React, { useState } from "react";
import { Menu } from "./SideBar";
import { CgPathBack } from "react-icons/cg";
import {
  MdDelete,
  MdOutlineColorize,
  MdOutlineFlipToFront,
} from "react-icons/md";
import { IoIosColorFill } from "react-icons/io";
import { ColorPicker } from "antd";
import { FaEdit } from "react-icons/fa";

export default function StepBar({
  onBack,
  onFront,
  color,
  setColor,
  onDelete,
  text,
  onEdit,
}) {
  return (
    <div className="absolute h-[calc(100vh-40px)] top-10 left-0 flex items-center">
      <div
        className={`grid ${
          text ? "grid-rows-5" : "grid-rows-4"
        } gap-2 px-1 py-2 bg-blue-300 rounded-md`}
      >
        <Menu
          placement={"right"}
          //type={type}
          value={"text"}
          onClick={onBack}
          icon={<CgPathBack />}
          title={"Bring to Back"}
        />
        <Menu
          placement={"right"}
          //type={type}
          value={"text"}
          onClick={onFront}
          icon={<MdOutlineFlipToFront />}
          title={"Bring to Front"}
        />
        <Menu
          placement={"right"}
          //type={type}
          value={"text"}
          //onClick={onBackground}
          icon={
            <ColorPicker
              size="small"
              value={color}
              onChangeComplete={(color) => {
                setColor(color.toHexString());
              }}
            />
          }
          title={"Fill Color"}
        />
        <Menu
          placement={"right"}
          //type={type}
          value={"text"}
          onClick={onDelete}
          icon={<MdDelete />}
          title={"Delete"}
        />
        {text && (
          <Menu
            placement={"right"}
            //type={type}
            value={"text"}
            onClick={onEdit}
            icon={<FaEdit />}
            title={"Edit"}
          />
        )}
      </div>
    </div>
  );
}
