import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api";
import {
  onAddNewTecnico,
  onDeleteTecnico,
  onLoadTecnicos,
  onSetActiveTecnico,
  onUpdateTecnico,
  onLoadTecnico,
  onLogoutModalTecnico
} from "../../store";

export const useTecnicoStore = () => {
  const dispatch = useDispatch();
  const { tecnicos,tecnico, activeTecnico } = useSelector(
    (state) => state.adminTecnico
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveTecnico = (calendarEvent) => {
    dispatch(onSetActiveTecnico(calendarEvent));
  };

  const startSavingTecnico = async (tecnico) => {
    try {
      // Creando
      const { data } = await clienteAxios.post(
        "/admin/tecnico/agregar-tecnico",
        tecnico
      );
      dispatch(onAddNewTecnico({ ...tecnico }));
      startLoadingTecnicos();

    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startDeletingTecnico = async (id) => {
    // Todo: Llegar al backend
    try {
      await clienteAxios.put(`/admin/tecnico/eliminar-tecnico/${id}`);
      dispatch(onDeleteTecnico());
      startLoadingTecnicos();
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startUpdateTecnico = async (tecnico) => {
    // Todo: Llegar al backend
    try {
      await clienteAxios.put(
        `/admin/tecnico/actualizar-tecnico/${tecnico.id}`,
        tecnico
      );
      dispatch(onUpdateTecnico({ ...tecnico }));
      startLoadingTecnicos();
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startLoadingTecnicos = async () => {
    try {
      const { data } = await clienteAxios.get(
        "/admin/tecnico/obtener-tecnicos"
      );
      dispatch(onLoadTecnicos(data.tecnicos));

      if (!data.ok) return dispatch(onLoadTecnicos(data.msg));
    } catch (error) {
      console.log("Error cargando tecnicos");
      console.log(error);
    }
  };

  const startLoadingTecnico = async (tecnico) => {
    try {
      const { data } = await clienteAxios.get(
        `/admin/tecnico/obtener-tecnico/${tecnico}`,
      );
      dispatch(onLoadTecnico(data.tecnico));

      if (!data.ok) return dispatch(onLoadTecnicos(data.msg));
    } catch (error) {
      console.log("Error cargando tecnicos");
      console.log(error);
    }
  };
  
  const startLogoutModal = () =>{dispatch( onLogoutModalTecnico() );}

  return {
    //* Propiedades
    activeTecnico,
    tecnico,
    tecnicos,
    hasEventSelected: !!activeTecnico,

    //* Métodos
    setActiveTecnico,
    startLoadingTecnicos,
    startLoadingTecnico,
    startSavingTecnico,
    startUpdateTecnico,
    startLogoutModal,
    startDeletingTecnico,
  };
};
