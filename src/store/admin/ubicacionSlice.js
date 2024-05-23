import { createSlice } from '@reduxjs/toolkit';

export const ubicacionSlice = createSlice({
    name: 'adminUbicacion',
    initialState: {
        isLoadingUbicaciones: true,
        ubicaciones: [
            // tempEvent
        ],
        ubicacion: [
            // tempEvent
        ],
    },
    reducers: {
        onLoadUbicaciones: (state, { payload = [] }) => {
            state.isLoadingUbicaciones = false;
            state.ubicaciones = payload;

        },
        onLoadUbicacion: (state, { payload = [] }) => {
            state.isLoadingUbicaciones = false;
            state.ubicacion = payload;

        },
    }
});


// Action creators are generated for each case reducer function
export const {
    onLoadUbicacion,
    onLoadUbicaciones
} = ubicacionSlice.actions;