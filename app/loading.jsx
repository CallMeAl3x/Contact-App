import React, { Suspense } from "react";
import PageAccueil from "./(components)/PageAccueil";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function loading() {
  return (
    <>
      <div className="w-[20%] mx-auto rounded-full items-center flex gap-2 mt-6">
        {" "}
        <Skeleton count={1} height={35} width={275} className="" />
        <Skeleton count={1} height={35} width={35} circle className="" />
        <Skeleton count={1} height={35} width={35} circle className="" />
      </div>
      <div className="w-[95%] mx-auto flex gap-4 items-center mt-8">
        <Skeleton count={1} height={60} width={60} circle className="" />
        <div>
          <Skeleton count={1} height={15} width={200} className="" />
          <Skeleton count={1} height={15} width={350} className="" />
          <Skeleton count={1} height={15} width={180} className="" />
        </div>
      </div>
      <div className="mt-8">
        <p className="text-white font-bold text-5xl">Récents</p>
        <div className="mt-6 flex gap-4">
          <Skeleton count={1} height={170} width={170} className="" />
          <Skeleton count={1} height={170} width={170} className="" />
          <Skeleton count={1} height={170} width={170} className="" />
        </div>
      </div>
      <div className="mt-8">
        <p className="text-white font-bold text-5xl">Contacts</p>
        <div className="mt-2">
          <Skeleton count={1} height={40} width={140} className="" />
        </div>
        <div className="mt-6 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Skeleton count={1} height={40} width={40} circle className="" />
            <Skeleton count={1} height={40} width={"100%"} className="" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton count={1} height={40} width={40} circle className="" />
            <Skeleton count={1} height={40} width={"100%"} className="" />
          </div>{" "}
          <div className="flex flex-col gap-3">
            <Skeleton count={1} height={40} width={40} circle className="" />

            <Skeleton count={1} height={40} width={"100%"} className="" />
            <Skeleton count={1} height={40} width={"100%"} className="" />
          </div>{" "}
          <div className="flex flex-col gap-3">
            <Skeleton count={1} height={40} width={40} circle className="" />

            <Skeleton count={1} height={40} width={"100%"} className="" />
            <Skeleton count={1} height={40} width={"100%"} className="" />
          </div>{" "}
        </div>
      </div>
    </>
  );
}

export default loading;
