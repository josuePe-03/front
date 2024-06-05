import {
  Navbar,
  Titulo,
  ModalAddUbicacion,
  TrUbicacion,
  Ubicaciones,
} from "../components";
import { useUbicacionStore} from "../../hooks";
import { useEffect, useState } from "react";

export default function AdminUbicacionHospitalPage() {
  const { ubicaciones, startLoadingUbicaciones } = useUbicacionStore();


  useEffect(() => {
    startLoadingUbicaciones();
    // Función que se ejecutará cada 5 segundos
    const interval = setInterval(() => {
      startLoadingUbicaciones();
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  //filtadro busqueda
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full h-screen  bg-gray-200">
      <Navbar />

      <div className="w-full sm:pl-[3rem] pt-[2rem] sm:pt-0 ">
        <div className="px-12 pt-4  ">
          <div className="h-[10vh]">
            <Titulo texto={"Administrador de Ubicaciones Hospital"} />
          </div>
          <section className="h-[85vh] ">
            <div className="">
              {/* <!-- Start coding here --> */}
              <div className="bg-white w-fit dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <ModalAddUbicacion />
                  </div>
                </div>
                <div className="w-full overflow-x-auto h-[22rem]">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <TrUbicacion />
                    </thead>
                    <tbody>
                      {ubicaciones === "Sin ubicaciones existentes" ? (
                        <tr>
                          <td className="px-6 py-4 text-center " colSpan={7}>
                            {ubicaciones}
                          </td>
                        </tr>
                      ) : (
                        ubicaciones.map((items, i) => (
                          <Ubicaciones key={i} items={items} />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
