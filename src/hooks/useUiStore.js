import { useDispatch, useSelector } from "react-redux";
import {
  //equipo
  onOpenEquipoAddModal,
  onCloseEquipoAddModal,
  onOpenEquipoModal,
  onCloseEquipoModal,
  //user
  onOpenUserAddModal,
  onCloseUserAddModal,
  onOpenUserModal,
  onCloseUserModal,
  //INCIDENCIA
  onOpenIncidenciaModal,
  onCloseIncidenciaModal,
  //TECNICO
  onOpenVisitaAddModal,
  onCloseVisitaAddModal,
  onOpenDiagnosticoAddModal,
  onCloseDiagnosticoAddModal,
  //incidencias option
  onToogleIncidenciasOption,
  onToogleSidebar
} from "../store";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const {
    //EQUIPO
    isEquipoModalOpen,
    isEquipoAddModalOpen,
    isUserAddModalOpen,
    isUserModalOpen,
    isIncidenciaModalOpen,
    isVisitaAddModalOpen,
    isDiagnosticoAddModalOpen,
    isIncidenciaOptionsOpen,
    isSidebarOpen

  } = useSelector((state) => state.ui);

    // SIDEBAR
    const toogleSidebar = () => {
      dispatch(onToogleSidebar());
    };
    
  //EQUIPO
  const openEquipoModal = () => {
    dispatch(onOpenEquipoModal());
  };
  const closeEquipoModal = () => {
    dispatch(onCloseEquipoModal());
  };
  const openEquipoAddModal = () => {
    dispatch(onOpenEquipoAddModal());
  };
  const closeEquipoAddModal = () => {
    dispatch(onCloseEquipoAddModal());
  };
  //USERS
  const openUserModal = () => {
    dispatch(onOpenUserModal());
  };
  const closeUserModal = () => {
    dispatch(onCloseUserModal());
  };
  const openUserAddModal = () => {
    dispatch(onOpenUserAddModal());
  };
  const closeUserAddModal = () => {
    dispatch(onCloseUserAddModal());
  };

  //INCIDENCIA
  const openIncidenciaModal = () => {
    dispatch(onOpenIncidenciaModal());
  };
  const closeIncidenciaModal = () => {
    dispatch(onCloseIncidenciaModal());
  };

  //tecnico
  const openVisitaAddModal = () => {
    dispatch(onOpenVisitaAddModal());
  };
  const closeVisitaAddModal = () => {
    dispatch(onCloseVisitaAddModal());
  };
  const openDiagnosticoAddModal = () => {
    dispatch(onOpenDiagnosticoAddModal());
  };
  const closeDiagnosticoAddModal = () => {
    dispatch(onCloseDiagnosticoAddModal());
  };

  //incidencia options
  const toogleIncidenciasOption = () => {
    dispatch(onToogleIncidenciasOption());
  };

  return {
    //* Propiedades
    isEquipoModalOpen,
    isEquipoAddModalOpen,
    //USER
    isUserModalOpen,
    isUserAddModalOpen,
    //INCIDENCIA
    isIncidenciaModalOpen,
    //Tecnico
    isVisitaAddModalOpen,
    isDiagnosticoAddModalOpen,
    //INCIDENCIAS OPTION
    isIncidenciaOptionsOpen,
    isSidebarOpen,
    //* Métodos
    //equipo
    openEquipoModal,
    openEquipoAddModal,
    closeEquipoModal,
    closeEquipoAddModal,
    //user
    openUserModal,
    openUserAddModal,
    closeUserModal,
    closeUserAddModal,
    //INCIDENCIA
    openIncidenciaModal,
    closeIncidenciaModal,
    //Tecnico
    openVisitaAddModal,
    closeVisitaAddModal,
    openDiagnosticoAddModal,
    closeDiagnosticoAddModal,
    //INCIDENCIAS OPTION
    toogleIncidenciasOption,
    toogleSidebar
  };
};
