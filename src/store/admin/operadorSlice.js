import { createSlice } from '@reduxjs/toolkit';

export const operadorSlice = createSlice({
    name: 'adminOperador',
    initialState: {
        isLoadingOperadores: true,
        operadores: [
            // tempEvent
        ],
        operador: [
            // tempEvent
        ],
        activeOperador: null
    },
    reducers: {
        onSetActiveOperador: ( state, { payload }) => {
            state.activeOperador = payload;
        },
        onAddNewOperador: ( state, { payload }) => {
            state.activeOperador = null;
        },
        onUpdateOperador: ( state, { payload } ) => {
            state.operadores = state.operadores.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }

                return event;
            });
        },
        onDeleteOperador: ( state ) => {
            if ( state.activeOperador ) {
                state.operadores = state.operadores.filter( event => event.id !== state.activeOperador.id );
                state.activeOperador = null;
            }
        },
        onLoadOperadores: (state, { payload = [] }) => {
            state.isLoadingOperadores = false;
            state.operadores = payload;

        },
        onLoadOperador: (state, { payload = [] }) => {
            state.isLoadingOperadores = false;
            state.operador = payload;

        },
        onLogoutModalOperador: ( state ) => {
            state.isLoadingOperadores = false,
            state.operador    = []

        },


        onLogoutOperador: ( state ) => {
            state.isLoadingOperadores = true,
            state.operadores      = []
            stOperador = null
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewOperador,
    onDeleteOperador,
    onLoadOperadores,
    onLoadOperador,
    onLogoutOperador,
    onLogoutModalOperador,
    onSetActiveOperador,
    onUpdateOperador,
} = operadorSlice.actions;