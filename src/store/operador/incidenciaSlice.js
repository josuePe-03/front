import { createSlice } from '@reduxjs/toolkit';

export const incidenciaSlice = createSlice({
    name: 'incidencia',
    initialState: {
        isLoadingIncidencias: true,
        incidencias: [
            // tempEvent
        ],
        incidencia: [
            // tempEvent
        ],
        filtros: [
            // tempEvent
        ],
        activeIncidencia: null
    },
    reducers: {
        onSetActiveIncidencia: ( state, { payload }) => {
            state.activeIncidencia = payload;
        },
        onAddNewIncidencia: ( state, { payload }) => {
            state.activeIncidencia = null;
        },
        onUpdateIncidencia: ( state, { payload } ) => {
            state.incidencias = state.incidencias.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }
                return event;
            });
        },
        onDeleteIncidencia: ( state ) => {
            if ( state.activeIncidencia ) {
                state.incidencias = state.incidencias.filter( event => event.id !== state.activeIncidencia.id );
                state.activeIncidencia = null;
            }
        },
        onLoadIncidencias: (state, { payload = [] }) => {
            state.isLoadingIncidencias = false;
            state.incidencias = payload;

        },
        onLoadIncidencia: (state, { payload = [] }) => {
            state.isLoadingIncidencias = false;
            state.incidencia = payload;

        },
        onLoadFiltrosIncidencias: (state, { payload = [] }) => {
            state.isLoadingIncidencias = false;
            state.filtros = payload;

        },
        onLogoutModalIncidencia: ( state ) => {
            state.isLoadingIncidencias = false,
            state.incidencia    = []

        },

        onLogoutIncidencia: ( state ) => {
            state.isLoadingIncidencias = true,
            state.incidencias      = [],
            state.incidencia      = []

            
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewIncidencia,
    onDeleteIncidencia,
    onLoadIncidencias,
    onLoadIncidencia,
    // FILTROS
    onLoadFiltrosIncidencias,
    onLogoutIncidencia,
    onLogoutModalIncidencia,
    onSetActiveIncidencia,
    onUpdateIncidencia,
} = incidenciaSlice.actions;