import React from "react";
import { obtenerFechaHora } from "../../../helpers";

export default function ListaVisitas({ visitasTecnicas }) {
  return (
    <div className="shadow-gray-300 shadow-xl p-3 rounded-xl w-[20rem] h-full">
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
            <div key={i} className="text-xs border-b pb-2 grid grid-cols-4 w-full">
              <div className="col-span-3 ">
                <p className="font-medium">{items.title}</p>
                <p>{obtenerFechaHora(items.fecha_visita)}</p>
              </div>
              <div className="w-full flex justify-center items-center">Ver fecha</div>
            </div>
          ))
        )}
        <div></div>
      </div>
    </div>
  );
}
