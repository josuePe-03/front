import React from "react";
import { IconChecklist } from "@tabler/icons-react";
import { obtenerFechaHora } from "../../../helpers";

export default function VisitaTecnica({ items }) {


  return (
    <tr className=" border-b text-xs text-gray-900 font-bold">
      <td className="px-3 py-4 ">{items._id}</td>
      <td className="px-3 py-4 ">{items.id_incidencia._id}</td>
 

      <td className="px-3 py-4">{items.id_incidencia.tipo_incidencia}</td>
      <td className="px-3 py-4">{items.id_incidencia.status}</td>

      <td className="px-3 py-4">{ obtenerFechaHora(items.fecha_visita)}</td>

      {items.estado === "Visita Concluida" || items.estado === "Tecnico Asignado" ||  items.estado === "Visita Instalacion"
      ? (
        <td className="text-green-500 font-bold px-3 py-4">{items.estado}</td>
      ) 
      : items.estado === "Diagnosticado" ? (
        <td className="text-yellow-300 font-bold px-3 py-4">{items.estado}</td>
      ) : (
        <td className="text-red-900 font-bold px-3 py-4">{items.estado}</td>
      )}
    </tr>
  );
}
