import { useVisitaTecnicaStore } from "../../hooks";

import { useEffect } from "react";

import { Navbar, Titulo } from "../components";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { dayjsLocalizer, Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function AdminAgenda() {
  const localizer = dayjsLocalizer(dayjs);
  dayjs.locale("es");



  const { visitasTecnicas, startLoadingVisitasTecnicas } =
    useVisitaTecnicaStore();

  useEffect(() => {
    startLoadingVisitasTecnicas();
    // Función que se ejecutará cada 5 segundos
    const interval = setInterval(() => {
      startLoadingVisitasTecnicas();
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  const events = visitasTecnicas.map((item) => ({
    start: dayjs(item.fecha_visita).toDate(),
    end: dayjs(item.fecha_visita).toDate(),
    title: item.title,
  }));

  return (
    <div className="w-full  md:h-screen  sm:flex bg-gray-100 ">
      <Navbar  />

      <div className="w-full sm:pl-[3.9rem]">
        <div className=" h-screen">
          <div className="flex items-center h-full pt-10 flex-col">
            <Titulo texto="Agenda Tecnicos" />
            <Calendar
              localizer={localizer}
              className="shadow-gray-300 shadow-xl p-4 rounded-xl h-[80vh] w-11/12 mt-2"
              events={events}
              startAccessor="start"
              endAccessor="end"
              views={["month", "agenda"]} // Solo permite la vista de mes
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
  );
}
