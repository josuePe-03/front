import { Link } from "react-router-dom";
export default function Compañias({ items }) {
  return (
    <tr className="border-b ">
      <td className="px-6 py-4">{items._id}</td>
      <td className="px-6 py-4">{items.nombre}</td>
      <td className="px-6 py-4">{items.telefono}</td>
      <td className="px-6 py-4">{items.direccion}</td>
      <td className="px-6 py-4">
        <Link to={`/editar-centro-medico/${items._id}`}>Editar</Link>
      </td>
      <td className="px-6 py-4">
        <Link to={`/editar-centro-medico/${items._id}`}>Eliminar</Link>
      </td>
    </tr>
  );
}
