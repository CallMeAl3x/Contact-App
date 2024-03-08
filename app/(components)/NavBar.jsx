import React from "react";
import SearchBar from "./SearchBar";
import AddContact from "./AddContact";
import Parameters from "./Parameters";

function NavBar() {
  return (
    <div className="flex gap-2 justify-center">
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

export default NavBar;
