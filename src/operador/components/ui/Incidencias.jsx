import { IconMapPin2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Incidencias({ items }) {
  return (
    <tr className=" text-gray-900">
      <td className="px-3 py-4">{items._id}</td>
      <td className="px-3 py-4">{items.id_equipo.no_serie}</td>
      <td className="px-3 py-4">{items.id_equipo.marca}</td>
      <td className="px-3 py-4">{items.id_equipo.modelo}</td>
      <td className="px-3 py-4">{items.id_operador.unidad_medica}</td>
      <td className=" px-3 py-4">{items.detalle}</td>
      <td className="px-3 py-4">
        {/* {items.fecha_incidencia.toDate().toLocaleString()} */}
        {items.fecha_registrada}
      </td>
      <td className="px-3 py-4">{items.tipo_incidencia}</td>

      {items.estado === "Completado" ? (
        <td className="text-green-500 font-bold px-3 py-4">{items.estado}</td>
      ) : items.estado === "Diagnosticado" ? (
        <td className="text-yellow-300 font-bold px-3 py-4">{items.estado}</td>
      ) : (
        <td className="text-red-900 font-bold px-3 py-4">{items.estado}</td>
      )}
      <td className=" px-3 py-4 flex justify-center items-center">
        <Link to={`/visita-incidencia/${items._id}`}>
          <IconMapPin2 size={30} />
        </Link>
      </td>
    </tr>
  );
}
