import React, { useState } from "react";

import MyCollection from "./sideDiv/MyCollection";
import MyArts from "./sideDiv/MyArts";


function SideDiv() {
  const [activeSection, setActiveSection] = useState("collection");

  return (
    <div className="flex flex-col lg:flex-row pt-5">
     <div className="p-5 w-full lg:w-64 flex flex-row lg:flex-col lg:sticky lg:top-0 lg:rounded-lg space-x-3 lg:space-x-0 overflow-x-auto scroll-smooth scrollbar-hide">
     
       <div>
        <button
          className="py-2 px-4 my-2 rounded-lg bg-gray-500 text-white w-full"
          onClick={() => setActiveSection("collection")}
        >
          Collection
        </button>
        </div>

        <div>
        <button
          className="py-2 px-4 my-2 rounded-lg bg-gray-500 text-white w-full"
          onClick={() => setActiveSection("arts")}
        >
          Arts
        </button>
        </div>
        <div className="mt-auto"></div>
      </div>

      <div className="p-5 w-full max-h-screen overflow-y-scroll hide-scrollbar">
        <div className="p-5 w-full">
          <div className=" bg-gray-900 p-4  rounded-lg max-w-full">
            {activeSection === "collection" && <MyCollection />}
            {activeSection === "arts" && <MyArts />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideDiv;
