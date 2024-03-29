import {
  IconCheckupList,
  IconMapPin2,
  IconClipboardSmile,
} from "@tabler/icons-react";

import { Link } from "react-router-dom";

import ModalAddVisita from "./Modals/ModalAddVisita";

import { obtenerFechaHora } from "../../../helpers";

export default function Incidencias({ items }) {
  const fecha_formateada = obtenerFechaHora(items.fecha_registrada);

  return (
    <tr className=" text-gray-900">
      <td className="px-3 py-4">{items._id}</td>
      <td className="px-3 py-4">{items.id_equipo.no_serie}</td>
      <td className="px-3 py-4">{items.id_equipo.marca}</td>
      <td className="px-3 py-4">{items.id_equipo.modelo}</td>
      <td className="px-3 py-4">{items.id_operador.unidad_medica}</td>
      <td className=" px-3 py-4">{items.detalle}</td>
      <td className="px-3 py-4">{fecha_formateada}</td>
      <td className="px-3 py-4">{items.tipo_incidencia}</td>

      {items.estado === "Completado" ? (
        <td className="text-green-500 font-bold px-3 py-4">{items.estado}</td>
      ) : items.estado === "Diagnosticado" ? (
        <td className="text-yellow-300 font-bold px-3 py-4">{items.estado}</td>
      ) : items.estado === "Revision Operador" ? (
        <td className="text-orange-600 font-bold px-3 py-4">{items.estado}</td>
      ) : (
        <td className="text-red-900 font-bold px-3 py-4">{items.estado}</td>
      )}

      {items.estado === "Completado" ? (
        <td className="text-green-500 font-bold px-3 py-4">{items.estado}</td>
      ) : items.estado === "Revision Operador" ? (
        <td className="flex justify-center items-center px-3 py-4">
          <IconClipboardSmile size={30} />
        </td>
      ) : items.estado === "Diagnosticado" ? (
        <td className="flex justify-center items-center px-3 py-4">
          <Link to={"/visitas"}>
            <IconMapPin2 size={30} />
          </Link>
        </td>
      ) : (
        <td className=" px-3 py-4 flex justify-center items-center">
          <ModalAddVisita items={items} />
        </td>
      )}
    </tr>
  );
}
