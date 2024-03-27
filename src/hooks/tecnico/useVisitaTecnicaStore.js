import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api";
import {
  onAddNewVisitaTecnica,
  onDeleteVisitaTecnica,
  onLoadVisitasTecnicas,
  onLoadVisitaTecnicaProxima,
  onSetActiveVisitaTecnica,
  onUpdateVisitaTecnica,
  onLoadVisitaTecnica,
  onLogoutModalVisitaTecnica,
} from "../../store";

export const useVisitaTecnicaStore = () => {
  const dispatch = useDispatch();

  const { visitaProxima, visitasTecnicas, visitaTecnica, activeVisitaTecnica } = useSelector(
    (state) => state.visitaTecnica
  );

  const { user } = useSelector((state) => state.auth);

  const setActiveVisitaTecnica = (calendarEvent) => {
    dispatch(onSetActiveVisitaTecnica(calendarEvent));
  };

  const startSavingVisitaTecnica = async (visitaTecnica) => {
    try {
      // Creando
      const { data } = await clienteAxios.post(
        "/operador/incidencia/agregar-incidencia",
        visitaTecnica
      );
      dispatch(onAddNewVisitaTecnica({ ...visitaTecnica }));
      startLoadingVisitasTecnicas();
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startDeletingVisitaTecnica = async (id) => {
    // Todo: Llegar al backend
    try {
      await clienteAxios.put(`/admin/tecnico/eliminar-tecnico/${id}`);
      dispatch(onDeleteVisitaTecnica());
      startLoadingVisitasTecnicas();
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startUpdateVisitaTecnica = async (visitaTecnica) => {
    // Todo: Llegar al backend
    try {
      await clienteAxios.put(
        `/admin/tecnico/actualizar-tecnico/${visitaTecnica.id}`,
        visitaTecnica
      );
      dispatch(onUpdateVisitaTecnica({ ...visitaTecnica }));
      startLoadingVisitasTecnicas();
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  //OBTENER TODAS LAS VISITAS
  const startLoadingVisitasTecnicas = async () => {
    try {
      const { data } = await clienteAxios.get(
        `/tecnico/visita-incidencia/obtener-visitas`
      );
      dispatch(onLoadVisitasTecnicas(data.visitas));

      if (!data.ok) return dispatch(onLoadVisitasTecnicas(data.msg));
    } catch (error) {
      console.log("Error cargando visitas");
      console.log(error);
    }
  };

  //VISITAS POR INCIDENCIA
  const startLoadingVisitasTecnicasIncidencia = async (incidencia) => {
    try {
      const { data } = await clienteAxios.get(
        `/tecnico/visita-incidencia/obtener-visitas-incidencia/${incidencia}`
      );
      dispatch(onLoadVisitasTecnicas(data.visita_incidencia));

      if (!data.ok) return dispatch(onLoadVisitasTecnicas(data.msg));
    } catch (error) {
      console.log("Error cargando incidencias");
      console.log(error);
    }
  };

  //VISITAS PROXIMAS

  const startLoadingVisitasTecnicasProxima = async (operador) => {
    try {
      const { data } = await clienteAxios.get(
        `/tecnico/visita-incidencia/visita-proxima/${operador}`
      );
      dispatch( onLoadVisitaTecnicaProxima(data.visita_proxima));

      if (!data.ok) return dispatch(onLoadVisitaTecnicaProxima(data.msg));
    } catch (error) {
      console.log("Error cargando incidencias");
      console.log(error);
    }
  };

  const startLoadingVisitaTecnica = async (visitaTecnica) => {
    try {
      const { data } = await clienteAxios.get(
        `/operador/incidencia/obtener-incidencia/${visitaTecnica}`
      );
      dispatch(onLoadVisitaTecnica(data.visitaTecnica));
      dispatch(onLogo(data.visitaTecnica));

      if (!data.ok) return dispatch(onLoadVisitasTecnicas(data.msg));
    } catch (error) {
      console.log("Error cargando tecnicos");
      console.log(error);
    }
  };

  const startLogoutModal = () => {
    dispatch(onLogoutModalVisitaTecnica());
  };

  return {
    //* Propiedades
    activeVisitaTecnica,
    visitaTecnica,
    visitasTecnicas,
    visitaProxima,
    hasEventSelected: !!activeVisitaTecnica,

    //* Métodos
    setActiveVisitaTecnica,
    startLoadingVisitasTecnicas,
    startLoadingVisitaTecnica,
    startLoadingVisitasTecnicasIncidencia,
    startLoadingVisitasTecnicasProxima,
    startSavingVisitaTecnica,
    startUpdateVisitaTecnica,
    startLogoutModal,
    startDeletingVisitaTecnica,
  };
};
