import React from "react";

export default function Empleados({ items }) {
  return (
    <tr className="border-b ">
      <td className="px-6 py-4">{items._id}</td>
      <td className="px-6 py-4">{items.user.email}</td>
      <td className="px-6 py-4">{items.nombre}</td>
      <td className="px-6 py-4">{items.apellidos}</td>
      <td className="px-6 py-4">{items.edad}</td>
      <td className="px-6 py-4">{items.centro_medico.nombre}</td>
    </tr>
  );
}
