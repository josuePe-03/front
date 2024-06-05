import { useDispatch, useSelector } from "react-redux";
import { clienteAxios } from "../../api";
import { onLoadAdministradores, onLoadFiltrosAdministrador } from "../../store";

export const useAdministradoresStore = () => {
  const dispatch = useDispatch();
  const { administradores, administrador, filtros } = useSelector(
    (state) => state.administradores
  );
  //OBTENER OPERADORES
  const startLoadingAdministradores = async (datos) => {
    try {
      const page = datos.map((items) => items.page);
      const search = datos.map((items) => items.search);

      const { data } = await clienteAxios.get(
        `/super-admin/obtener-administradores?page=${page}&search=${search}`
      );
      dispatch(onLoadAdministradores(data.administradores));
      dispatch(
        onLoadFiltrosAdministrador({
          total: data.total,
          page: data.page,
          limit: data.limit,
        })
      );
      if (!data.ok) return dispatch(onLoadOperadores(data.msg));
    } catch (error) {
      console.log("Error cargando operadores");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    administrador,
    administradores,
    filtros,

    //* Métodos
    startLoadingAdministradores,
  };
};
