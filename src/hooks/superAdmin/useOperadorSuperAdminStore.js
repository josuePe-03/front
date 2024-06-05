import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api";
import {
  onLoadOperadores,
  onLoadFiltrosOperador
} from "../../store";

export const useOperadorSuperAdminStore = () => {
  const dispatch = useDispatch();
  const { operadores, operador,filtros, activeOperador } = useSelector(
    (state) => state.adminOperador
  );
  const { user } = useSelector((state) => state.auth);

  //OBTENER OPERADORES
  const startLoadingOperadoresSuperAdmin = async (datos) => {
    try {

      const page = datos.map((items)=>items.page) 
      const search = datos.map((items)=>items.search) 

      const { data } = await clienteAxios.get( `/super-admin/obtener-operadores?page=${page}&search=${search}`);
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

  // const startLoadingOperador = async (operador) => {
  //   try {
  //     const { data } = await clienteAxios.get(
  //       `/operador/obtener-operador/${operador}`
  //     );
  //     dispatch(onLoadOperador(data.operador));

  //     if (!data.ok) return dispatch(onLoadOperadores(data.msg));
  //   } catch (error) {
  //     console.log("Error cargando operadores");
  //     console.log(error);
  //   }
  // };

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
    startLoadingOperadoresSuperAdmin,
    startLogoutModal,
  };
};
