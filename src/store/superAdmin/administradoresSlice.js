import { createSlice } from '@reduxjs/toolkit';

export const administradoresSlice = createSlice({
    name: 'administradores',
    initialState: {
        isLoadingAdministradores: true,
        administradores: [
            // tempEvent
        ],
        administrador: [
            // tempEvent
        ],
        filtros: [
            // tempEvent
        ],
        activeAdministrador: null
    },
    reducers: {
        onLoadAdministradores: (state, { payload = [] }) => {
            state.isLoadingAdministradores = false;
            state.administradores = payload;


        },
        onLoadAdministrador: (state, { payload = [] }) => {
            state.isLoadingAdministradores = false;
            state.administrador = payload;

        },
        //FILTROS
        onLoadFiltrosAdministrador: (state, { payload = [] }) => {
            state.isLoadingAdministradores = false;
            state.filtros = payload;

        },
        onLogoutAdministradores: ( state ) => {
            state.isLoadingAdministradores = true,
            state.administradores      = []
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onLoadAdministrador,
    onLoadAdministradores,
    onLogoutAdministradores,
    onLoadFiltrosAdministrador
} = administradoresSlice.actions;