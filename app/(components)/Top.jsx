import React from "react";
import SearchBar from "./SearchBar";
import AddContact from "./AddContact";
import Parameters from "./Parameters";

function Top() {
  return (
    <div className="flex gap-2">
      <div className="flex-grow-1">
        <SearchBar />
      </div>
      <div className="flex gap-2">
        <AddContact />
        <Parameters />
      </div>
    </div>
  );
}

export default Top;
