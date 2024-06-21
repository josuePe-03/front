import React from "react";
import { obtenerFechaHora } from "../../../helpers";
import { onLoadVisitaTecnica } from "../../../store";
import { useDispatch } from "react-redux";

export default function ListaVisitas({ visitasTecnicas }) {
  const dispatch = useDispatch();
  
  return (
    <div className="shadow-gray-300 shadow-xl p-3 rounded-xl md:w-[20rem] h-1/2">
      <header>
        <h3 className="text-xl font-medium">Lista de visitas</h3>
      </header>

      <div className="mt-2">
        {visitasTecnicas === "Sin visitas existentes" ? (
          <tr>
            <td className="px-6 py-4 text-center " colSpan={9}>
              {visitasTecnicas}
            </td>
          </tr>
        ) : (
          visitasTecnicas.map((items, i) => (
            <div
              key={i}
              className="text-xs border-b pb-2 grid grid-cols-4 w-full"
            >
              <div className="col-span-3 ">
                <p className="font-medium">{items.title}</p>
                <p>{obtenerFechaHora(items.fecha_visita)}</p>
              </div>
              <button
                onClick={() => {
                  dispatch(onLoadVisitaTecnica(items));
                  localStorage.setItem("fecha_visita",items.fecha_visita)
                }}
                className="p-1 bg-blue-700 rounded-md text-white font-semibold"
              >
                Ver fecha
              </button>
            </div>
          ))
        )}
        <div></div>
      </div>
    </div>
  );
}
