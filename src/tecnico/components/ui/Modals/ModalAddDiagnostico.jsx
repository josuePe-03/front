import { onLoadVisitaTecnica } from "../../../../store";
import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { useFormik } from "formik";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { IconSettingsCheck } from "@tabler/icons-react";

import {
  useUiStore,
  useAuthStore,
  useVisitaTecnicaStore,
  useTecnicoStore,
} from "../../../../hooks";

import Modal from "react-modal";

import Titulo from "../Titulo";

import { Dropdow } from "../../";

import { getTodayDateTime, customStyles } from "../../../../helpers";

//opciones dropdow
const options = [
  { value: "1", label: "Concluir" },
  { value: "2", label: "Asignar otro tecnico" },
  { value: "3", label: "Instalacion Refaccion" },
];

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
  const { visitaTecnica, startTerminarVisitaTecnica, startLogoutModal } =
    useVisitaTecnicaStore();
  //AUTH
  const { user } = useAuthStore();

  //TECNICOS
  const { tecnicos, startLoadingTecnicos } = useTecnicoStore();
  // FILTROS
  const [filterArea, setFilterArea] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [clearDropdown, setClearDropdown] = useState(false);

  const datos = [
    {
      filterArea: filterArea,
      page: page,
      search: search,
    },
  ];

  useEffect(() => {
    startLoadingTecnicos(datos);
    // Función que se ejecutará cada 5 segundos
    const interval = setInterval(() => {
      startLoadingTecnicos(datos);
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [filterArea,page,search]);

  const tecnicosDisponibles = tecnicos
    .filter((tecnico) => tecnico._id !== user.uid)
    .map((tecnico) => ({
      value: tecnico._id,
      label: tecnico.nombre + " - " + tecnico.area,
    }));

  //Abrir
  const openModel = () => {
    openDiagnosticoAddModal();
  };
  //CERRAR MODAL
  const onCloseModal = () => {
    closeDiagnosticoAddModal();
    startLogoutModal();
    formik.resetForm();
    setEstado("");
  };

  const [equipo, setEquipo] = useState({
    id: visitaTecnica._id || "",
    id_incidencia: visitaTecnica.id_incidencia || "",
    observacion: "",
    estado: "",
    lista_refacciones: "",
    centro_medico:user.centroMedico._id
  });


  useEffect(() => {
    setEquipo({
      id: visitaTecnica._id || "",
      id_incidencia: visitaTecnica.id_incidencia || "",
      observacion: "",
      estado: "",
      centro_medico:user.centroMedico._id
    });
  }, [visitaTecnica, user]);

  const formik = useFormik({
    initialValues: equipo, // Bind Formik's initialValues to the fetched data state
    enableReinitialize: true, // Allows Formik to reset when initialValues change
    onSubmit: async (values, { resetForm }) => {
      try {
        if (estado == 1) {
          const updatedValues = {
            ...values,
            estado: "Visita Concluida",
          };
          startTerminarVisitaTecnica(updatedValues);
          setEstado("");
        } else if (estado == 2) {
          //CREAR OTRA VISITA Y TERMINAR ESTA MANDANDO EL ID TECNICO

          const updatedValues = {
            ...values,
            estado: "Tecnico Asignado",
          };
          setEstado("");
          startTerminarVisitaTecnica(updatedValues);
        } else {
          //CREAR OTRA VISITA Y TERMINAR ESTA MANDANDO LAS REFACCIONES Y LA FECHA PROXIMA
          const updatedValues = {
            ...values,
            estado: "Visita Instalacion",
            id_tecnico: user.uid
          };
          setEstado("");
          startTerminarVisitaTecnica(updatedValues);
        }

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

  //DROPDOWN
  const [estado, setEstado] = useState();
  const [tecnicoAsignado, setTecnicoAsginado] = useState();

  const handleDropdownChange = (selectedValue) => {
    setEstado(selectedValue);
  };
  const handleDropdownChangeTecnico = (selectedValue) => {
    // Update the tipoVisita field with the selected value
    formik.setValues({
      ...formik.values, // Spread the current values to keep the other values intact
      id_tecnicoAsignado: selectedValue || "", // Set the tipoVisita to the selected value or an empty string if selectedValue is falsy
    });
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
        <Titulo texto={"Agregar Diagnostico"}/>

          <div className="flex gap-2 items-end"></div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Observacion:
                </label>
                <textarea
                  rows={5}
                  id="observacion"
                  type="text"
                  value={formik.values.observacion}
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
                  options={options}
                  texto={"Selecciona un estado"}
                  onChange={handleDropdownChange}
                />
              </div>
              {estado == 2 ? (
                <>
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
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Asignar Tecnico:
                    </label>
                    <Dropdow
                      options={tecnicosDisponibles}
                      texto={"Selecciona un tecnico"}
                      onChange={handleDropdownChangeTecnico}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
              {estado == 3 ? (
                <>
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Lista Refacciones:
                    </label>
                    <textarea
                      rows={5}
                      id="lista_refacciones"
                      type="text"
                      value={formik.fista_refacciones}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Lista de refacciones"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Fecha Visita Instalacion:
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
                </>
              ) : (
                ""
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit "
                className="text-white w-1/2 h-full bg-gradient-to-r from-green-600 to-green-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
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
