import React from 'react'

export default function IncidenciasEquipo({incidencias}) {
  return (
    <tr className="">
    <td className="px-3 py-4">{incidencias.id_equipo.no_serie}</td>
    <td className="px-3 py-4">{incidencias.id_equipo.marca}</td>
    <td className="px-3 py-4">{incidencias.id_equipo.modelo}</td>
    <td className="px-3 py-4">{incidencias.id_operador.unidad_medica}</td>
    <td className="col-span-1 px-6 py-4">{incidencias.detalle}</td>
    <td className="px-3 py-4">
      {incidencias.fecha_registrada}
    </td>

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
  </tr>
  )
}
