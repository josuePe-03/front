import {
  ModalAddEquipo,
  Navbar,
  Titulo,
  TrEquipos,
  Equipos,
  Dropdow,
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
  const { equipos, startLoadingEquipos } = useEquipoStore();

  
  //FILTRADO
  const [busqueda, setBusqueda] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [clearDropdown, setClearDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [resultados, setResultados] = useState([]);
  
  useEffect(() => {
    startLoadingEquipos();
    // Función que se ejecutará cada 5 segundos
     const interval = setInterval(() => {
       startLoadingEquipos();
     }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [busqueda,dropdown]);
  
  const handleDropdownChange = (selectedValue) => {
    setDropdown(selectedValue);
    const filterData = (selectedValue) => {
      const filtered = equipos.filter((item) =>
        item.categoria.toLowerCase().includes(selectedValue.toLowerCase())
      );
      setFilteredData(filtered);
      setResultados(filtered);
    };
    filterData(selectedValue)
  };


  const filtrar = (terminoBusqueda) => {
    const arrayToFilter = dropdown ? filteredData : equipos;

    var resultadoBusqueda = arrayToFilter.filter((elemento) => {
      return elemento.modelo
        .toString()
        .toLowerCase()
        .includes(terminoBusqueda.toLowerCase());
    });

    if (!resultadoBusqueda.length) {
      const sin_resultados = ["Sin resultados"];
      setResultados(sin_resultados);
      return;
    }

    setResultados(resultadoBusqueda);
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const handleClear = () => {
    setBusqueda("");
    setClearDropdown(true);

    setDropdown("");
    setResultados(equipos);
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
            <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
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
                          value={busqueda || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </form>
                  </div>
                  <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <ModalAddEquipo />

                    {/* <div class="flex items-center space-x-3 w-full md:w-auto">
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
                    </div> */}
                  </div>
                </div>
                <div class="overflow-x-auto h-[70vh]">
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
                      ) : resultados == "Sin resultados" ? (
                        <tr>
                          <td className="px-6 py-4 text-center " colSpan={7}>
                            No hay resultados
                          </td>
                        </tr>
                      ) : resultados.length ? (
                        resultados.map((items, i) => (
                          <Equipos key={i} items={items} />
                        ))
                      ) : (
                        equipos.map((items, i) => (
                          <Equipos key={i} items={items} />
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
