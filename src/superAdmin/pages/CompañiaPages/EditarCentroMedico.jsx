import { Sidebar } from "../../components";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useCentroMedicoStore } from "../../../hooks";

export default function EditarCompañia() {
  const { centroMedico, startUpdateCentroMedico } = useCentroMedicoStore();

  const [newCentroMedico, setNewCentroMedico] = useState({
    id:centroMedico._id,
    nombre: "",
    telefono: "",
    direccion: "",
    fecha_creacion: new Date(),
  });

  useEffect(() => {
    setNewCentroMedico({
      id: centroMedico._id || "",
      nombre: centroMedico.nombre || "",
      telefono: centroMedico.telefono || "",
      direccion: centroMedico.direccion || "",
    });
  }, [centroMedico]);

  const formik = useFormik({
    initialValues: newCentroMedico, // Bind Formik's initialValues to the fetched data state
    enableReinitialize: true, // Allows Formik to reset when initialValues change
    onSubmit: async (values) => {
      try {
        startUpdateCentroMedico(values)
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="bg-[#f3faf3] h-screen  pl-0 sm:pl-[14rem]">
      <Sidebar sin={true} />

      <article className="m-4 isolate w-fit text-[#16351b]  bg-white/10 shadow-lg ring-1 ring-black/5 p-5 rounded-md">
        <header className="mb-4">
          <h1 className="text-4xl text-[#16351b] font-bold">
            Editar Centro Medico
            <span className="text-transparent bg-clip-text bg-gradient-to-l to-[#004b93] from-sky-400 block">
              {centroMedico.nombre}
            </span>
          </h1>
        </header>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-1 gap-3">
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-[#16351b]">
                  Telefono:
                </label>
                <input
                  id="telefono"
                  type="text"
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Telefono"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 "
                  required
                />
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-[#16351b]">
                  Direccion:
                </label>
                <input
                  id="direccion"
                  type="text"
                  value={formik.values.direccion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Direccion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <button
              type="submit "
              className="text-white w-full mt-5 h-full bg-gradient-to-r from-green-600 to-green-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
            >
              Editar centro medico
            </button>
            <Link
              to={"/centros-medicos"}
              className="w-full mt-2 text-white bg-gradient-to-br from-red-500 to-orange-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </article>
    </div>
  );
}
