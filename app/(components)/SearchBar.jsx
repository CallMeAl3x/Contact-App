import React from "react";
import loupe1 from "../Images/loupe.svg";
import Image from "next/image";
import "./SearchBar.css"
function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        className="bg-gris1 rounded-full pl-10 pr-4 py-2 searchBar"
        placeholder="Search"
        
      />
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Image src={loupe1} alt="loupe"  width={20} height={20} />
      </span>
    </div>
  );
}

export default SearchBar;
