import { useState, useEffect } from "react";

import { useFormik } from "formik";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import {
  useOperadorStore,
  useUiStore,
  useTecnicoStore,
} from "../../../../hooks";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function ModalAddUser({ tecnico }) {
  const { isUserAddModalOpen, closeUserAddModal, openUserAddModal} =
    useUiStore();

  const { startSavingOperador } = useOperadorStore();
  const { startSavingTecnico } = useTecnicoStore();

  //Abrir
  const openModel = () => {
    openUserAddModal();
  };
  //CERRAR MODAL
  const onCloseModal = () => {
    closeUserAddModal();
    formik.resetForm();
  };

  const [equipo, setEquipo] = useState({
    nombre: "",
    apellidos: "",
    direccion: "",
    edad: "",
    fecha_creacion: new Date(),
    email: "" + "@example.com",
    password: "123456",
    rol: "",
    area:"",
    unidad_medica: "Monterrey",
    is_delete: false,
  });

  const formik = useFormik({
    initialValues: equipo, // Bind Formik's initialValues to the fetched data state
    enableReinitialize: true, // Allows Formik to reset when initialValues change
    onSubmit: async (values, { resetForm }) => {
      try {
        if (tecnico) {
          const rol = 2;
          const email = values.nombre.replace(/ /g, '') + values.apellidos.slice(0,2)  + values.edad + "@example.com";

          // Create a new object that includes all the existing values and the new email
          const updatedValues = {
            ...values,
            email: email, // Add the dynamically generated email
            rol: rol,
          };
          // TODO:
          await startSavingTecnico(updatedValues);
        } else {
          const rol = 1;
          const email = values.nombre +values.apellidos.slice(0,2) + values.edad   + "@example.com";
          // Create a new object that includes all the existing values and the new email
          const updatedValues = {
            ...values,
            email: email, // Add the dynamically generated email
            rol: rol,
          };
          // TODO:
          await startSavingOperador(updatedValues);
        }

        onCloseModal();


      } catch (error) {
      }
    },
  });


  return (
    <>
      <button
        className="w-full h-full sm:w-fit rounded-xl bg-blue-700 text-gray-100 py-1.5 px-5 font-medium"
        onClick={() => {
          openModel();
        }}
      >
        {tecnico ? "Agregar Tecnico" : "Agregar Operador"}
      </button>

      <Modal
        isOpen={isUserAddModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {tecnico ? "Agregar Tecnico" : "Agregar Operador"}
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Nombre"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Apellidos
                </label>
                <input
                  id="apellidos"
                  type="text"
                  value={formik.values.apellidos}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Apellidos"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Edad
                </label>
                <input
                  id="edad"
                  type="number"
                  max="100"
                  value={formik.values.edad}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Edad"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              
              {tecnico ? (
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Area
                  </label>
                  <input
                    id="area"
                    type="text"
                    value={formik.values.area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Area Tecnica"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              ) : (
                ""
              )}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Direccion
                </label>
                <input
                  id="direccion"
                  type="text"
                  value={formik.values.direccion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Direccion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

            </div>
            <button
              type="submit "
              className="mt-5 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Editar Operador
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
