import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    //Modal Equipo
    isEquipoModalOpen: false,
    isEquipoAddModalOpen: false,
    //Modal Operador
    isUserModalOpen: false,
    isUserAddModalOpen: false,
    //Modal Equipo
    isTecnicoModalOpen: false,
    isTecnicoAddModalOpen: false,
  },
  reducers: {
    //EQUIPO
    onOpenEquipoModal: (state) => {
      state.isEquipoModalOpen = true;
    },
    onCloseEquipoModal: (state) => {
      state.isEquipoModalOpen = false;
    },
    onOpenEquipoAddModal: (state) => {
      state.isEquipoAddModalOpen = true;
    },
    onCloseEquipoAddModal: (state) => {
      state.isEquipoAddModalOpen = false;
    },
    //USER
    //EQUIPO
    onOpenUserModal: (state) => {
      state.isUserModalOpen = true;
    },
    onCloseUserModal: (state) => {
      state.isUserModalOpen = false;
    },
    onOpenUserAddModal: (state) => {
      state.isUserAddModalOpen = true;
    },
    onCloseUserAddModal: (state) => {
      state.isUserAddModalOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  //equipo
  onOpenEquipoModal,
  onCloseEquipoModal,
  onCloseEquipoAddModal,
  onOpenEquipoAddModal,
  //USER
  onOpenUserAddModal,
  onCloseUserAddModal,
  onCloseUserModal,
  onOpenUserModal
} = uiSlice.actions;
