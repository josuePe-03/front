import { Navbar, Titulo, TrIncidencia, Incidencias } from "../components";
import { useEffect } from "react";
import { useIncidenciaStore } from "../../hooks";

export default function TecnicoIncidencia() {
  const { incidencias, startLoadingIncidencias } = useIncidenciaStore();

  useEffect(() => {
    startLoadingIncidencias();
    const interval = setInterval(() => {
      startLoadingIncidencias();
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full  h-screen sm:flex bg-gray-100">
      <Navbar />

      <div className="w-full sm:pl-[3.9rem] pt-12 md:pt-0 ">
        <div className="w-full font-semibold ">
          <div className="m-4 p-4 bg-white rounded-xl shadow shadow-gray-200">
            <div className="mt-2 md:flex justify-between">
              <h1 className="text-3xl font-bold">Incidencias</h1>
              {/* <input
                type="search"
                id="search-dropdown"
                className=" mt-4 md:mt-0 w-full md:w-1/2 lg:w-1/5 block py-3 lg:pr-10  z-20 text-sm text-gray-900 bg-gray-50 rounded-lg "
                placeholder="Busca Problema"
                value={busqueda || ""}
                onChange={handleChange}
              /> */}
            </div>

            <div className="mt-3  flex justify-center shadow shadow-gray-300  rounded-xl">
              <div className="relative  overflow-x-auto w-full  rounded-xl">
                <table className="w-full">
                  <thead className="text-[12px] text-gray-400">
                    <TrIncidencia />
                  </thead>
                  <tbody className="text-xs">
                    {incidencias.map((items, i) => (
                      <Incidencias key={i} items={items} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
