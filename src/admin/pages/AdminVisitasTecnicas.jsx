import {
  Navbar,
  TrVisitaTecnica,
  VisitaTecnica,
  Dropdow,
  Titulo,
  Pagination,
} from "../components";
import { useVisitaTecnicaStore } from "../../hooks";
import { IconFilterCancel } from "@tabler/icons-react";
import { useEffect, useState } from "react";

// const options = [
//   {
//     value: "urgente",
//     label: "Visita Pendiente",
//   },
//   {
//     value: "noUrgente",
//     label: "Visita",
//   },
// ];

export default function AdminVisitasTecnicas() {
  const { visitasTecnicas, filtros, startLoadingVisitasTecnicas } =
    useVisitaTecnicaStore();

  // FILTROS
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [clearDropdown, setClearDropdown] = useState(false);

  const datos = [
    {
      page: page,
      search: search,
    },
  ];

  useEffect(() => {
    startLoadingVisitasTecnicas(datos);
    const interval = setInterval(() => {
      startLoadingVisitasTecnicas(datos);
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [page, search]);

  //FILTRADO CATEGORIAS
  const handleDropdownChange = (selectedValue) => {
    setFilterCategoria([selectedValue]);
  };

  //filtadro busqueda
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //LIMPIAR
  const handleClear = () => {
    setSearch("");
    setClearDropdown(true);
    setFilterCategoria([]);
  };
  // Resetear el estado de clearDropdown después de limpiar para permitir limpiezas futuras
  useEffect(() => {
    if (clearDropdown) {
      setClearDropdown(false);
    }
  }, [clearDropdown]);

  return (
    <div className="w-full h-screen  bg-gray-200">
      <Navbar />

      <div className="w-full sm:pl-[3rem] pt-[2rem] sm:pt-0 ">
        <div className="px-4 pt-8  ">
          <section className="h-[85vh] w-full">
            <div className="">
              {/* <!-- Start coding here --> */}
              <div className="bg-white dark:bg-gray-800 relative shadow-md rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                  <div className="">
                    <Titulo texto={"Administrador de Visitas"} />
                  </div>
                  {/* SEARCH */}
                  <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                      <label className="sr-only">Search</label>
                      {/* <div class="relative w-full">
                        <input
                          type="text"
                          id="simple-search"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 "
                          placeholder="Search"
                          required=""
                          value={search || ""}
                          onChange={handleChange}
                        />
                      </div> */}
                    </form>
                  </div>
                  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    {/* <div class="flex items-center space-x-3 w-full md:w-auto">
                      <Dropdow
                        options={options}
                        texto={"Estado"}
                        onChange={handleDropdownChange}
                        clearValue={clearDropdown}
                      />
                      <div>
                        <button
                          onClick={() => {
                            handleClear();
                          }}
                        >
                          <IconFilterCancel />
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="overflow-x-auto h-[22rem]">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <TrVisitaTecnica items={visitasTecnicas} />
                    </thead>
                    <tbody>
                      {visitasTecnicas === "Sin visitas existentes" ? (
                        <tr>
                          <td className="px-6 py-4 text-center " colSpan={9}>
                            {visitasTecnicas}
                          </td>
                        </tr>
                      ) : (
                        visitasTecnicas.map((items, i) => (
                          <VisitaTecnica key={i} items={items} />
                        ))
                      )}
                    </tbody>
                  </table>
                  <div className="">
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
          </section>
        </div>
      </div>
    </div>
  );
}
