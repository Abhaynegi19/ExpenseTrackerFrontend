import React, { useEffect } from "react";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import MainContent from "./MainContent";


const Dashboard = () => {  

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex pt-20">
        <SidePanel />

        <div className="flex-1 ml-20 transition-all duration-300">
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;