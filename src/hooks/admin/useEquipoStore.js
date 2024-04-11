import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api";
import {
  onAddNewEquipo,
  onDeleteEquipo,
  onLoadEquipos,
  onSetActiveEquipo,
  onUpdateEquipo,
  onLoadEquipo,
  onLogoutModalEquipo,
  onLoadFiltrosEquipo
} from "../../store";

export const useEquipoStore = () => {
  const dispatch = useDispatch();
  const { equipos, equipo, activeEquipo,filtros } = useSelector(
    (state) => state.adminEquipo
  );

  const startSavingEquipo = async (equipo) => {
    try {
      // Creando
      const { data } = await clienteAxios.post(
        "/admin/equipo/agregar-equipo",
        equipo
      );
      dispatch(onAddNewEquipo({ ...equipo }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startDeletingEquipo = async (id) => {
    // Todo: Llegar al backend
    try {
      Swal.fire({
        title: "¿Deseas borrar el equipo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar.",
      }).then((result) => {
        if (result.isConfirmed) {
          clienteAxios.put(`/admin/equipo/eliminar-equipo/${id}`);
          dispatch(onDeleteEquipo());
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startUpdateEquipo = async (equipo) => {
    // Todo: Llegar al backend
    try {
      await clienteAxios.put(
        `/admin/equipo/actualizar-equipo/${equipo.no_serie}`,
        equipo
      );
      dispatch(onUpdateEquipo({ ...equipo }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startLoadingEquipos = async (datos) => {

      const page = datos.map((items)=>items.page) 
      const filterCategoria = datos.map((items)=>items.filterCategoria) 
      const search = datos.map((items)=>items.search) 

    try {
      const { data } = await clienteAxios.get( `/admin/equipo/obtener-equipos?page=${page}&categoria=${filterCategoria.toString()}&search=${search}`);
      dispatch(onLoadEquipos(data.equipos));

      dispatch(onLoadFiltrosEquipo({
        total: data.total,
        page:data.page,
        limit:data.limit
      }));

      if (!data.ok) return dispatch(onLoadEquipos(data.msg));
    } catch (error) {
      console.log("Error cargando equipos");
      console.log(error);
    }
  };

  const startLoadingEquipo = async (equipo) => {
    try {
      const { data } = await clienteAxios.get(
        `/admin/equipo/obtener-equipo/${equipo}`
      );
      dispatch(onLoadEquipo(data.equipo));

      if (!data.ok) return dispatch(onLoadEquipos(data.msg));
    } catch (error) {
      console.log("Error cargando equipos");
      console.log(error);
    }
  };

  const startLogoutModal = () => {
    dispatch(onLogoutModalEquipo());
  };

  return {
    //* Propiedades
    activeEquipo,
    equipo,
    equipos,
    filtros,
    hasEventSelected: !!activeEquipo,

    //* Métodos
    startLoadingEquipos,
    startLoadingEquipo,
    startSavingEquipo,
    startUpdateEquipo,
    startLogoutModal,
    startDeletingEquipo,
  };
};
