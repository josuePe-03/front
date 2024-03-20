import {
  ModalAddUser,
  ModalUpdateUser,
  Navbar,
  Titulo,
  Usuarios,
} from "../components";
import { useOperadorStore, useUiStore } from "../../hooks";
import { useEffect } from "react";


export default function AdminOperadoresPage() {
  
  const { openDateModal } = useUiStore();

  const {
    operadores,
    setActiveOperador,
    startLoadingOperadores,
    startDeletingOperador,
    startSavingOperador,
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



  const openModel = () => {
    openDateModal();
  };

  return (
    <div className="w-full h-screen  bg-gray-200">
      <Navbar />

      <div className="w-full sm:pl-[3rem] pt-[2rem] sm:pt-0 ">
        <div className="px-12 pt-4  ">
          <div className="h-[10vh]">
            <Titulo texto={"Administrador de Operadores"} />
          </div>
          <section className="h-[85vh] w-full">
            <div className="grid grid-cols-1  gap-3">
              <div className=" flex justify-end gap-2">
                <ModalAddUser />
                <input
                  type="search"
                  id="search-dropdown"
                  className="pl-5 pr-2 py-2 border-2 border-gray-400 w-full sm:w-fit z-20 text-sm text-gray-900 bg-gray-50 rounded-lg "
                  placeholder="Busca Operador"
                  // value={busqueda || ""}
                  // onChange={handleChange}
                />
              </div>
              <div className=" ">
                <section className="bg-white rounded-xl p-3 shadow ">
                  <div className="relative overflow-x-auto  rounded-xl">
                    <table className="w-full text-xs text-left rtl:text-right text-gray-500 ">
                      <thead className="text-xs text-gray-400   ">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Id
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Nombre
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Apellidos
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Direccion
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Edad
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Unidad Medica
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Opciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {operadores === "Sin operadores existentes" ? (
                          <tr>
                            <td className="px-6 py-4 text-center " colSpan={7}>
                              {operadores}
                            </td>
                          </tr>
                        ) : (
                          operadores.map((items, i) => (
                            <Usuarios key={i} items={items}/>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
