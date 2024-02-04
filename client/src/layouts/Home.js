import React, { useEffect } from "react";
import Ranking from "../components/Ranking";
import HomeContent from "./HomeContent";
import AllCategories from "../pages/category/AllCategories";

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div>
      <HomeContent />

      {/* <Ranking/> */}

      <div className="mb-10">
        <AllCategories />
      </div>
    </div>
  );
}

export default Home;
