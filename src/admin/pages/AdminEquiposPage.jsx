import {
  ModalAddEquipo,
  Navbar,
  Titulo,
  TrEquipos,
  Equipos,
  Dropdow,
  Pagination,
} from "../components";
import { useEquipoStore, useUiStore } from "../../hooks";
import { useEffect, useState } from "react";
import { IconFilterCancel } from "@tabler/icons-react";

const options = [
  {
    value: "Mastografo",
    label: "Mastografo",
  },
  {
    value: "Tomografo",
    label: "Tomografo",
  },
];

export default function AdminOperadoresPage() {
  const { equipos,filtros, startLoadingEquipos } = useEquipoStore();

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
        <div className="px-12 pt-4  ">
          <div className="h-[10vh]">
            <Titulo texto={"Administrador de Equipos"} />
          </div>
          <section className="h-[85vh] w-full">
            <div class="">
              {/* <!-- Start coding here --> */}
              <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                  {/* SEARCH */}
                  <div class="w-full md:w-1/2">
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
                  <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <ModalAddEquipo />

                    <div class="flex items-center space-x-3 w-full md:w-auto h-full">
                      <Dropdow
                        options={options}
                        texto={"Categoria"}
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
                    </div>
                  </div>
                </div>
                <div class="overflow-x-auto h-[22rem]">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <TrEquipos />
                    </thead>
                    <tbody>
                        {equipos === "Sin equipos existentes" ? (
                        <tr>
                          <td className="px-6 py-4 text-center " colSpan={7}>
                            {equipos}
                          </td>
                        </tr>
                      ) : (
                        equipos.map((items, i) => (
                          <Equipos key={i} items={items} />
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
