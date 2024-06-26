import { useEquipoStore } from "../../hooks";

import {
  Navbar,
  Dropdow,
  TrEquipos,
  Equipos,
  Pagination,
  Titulo,
} from "../components";

import { useEffect, useState } from "react";

export default function TecnicoEquipos() {
  const { equipos, filtros, startLoadingEquipos } = useEquipoStore();
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
    startLoadingEquipos(datos);
    // Función que se ejecutará cada 5 segundos
    const interval = setInterval(() => {
      startLoadingEquipos(datos);
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
      value: "mastografo",
      label: "Mastografo",
    },
    {
      value: "tomgrafo",
      label: "Tomografo",
    },
  ];

  //filtadro busqueda
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full  h-screen sm:flex bg-gray-100">
      <Navbar />

      <div className="w-full sm:pl-[3.9rem] pt-12 md:pt-0">
        <div className="bg-white rounded-xl shadow shadow-gray-200 m-4 ">
          <div className="w-full font-semibold px-4 pt-4">
            <div className="w-full ">
              <div className="text-3xl font-bold">
                <Titulo texto={"Equipos"} />
              </div>
              <div class="flex flex-col md:flex-row items-center justify-end space-y-3 md:space-y-0 md:space-x-4 my-2 ">
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
                      texto={"Categoria"}
                      onChange={handleDropdownChange}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="relative overflow-x-auto h-[22rem]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-[12px] text-gray-400">
                <TrEquipos />
              </thead>
              <tbody>
                {equipos === "Sin equipos existentes" ? (
                  <tr>
                    <td className="px-6 py-4 text-center " colSpan={9}>
                      {equipos}
                    </td>
                  </tr>
                ) : (
                  equipos.map((items, i) => <Equipos key={i} items={items} />)
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
  );
}
