import {
  Navbar,
  TrIncidenciasEquipo,
  IncidenciasEquipo,
  PDF,
  Titulo,
} from "../../components";

import { Link, useParams } from "react-router-dom";
import { IconArrowLeft, IconLogout2, IconMapPin2 } from "@tabler/icons-react";
import { useEffect } from "react";
import { useEquipoStore, useIncidenciaStore } from "../../../hooks";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

export default function OperadorIncidencia() {
  const { equipo: id_equipo } = useParams();

  const { incidencia, startLoadingIncidencia } = useIncidenciaStore();
  const { equipo, startLoadingEquipo } = useEquipoStore();

  useEffect(() => {
    startLoadingIncidencia(id_equipo);
    startLoadingEquipo(id_equipo);
    const interval = setInterval(() => {
      startLoadingIncidencia(id_equipo);
      startLoadingEquipo(id_equipo);
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-fit lg:h-screen sm:flex bg-gray-200 ">
      <Navbar mensaje={true} />

      <div className="w-full sm:pl-[3.9rem]">
        <div className="w-full font-semibold">
          <div className="w-full flex ">
            <div className=" w-full  ">
              <div className="mt-10 lg:mt-0  p-4 lg:pt-5  ">
                {/* HEADER */}
                <div className="w-full flex  mb-10">
                  {/* LINK REGRESAR */}

                  <Link
                    to={`/equipos`}
                    className="w-[10rem] relative z-30 rounded-3xl  p-1.5 flex items-center"
                  >
                    <div className="ml-2 font-bold text-gray-600 flex items-center">
                      <IconArrowLeft
                        size={20}
                        color="#0054aa"
                        className="mr-1"
                      />
                      <p>Ver Equipos</p>
                    </div>
                  </Link>

                  <div className="w-full flex  gap-2 justify-center -ml-[10rem]">
                    {/* TITULOS */}
                    <Titulo texto={equipo.modelo} />

                    <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-90 md:text-5xl lg:text-4xl mt-2">
                      <span className="text-transparent bg-clip-text bg-gradient-to-l to-[#004b93] from-sky-400 ">
                        {equipo.marca}
                      </span>
                    </h1>
                  </div>
                </div>

                {/* MAIN */}
                <main className="grid md:grid-cols-2 md:h-[72vh] gap-y-4 md:gap-y-4 md:gap-x-4">
                  {/* <div className="w-full  bg-white p-6 rounded-xl ">
                    <div className="flex justify-between items-center">
                      <h1 className="text-lg text-gray-400 font-bold">
                        Incidencias por mes
                      </h1>
                    </div>

                    <div className="mt-5 h-[10rem] lg:h-[80%] flex justify-center">
                    </div>
                  </div>
                  <div className="w-full  bg-white p-6 rounded-xl ">
                    <div className="flex justify-between items-center">
                      <h1 className="text-lg text-gray-400 font-bold">
                        Tipos de incidencia por mes
                      </h1>
                    </div>

                    <div className="mt-5 h-[10rem] lg:h-[80%] flex justify-center">
                    </div>
                  </div> */}

                  <div className=" sm:w-full h-[28rem]  bg-white p-6 rounded-xl md:col-span-2 relative  ">
                    <div className="flex justify-between items-center">
                      <h1 className="text-lg text-gray-400 font-bold">
                        Incidencias
                      </h1>
                      <PDFDownloadLink
                        document={<PDF incidencia={incidencia} />}
                        fileName="reporte.pdf"
                      >
                        {({ loading, url, error, blob }) =>
                          loading ? (
                            <button>Loading Document ...</button>
                          ) : (
                            <button
                              type="button"
                              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                              Generar Reporte
                            </button>
                          )
                        }
                      </PDFDownloadLink>
                    </div>

                    <section className="mt-3 overflow-y-scroll   ">
                      <div className=" flex justify-center">
                        <div className=" w-full  rounded-xl">
                          <table className="w-full text-sm ">
                            <thead className="text-xs text-gray-400 bg-gray-50 ">
                              <TrIncidenciasEquipo />
                            </thead>
                            <tbody className="text-xs text-gray-800">
                              {incidencia.map((incidencia, i) => (
                                <IncidenciasEquipo
                                  key={i}
                                  incidencias={incidencia}
                                />
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </section>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
