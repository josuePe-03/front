import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api";
import {
  onLoadUbicaciones,
  onLoadUbicacion,
} from "../../store";

export const useUbicacionStore = () => {
  const dispatch = useDispatch();

  const { ubicaciones, ubicacion, } = useSelector(
    (state) => state.adminUbicacion
  );
  // AGREGAR TECNICOS
  const startSavingUbicacion = async (ubicacion) => {
    try {
      // Creando
      const { data } = await clienteAxios.post(
        "/ubicaciones/agregar-ubicacion",
        ubicacion
      );
      startLoadingUbicaciones();
      Swal.fire({
        title: "!Agregado Correctamente!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startDeletingUbicacion = async (id) => {
    // Todo: Llegar al backend
    try {
      Swal.fire({
        title: "¿Deseas eliminar la ubicacion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar."
      }).then((result) => {
        if (result.isConfirmed) {
          clienteAxios.delete(`/ubicaciones/eliminar-ubicacion/${id}`);
          startLoadingUbicaciones();
        }
      });


    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  // OBTENER TECNICOS
  const startLoadingUbicaciones = async (datos) => {
    try {
      const { data } = await clienteAxios.get(
        `/ubicaciones/obtener-ubicaciones`
      );
      dispatch(onLoadUbicaciones(data.ubicaciones));
      if (!data.ok) return dispatch(onLoadUbicaciones(data.msg));
    } catch (error) {
      console.log("Error cargando ubicaciones");
      console.log(error);
    }
  };

  const startLoadingUbicacion = async (ubicacion) => {
    try {
      const { data } = await clienteAxios.get(
        `/ubicacion/obtener-ubicacion/${ubicacion}`
      );
      dispatch(onLoadUbicacion(data.ubicacion));

      if (!data.ok) return dispatch(onLoadUbicacions(data.msg));
    } catch (error) {
      console.log("Error cargando ubicacions");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    ubicacion,
    ubicaciones,

    //* Métodos
    startLoadingUbicacion,
    startLoadingUbicaciones,
    startSavingUbicacion,
    startDeletingUbicacion,
  };
};
