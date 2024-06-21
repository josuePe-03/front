import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuthStore,  useUiStore } from "../../hooks";
import {
  IconHome,
  IconMenu2,
  IconListNumbers,
  IconBuildingWarehouse,
  IconUser,
  IconLogout2,
} from "@tabler/icons-react";

export default function Sidebar({

}) {
  const { startLogout } = useAuthStore();
  const { isSidebarOpen, toogleSidebar } = useUiStore();

  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const handleSidebar = () => {
    toogleSidebar();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        toogleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, toogleSidebar]); // Añade isSidebarOpen y toogleSidebar al array de dependencias

  return (
    <header className="sm:h-0">
      <nav>
        <div className="flex justify-between bottom-0 items-center py-3 px-3">
          <div className="flex items-center">
            <button
              onClick={() => handleSidebar()}
              data-drawer-target="default-sidebar"
              data-drawer-toggle="default-sidebar"
              aria-controls="default-sidebar"
              type="button"
              className="inline-flex items-center   text-sm text-gray-500 rounded-lg sm:hidden  "
            >
              <span className="sr-only">Open sidebar</span>
              <IconMenu2 stroke={2} size={30} />
            </button>
          </div>
        </div>

        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-full sm:w-fit h-screen transition-transform backdrop-blur-sm sm:backdrop-blur-none  sm:translate-x-0 full-height ${
            isSidebarOpen ? "" : "-translate-x-full"
          }`}
          aria-label="Sidenav"
        >
          <div
            className="overflow-y-auto py-5 px-3 h-full bg-white/90 w-[14rem] flex flex-col justify-between"
            ref={sidebarRef}
          >
            <ul className="space-y-2">
              <li>
                <Link
                  onClick={() => handleSidebar("home")}
                  to={`/`}
                  className="flex items-center p-2  font-semibold text-gray-900 rounded-lg  hover:bg-gray-100group"
                >
                  <IconHome size={30} />
                  <span className="ml-3">Home</span>
                </Link>
                <Link
                  onClick={() => handleSidebar()}
                  to="/centros-medicos"
                  className="flex items-center p-2  font-semibold text-gray-900 rounded-lg  hover:bg-gray-100 group"
                >
                  <IconBuildingWarehouse size={30} />
                  <span className="ml-3">Compañias</span>
                </Link>
                <Link
                  onClick={() => handleSidebar()}
                  to={"/administradores"}
                  className="flex items-center p-2  font-semibold text-gray-900 rounded-lg  hover:bg-gray-100 group"
                >
                  <IconListNumbers size={30} />
                  <span className="ml-3">Administradores</span>
                </Link>
                <Link
                  onClick={() => handleSidebar()}
                  to="/tecnicos"
                  className="flex items-center p-2  font-semibold text-gray-900 rounded-lg  hover:bg-gray-100 group"
                >
                  <IconUser size={30} />
                  <span className="ml-3">Tecnicos</span>
                </Link>
                <Link
                  onClick={() => handleSidebar()}
                  to="/operadores"
                  className="flex items-center p-2  font-semibold text-gray-900 rounded-lg  hover:bg-gray-100 group"
                >
                  <IconUser size={30} />
                  <span className="ml-3">Operadores</span>
                </Link>
              </li>
            </ul>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    startLogout();
                    handleSidebar();
                  }}
                  className="flex items-center p-2  font-semibold text-gray-900 rounded-lg  hover:bg-gray-100 group"
                >
                  <IconLogout2 size={30} />
                  <span className="ml-3">Cerrar Sesion</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </nav>
    </header>
  );
}
