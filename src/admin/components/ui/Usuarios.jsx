import ModalUpdateUser from "./Modals/ModalUpdateUser";
import { IconTrash } from "@tabler/icons-react";
import Swal from "sweetalert2";
import { useOperadorStore, useTecnicoStore } from "../../../hooks";

export default function Usuarios({ items, tecnico }) {
  const { startDeletingOperador } = useOperadorStore();
  const { startDeletingTecnico } = useTecnicoStore();

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
        if (tecnico) {
          startDeletingTecnico(id);
          return;
        }
        startDeletingOperador(id);
      }
    });
  };

  return (
    <tr className=" border-b text-xs text-gray-600 font-bold">
      <td className="px-3 py-4 ">{items._id}</td>
      <td className="px-3 py-4 ">{items.nombre}</td>
      <td className="px-3 py-4">{items.apellidos}</td>
      <td className="px-3 py-4">{items.direccion}</td>
      <td className="px-3 py-4">{items.user.email}</td>
      <td className="px-3 py-4">{items.edad}</td>

      {tecnico ? <td className="px-3 py-4">{items.area}</td> : ""}

      <td className="px-3 py-4">{items.unidad_medica}</td>
      <td className=" text-center space-x-1">
        <ModalUpdateUser tecnico={tecnico} items={items} />
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
