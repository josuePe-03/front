import { IconTrash } from "@tabler/icons-react";
import Swal from "sweetalert2";
import { useEquipoStore } from "../../../hooks";
import ModalUpdateEquipo from "./Modals/ModalUpdateEquipo";

export default function Equipos({ items }) {
  const { startDeletingEquipo } = useEquipoStore();

  const handleDelete = (id) => {
    startDeletingEquipo(id);
  };

  return (
    <tr className=" border-b text-xs text-gray-500 font-bold">
      <td className="px-6 py-4 ">{items.no_serie}</td>
      <td className="px-6 py-4 ">{items.marca}</td>
      <td className="px-6 py-4">{items.modelo}</td>
      <td className="px-6 py-4">{items.categoria}</td>
      <td className="px-6 py-4">{items.fecha_agregado}</td>
      <td className="px-6 py-4">{items.fecha_fabricacion}</td>
      <td className="px-6 py-4">{items.fecha_instalacion}</td>

      <td className=" text-center space-x-1">
        <ModalUpdateEquipo items={items} />
        <button
          onClick={() => {
            handleDelete(items._id);
          }}
          className="p-1 bg-red-700 rounded-md"
        >
          <IconTrash color="#ffff" />
        </button>
      </td>
    </tr>
  );
}
