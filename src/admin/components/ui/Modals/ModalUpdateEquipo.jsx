import { IconEdit } from "@tabler/icons-react";

import { useState, useEffect } from "react";

import { useFormik } from "formik";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Titulo from "../Titulo";
import Dropdown from "../Dropdow";

import {
  useEquipoStore,
  useUiStore,
} from "../../../../hooks";
import { onLoadEquipo } from "../../../../store";
import { useDispatch } from "react-redux";

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

// AREA OPCIONES
const categorias = [
  { value: "Tomografo", label: "Tomografo" },
  { value: "Mastografo", label: "Mastografo" },
];

Modal.setAppElement("#root");

export default function ModalUpdateEquipo({ items }) {
  const { isEquipoModalOpen, closeEquipoModal, openEquipoModal } = useUiStore();
  const {
    equipo:selectEquipo,
    startUpdateEquipo,
    startLogoutModal
    
  } = useEquipoStore();

  const dispatch = useDispatch();

  //CERRAR MODAL
  const onCloseModal = () => {
    closeEquipoModal();
  };

  const openModel = () => {
    openEquipoModal();
  };

  const [equipo, setEquipo] = useState({
    no_serie: selectEquipo._id || "",
    marca: selectEquipo.marca || "",
    modelo: selectEquipo.modelo || "",
    categoria: selectEquipo.categoria ? selectEquipo.categoria.join(', ') : "",
    fecha_instalacion: selectEquipo.fecha_instalacion || "",
    fecha_fabricacion: selectEquipo.fecha_fabricacion || "",
  });

   useEffect(() => {
     setEquipo({
      no_serie: selectEquipo._id || "",
      marca: selectEquipo.marca || "",
      modelo: selectEquipo.modelo || "",
      categoria: selectEquipo.categoria ? selectEquipo.categoria.join(', ') : "",
      fecha_instalacion: selectEquipo.fecha_instalacion || "",
      fecha_fabricacion: selectEquipo.fecha_fabricacion || "",
     });
   }, [ selectEquipo]);

  const formik = useFormik({
    initialValues: equipo, // Bind Formik's initialValues to the fetched data state
    enableReinitialize: true, // Allows Formik to reset when initialValues change
    onSubmit: async (values, { resetForm }) => {
      try {
        await startUpdateEquipo(values);

        onCloseModal();

        Swal.fire({
          title: "!Actualizado Correctamente!",
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
          openModel(), dispatch(onLoadEquipo(items));
        }}
        className="p-1 bg-blue-700 rounded-md"
      >
        <IconEdit color="#ffff" />
      </button>
      <Modal
        isOpen={isEquipoModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <div className="space-y-4">
        <Titulo texto={"Editar Equipo"} />
          <form onSubmit={formik.handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  No Serie
                </label>
                <input
                  id="no_serie"
                  disabled
                  type="text"
                  value={formik.values.no_serie}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="No Serie"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              Editar Equipo
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
