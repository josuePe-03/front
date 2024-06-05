import { IconEdit } from "@tabler/icons-react";

import { useState, useEffect } from "react";

import { useFormik } from "formik";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Titulo from "../Titulo";
import Dropdown from "../Dropdow";

import {
  useEquipoStore,
  useUbicacionStore,
  useUiStore,
} from "../../../../hooks";
import { onLoadEquipo, onLoadUbicacion } from "../../../../store";
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

export default function ModalUpdateEquipo({ items }) {
  const { isEquipoModalOpen, closeEquipoModal, openEquipoModal } = useUiStore();
  const {
    ubicacion,
    startUpdateUbicacion,    
  } = useUbicacionStore();

  const dispatch = useDispatch();

  //CERRAR MODAL
  const onCloseModal = () => {
    closeEquipoModal();
  };

  const openModel = () => {
    openEquipoModal();
  };

  const [equipo, setEquipo] = useState({
    piso: ubicacion.piso || "",
    no_sala: ubicacion.no_sala || "",
  });

   useEffect(() => {
     setEquipo({
      piso: ubicacion.piso || "",
      no_sala: ubicacion.no_sala || "",
     });
   }, [ ubicacion]);

  const formik = useFormik({
    initialValues: equipo, // Bind Formik's initialValues to the fetched data state
    enableReinitialize: true, // Allows Formik to reset when initialValues change
    onSubmit: async (values, { resetForm }) => {
      try {
         await startUpdateUbicacion(values);
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
          openModel(), dispatch(onLoadUbicacion(items));
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
        <Titulo texto={"Editar Ubicacion"} />
          <form onSubmit={formik.handleSubmit}>
            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Piso
                </label>
                <input
                  id="piso"
                  type="text"
                  value={formik.values.piso}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="No Serie"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              No Sala
                </label>
                <input
                  id="no_sala"
                  type="text"
                  value={formik.values.no_sala}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Modelo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

            </div>
            <button
              type="submit "
              className="text-white mt-5 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
 
            >
              Editar Ubicacion
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
