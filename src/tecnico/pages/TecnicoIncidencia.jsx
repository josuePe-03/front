import {
  Navbar,
  Dropdow,
  TrIncidencia,
  Incidencias,
  Pagination,
  Titulo,
} from "../components";
import { useEffect, useState } from "react";
import { useIncidenciaStore } from "../../hooks";

export default function TecnicoIncidencia() {
  const { incidencias, filtros, startLoadingIncidencias } =
    useIncidenciaStore();

  // FILTROS
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
  }, [filterCategoria, page, search]);

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
              <Titulo texto={"Incidencias"}/>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-end space-y-3 md:space-y-0 md:space-x-4 mt-2 ">
              {/* SEARCH */}
              <div className="w-full md:w-1/4">
                <form className="flex items-center">
                  <label  className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 "
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
                    texto={"Tipo de incidencia"}
                    onChange={handleDropdownChange}
                  />
                </div>
              </div> */}
            </div>

            <div className="mt-3  flex justify-center shadow shadow-gray-300  rounded-xl">
              <div className="relative  overflow-x-auto w-full h-[29rem]  rounded-xl">
                <table className="w-full">
                  <thead className="text-[12px] text-gray-400">
                    <TrIncidencia />
                  </thead>
                  <tbody className="text-xs">
                    {incidencias === "Sin incidencias existentes" ? (
                      <tr>
                        <td className="px-6 py-4 text-center " colSpan={9}>
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
