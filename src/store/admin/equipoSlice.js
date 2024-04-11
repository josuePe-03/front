import { createSlice } from '@reduxjs/toolkit';

export const equipoSlice = createSlice({
    name: 'adminEquipo',
    initialState: {
        isLoadingEquipos: true,
        equipos: [
            // tempEvent
        ],
        equipo: [
            // tempEvent
        ],
        filtros: [
            // tempEvent
        ],
        activeEquipo: null
    },
    reducers: {
        onSetActiveEquipo: ( state, { payload }) => {
            state.activeEquipo = payload;
        },
        onAddNewEquipo: ( state, { payload }) => {
            state.activeEquipo = null;
        },
        onUpdateEquipo: ( state, { payload } ) => {
            state.equipos = state.equipos.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }
                return event;
            });
        },
        onDeleteEquipo: ( state ) => {
            if ( state.activeEquipo ) {
                state.equipos = state.equipos.filter( event => event.id !== state.activeEquipo.id );
                state.activeEquipo = null;
            }
        },
        onLoadEquipos: (state, { payload = [] }) => {
            state.isLoadingEquipos = false;
            state.equipos = payload;

        },
        onLoadEquipo: (state, { payload = [] }) => {
            state.isLoadingEquipos = false;
            state.equipo = payload;

        },
        //FILTROS
        onLoadFiltrosEquipo: (state, { payload = [] }) => {
            state.isLoadingEquipos = false;
            state.filtros = payload;

        },
        onLogoutModalEquipo: ( state ) => {
            state.isLoadingEquipos = false,
            state.equipo    = []

        },

        onLogoutEquipo: ( state ) => {
            state.isLoadingEquipos = true,
            state.equipos      = []
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewEquipo,
    onDeleteEquipo,
    onLoadEquipos,
    onLoadEquipo,
    onLoadFiltrosEquipo,
    onLogoutEquipo,
    onLogoutModalEquipo,
    onSetActiveEquipo,
    onUpdateEquipo,
} = equipoSlice.actions;