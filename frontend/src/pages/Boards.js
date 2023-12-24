import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteDrawingById, getDrawings } from "../api";
import Card from "../components/Card";

export default function Boards() {
  const [data, setData] = useState();
  const [load,setLoad]=useState(false)
  useEffect(() => {
    getDrawings().then((res) => {
      setData(res.data);
    });
  }, [load]);
  const deleteDrawing = async (id) => {
    try {
      setData(null)
      await deleteDrawingById(id);
      toast("Success");
      setLoad(v=>!v)
    } catch (error) {
      toast(error.response.data.error);
    }
  };
  if (!data) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <div className=" text-lg">Loading...</div>
      </div>
    );
  }
  return (
    <div className="grid gap-3">
      <div />
      {data?.map((d) => (
        <Card onDelete={()=>deleteDrawing(d._id)} key={d._id} data={d} />
      ))}
      {data?.length === 0 && <div className=" text-lg">No Drawings</div>}
      <div />
    </div>
  );
}
