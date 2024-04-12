import { Navbar, Dropdow, Incidencias, TrIncidencia,Pagination } from "../components";
import { useEquipoStore, useIncidenciaStore } from "../../hooks";
import { useEffect, useState } from "react";

export default function OperadorIncidencia() {
  const { incidencias, filtros, startLoadingIncidencias } =
    useIncidenciaStore();

  const [filterCategoria, setFilterCategoria] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [clearDropdown, setClearDropdown] = useState(false);

  const datos = [
    {
      filterCategoria: filterCategoria,
      page: page,
      search: search,
    },
  ];

  useEffect(() => {
    startLoadingIncidencias(datos);
    const interval = setInterval(() => {
      startLoadingIncidencias(datos);
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [filterCategoria, search, page]);

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

    //filtadro busqueda
    const handleChange = (e) => {
      setSearch(e.target.value);
    };

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
                      value={search || ""}
                      onChange={handleChange}
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
              <div className="relative  overflow-x-auto h-[29rem] w-full  rounded-xl">
                <table className="w-full text-xs ">
                  <thead className="text-[12px] text-gray-400">
                    <TrIncidencia />
                  </thead>
                  <tbody className="text-[11.5px]">
                  {incidencias === "Sin incidencias existentes" ? (
                        <tr>
                          <td className="px-6 py-4 text-center " colSpan={8}>
                            {incidencias}
                          </td>
                        </tr>
                      ) : (
                        incidencias.map((items, i) => (
                          <Incidencias key={i} items={items} />
                        ))
                      )}
                  </tbody>
                </table>
                <Pagination
                page={page}
                limit={filtros.limit ? filtros.limit : 0}
                total={filtros.total ? filtros.total : 0}
                setPage={(page) => setPage(page)}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
