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
  onLogoutModalOperador,
  onLoadFiltrosOperador
} from "../../store";

export const useOperadorStore = () => {
  const dispatch = useDispatch();
  const { operadores, operador,filtros, activeOperador } = useSelector(
    (state) => state.adminOperador
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveOperador = (calendarEvent) => {
    dispatch(onSetActiveOperador(calendarEvent));
  };

  //GUARDAR OPERADOR
  const startSavingOperador = async (operador) => {
    try {
      // Creando
      const { data } = await clienteAxios.post(
        "/operador/agregar-operador",
        operador
      );
      dispatch(onAddNewOperador({ ...operador }));
      startLoadingOperadores();
      Swal.fire({
        title: "!Agregado Correctamente!",
        icon: "success",
      });
    } catch (error) {
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  //BORRAR OPERADOR
  const startDeletingOperador = async (id) => {
    // Todo: Llegar al backend
    try {
      await clienteAxios.put(`/operador/eliminar-operador/${id}`);
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
        `/operador/actualizar-operador/${operador.id}`,
        operador
      );
      dispatch(onUpdateOperador({ ...operador }));
      startLoadingOperadores();
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  //OBTENER OPERADORES
  const startLoadingOperadores = async (datos) => {
    try {

      const page = datos.map((items)=>items.page) 
      const search = datos.map((items)=>items.search) 

      const { data } = await clienteAxios.get( `/operador/obtener-operadores?page=${page}&search=${search}`);
      dispatch(onLoadOperadores(data.operadores));
       dispatch(onLoadFiltrosOperador({
         total: data.total,
         page:data.page,
         limit:data.limit
       }));
      if (!data.ok) return dispatch(onLoadOperadores(data.msg));
    } catch (error) {
      console.log("Error cargando operadores");
      console.log(error);
    }
  };

  const startLoadingOperador = async (operador) => {
    try {
      const { data } = await clienteAxios.get(
        `/operador/obtener-operador/${operador}`
      );
      dispatch(onLoadOperador(data.operador));

      if (!data.ok) return dispatch(onLoadOperadores(data.msg));
    } catch (error) {
      console.log("Error cargando operadores");
      console.log(error);
    }
  };

  const startLogoutModal = () => {
    dispatch(onLogoutModalOperador());
  };

  return {
    //* Propiedades
    activeOperador,
    operador,
    operadores,
    filtros,
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
