import {
  ModalAddUser,
  ModalUpdateUser,
  Navbar,
  Titulo,
  Usuarios,
  TrUsuarios,
  Dropdow
} from "../components";
import { useOperadorStore, useUiStore } from "../../hooks";
import { useEffect,useState } from "react";


export default function AdminOperadoresPage() {
  

  const {
    operadores,
    startLoadingOperadores,
  } = useOperadorStore();

  useEffect(() => {
    startLoadingOperadores();
    // Función que se ejecutará cada 5 segundos
    const interval = setInterval(() => {
      startLoadingOperadores();
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="w-full h-screen  bg-gray-200">
      <Navbar />

      <div className="w-full sm:pl-[3rem] pt-[2rem] sm:pt-0 ">
        <div className="px-12 pt-4  ">
          <div className="h-[10vh]">
            <Titulo texto={"Administrador de Operadores"} />
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
                        />
                      </div>
                    </form>
                  </div>
                  <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <ModalAddUser />


                    <div class="flex items-center space-x-3 w-full md:w-auto">
                      {/* <Dropdow
                        options={options}
                        texto={"Categoria"}
                        onChange={handleDropdownChange}
                      /> */}
                    </div>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <TrUsuarios />
                    </thead>
                    <tbody>
                    {operadores === "Sin operadores existentes" ? (
                          <tr>
                            <td className="px-6 py-4 text-center " colSpan={8}>
                              {operadores}
                            </td>
                          </tr>
                        ) : (
                          operadores.map((items, i) => (
                            <Usuarios tecnico={false} key={i} items={items}/>
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
