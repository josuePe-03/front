import { IconTrash } from "@tabler/icons-react";
import Swal from "sweetalert2";
import {useEquipoStore} from "../../../hooks";
import ModalUpdateEquipo from "./Modals/ModalUpdateEquipo";

export default function Equipos({ items }) {
  const { startDeletingEquipo } = useEquipoStore();

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Deseas borrar el operador?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar.",
    }).then((result) => {
      if (result.isConfirmed) {

        startDeletingEquipo(id);
      }
    });
  };

  return (
    <tr className=" border-b text-xs text-gray-900 font-bold">
      <td className="px-6 py-4 ">{items._id}</td>
      <td className="px-6 py-4 ">{items.marca}</td>
      <td className="px-6 py-4">{items.modelo}</td>
      <td className="px-6 py-4">{items.categoria}</td>
      <td className="px-6 py-4">{items.fecha_agregado}</td>
      <td className="px-6 py-4">{items.fecha_fabricacion}</td>
      <td className="px-6 py-4">{items.fecha_instalacion}</td>

      <td className=" text-center space-x-1">
        <ModalUpdateEquipo  items={items} />
        <button
          onClick={() => {
            handleDelete(items._id)
          }}
          className="p-1 bg-red-700 rounded-md"
        >
          <IconTrash color="#ffff" />
        </button>
      </td>
    </tr>
  );
}
