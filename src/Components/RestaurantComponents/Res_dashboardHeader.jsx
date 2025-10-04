import { LogOutIcon } from "lucide-react";
import React from "react";
import TopHeading from "../Common/TopHeading";

const Res_dashboardHeader = () => {
  return (
    <div className="flex flex-col  bg-background-light ">
      <div className="flex items-center justify-between">
         <TopHeading title={"Restaurant Dashboard"}/>
        <button className="btn btn-sm bg-redBtn rounded-md text-white hover:bg-red-600 text-sm flex gap-2"><LogOutIcon size={15}/> Logout</button>
      </div>
      <div className="bg-gray-100 p-4 min-w-full shadow-md rounded-md">
        <p className="text-xl font-semibold">Welcome,</p>
        <p className="text-gray-500 text-sm">
          Her's what's happening with your restaurant today.
        </p>
      </div>
    </div>
  );
};

export default Res_dashboardHeader;
