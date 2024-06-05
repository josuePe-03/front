import { Compañias, Sidebar } from "../components";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { useEffect,useState } from "react";
import { useCentroMedicoStore } from "../../hooks";

export default function CompañiasSuperAdministradoresPage() {
  const { centrosMedicos, startLoadingCentrosMedicos } = useCentroMedicoStore();

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
    startLoadingCentrosMedicos(datos);
    // Función que se ejecutará cada 5 segundos
    const interval = setInterval(() => {
      startLoadingCentrosMedicos(datos);
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
          <h1 className="text-4xl text-[#16351b] font-bold">Compañias</h1>
        </header>
        <section className="px-4 pb-4 w-full sm:flex sm:justify-end">
          <Link
            to="/agregar-producto"
            className="bg-[#388141] w-full sm:w-fit p-2 rounded-md text-white font-semibold flex justify-center items-center gap-2"
          >
            Agregar Compañia <IconPlus stroke={2} />
          </Link>
        </section>
        <section className="p-4 pt-0">
          <input
            type="text"
            placeholder="Buscar Compañia"
            className="isolate py-3 w-full px-3 text-[#16351b] font-medium rounded-md bg-white/10 shadow-lg ring-1 ring-black/5"
            // value={search || ""}
            // onChange={handleChange}
          />
        </section>
        <div className="relative overflow-x-auto p-4 rounded-md">
          <table className=" text-sm text-left rtl:text-right text-gray-500 shadow-lg ring-1 ring-black/5 rounded-md">
            <thead className="text-xs text-gray-700 uppercase  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Telefono
                </th>
                <th scope="col" className="px-6 py-3">
                  Direccion
                </th>
              </tr>
            </thead>
            <tbody>
              {centrosMedicos === "Sin centros medicos existentes" ? (
            <div className="">
              <div
                className="px-6 py-4 text-center text-[#16351b] font-semibold"
                colSpan={7}
              >
                {centrosMedicos} :(
              </div>
            </div>
          ) : (
            centrosMedicos.map((items, i) => <Compañias key={i} items={items} />)
          )}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}
