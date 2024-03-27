import { Link } from "react-router-dom";
import { IconFilePlus, IconListDetails } from "@tabler/icons-react";
import ModalAddIncidencia from "./Modals/ModalAddIncidencia";

export default function Equipos({ items }) {
  return (
    <tr className=" border-b text-xs text-gray-900 font-bold">
      <td className="px-3 py-4 ">{items._id}</td>
      <td className="px-3 py-4 ">{items.marca}</td>
      <td className="px-3 py-4">{items.modelo}</td>
      <td className="px-3 py-4">{items.categoria}</td>
      <td className="px-3 py-4">{items.fecha_agregado}</td>
      <td className="px-3 py-4">{items.fecha_fabricacion}</td>
      <td className="px-3 py-4">{items.fecha_instalacion}</td>
      <td className="px-3 py-4 flex justify-center">
        <ModalAddIncidencia items={items}/>
      </td>
      <td className="px-3 py-4  ">
        <Link
          to={`/equipo-incidencia/${items._id}`}
          className=" flex justify-center"
        >
          <IconListDetails />
        </Link>
      </td>
    </tr>
  );
}
