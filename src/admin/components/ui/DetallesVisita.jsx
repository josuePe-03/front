import { obtenerFechaHora } from "../../../helpers";

export default function DetallesVisita({ visitaTecnica }) {

  return (
    <div className="shadow-gray-300 shadow-xl p-3 rounded-xl w-[20rem] h-1/2">
      <header>
        <h3 className="text-xl font-medium">Detalle Visita</h3>
      </header>

      <div className="mt-2">
        {visitaTecnica.length === 0 ? (
          <h2>Sin visita seleccionada</h2>
        ) : (
          visitaTecnica.map((items, i) => (
            <div
              key={i}
              className="text-xs border-b pb-2 grid grid-cols-4 w-full"
            >
              <div className="col-span-3 ">
                <p className="font-medium">{items.id_incidencia._id}</p>
                <p className="font-medium">{items.title}</p>
                <p>{obtenerFechaHora(items.fecha_visita)}</p>
                <p>{obtenerFechaHora(items.fecha_revisado)}</p>

                <p className="font-medium">{items.id_incidencia.detalle}</p>
                <p className="font-medium">{items.id_incidencia.status}</p>
                <p className="font-medium">{items.id_incidencia.tipo_incidencia}</p>
                <p className="font-medium">{items.id_incidencia.id_equipo.no_serie}</p>
                <p className="font-medium">{items.id_incidencia.id_equipo.marca}</p>
                <p className="font-medium">{items.id_incidencia.id_equipo.modelo}</p>






              </div>
            </div>
          ))
        )}
        <div></div>
      </div>
    </div>
  );
}
