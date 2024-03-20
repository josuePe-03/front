
import { createSlice } from '@reduxjs/toolkit';

export const uiModalAddUserSlice = createSlice({
    name: 'modalAdd',
    initialState: {
        isModalAddOpen: false
    },
    reducers: {
        onOpenModalAdd: ( state ) => {
            state.isModalAddOpen = true;
        },
        onCloseModalAdd: ( state ) => {
            state.isModalAddOpen = false;
        },
        onLogoutModalAdd: ( state ) => {
            state.isModalAddOpen = false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onOpenModalAdd, onCloseModalAdd,onLogoutModalAdd } = uiModalAddUserSlice.actions;

