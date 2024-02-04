import React, { useEffect } from "react";

import SideDiv from "./SideDiv";
import ProfileInfo from "./sideDiv/ProfileInfo";


function Profile() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ProfileInfo />
      <SideDiv />
    </div>
  );
}

export default Profile;
