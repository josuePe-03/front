import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth";
import { useAuthStore } from "../hooks";
import {
  AdminPage,
  AdminEquiposPage,
  AdminOperadoresPage,
  AdminTecnicosPage,
  AdminAgenda,
  AdminIncidencias,
  AdminVisitasTecnicas
} from "../admin";
import {
  OperadorPage,
  OperadorAgenda,
  OperadorEquipo,
  OperadorIncidencia,
  OperadorEquipoIncidencia,
  OperadorVisitaIncidencia
} from "../operador";
import { TecnicoPage,TecnicoAgenda,TecnicoEquipos,TecnicoIncidencia,TecnicoVisitas, TecnicoEquipoIncidencia } from "../tecnico";

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
          <Route path="/" element={<AdminPage />} />
          <Route path="/operadores" element={<AdminOperadoresPage />} />
          <Route path="/tecnicos" element={<AdminTecnicosPage />} />
          <Route path="/equipos" element={<AdminEquiposPage />} />
          <Route path="/agenda" element={<AdminAgenda />} />
          <Route path="/incidencias" element={<AdminIncidencias />} />
          <Route path="/visitas" element={<AdminVisitasTecnicas />} />

          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : status === "authenticated" && user.rol == 2 ? (
        // Tecnico
        <>
          <Route path="/" element={<TecnicoPage />} />
          <Route path="/agenda" element={<TecnicoAgenda />} />
          <Route path="/incidencias" element={<TecnicoIncidencia />} />
          <Route path="/equipos" element={<TecnicoEquipos />} />
          <Route path="/visitas" element={<TecnicoVisitas />} />
          <Route path="/equipo-incidencia/:equipo"element={<TecnicoEquipoIncidencia />}/>
          <Route path="/visita-incidencia/:incidencia"element={<OperadorVisitaIncidencia />}/>

          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : status === "authenticated" && user.rol == 1 ? (
        // OPERADOR
        <>
          <Route path="/" element={<OperadorPage />} />
          <Route path="/equipos" element={<OperadorEquipo />} />
          <Route path="/incidencias" element={<OperadorIncidencia />} />
          <Route path="/agenda" element={<OperadorAgenda />} />
          <Route path="/equipo-incidencia/:equipo"element={<OperadorEquipoIncidencia />}/>
          <Route path="/visita-incidencia/:incidencia"element={<OperadorVisitaIncidencia />}/>

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
