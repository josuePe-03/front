import { onLoadIncidencia } from "../../../../store";
import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { useFormik } from "formik";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Dropdown from "../Dropdow";
import Titulo from "../Titulo";

import {
  useUiStore,
  useIncidenciaStore,
  useAuthStore,
  useUbicacionStore,
} from "../../../../hooks";

import Modal from "react-modal";
import DropdownIncidencia from "../DropdowIncidencia";

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
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [tipoIncidencia, setTipoIncidencia] = useState("");
  const [detalle, setDetalle] = useState("");
  const [statusIncidencia, setStatus] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const handleDropdownTipoIncidencia = (selectedValue) => {
    setTipoIncidencia(selectedValue);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleDetalle = (event) => {
    setDetalle(event.target.value);
  };
  const handleStatus = (selectedValue) => {
    setStatus(selectedValue);
  };

  const handleUbicacion = (event) => {
    setUbicacion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("tipo_incidencia", tipoIncidencia);
    formData.append("detalle", detalle);
    formData.append("status", statusIncidencia);
    formData.append("ubicacion", ubicacion);
    formData.append("centro_medico", user.centroMedico._id);
    formData.append("id_operador", user.uid);
    formData.append("id_equipo", incidencia._id);
    formData.append("fecha_registrada", new Date());

    try {
      startSavingIncidencia(formData);
    } catch (error) {
      console.error(error);
    }
  };


  //UBICACIONES
  const { ubicaciones, startLoadingUbicaciones } = useUbicacionStore();

  useEffect(() => {
    startLoadingUbicaciones();
    // Función que se ejecutará cada 5 segundos
    const interval = setInterval(() => {
      startLoadingUbicaciones();
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  const data = ubicaciones === "Sin ubicaciones existentes"? [ubicaciones] : ubicaciones.map(item => {
    return `${item.piso} - ${item.no_sala}`;
  });
  
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
          <Titulo texto={"Agregar Incidencia"} />
          <div className="flex gap-2 items-end">
            <h3 className="text-2xl text-[#004b93] font-bold">
              {incidencia.marca}
            </h3>
            <h3 className="text-xl text-[#004b93] font-semibold">
              {incidencia.modelo}
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-rows-2 gap-x-3 gap-y-2">
              <div>
                <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tipo Incidencia:
                </label>
                <DropdownIncidencia
                  options={tipoVisita}
                  texto={"Selecciona un problema"}
                  onChange={handleDropdownTipoIncidencia}
                />
              </div>
              <div className="row-span-2">
                <label className="block mt-2.5 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Detalle:
                </label>
                <textarea
                  id="detalle"
                  type="text"
                  value={detalle}
                  onChange={handleDetalle}
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
                <DropdownIncidencia
                  options={status}
                  texto={"Seleccione el status"}
                  onChange={handleStatus}
                />
              </div>

              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Ubicacion:
                </label>
                <input
                id="ubicacion"
                  list="data"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={ubicacion}
                  onChange={handleUbicacion}
                  placeholder="Ubicacion del equipo"
                  required
                />
                <datalist
                  id="data"
                  className="bg-white"
                >
                  {data.map((op, i) => (
                    <option key={i} value={op} />
                  ))}
                </datalist>
              </div>

              <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#16351b]">
                Evidencia:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                required
              />
            </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit "
                className="text-white  w-1/2 h-full bg-gradient-to-r from-green-600 to-green-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-0 py-2.5 text-center "
              >
                Agregar Incidencia
              </button>

              <button
                type="button"
                onClick={onCloseModal}
                className="w-1/2 text-white bg-gradient-to-br from-red-500 to-orange-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
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
