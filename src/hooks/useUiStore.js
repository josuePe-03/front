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
  onCloseIncidenciaModal
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
  } = useSelector((state) => state.ui);

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

  return {
    //* Propiedades
    isEquipoModalOpen,
    isEquipoAddModalOpen,
    //USER
    isUserModalOpen,
    isUserAddModalOpen,
    //INCIDENCIA
    isIncidenciaModalOpen,

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
    closeIncidenciaModal
  };
};
