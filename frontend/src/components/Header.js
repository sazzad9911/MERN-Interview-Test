import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  
  return (
    <div className=" bg-blue-800 flex px-5 py-2 gap-5">
      <Link to={"/"}>
        <div className=" hover:underline flex items-center text-white font-semibold">
          <div className={`h-4 w-4 mr-2 ${pathname==="/"?"bg-orange-400":"bg-white"} rounded-full`} />
          Drawing List
        </div>
      </Link>
      <Link to={"/create"}>
        <div className="hover:underline flex items-center text-white font-semibold">
          <div className={`h-4 w-4 mr-2 ${pathname==="/create"?"bg-orange-400":"bg-white"} rounded-full`} />
          New Drawing
        </div>
      </Link>
    </div>
  );
}
