
import { Outlet } from "react-router";

import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";

const Root = () => {


  return (
    <div  className="min-h-screen max-w-[1600px] mx-auto">
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Root;
