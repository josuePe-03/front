import { Navbar, Dropdow, Incidencias, TrIncidencia } from "../components";
import { useEquipoStore, useIncidenciaStore } from "../../hooks";
import { useEffect,useState } from "react";

export default function OperadorIncidencia() {
  const { incidencias, startLoadingIncidencias } = useIncidenciaStore();

  useEffect(() => {
    startLoadingIncidencias();
    const interval = setInterval(() => {
      startLoadingIncidencias();
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  const [estado, setEstado] = useState();

  const handleDropdownChange = (selectedValue) => {
    setEstado(selectedValue);
  };

  const options = [
    {
      value: "predictiva",
      label: "Predictiva",
    },
    {
      value: "preventiva",
      label: "Preventiva",
    },
    {
      value: "correctiva",
      label: "Correctiva",
    },
  ];

  return (
    <div className="w-full  h-screen sm:flex bg-gray-100">
      <Navbar />

      <div className="w-full sm:pl-[3.9rem] pt-12 md:pt-0 ">
        <div className="w-full font-semibold ">
          <div className="m-4 p-4 bg-white rounded-xl shadow shadow-gray-200">
            <div className="mt-2 md:flex justify-between">
              <h1 className="text-3xl font-bold">Incidencias</h1>
            </div>

            <div class="flex flex-col md:flex-row items-center justify-end space-y-3 md:space-y-0 md:space-x-4 mt-2 ">
                {/* SEARCH */}
                <div class="w-full md:w-1/4">
                  <form class="flex items-center">
                    <label for="simple-search" class="sr-only">
                      Search
                    </label>
                    <div class="relative w-full">
                      <input
                        type="text"
                        id="simple-search"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 "
                        placeholder="Search"
                        required=""
                      />
                    </div>
                  </form>
                </div>
                {/* <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <div class="flex items-center space-x-3 w-full md:w-auto">
                    <Dropdow
                      options={options}
                      texto={"Tipo Incidencia"}
                      onChange={handleDropdownChange}
                    />
                  </div>
                </div> */}
              </div>
            <div className="mt-3  flex justify-center shadow shadow-gray-300  rounded-xl">
              <div className="relative  overflow-x-auto w-full  rounded-xl">
                <table className="w-full text-xs ">
                  <thead className="text-[12px] text-gray-400">
                    <TrIncidencia />
                  </thead>
                  <tbody className="text-[11.5px]">
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
