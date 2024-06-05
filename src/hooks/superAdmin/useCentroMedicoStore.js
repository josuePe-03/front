import { useDispatch, useSelector } from "react-redux";
import { clienteAxios } from "../../api";
import { onLoadCentrosMedicos, onLoadFiltrosCentroMedico } from "../../store";

export const useCentroMedicoStore = () => {
  const dispatch = useDispatch();
  const { centrosMedicos, centroMedico,filtros} = useSelector(
    (state) => state.centroMedico
  );
  //OBTENER OPERADORES
  const startLoadingCentrosMedicos = async (datos) => {
    try {

      const page = datos.map((items)=>items.page) 
      const search = datos.map((items)=>items.search) 

      const { data } = await clienteAxios.get( `/centro-medico/obtener-centro-medico?page=${page}&search=${search}`);
      dispatch(onLoadCentrosMedicos(data.centroMedico));
       dispatch(onLoadFiltrosCentroMedico({
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


  return {
    //* Propiedades
    centroMedico,
    centrosMedicos,
    filtros,

    //* Métodos
    startLoadingCentrosMedicos
  };
};
