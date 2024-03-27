import { onLoadIncidencia } from "../../../../store";
import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { useFormik } from "formik";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { IconFilePlus } from "@tabler/icons-react";

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
    tipo_incidencia: "",
    detalle: "",
    fecha_registrada: new Date(),
    status: "",
    estado: "Pendiente",
  });

  useEffect(() => {
    setEquipo({
      id_equipo: incidencia._id || "",
      id_operador: user.uid,
      tipo_incidencia: "",
      detalle: "",
      fecha_registrada: new Date(),
      status: "",
      estado: "Pendiente",
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

  return (
    <>
      <button
        className=""
        onClick={() => {
          openModel(), dispatch(onLoadIncidencia(items));
        }}
      >
        <IconFilePlus className="text-green-900 " size={25} />
      </button>

      <Modal
        isOpen={isIncidenciaModalOpen}
        style={customStyles}
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            Agregar Incidencia
          </h3>
          <div className="flex gap-2 items-end">
            <h3 className="text-2xl font-semibold"> {incidencia.marca}</h3>
            <h3 className="text-xl font-medium"> {incidencia.modelo}</h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid md:grid-cols-2 grid-rows-2 gap-3">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tipo Incidencia:
                </label>
                <input
                  id="tipo_incidencia"
                  type="text"
                  value={formik.values.tipo_incidencia}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Tipo Incidencia"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="row-span-2">
                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">
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
                <input
                  id="status"
                  type="text"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Status"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
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
