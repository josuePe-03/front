import React from "react";

export default function Administradores({ items }) {
  return (
    <tr className="border-b ">
      <td className="px-6 py-4">{items._id}</td>
      <td className="px-6 py-4">{items.email}</td>
      <td className="px-6 py-4">{items.nombre}</td>
      <td className="px-6 py-4">{items.centro_medico.nombre}</td>
    </tr>
  );
}
