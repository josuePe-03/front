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
} from "../../store";

export const useIncidenciaStore = () => {
  const dispatch = useDispatch();

  const { incidencias, incidencia, activeIncidencia } = useSelector(
    (state) => state.incidencia
  );

  const { user } = useSelector((state) => state.auth);

  const setActiveIncidencia = (calendarEvent) => {
    dispatch(onSetActiveIncidencia(calendarEvent));
  };

  const startSavingIncidencia = async (incidencia) => {
    try {
      // Creando
      const { data } = await clienteAxios.post(
        "/operador/incidencia/agregar-incidencia",
        incidencia
      );
      dispatch(onAddNewIncidencia({ ...incidencia }));
      startLoadingIncidencias();
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startDeletingIncidencia = async (id) => {
    // Todo: Llegar al backend
    try {
      await clienteAxios.put(`/admin/tecnico/eliminar-tecnico/${id}`);
      dispatch(onDeleteIncidencia());
      startLoadingIncidencias();
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
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

  const startLoadingIncidencias = async () => {
    try {
      const { data } = await clienteAxios.get(
        "/operador/incidencia/obtener-incidencias"
      );
      dispatch(onLoadIncidencias(data.incidencias));

      if (!data.ok) return dispatch(onLoadIncidencias(data.msg));
    } catch (error) {
      console.log("Error cargando incidencias");
      console.log(error);
    }
  };

  const startLoadingIncidencia = async (incidencia) => {
    try {
      const { data } = await clienteAxios.get(
        `/operador/incidencia/obtener-incidencia/${incidencia}`
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
    hasEventSelected: !!activeIncidencia,

    //* Métodos
    setActiveIncidencia,
    startLoadingIncidencias,
    startLoadingIncidencia,
    startSavingIncidencia,
    startTerminarIncidencia,
    startLogoutModal,
    startDeletingIncidencia,
  };
};
