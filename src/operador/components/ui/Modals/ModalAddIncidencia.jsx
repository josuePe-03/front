import { onLoadIncidencia } from "../../../../store";
import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { useFormik } from "formik";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import  Dropdown  from '../Dropdow'
import Titulo from '../Titulo'

import {
  useUiStore,
  useIncidenciaStore,
  useAuthStore,
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

const tipoVisita = [
  { value: "Preventiva", label: "Preventiva" },
  { value: "Predictiva", label: "Predictiva" },
  { value: "Correctiva", label: "Correctiva" },
];

const status = [
  { value: "NoUrgente", label: "No Urgente" },
  { value: "Urgente", label: "Urgente" },
];

export default function ModalAddIncidencia({ items }) {
  //redux
  const dispatch = useDispatch();

  //MODAL
  const { isIncidenciaModalOpen, closeIncidenciaModal, openIncidenciaModal } =
    useUiStore();
  //inicidenciaStore
  const { incidencia, startSavingIncidencia, startLogoutModal } =
    useIncidenciaStore();
  //AUTH
  const { user } = useAuthStore();

  //Abrir
  const openModel = () => {
    openIncidenciaModal();
  };
  //CERRAR MODAL
  const onCloseModal = () => {
    closeIncidenciaModal();
    startLogoutModal();
    formik.resetForm();
  };

  const [equipo, setEquipo] = useState({
    id_equipo: incidencia._id || "",
    id_operador: user.uid,
    detalle: "",
    fecha_registrada: new Date(),
    status: "",
    estado: "Pendiente",
    is_delete: false,
  });

  useEffect(() => {
    setEquipo({
      id_equipo: incidencia._id || "",
      id_operador: user.uid,
      detalle: "",
      fecha_registrada: new Date(),
      status: "",
      estado: "Pendiente",
      is_delete: false,
    });
  }, [incidencia, user]);

  const formik = useFormik({
    initialValues: equipo, // Bind Formik's initialValues to the fetched data state
    enableReinitialize: true, // Allows Formik to reset when initialValues change
    onSubmit: async (values, { resetForm }) => {
      try {
        await startSavingIncidencia(values);
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

  //DROPDONW TIPO INCIDENICIA
  const handleDropdownChange = (selectedValue) => {
    // Update the tipoVisita field with the selected value
    formik.setValues({
      ...formik.values, // Spread the current values to keep the other values intact
      tipo_incidencia: selectedValue || "", // Set the tipoVisita to the selected value or an empty string if selectedValue is falsy
    });
  };

  const handleDropdownStatus = (selectedValue) => {
    // Update the tipoVisita field with the selected value
    formik.setValues({
      ...formik.values, // Spread the current values to keep the other values intact
      status: selectedValue || "", // Set the tipoVisita to the selected value or an empty string if selectedValue is falsy
    });
  };


  return (
    <>
      <button
        className="flex justify-center text-center"
        onClick={() => {
          openModel(), dispatch(onLoadIncidencia(items));
        }}
      >
        Agregar Incidencia
      </button>

      <Modal
        isOpen={isIncidenciaModalOpen}
        style={customStyles}
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <div className="space-y-6">

          <Titulo texto={"Agregar Incidencia"}/>
          <div className="flex gap-2 items-end">
            <h3 className="text-2xl text-[#004b93] font-bold"> {incidencia.marca}</h3>
            <h3 className="text-xl text-[#004b93] font-semibold"> {incidencia.modelo}</h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid md:grid-cols-2 grid-rows-2 gap-x-3 gap-y-2">
              <div>
                <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tipo Incidencia:
                </label>
                <Dropdown
                  options={tipoVisita}
                  texto={"Selecciona un problema"}
                  onChange={handleDropdownChange}
                />
              </div>
              <div className="row-span-2">
                <label className="block mt-2.5 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Detalle:
                </label>
                <textarea
                  id="detalle"
                  type="text"
                  value={formik.values.detalle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Detalle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  rows={5}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Status:
                </label>
                <Dropdown
                  options={status}
                  texto={"Seleccione el status"}
                  onChange={handleDropdownStatus}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit "
                className=" w-1/2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Agregar Incidencia
              </button>
              <button
                type="button"
                onClick={onCloseModal}
                className=" w-1/2 text-white bg-red-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
