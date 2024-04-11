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
  onLogoutModalTecnico,
  // FILTROS TECNICO
  onLoadFiltrosTecnico,
} from "../../store";

export const useTecnicoStore = () => {
  const dispatch = useDispatch();
  const { tecnicos, tecnico, filtros, activeTecnico } = useSelector(
    (state) => state.adminTecnico
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveTecnico = (calendarEvent) => {
    dispatch(onSetActiveTecnico(calendarEvent));
  };

  // AGREGAR TECNICOS
  const startSavingTecnico = async (tecnico) => {
    try {
      // Creando
      const { data } = await clienteAxios.post(
        "/admin/tecnico/agregar-tecnico",
        tecnico
      );
      dispatch(onAddNewTecnico({ ...tecnico }));
      startLoadingTecnicos();
      Swal.fire({
        title: "!Agregado Correctamente!",
        icon: "success",
      });
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

  // OBTENER TECNICOS
  const startLoadingTecnicos = async (datos) => {
    const page = datos.map((items) => items.page);
    const filterCategoria = datos.map((items) => items.filterCategoria);
    const search = datos.map((items) => items.search);

    try {
      const { data } = await clienteAxios.get(
        `/admin/tecnico/obtener-tecnicos?page=${page}&categoria=${filterCategoria.toString()}&search=${search}`
      );
      dispatch(onLoadTecnicos(data.tecnicos));

      dispatch(
        onLoadFiltrosTecnico({
          total: data.total,
          page: data.page,
          limit: data.limit,
        })
      );

      if (!data.ok) return dispatch(onLoadTecnicos(data.msg));
    } catch (error) {
      console.log("Error cargando tecnicos");
      console.log(error);
    }
  };

  const startLoadingTecnico = async (tecnico) => {
    try {
      const { data } = await clienteAxios.get(
        `/admin/tecnico/obtener-tecnico/${tecnico}`
      );
      dispatch(onLoadTecnico(data.tecnico));

      if (!data.ok) return dispatch(onLoadTecnicos(data.msg));
    } catch (error) {
      console.log("Error cargando tecnicos");
      console.log(error);
    }
  };

  const startLogoutModal = () => {
    dispatch(onLogoutModalTecnico());
  };

  return {
    //* Propiedades
    activeTecnico,
    tecnico,
    tecnicos,
    filtros,
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
