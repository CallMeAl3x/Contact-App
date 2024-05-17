import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function loading() {
  return (
    <>
      <div className="w-[95%] mx-auto">
        <div className="flex justify-between mt-4">
          {" "}
          <Skeleton count={1} height={50} width={50} circle className="" />
          <Skeleton count={1} height={50} width={50} circle className="" />
        </div>
        <div className="flex flex-col gap-3 items-center mt-12">
          <Skeleton count={1} height={160} width={160} circle className="" />

          <Skeleton count={1} height={15} width={80} className="" />
        </div>
        <div className="flex justify-center mt-4 gap-3">
          <Skeleton count={1} height={40} width={40} circle className="" />
          <Skeleton count={1} height={40} width={40} circle className="" />
          <Skeleton count={1} height={40} width={40} circle className="" />
        </div>
      </div>
    </>
  );
}

export default loading;
