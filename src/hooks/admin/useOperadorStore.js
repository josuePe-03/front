import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api";
import {
  onAddNewOperador,
  onDeleteOperador,
  onLoadOperadores,
  onSetActiveOperador,
  onUpdateOperador,
  onLoadOperador,
  onLogoutModalOperador
} from "../../store";

export const useOperadorStore = () => {
  const dispatch = useDispatch();
  const { operadores,operador, activeOperador } = useSelector(
    (state) => state.adminOperador
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveOperador = (calendarEvent) => {
    dispatch(onSetActiveOperador(calendarEvent));
  };

  const startSavingOperador = async (operador) => {
    try {
      // Creando
      const { data } = await clienteAxios.post(
        "/admin/operador/agregar-operador",
        operador
      );
      dispatch(onAddNewOperador({ ...operador }));
      startLoadingOperadores();

    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startDeletingOperador = async (id) => {
    // Todo: Llegar al backend
    try {
      await clienteAxios.put(`/admin/operador/eliminar-operador/${id}`);
      dispatch(onDeleteOperador());
      startLoadingOperadores();
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startUpdateOperador = async (operador) => {
    // Todo: Llegar al backend
    try {
      await clienteAxios.put(
        `/admin/operador/actualizar-operador/${operador.id}`,
        operador
      );
      dispatch(onUpdateOperador({ ...operador }));
      startLoadingOperadores();
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startLoadingOperadores = async () => {
    try {
      const { data } = await clienteAxios.get(
        "/admin/operador/obtener-operadores"
      );
      dispatch(onLoadOperadores(data.operadores));

      if (!data.ok) return dispatch(onLoadOperadores(data.msg));
    } catch (error) {
      console.log("Error cargando operadores");
      console.log(error);
    }
  };

  const startLoadingOperador = async (operador) => {
    try {
      const { data } = await clienteAxios.get(
        `/admin/operador/obtener-operador/${operador}`,
      );
      dispatch(onLoadOperador(data.operador));

      if (!data.ok) return dispatch(onLoadOperadores(data.msg));
    } catch (error) {
      console.log("Error cargando operadores");
      console.log(error);
    }
  };

  
  const startLogoutModal = () =>{

    dispatch( onLogoutModalOperador() );

  }

  return {
    //* Propiedades
    activeOperador,
    operador,
    operadores,
    hasEventSelected: !!activeOperador,

    //* Métodos
    setActiveOperador,
    startLoadingOperadores,
    startLoadingOperador,
    startSavingOperador,
    startUpdateOperador,
    startLogoutModal,
    startDeletingOperador,
  };
};
