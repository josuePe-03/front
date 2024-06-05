import { useOperadorSuperAdminStore } from "../../hooks";
import { Empleados, Sidebar } from "../components";
import { useEffect,useState } from "react";

export default function EmpleadosSuperAdminPage() {
  const { operadores, startLoadingOperadoresSuperAdmin } =
    useOperadorSuperAdminStore();

  // FILTROS
  const [filterArea, setFilterArea] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [clearDropdown, setClearDropdown] = useState(false);

  const datos = [
    {
      filterArea: filterArea,
      page: page,
      search: search,
    },
  ];

  useEffect(() => {
    startLoadingOperadoresSuperAdmin(datos);
    // Función que se ejecutará cada 5 segundos
    const interval = setInterval(() => {
      startLoadingOperadoresSuperAdmin(datos);
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [filterArea,page,search]);


  return (
    <div className="bg-[#f3faf3] h-screen sm:pl-[14rem]">
      {/* SIDEBAR */}
      {/* INPUT TEXT */}
      <article>
        <Sidebar productos={true} />
        <header className="px-4 sm:pt-5">
          <h1 className="text-4xl text-[#16351b] font-bold">Operadores</h1>
        </header>
        <section className="p-4 pt-5">
          <input
            type="text"
            placeholder="Buscar empleados"
            className="isolate py-3 w-full px-3 text-[#16351b] font-medium rounded-md bg-white/10 shadow-lg ring-1 ring-black/5"
            // value={search || ""}
            // onChange={handleChange}
          />
        </section>
        <div className="relative overflow-x-auto p-4 rounded-md">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-lg ring-1 ring-black/5 rounded-md">
            <thead className="text-xs text-gray-700 uppercase  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Apellido
                </th>
                <th scope="col" className="px-6 py-3">
                  Edad
                </th>
                <th scope="col" className="px-6 py-3">
                  Compañia
                </th>
              </tr>
            </thead>
            <tbody>
              {operadores === "Sin operadores existentes" ? (
                <div className="">
                  <div
                    className="px-6 py-4 text-center text-[#16351b] font-semibold"
                    colSpan={7}
                  >
                    {operadores} :(
                  </div>
                </div>
              ) : (
                operadores.map((items, i) => <Empleados key={i} items={items} />)
              )}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}
