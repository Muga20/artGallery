import React from "react";
import Dashboard  from "../pages/admin/Dashboard";

const AdminLayout = () => {
  return (
    // Render the component's contents wrapped in a div with a custom background.
    <div className="bg-customBackground">
      <Dashboard />
    </div>
  );
};

export default AdminLayout;
