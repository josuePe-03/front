import { useVisitaTecnicaStore } from "../../hooks";

import { useEffect, useState } from "react";

import { Calendario, ListaVisitas, Navbar, Titulo } from "../components";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { dayjsLocalizer, Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function AdminAgenda() {
  const localizer = dayjsLocalizer(dayjs);
  dayjs.locale("es");

  const { visitasTecnicas, startLoadingVisitasTecnicas } =
    useVisitaTecnicaStore();

  const [filterCategoria, setFilterCategoria] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const datos = [
    {
      filterCategoria: filterCategoria,
      page: page,
      search: search,
    },
  ];

  useEffect(() => {
    startLoadingVisitasTecnicas(datos);
    // Función que se ejecutará cada 5 segundos
    const interval = setInterval(() => {
      startLoadingVisitasTecnicas(datos);
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [filterCategoria, page, search]);

  let eventos =
    visitasTecnicas === "Sin visitas existentes" ? [] : visitasTecnicas;

  const events = eventos.map((item) => ({
    start: dayjs(item.fecha_visita).toDate(),
    end: dayjs(item.fecha_visita).toDate(),
    title: item.title,
  }));

  return (
    <div className="w-full  md:h-screen  sm:flex bg-gray-100 ">
      <Navbar />

      <div className="w-full sm:pl-[3.9rem]">
        <div className=" h-screen ">
          <div className="flex items-center h-full pt-10 flex-col">
            <div className="w-full pl-4">
              <Titulo texto="Agenda Tecnicos" />
            </div>
            <div className=" flex  w-full gap-4 p-3 h-screen">
              <div className="">
                <ListaVisitas visitasTecnicas={visitasTecnicas} />
              </div>
              <div className="w-full ">
                <Calendar
                  localizer={localizer}
                  className="shadow-gray-300 shadow-xl px-4 pb-4 rounded-xl "
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  views={["month"]} // Solo permite la vista de mes
                  messages={{
                    next: "Siguiente",
                    previous: "Anterior",
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
