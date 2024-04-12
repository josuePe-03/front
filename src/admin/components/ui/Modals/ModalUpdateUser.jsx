import { IconEdit } from "@tabler/icons-react";

import { useState, useEffect } from "react";

import { useFormik } from "formik";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import {
  useOperadorStore,
  useTecnicoStore,
  useUiStore,
} from "../../../../hooks";
import { onLoadOperador, onLoadTecnico } from "../../../../store";
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

Modal.setAppElement("#root");

import Titulo from "../Titulo";

export default function ModalUpdateUser({ items, tecnico: tecnicoTrue }) {
  const { isUserModalOpen, closeUserModal, openUserModal } = useUiStore();
  const {
    operador,
    startUpdateOperador,
    startLoadingOperador,
    startLogoutModal,
  } = useOperadorStore();
  const {
    tecnico,
    startUpdateTecnico,
    startLoadingTecnico,
    startLogoutModal: startLogoutModalTecnico,
  } = useTecnicoStore();
  const dispatch = useDispatch();

  //CERRAR MODAL
  const onCloseModal = () => {
    closeUserModal();
    formik.resetForm();
    if (tecnico) {
      startLogoutModalTecnico();
    }
    startLogoutModal();
  };

  const openModel = () => {
    openUserModal();
  };

  const [equipo, setEquipo] = useState({
    id: operador._id || tecnico._id || "",
    nombre: operador.nombre || tecnico.nombre || "",
    apellidos: operador.apellidos || tecnico.apellidos || "",
    direccion: operador.direccion || tecnico.direccion || "",
    edad: operador.edad || tecnico.edad || "",
    area: tecnico.area || "",
  });

  useEffect(() => {
    setEquipo({
      id: operador._id || tecnico._id || "",
      nombre: operador.nombre || tecnico.nombre || "",
      apellidos: operador.apellidos || tecnico.apellidos || "",
      direccion: operador.direccion || tecnico.direccion || "",
      edad: operador.edad || tecnico.edad || "",
      area: tecnico.area || "",
    });
  }, [operador, tecnico]);

  const formik = useFormik({
    initialValues: equipo, // Bind Formik's initialValues to the fetched data state
    enableReinitialize: true, // Allows Formik to reset when initialValues change
    onSubmit: async (values, { resetForm }) => {
      try {
        // TODO:
        if (tecnicoTrue) {
          await startUpdateTecnico(values);
        } else {
          await startUpdateOperador(values);
        }
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

  return (
    <>
      <button
        onClick={() => {
          if (tecnicoTrue) {
            openModel();
            dispatch(onLoadTecnico(items));
            return;
          }
          openModel(), dispatch(onLoadOperador(items));
        }}
        className="p-1 bg-blue-700 rounded-md"
      >
        <IconEdit color="#ffff" />
      </button>
      <Modal
        isOpen={isUserModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <div className="space-y-6">
          <Titulo texto={tecnicoTrue ? "Editar Tecnico" : "Editar Operador"} />
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
                  placeholder="Apellido Materno"
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
                  type="text"
                  value={formik.values.edad}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Edad"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              {tecnicoTrue ? (
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
                    placeholder="Apellido Materno"
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
            <div className="mt-1">
              <h2 className="text-sm text-red-900">
                Correo y contraseña asignada siguen siendo las mismas.
              </h2>
            </div>
            <button
              type="submit "
              class="text-white mt-5 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
            >
             {tecnicoTrue ? "Editar Tecnico" : "Editar Operador"}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
