import React from "react";
import { Link } from "react-router-dom";
import { IconMapPin2 } from "@tabler/icons-react";
import { obtenerFechaHora } from "../../../helpers";

export default function IncidenciasEquipo({ incidencias }) {

  return (
    <tr className="">
      <td className="px-3 py-4">{incidencias.id_equipo.no_serie}</td>
      <td className="px-3 py-4">{incidencias.id_equipo.marca}</td>
      <td className="px-3 py-4">{incidencias.id_equipo.modelo}</td>
      <td className="px-3 py-4">{incidencias.id_operador.unidad_medica}</td>
      <td className="col-span-1 px-6 py-4">{incidencias.detalle}</td>
      <td className="px-3 py-4">{obtenerFechaHora(incidencias.fecha_registrada)}</td>

      <td className="px-3 py-4">{incidencias.tipo_incidencia}</td>
      <td
        className={`${
          incidencias.estado === "Pendiente"
            ? "text-red-900"
            : incidencias.estado === "Diagnosticado"
            ? "text-yellow-400"
            : "text-green-600"
        } px-3 py-4 font-bold`}
      >
        {incidencias.estado}
      </td>


        <td className=" px-3 py-4 flex justify-center items-center">
          <Link to={`/visita-incidencia/${incidencias._id}`}>
            <IconMapPin2 size={30} />
          </Link>
        </td>
    </tr>
  );
}
