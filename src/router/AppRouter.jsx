import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import {
  AdminPage,
  AdminEquiposPage,
  AdminOperadoresPage,
  AdminTecnicosPage,
} from "../admin";
import {
  OperadorPage,
  OperadorAgenda,
  OperadorEquipo,
  OperadorIncidencia,
  OperadorEquipoIncidencia,
} from "../operador";
import { TecnicoPage } from "../tecnico";

export const AppRouter = () => {
  const { user, status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : status === "authenticated" && user.rol == 3 ? (
        // ADMIN
        <>
          <Route path="/calendario" element={<CalendarPage />} />
          <Route path="/" element={<AdminPage />} />
          <Route path="/operadores" element={<AdminOperadoresPage />} />
          <Route path="/tecnicos" element={<AdminTecnicosPage />} />
          <Route path="/equipos" element={<AdminEquiposPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : status === "authenticated" && user.rol == 2 ? (
        // Tecnico
        <>
          <Route path="/calendario" element={<CalendarPage />} />
          <Route path="/" element={<TecnicoPage />} />
          <Route path="/operadores" element={<TecnicoPage />} />
          <Route path="/tecnicos" element={<TecnicoPage />} />
          <Route path="/equipos" element={<TecnicoPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : status === "authenticated" && user.rol == 1 ? (
        // OPERADOR
        <>
          <Route path="/" element={<OperadorPage />} />
          <Route path="/equipos" element={<OperadorEquipo />} />
          <Route path="/incidencias" element={<OperadorIncidencia />} />
          <Route path="/agenda" element={<OperadorAgenda />} />
          <Route
            path="/equipo-incidencia/:equipo"
            element={<OperadorEquipoIncidencia />}
          />

          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
};
