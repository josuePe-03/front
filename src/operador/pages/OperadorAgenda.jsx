import { Navbar, Titulo } from "../components";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { dayjsLocalizer, Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function OperadorIncidencia() {
  const localizer = dayjsLocalizer(dayjs);
  dayjs.locale("es");

  const events = [
    {
      start: dayjs().toDate(),
      end: dayjs().toDate(),
      title: "Visita",
    },
  ];

  return (
    <div className="w-full  md:h-screen  sm:flex bg-gray-200 ">
      <Navbar mensaje={true} />

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
