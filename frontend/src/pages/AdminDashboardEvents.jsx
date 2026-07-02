import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSideBar.jsx";
import AllEvents from "../components/Admin/AllEvents.jsx";


const AdminDashboardEvents = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="800px:w-[330px] w-[80px]">
          <AdminSidebar active={6} />
        </div>
        <AllEvents/>
      </div>
    </div>
  );
};

export default AdminDashboardEvents;
