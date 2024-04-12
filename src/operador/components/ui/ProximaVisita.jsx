import React from 'react'

export default function ProximaVisita({items}) {
  
  return (
    <div className="h-full w-full ">
      <div className="">
        <div className="sm:flex justify-between space-y-2 sm:space-y-0">
          <div className="flex">
            <div className="rounded-full w-12 h-12 bg-gray-300"></div>
            <div className="ml-4">
              <p className="text-gray-800">{items.id_tecnico.nombre} {items.id_tecnico.apellidos}</p>
              <p className="text-sm text-gray-500">Tecnico</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="rounded-full w-12 h-12 bg-gray-300"></div>
            <div>
              <p className="text-gray-800">#{items._id}</p>
              <p className="text-sm text-gray-500">Id Visita</p>
            </div>
          </div>
        </div>
        <div className="h-[1px] my-4 bg-gray-600"></div>
        <div className="grid sm:grid-cols-3  space-y-2 sm:space-y-0">
          <div className="flex sm:col-span-1">
            <div className="rounded-full w-12 h-12 bg-gray-300"></div>
            <div className="ml-4">
              <div className="">
                <p className="text-gray-800 ">{items.id_incidencia.id_equipo.modelo}</p>
              </div>
              <p className="text-sm text-gray-500">Modelo</p>
            </div>
          </div>
          <div className="flex">
            <div className="rounded-full w-12 h-12 bg-gray-300"></div>
            <div className="ml-4">
              <p className="text-gray-800">{items.id_incidencia.id_equipo.marca}</p>
              <p className="text-sm text-gray-500">Marca</p>
            </div>
          </div>
          <div className="flex">
            <div className="rounded-full w-12 h-12 bg-gray-300"></div>
            <div className="ml-4">
              <p className="text-gray-800">{items.fecha_visita}</p>
              <p className="text-sm text-gray-500">Fecha Visita</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
