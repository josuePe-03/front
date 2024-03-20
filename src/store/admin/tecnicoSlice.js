import { createSlice } from '@reduxjs/toolkit';

export const tecnicoSlice = createSlice({
    name: 'adminTecnico',
    initialState: {
        isLoadingTecnicos: true,
        tecnicos: [
            // tempEvent
        ],
        tecnico: [
            // tempEvent
        ],
        activeTecnico: null
    },
    reducers: {
        onSetActiveTecnico: ( state, { payload }) => {
            state.activeTecnico = payload;
        },
        onAddNewTecnico: ( state, { payload }) => {
            state.activeTecnico = null;
        },
        onUpdateTecnico: ( state, { payload } ) => {
            state.tecnicos = state.tecnicos.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }

                return event;
            });
        },
        onDeleteTecnico: ( state ) => {
            if ( state.activeTecnico ) {
                state.tecnicos = state.tecnicos.filter( event => event.id !== state.activeTecnico.id );
                state.activeTecnico = null;
            }
        },
        onLoadTecnicos: (state, { payload = [] }) => {
            state.isLoadingTecnicos = false;
            state.tecnicos = payload;

        },
        onLoadTecnico: (state, { payload = [] }) => {
            state.isLoadingTecnicos = false;
            state.tecnico = payload;

        },
        onLogoutModalTecnico: ( state ) => {
            state.isLoadingTecnicos = false,
            state.tecnico    = []

        },

        onLogoutTecnico: ( state ) => {
            state.isLoadingOperadores = true,
            state.tecnicos      = []
            stOperador = null
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewTecnico,
    onDeleteTecnico,
    onLoadTecnicos,
    onLoadTecnico,
    onLogoutTecnico,
    onLogoutModalTecnico,
    onSetActiveTecnico,
    onUpdateTecnico,
} = tecnicoSlice.actions;