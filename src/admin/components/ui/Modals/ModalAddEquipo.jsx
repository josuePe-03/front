import { useState, useEffect } from "react";

import { useFormik } from "formik";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useEquipoStore, useUiStore, useAuthStore } from "../../../../hooks";

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

export default function ModalAddEquipo({ tecnico }) {
  const { isEquipoAddModalOpen, closeEquipoAddModal, openEquipoAddModal } =
    useUiStore();
  const { user } = useAuthStore();

  const { startSavingEquipo } = useEquipoStore();

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
    no_serie: "",
    marca: "",
    modelo: "",
    categoria: "",
    fecha_agregado: new Date(),
    fecha_instalacion: "",
    fecha_fabricacion: "",
    id_admin: user.uid,
    is_delete: false,
    centro_medico:user.centroMedico._id
  });

  const formik = useFormik({
    initialValues: equipo, // Bind Formik's initialValues to the fetched data state
    enableReinitialize: true, // Allows Formik to reset when initialValues change
    onSubmit: async (values, { resetForm }) => {
      try {
        await startSavingEquipo(values);

        onCloseModal();

        Swal.fire({
          title: "!Agregado Correctamente!",
          icon: "success",
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  // CATEGORIA
  const handleDropdownCategoria = (selectedValue) => {
    // Update the tipoVisita field with the selected value
    formik.setValues({
      ...formik.values, // Spread the current values to keep the other values intact
      categoria: selectedValue, // Set the tipoVisita to the selected value or an empty string if selectedValue is falsy
    });
  };

  return (
    <>
      <button
        onClick={() => {
          openModel();
        }}
        className="text-white h-full bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Agregar Equipo
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
            Agregar Equipo
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  No Serie
                </label>
                <input
                  id="no_serie"
                  type="text"
                  value={formik.values.no_serie}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="No Serie"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Modelo
                </label>
                <input
                  id="modelo"
                  type="text"
                  value={formik.values.modelo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Modelo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Marca
                </label>
                <input
                  id="marca"
                  type="text"
                  value={formik.values.marca}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Marca"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Categoria
                </label>
                <Dropdown
                    options={categorias}
                    texto={"Selecciona una categoria"}
                    onChange={handleDropdownCategoria}
                    areaValue={equipo.categoria}
                  />

              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Fecha Instalacion
                </label>
                <input
                  id="fecha_instalacion"
                  type="datetime-local"
                  value={formik.values.fecha_instalacion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Fecha Instalacion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Fecha Fabricacion
                </label>

                <input
                  id="fecha_fabricacion"
                  type="datetime-local"
                  value={formik.values.fecha_fabricacion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Fecha Fabricacion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit "
              className="text-white mt-5 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
            >
              Agregar Equipo
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
