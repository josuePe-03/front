import { useVisitaTecnicaStore } from "../../hooks";

import { useEffect, useState } from "react";

import {
  Calendario,
  DetallesVisita,
  ListaVisitas,
  Navbar,
  Titulo,
} from "../components";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { dayjsLocalizer, Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function AdminAgenda() {
  const localizer = dayjsLocalizer(dayjs);
  dayjs.locale("es");

  const { visitasTecnicas, visitaTecnica, startLoadingVisitasTecnicas } =
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

  // CONVERTIR OBJETO A ARREGLO
  let validateVisitasTecnicas =
    visitasTecnicas === "Sin visitas existentes" ? [] : visitasTecnicas;

  let eventos =
    visitaTecnica.length === 0 ? validateVisitasTecnicas : visitaTecnica;

  const events = eventos.map((item) => ({
    start: dayjs(item.fecha_visita).toDate(),
    end: dayjs(item.fecha_visita).toDate(),
    title: item.title,
  }));

  const fechaVisita = localStorage.getItem("fecha_visita");
  const fechaSeleccionada = fechaVisita ? fechaVisita : "";

  useEffect(() => {
    localStorage.removeItem("fecha_visita")
  }, []);

  return (
    <div className="w-full  md:h-screen  sm:flex ">
      <Navbar />

      <div className="w-full sm:pl-[3.9rem]">
        <div className=" h-screen ">
          <div className="flex items-center h-full pt-10 flex-col">
            <div className="w-full pl-4 pt-4 md:pt-0">
              <Titulo texto="Agenda Tecnicos" />
            </div>
            <div className=" flex flex-col md:flex-row  w-full gap-4 p-3 h-screen">
              <div className="">
                <ListaVisitas visitasTecnicas={visitasTecnicas} />
                <DetallesVisita visitaTecnica={visitaTecnica} />
              </div>
              <div className="w-full h-[60vh] md:h-full">
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
                  date={fechaSeleccionada} // Usa la fecha seleccionada para navegar en el calendario
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
