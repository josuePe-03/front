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

export const useTecnicoSuperAdminStore = () => {
  const dispatch = useDispatch();

  const { tecnicos, tecnico, filtros, activeTecnico } = useSelector(
    (state) => state.adminTecnico
  );

  // OBTENER TECNICOS
  const startLoadingTecnicosSuperAdmin = async (datos) => {
    const page = datos.map((items) => items.page);
    const filterArea = datos.map((items) => items.filterArea);
    const search = datos.map((items) => items.search);

    try {
      const { data } = await clienteAxios.get(
        `/super-admin/obtener-tecnicos?page=${page}&area=${filterArea.toString()}&search=${search}`
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

  const startLoadingTecnicoSuperAdmin = async (tecnico) => {
    try {
      const { data } = await clienteAxios.get(
        `/tecnico/obtener-tecnico/${tecnico}`
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
    startLoadingTecnicosSuperAdmin,
    startLoadingTecnicoSuperAdmin,
    startLogoutModal,
  };
};
