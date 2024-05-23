import { configureStore } from '@reduxjs/toolkit';
import { visitaTecnicaSlice,uiSlice, calendarSlice, authSlice,uiNavbarSlice,operadorSlice,uiModalAddUserSlice,tecnicoSlice,equipoSlice,incidenciaSlice } from './';
import { ubicacionSlice } from './admin/ubicacionSlice';


export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui:       uiSlice.reducer,
        //admins
        adminOperador: operadorSlice.reducer,
        adminTecnico: tecnicoSlice.reducer,
        adminEquipo: equipoSlice.reducer,
        adminUbicacion: ubicacionSlice.reducer,

        //ui
        uiNavbar: uiNavbarSlice.reducer,
        modalAdd : uiModalAddUserSlice.reducer,
        //incidecnia
        incidencia : incidenciaSlice.reducer,
        //tecncico
        visitaTecnica : visitaTecnicaSlice.reducer,
        
        

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
