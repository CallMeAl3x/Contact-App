"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React from "react";

function SearchBar(placeholder) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("contact", term);
    } else {
      params.delete("contact");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          id="default-search"
          type="search"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className="block w-full p-2 bg-gris1 ps-10 text-sm rounded-lg dark:bg-gray-700  dark:text-white sm:w-[27rem]"
          placeholder="Search a specific contact"
          required
          defaultValue={searchParams.get("contact")?.toString()}
        />
      </div>
    </div>
  );
}

export default SearchBar;
