import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../api";

export default function Card({ data,onDelete }) {
  const navigate = useNavigate();
  return (
    <div className="flex bg-slate-300 py-1 gap-3">
      <div className="border border-blue-300">
        <img
          className="w-[150px] h-[50px]"
          src={`${url}${data.thumbnail}`}
          alt="pic"
        />
      </div>
      <div onClick={()=>{
        navigate(`/view/${data._id}`)
      }} className="flex-1 hover:underline cursor-pointer">
        <div>{data.title}</div>
        <div>{new Date(data.updateAt).toDateString()}</div>
      </div>
      <div className="flex mr-5 items-center cursor-pointer">
        <div onClick={()=> navigate(`/edit/${data._id}`)} className=" flex bg-neutral-50 w-10 h-10 rounded-full justify-center items-center">
          <FaEdit />
        </div>
        <div onClick={onDelete} className=" cursor-pointer ml-2 flex bg-red-300 w-10 h-10 rounded-full justify-center items-center">
          <MdDelete />
        </div>
      </div>
    </div>
  );
}
