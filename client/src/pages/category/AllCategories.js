import React, { useState, useEffect } from "react";
import ArtsCat from "./Cat/ArtsCat";
import CollectionCat from "./Cat/CollectionCat";

function AllCategories() {
  return (
    <div>
      <div className="mb-10">
        <CollectionCat />
        <ArtsCat />
      </div>
    </div>
  );
}

export default AllCategories;
