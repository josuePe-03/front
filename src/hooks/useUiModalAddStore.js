import { useDispatch, useSelector } from 'react-redux';
import { onCloseModalAdd, onOpenModalAdd } from '../store';


export const useUiModalAddStore = () => {

    const dispatch = useDispatch();

    const { 
        isModalAddOpen
    } = useSelector( state => state.modalAdd );

    const openModalAddUser = () => {
        dispatch( onOpenModalAdd() )
    }

    const closeModalAddUser = () => {
        dispatch( onCloseModalAdd() )
    }

    const toggleDateModal = () => {
        (isModalAddOpen)
            ? openModalAddUser()
            : closeModalAddUser();
    }



    return {
        //* Propiedades
        isModalAddOpen,

        //* Métodos
        closeModalAddUser,
        openModalAddUser,
        toggleDateModal,
    }

}