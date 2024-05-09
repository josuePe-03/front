import {
  ButtonRegresar,
  Navbar,
  TrVisitaTecnica,
  VisitaTecnica,
} from "../../components";
import { IconArrowLeft, IconLogout2, IconMapPin2 } from "@tabler/icons-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useVisitaTecnicaStore } from "../../../hooks";
import { useEffect } from "react";

export default function OperadorVisitaIncidencia() {
  const { incidencia } = useParams();
  const navigate = useNavigate();

  const { visitasTecnicasIncidencia, startLoadingVisitasTecnicasIncidencia } =
    useVisitaTecnicaStore();

  useEffect(() => {
    startLoadingVisitasTecnicasIncidencia(incidencia);
    const interval = setInterval(() => {
      startLoadingVisitasTecnicasIncidencia(incidencia);
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [incidencia]);

  return (
    <div className="w-full  md:h-screen  sm:flex bg-gray-200 ">
      <Navbar mensaje={true} />

      <div className="w-full sm:pl-[3.9rem]">
        <div className="w-full font-semibold">
          <div className="w-full flex ">
            <div className=" w-full  ">
              <div className="mt-10 lg:mt-0  p-4 lg:pt-5  ">
                {/* HEADER */}
                <div className="w-full">
                  {/* LINK REGRESAR */}

                  <ButtonRegresar
                    children={
                      <>
                        <IconArrowLeft
                          size={20}
                          color="#0054aa"
                          className="mr-1"
                        />
                        <p>Ver Equipo</p>
                      </>
                    }
                  />
                </div>

                <div className="mt-10 sm:w-full h-[15rem] md:h-[100%] bg-white p-6 rounded-xl md:col-span-2 relative w-[90vw] ">
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg text-gray-400 font-bold">
                      Visitas Tecnicas
                    </h1>
                  </div>

                  <section className="mt-3 overflow-scroll   h-full">
                    <div className=" flex justify-center">
                      <div className=" w-full  rounded-xl">
                        <table className="w-full text-sm ">
                          <thead className="text-xs text-gray-400 bg-gray-50 ">
                            <TrVisitaTecnica />
                          </thead>
                          <tbody className="text-xs text-gray-800">
                            {visitasTecnicasIncidencia === "Sin visitas" ? (
                              <td
                                className="px-3 py-4 ext text-center text-xl font-medium"
                                colSpan={9}
                              >
                                {visitasTecnicasIncidencia}
                              </td>
                            ) : (
                              visitasTecnicasIncidencia.map((items, i) => (
                                <VisitaTecnica key={i} items={items} />
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
