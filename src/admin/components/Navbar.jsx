import { useAuthStore } from "../../hooks/useAuthStore";
import { useState } from "react";
import LinksAdmin from "./ui/LinksAdmin";
import { useUiNavbarStore } from "../../hooks";
import {ButtonHamburger , ButtonClose , ButtonLogoutNavbar} from "./"

export default function Navbar() {
  const { startLogout, user } = useAuthStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { isNavbarOpen,openNavbar, closeNavbar } = useUiNavbarStore();

  
  return (
    <div className="h-14  absolute w-full">
      <div className=" flex justify-between items-center w-full p-4">
         <ButtonHamburger onToggle={toggleSidebar} /> 
      </div>
      <aside
        id="default-sidebar"
        className={`bg-white fixed shadow shadow-gray-300 flex h-screen top-0 left-0 z-40 xl:h-screen transition-transform ${
          isNavbarOpen ? "-translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full  overflow-y-auto   text-white relative flex justify-center">
          <div className=" flex justify-center  px-2 ">
            <ul className="  space-y-5 font-medium flex flex-col items-center">
              <li className="flex justify-center mt-5">
                <div className="w-full">
                  <img src="./logo.png" className="w-10" alt="" />
                </div>
              </li>

              <LinksAdmin onToggle={toggleSidebar} />

              <li>
                 <ButtonClose  /> 
              </li>
            </ul>
            <div className=" absolute bottom-6  ">
              <hr className="border-t-2 border-gray-400 mb-2" />
              {/* LOGOUT */}
               <ButtonLogoutNavbar /> 
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
