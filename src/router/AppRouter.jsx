import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { AdminPage,AdminEquiposPage,AdminOperadoresPage,AdminTecnicosPage } from '../admin';


export const AppRouter = () => {

    const { user,status, checkAuthToken } = useAuthStore();
    // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';



    useEffect(() => {
        checkAuthToken();
    }, [])
    


    if ( status === 'checking' ) {
        return (
            <h3>Cargando...</h3>
        )
    }

    
    return (
        <Routes>
            {
                ( status === 'not-authenticated')  
                    ? (
                        <>
                            <Route path="/auth/*" element={ <LoginPage /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                 : (status === 'authenticated' && user.rol == 3 )? (

                    // ADMIN
                        <>
                            <Route path="/calendario" element={ <CalendarPage /> } />
                            <Route path="/" element={ <AdminPage /> } />
                            <Route path="/operadores" element={ <AdminOperadoresPage /> } />
                            <Route path="/tecnicos" element={ <AdminTecnicosPage /> } />
                            <Route path="/equipos" element={ <AdminEquiposPage /> } />
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
                  : (
                    <>
                        <Route path="/auth/*" element={ <LoginPage /> } />
                        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                    </>
                  )  
            }

        </Routes>
    )
}
