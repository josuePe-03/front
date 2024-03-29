import { Navbar, Titulo, Equipos, TrEquipos } from "../components";
import { useEquipoStore } from "../../hooks";
import { useEffect } from "react";

export default function OperadorIncidencia() {
  const { equipos, startLoadingEquipos } = useEquipoStore();
  useEffect(() => {
    startLoadingEquipos();
    // Función que se ejecutará cada 5 segundos
    const interval = setInterval(() => {
      startLoadingEquipos();
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full  h-screen sm:flex bg-gray-100">
      <Navbar />

      <div className="w-full sm:pl-[3.9rem] pt-12 md:pt-0">
        <div className="bg-white rounded-xl shadow shadow-gray-200 m-4 p-4">
          <div className="w-full font-semibold">
            <div className="w-full ">
              <form className=" md:flex md:justify-between :items-center ">
                <div className="text-3xl font-bold">

                <h1>Equipos</h1>
                </div>
                <div className="lg:flex">
                  {/* <DropdownEquipo
                  options={options}
                  texto={"Selecciona un categoria"}
                  onChange={handleDropdownChange}
                  onClear={handleClear} // Pass the onClear function to the DropdownEquipos component
                /> */}
                  <div className="relative mt-4 md:mt-0">
                    {/* <input
                      type="search"
                      id="search-dropdown"
                      className="block py-3 pl-5 lg:pr-10 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg lg:rounded-lg  border-gray-300 "
                      placeholder="Busca Equipo Medico"
                      value={busqueda || ""}
                      onChange={handleChange}
                    /> */}
                    {/* <div className="absolute top-0 end-0 p-2.5 text-sm font-medium  text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                      <IconSearch />

                      <span className="sr-only">Search</span>
                    </div> */}
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:mt-5 mt-4   flex justify-center shadow shadow-gray-300 bg-white rounded-xl">
            <div className="relative  overflow-x-auto w-full  rounded-xl">
              <table className="w-full text-sm ">
                <thead className="text-[12px] text-gray-400">
                  <TrEquipos />
                </thead>
                <tbody>
                  {equipos.map((items, i) => (
                        <Equipos key={i} items={items} />
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
