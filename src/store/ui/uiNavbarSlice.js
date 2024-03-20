
import { createSlice } from '@reduxjs/toolkit';

export const uiNavbarSlice = createSlice({
    name: 'navbar',
    initialState: {
        isNavbarOpen: false
    },
    reducers: {
        onOpenNavbar: ( state ) => {
            state.isNavbarOpen = true;
        },
        onCloseNavbar: ( state ) => {
            state.isNavbarOpen = false;
        },
        onLogoutNavbar: ( state ) => {
            state.isNavbarOpen = false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onOpenNavbar, onCloseNavbar,onLogoutNavbar } = uiNavbarSlice.actions;

