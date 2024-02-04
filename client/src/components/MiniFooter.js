import * as React from "react";
import { Link } from "react-router-dom";

export default function MiniFooter() {
  return (
    <div>
      <p className="text-sm text-center text-gray-600">
        {"Copyright © "} {new Date().getFullYear()}{" "}
        <Link to="/"> ArtMarket. </Link> <br /> All Rights Reserved.
      </p>
    </div>
  );
}
