import { createSlice } from '@reduxjs/toolkit';

export const visitaTecnicaSlice = createSlice({
    name: 'visitaTecnica',
    initialState: {
        isLoadingVisitasTecnicas: true,
        visitasTecnicas: [
            // tempEvent
        ],
        visitaTecnica: [
            // tempEvent
        ],
        visitaProxima:[

        ],
        filtros:[

        ],
        
        activeVisitaTecnica: null
    },
    reducers: {
        onSetActiveVisitaTecnica: ( state, { payload }) => {
            state.activeVisitaTecnica = payload;
        },
        onAddNewVisitaTecnica: ( state, { payload }) => {
            state.activeVisitaTecnica = null;
        },
        onUpdateVisitaTecnica: ( state, { payload } ) => {
            state.visitasTecnicas = state.visitasTecnicas.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }
                return event;
            });
        },
        onDeleteVisitaTecnica: ( state ) => {
            if ( state.activeVisitaTecnica ) {
                state.visitasTecnicas = state.visitasTecnicas.filter( event => event.id !== state.activeVisitaTecnica.id );
                state.activeVisitaTecnica = null;
            }
        },
        //VISITAS
        onLoadVisitasTecnicas: (state, { payload = [] }) => {
            state.isLoadingVisitasTecnicas = false;
            state.visitasTecnicas = payload;
            state.visitaProxima      = [];
        },
        //VISITA
        onLoadVisitaTecnica: (state, { payload = [] }) => {
            state.isLoadingVisitasTecnicas = false;
            state.visitaTecnica = payload;
            state.visitaProxima      = [];

        },

        //VISITA PROXIMA
        onLoadVisitaTecnicaProxima: (state, { payload = [] }) => {
            state.isLoadingVisitasTecnicas = false;
            state.visitasTecnicas      = [],
            state.visitaTecnica      = [],
            state.visitaProxima = payload;

        },
        // FILTROS
        onLoadFiltrosVisitaTecnica: (state, { payload = [] }) => {
            state.isLoadingVisitasTecnicas = false;
            state.filtros      = payload;

        },
        onLogoutModalVisitaTecnica: ( state ) => {
            state.isLoadingVisitasTecnicas = false,
            state.visitaTecnica    = []

        },

        onLogoutVisitaTecnica: ( state ) => {
            state.isLoadingVisitasTecnicas = true,
            state.visitasTecnicas      = [],
            state.visitaTecnica      = []

            
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewVisitaTecnica,
    onDeleteVisitaTecnica,
    onLoadVisitasTecnicas,
    onLoadVisitaTecnica,
    onLoadVisitaTecnicaProxima,
    // FILTROS
    onLoadFiltrosVisitaTecnica,
    onLogoutVisitaTecnica,
    onLogoutModalVisitaTecnica,
    onSetActiveVisitaTecnica,
    onUpdateVisitaTecnica,
} = visitaTecnicaSlice.actions;