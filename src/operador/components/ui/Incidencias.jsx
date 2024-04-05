import {
  IconClipboardCheck,
  IconClipboardSmile,
  IconMapPin2,
} from "@tabler/icons-react";

import { Link } from "react-router-dom";

import { obtenerFechaHora } from "../../../helpers";

import { useIncidenciaStore } from "../../../hooks/operador/useIncidenciaStore";

import Swal from "sweetalert2";

export default function Incidencias({ items }) {
  const fecha_registrada = obtenerFechaHora(items.fecha_registrada);

  const { startTerminarIncidencia } = useIncidenciaStore();

  const terminarIncidencia = () => {
    startTerminarIncidencia(items)
    return;
  };

  return (
    <tr className=" text-gray-900">
      <td className="px-3 py-3">{items._id}</td>
      <td className="px-3 py-3">{items.id_equipo.no_serie}</td>
      <td className="px-3 py-3">{items.id_equipo.marca}</td>
      <td className="px-3 py-3">{items.id_equipo.modelo}</td>
      <td className="px-3 py-3">{items.id_operador.unidad_medica}</td>
      <td className=" px-3 py-3">{items.detalle}</td>
      {/* <td className="px-3 py-3">
        {fecha_registrada}
      </td> */}
      <td className="px-3 py-3">{items.tipo_incidencia}</td>

      {items.estado === "Concluido" ? (
        <td className="text-green-500 font-bold px-3 py-3">{items.estado}</td>
      ) : items.estado === "Revision Operador" ? (
        <td className="text-orange-600 font-bold px-3 py-3">
          {items.estado}
        </td>
      ) : items.estado === "Diagnosticado" ? (
        <td className="text-yellow-300 font-bold px-3 py-3">{items.estado}</td>
      ) : (
        <td className="text-red-900 font-bold px-3 py-3">{items.estado}</td>
      )}

      {/* DAR COMPLETADA VISITA */}

      {items.estado === "Concluido" ? (
        <td className=" px-3 py-3 flex justify-center items-center">
          <IconClipboardSmile size={30} />
        </td>
      ) : items.estado === "Revision Operador" ? (
        <td className=" px-3 py-3 flex justify-center items-center">
          <button
            onClick={() => {
              terminarIncidencia();
            }}
          >
            <IconClipboardCheck size={30} />
          </button>
        </td>
      ) : (
        <td className=" px-3 py-3 flex justify-center items-center">
          <Link to={`/visita-incidencia/${items._id}`}>
            <IconMapPin2 size={30} />
          </Link>
        </td>
      )}
    </tr>
  );
}
