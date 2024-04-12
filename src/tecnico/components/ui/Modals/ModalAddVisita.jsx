import { onLoadIncidencia } from "../../../../store";
import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { useFormik } from "formik";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { IconClipboardPlus } from "@tabler/icons-react";

import Titulo from "../Titulo";

import {
  useUiStore,
  useIncidenciaStore,
  useAuthStore,
  useVisitaTecnicaStore,
} from "../../../../hooks";

import Modal from "react-modal";

import { getTodayDateTime } from "../../../../helpers";

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

export default function ModalAddVisita({ items }) {
  //redux
  const dispatch = useDispatch();

  //MODAL
  const { isVisitaAddModalOpen, closeVisitaAddModal, openVisitaAddModal } =
    useUiStore();
  //inicidenciaStore
  const { incidencia, startLogoutModal } = useIncidenciaStore();

  const { startSavingVisitaTecnica } = useVisitaTecnicaStore();
  //AUTH
  const { user } = useAuthStore();

  //Abrir
  const openModel = () => {
    openVisitaAddModal();
  };
  //CERRAR MODAL
  const onCloseModal = () => {
    closeVisitaAddModal();
    startLogoutModal();
    formik.resetForm();
  };

  const [equipo, setEquipo] = useState({
    id_incidencia: incidencia._id || "",
    id_tecnico: user.uid,
    fecha_revisado: new Date(),
    fecha_visita: "",
    observacion: "",
    estado: "Visita Pendiente",
    title:
      "Visita" +
      incidencia?.id_operador?.unidad_medica +
      "Equipo" +
      incidencia?.id_equipo?.no_serie,
  });

  useEffect(() => {
    setEquipo({
      id_incidencia: incidencia._id || "",
      id_tecnico: user.uid,
      fecha_revisado: new Date(),
      fecha_visita: "",
      observacion: "",
      estado: "Visita Pendiente",
      title:
        "Visita " +
        incidencia?.id_operador?.unidad_medica +
        " Equipo " +
        incidencia?.id_equipo?.no_serie,
    });
  }, [incidencia, user]);

  const formik = useFormik({
    initialValues: equipo, // Bind Formik's initialValues to the fetched data state
    enableReinitialize: true, // Allows Formik to reset when initialValues change
    onSubmit: async (values, { resetForm }) => {
      try {
        await startSavingVisitaTecnica(values);
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
        <IconClipboardPlus size={30} />
      </button>

      <Modal
        isOpen={isVisitaAddModalOpen}
        style={customStyles}
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <div className="space-y-6">
          <Titulo texto={"Agregar Visita"} />

          <div className="flex gap-2 items-end">
            <h3 className="text-2xl text-[#004b93] font-bold">
              {" "}
              {incidencia?.id_equipo?.marca}
            </h3>
            <h3 className="text-xl text-[#004b93] font-semibold">
              {" "}
              {incidencia?.id_equipo?.modelo}
            </h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid md:grid-cols-2 grid-rows-2 gap-3">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Fecha Visita:
                </label>
                <input
                  id="fecha_visita"
                  type="datetime-local"
                  value={formik.values.fecha_visita}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  min={getTodayDateTime()}
                  placeholder="Tipo Incidencia"
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
                Agregar Visita
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
