import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { onLoadCentroMedico } from "../../store";
import { useCentroMedicoStore } from "../../hooks";

export default function Compañias({ items }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { centroMedico, startDeleteCentroMedico } = useCentroMedicoStore();

  const handleEditar = () => {
    navigate("/editar-centro-medico");
    dispatch(onLoadCentroMedico(items));
  };

  const handleElimiar = () => {
    startDeleteCentroMedico(items._id);
  };

  return (
    <tr className="border-b ">
      <td className="px-6 py-4">{items._id}</td>
      <td className="px-6 py-4">{items.nombre}</td>
      <td className="px-6 py-4">{items.telefono}</td>
      <td className="px-6 py-4">{items.direccion}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => {
            handleEditar();
          }}
        >
          Editar
        </button>
      </td>
      <td className="px-6 py-4">
        <button onClick={() => handleElimiar()}>Eliminar</button>
      </td>
    </tr>
  );
}
