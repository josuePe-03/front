import { createSlice } from "@reduxjs/toolkit";

export const centroMedicoSlice = createSlice({
  name: "centroMedico",
  initialState: {
    isLoadingCentroMedico: true,
    centrosMedicos: [
      // tempEvent
    ],
    centroMedico: [
      // tempEvent
    ],
    filtros: [
      // tempEvent
    ],
  },
  reducers: {
    onLoadCentrosMedicos: (state, { payload = [] }) => {
      state.isLoadingCentroMedico = false;
      state.centrosMedicos = payload;
    },
    onLoadCentroMedico: (state, { payload = [] }) => {
      state.isLoadingCentroMedico = false;
      state.centroMedico = payload;
    },
    //FILTROS
    onLoadFiltrosCentroMedico: (state, { payload = [] }) => {
      state.isLoadingCentroMedico = false;
      state.filtros = payload;
    },

    onLogoutCentroMedico: (state) => {
      (state.isLoadingCentroMedico = true), (state.centrosMedicos = []);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
    onLoadCentroMedico,
    onLoadCentrosMedicos,
    onLoadFiltrosCentroMedico,
    onLogoutCentroMedico
} = centroMedicoSlice.actions;
