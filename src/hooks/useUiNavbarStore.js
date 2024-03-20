import { useDispatch, useSelector } from 'react-redux';
import { onCloseNavbar, onOpenNavbar } from '../store';


export const useUiNavbarStore = () => {

    const dispatch = useDispatch();

    const { 
        isNavbarOpen
    } = useSelector( state => state.uiNavbar );

    const openNavbar = () => {
        dispatch( onOpenNavbar() )
    }

    const closeNavbar = () => {
        dispatch( onCloseNavbar() )
    }

    const toggleNavbar = () => {
        (isNavbarOpen)
            ? openDateModal()
            : closeDateModal();
    }



    return {
        //* Propiedades
        isNavbarOpen,

        //* Métodos
        closeNavbar,
        openNavbar,
        toggleNavbar,
    }

}