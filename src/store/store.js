import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice, authSlice,uiNavbarSlice,operadorSlice,uiModalAddUserSlice,tecnicoSlice,equipoSlice,incidenciaSlice } from './';


export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui:       uiSlice.reducer,
        //admins
        adminOperador: operadorSlice.reducer,
        adminTecnico: tecnicoSlice.reducer,
        adminEquipo: equipoSlice.reducer,
        //ui
        uiNavbar: uiNavbarSlice.reducer,
        modalAdd : uiModalAddUserSlice.reducer,
        //incidecnia
        incidencia : incidenciaSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
