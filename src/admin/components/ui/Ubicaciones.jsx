import { IconTrash } from "@tabler/icons-react";
import Swal from "sweetalert2";
import { useEquipoStore, useUbicacionStore } from "../../../hooks";
import ModalUpdateUbicacion from "./Modals/ModalUpdateUbicacion";

export default function Ubicaciones({ items }) {
  const { startDeletingUbicacion } = useUbicacionStore();

  const handleDelete = (id) => {
    startDeletingUbicacion(id);
  };

  return (
    <tr className=" border-b text-xs text-gray-500 font-bold">
      <td className="px-3 py-4 text-center">{items.piso}</td>
      <td className="px-3 py-4 text-center">{items.no_sala}</td>

      <td className=" text-center space-x-1">
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
