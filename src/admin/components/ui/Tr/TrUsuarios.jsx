import React from "react";

export default function TrUsuarios({ tecnico }) {
  return (
    <tr>
      <th scope="col" className="px-6 py-3">
        Id
      </th>
      <th scope="col" className="px-6 py-3">
        Nombre
      </th>
      <th scope="col" className="px-6 py-3">
        Apellidos
      </th>
      <th scope="col" className="px-6 py-3">
        Direccion
      </th>
      <th scope="col" className="px-6 py-3">
        Edad
      </th>

      {tecnico ? (<th scope="col" className="px-6 py-3">Area</th>) : ("")}
      
      <th scope="col" className="px-6 py-3">
        Unidad Medica
      </th>
      <th scope="col" className="px-6 py-3">
        Opciones
      </th>
    </tr>
  );
}
