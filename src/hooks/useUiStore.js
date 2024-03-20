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
} from "../store";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const {
    //EQUIPO
    isEquipoModalOpen,
    isEquipoAddModalOpen,
    isUserAddModalOpen,
    isUserModalOpen,
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




  return {
    //* Propiedades
    isEquipoModalOpen,
    isEquipoAddModalOpen,
    //USER
    isUserModalOpen,
    isUserAddModalOpen,

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
  };
};
