export default function Compañias({ items }) {
  return (
    <tr className="border-b ">
      <td className="px-6 py-4">{items._id}</td>
      <td className="px-6 py-4">{items.nombre}</td>
      <td className="px-6 py-4">{items.telefono}</td>
      <td className="px-6 py-4">{items.direccion}</td>

    </tr>
  );
}
