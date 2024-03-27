import { onLoadVisitaTecnica } from "../../../../store";
import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { useFormik } from "formik";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { IconSettingsCheck } from "@tabler/icons-react";

import {
  useUiStore,
  useIncidenciaStore,
  useAuthStore,
  useVisitaTecnicaStore,
} from "../../../../hooks";

import Modal from "react-modal";
import Dropdow from "../Dropdow";

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

export default function ModalAddDiagnostico({ items }) {
  //redux
  const dispatch = useDispatch();

  //MODAL
  const {
    isDiagnosticoAddModalOpen,
    closeDiagnosticoAddModal,
    openDiagnosticoAddModal,
  } = useUiStore();
  //Tecnicostore
  const { visitaTecnica, startLogoutModal } = useVisitaTecnicaStore();
  //AUTH
  const { user } = useAuthStore();

  //Abrir
  const openModel = () => {
    openDiagnosticoAddModal();
  };
  //CERRAR MODAL
  const onCloseModal = () => {
    closeDiagnosticoAddModal();
    startLogoutModal();
    formik.resetForm();
  };

  const [equipo, setEquipo] = useState({
    id_incidencia: visitaTecnica._id || "",
    id_tecnico: user.uid,
    fecha_revisado: new Date(),
    fecha_visita: "",
    observacion: "",
    estado: "Pendiente",
  });

  useEffect(() => {
    setEquipo({
      id_incidencia: visitaTecnica._id || "",
      id_tecnico: user.uid,
      fecha_revisado: new Date(),
      fecha_visita: "",
      observacion: "",
      estado: "Pendiente",
    });
  }, [visitaTecnica, user]);

  const formik = useFormik({
    initialValues: equipo, // Bind Formik's initialValues to the fetched data state
    enableReinitialize: true, // Allows Formik to reset when initialValues change
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);

        // await startSavingIncidencia(values);
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

  //DROPDONW

  const tecnicosDisponibles = [
    {
      value: "1",
      label: "Concluir",
    },
    {
      value: "2",
      label: "Asignar otro tecnico",
    },
    {
      value: "3",
      label: "Instalacion Refaccion",
    },
  ];

  const [estado, setEstado] = useState();

  const handleDropdownChange = (selectedValue) => {
    // Update the tipoVisita field with the selected value
    // formik.setValues({
    //   ...formik.values, // Spread the current values to keep the other values intact
    //   estado: selectedValue || "", // Set the tipoVisita to the selected value or an empty string if selectedValue is falsy
    // });

    setEstado(selectedValue);
  };

  return (
    <>
      <button
        className=""
        onClick={() => {
          openModel(), dispatch(onLoadVisitaTecnica(items));
        }}
      >
        <IconSettingsCheck size={30} />
      </button>

      <Modal
        isOpen={isDiagnosticoAddModalOpen}
        style={customStyles}
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            Agregar Diagnostico
          </h3>
          <div className="flex gap-2 items-end"></div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Observacion:
                </label>
                <textarea
                  rows={5}
                  id="fecha_visita"
                  type="text"
                  value={formik.values.fecha_visita}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Observacion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Estado:
                </label>
                <Dropdow
                  options={tecnicosDisponibles}
                  texto={"Selecciona un tecnico"}
                  onChange={handleDropdownChange}
                />
              </div>
              {estado == 2 ? (
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tecnico Asignado:
                  </label>
                  <input
                    rows={5}
                    id="fecha_visita"
                    type="text"
                    value={formik.values.fecha_visita}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Tecnico Asignado"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              ) : (
                ""
              )}
              {estado == 3 ? (
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Lista Refacciones:
                  </label>
                  <textarea
                    rows={5}
                    id="fecha_visita"
                    type="text"
                    value={formik.values.fecha_visita}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Lista de refacciones"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit "
                className=" w-1/2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Agregar Diagnostico
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
