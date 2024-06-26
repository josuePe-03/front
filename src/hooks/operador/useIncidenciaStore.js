import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api";
import {
  onAddNewIncidencia,
  onDeleteIncidencia,
  onLoadIncidencias,
  onSetActiveIncidencia,
  onUpdateIncidencia,
  onLoadIncidencia,
  onLogoutModalIncidencia,
  onLoadFiltrosIncidencias
} from "../../store";
import { useUiStore } from "../useUiStore";

export const useIncidenciaStore = () => {
  const dispatch = useDispatch();

  const { incidencias, incidencia,filtros, activeIncidencia} = useSelector(
    (state) => state.incidencia
  );

  const { user } = useSelector((state) => state.auth);

  const setActiveIncidencia = (calendarEvent) => {
    dispatch(onSetActiveIncidencia(calendarEvent));
  };

  //useUiStore
  const {closeIncidenciaModal } =
  useUiStore();

  const startSavingIncidencia = async (incidencia) => {
    try {
      // Creando
      const { data } = await clienteAxios.post(
        "/incidencia/agregar-incidencia",
        incidencia
      );
      Swal.fire({
        title: "!Agregado Correctamente!",
        icon: "success",
      });
      closeIncidenciaModal()

    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  //TERMIANR INCIDENCIA
  const startTerminarIncidencia = async (incidencia) => {
    // Todo: Llegar al backend
    try {
      Swal.fire({
        title: "¿Deseas concluir la incidencia?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, concluir!",
      }).then((result) => {
        if (result.isConfirmed) {
          clienteAxios.put(
            `/operador/incidencia/terminar-incidencia/${incidencia._id}`,
            incidencia
          );
          dispatch(onUpdateIncidencia({ ...incidencia }));
          startLoadingIncidencias();

          Swal.fire({
            title: "¡Incidencia Concluida!",
            icon: "success"
          });
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  // OBTENER INCIDENCIAS
  const startLoadingIncidencias = async (datos) => {

    const page = datos.map((items)=>items.page) 
    const filterCategoria = datos.map((items)=>items.filterCategoria) 
    const search = datos.map((items)=>items.search) 

    try {
      const { data } = await clienteAxios.get(
        `/incidencia/obtener-incidencias?page=${page}&tipo_incidencia=${filterCategoria.toString()}&search=${search}`
      );
      dispatch(onLoadIncidencias(data.incidencias));

      dispatch(onLoadFiltrosIncidencias({
        total: data.total,
        page:data.page,
        limit:data.limit
      }));

      if (!data.ok) return dispatch(onLoadIncidencias(data.msg));
    } catch (error) {
      console.log("Error cargando incidencias");
      console.log(error);
    }
  };

  const startLoadingIncidencia = async (incidencia) => {
    try {
      const { data } = await clienteAxios.get(
        `/incidencia/obtener-incidencia/${incidencia}`
      );
      dispatch(onLoadIncidencia(data.incidencia));

      if (!data.ok) return dispatch(onLoadIncidencias(data.msg));
    } catch (error) {
      console.log("Error cargando tecnicos");
      console.log(error);
    }
  };

  const startLogoutModal = () => {
    dispatch(onLogoutModalIncidencia());
  };

  return {
    //* Propiedades
    activeIncidencia,
    incidencia,
    incidencias,
    filtros,
    hasEventSelected: !!activeIncidencia,

    //* Métodos
    setActiveIncidencia,
    startLoadingIncidencias,
    startLoadingIncidencia,
    startSavingIncidencia,
    startTerminarIncidencia,
    startLogoutModal,
  };
};
