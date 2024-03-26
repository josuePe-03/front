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
    //Modam Add Incidencia
    isIncidenciaModalOpen: false,

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

    //INCIDENCIA
    onOpenIncidenciaModal: (state) => {
      state.isIncidenciaModalOpen = true;
    },
    onCloseIncidenciaModal: (state) => {
      state.isIncidenciaModalOpen = false;
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
  onOpenUserModal,
  //INCIDENCIA
  onOpenIncidenciaModal,
  onCloseIncidenciaModal
} = uiSlice.actions;
