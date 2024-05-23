import { useState, useEffect } from "react";

import { useFormik } from "formik";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useEquipoStore, useUiStore, useAuthStore, useUbicacionStore } from "../../../../hooks";

import Modal from "react-modal";
import Dropdown from "../Dropdow";


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

// CATEGORIA OPCIONES
const categorias = [
  { value: "Tomografo", label: "Tomografo" },
  { value: "Mastografo", label: "Mastografo" },
];

Modal.setAppElement("#root");

export default function ModalAddUbicacion({ tecnico }) {
  const { isEquipoAddModalOpen, closeEquipoAddModal, openEquipoAddModal } =
    useUiStore();
    
  const { user } = useAuthStore();
  const { startSavingUbicacion } = useUbicacionStore();

  //Abrir
  const openModel = () => {
    openEquipoAddModal(); 
  };
  //CERRAR MODAL
  const onCloseModal = () => {
    closeEquipoAddModal();
    formik.resetForm();
  };

  const [equipo, setEquipo] = useState({
    piso: "",
    no_sala: "",
  });

  const formik = useFormik({
    initialValues: equipo, // Bind Formik's initialValues to the fetched data state
    enableReinitialize: true, // Allows Formik to reset when initialValues change
    onSubmit: async (values, { resetForm }) => {
      try {
         await startSavingUbicacion(values);
        onCloseModal();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <button
        onClick={() => {
          openModel();
        }}
        class="text-white h-full bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
      >
        Agregar Ubicacion
      </button>

      <Modal
        isOpen={isEquipoAddModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            Agregar Ubicacion
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid md:grid-cols-1 gap-3">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Piso:
                </label>
                <input
                  id="piso"
                  type="text"
                  value={formik.values.piso}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Piso"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  No Sala:
                </label>
                <input
                  id="no_sala"
                  type="text"
                  value={formik.values.no_sala}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="No Sala"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit "
              class="text-white mt-5 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
            >
              Agregar Ubicacion
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
