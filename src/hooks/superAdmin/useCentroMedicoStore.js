import { useDispatch, useSelector } from "react-redux";
import { clienteAxios } from "../../api";
import { onLoadCentrosMedicos, onLoadFiltrosCentroMedico } from "../../store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const useCentroMedicoStore = () => {

  const navigate = useNavigate()

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

  
  const startSavingCentroMedico = async (centroMedico) => {
    try {
      // Creando
      const { data } = await clienteAxios.post(
        "/centro-medico/crear-centro-medico",
        centroMedico
      );
      Swal.fire({
        title: data.msg,
        icon: "success"
      });

      navigate("/centros-medicos")

    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };


  return {
    //* Propiedades
    centroMedico,
    centrosMedicos,
    filtros,

    //* Métodos
    startLoadingCentrosMedicos,
    startSavingCentroMedico
  };
};
