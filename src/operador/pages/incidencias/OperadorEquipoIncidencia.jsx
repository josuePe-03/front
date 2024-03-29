import {
  Navbar,
  Titulo,
  TrIncidenciasEquipo,
  IncidenciasEquipo,
} from "../../components";
import { Link, useParams } from "react-router-dom";
import { IconArrowLeft, IconLogout2, IconMapPin2 } from "@tabler/icons-react";
import { useEffect } from "react";
import { useEquipoStore, useIncidenciaStore } from "../../../hooks";

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
            <div className=" w-full  lg:pr-[20rem] ">
              <div className="mt-10 lg:mt-0  p-4 lg:pt-5  ">
                {/* HEADER */}
                <div className="w-full">
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
                  <div className="pt-3 pb-1 lg:mb-2">
                    {/* TITULOS */}
                    <div className="w-full">
                      <h1 className="text-gray-500 font-bold text-4xl">
                        {equipo.modelo}
                      </h1>
                      <p className="text-3xl font-bold text-gray-400">
                        {equipo.marca}
                      </p>
                    </div>
                  </div>
                </div>

                {/* MAIN */}
                <main className="grid md:grid-cols-2 md:h-[72vh] gap-y-4 md:gap-y-4 md:gap-x-4 ">
                  <div className="w-full  bg-white p-6 rounded-xl ">
                    <div className="flex justify-between items-center">
                      <h1 className="text-lg text-gray-400 font-bold">
                        Incidencias por mes
                      </h1>
                    </div>

                    <div className="mt-5 h-[10rem] lg:h-[80%] flex justify-center">
                      {/* <GraficaTipoIncidencia id_equipo={id} /> */}
                    </div>
                  </div>
                  <div className="w-full  bg-white p-6 rounded-xl ">
                    <div className="flex justify-between items-center">
                      <h1 className="text-lg text-gray-400 font-bold">
                        Tipos de incidencia por mes
                      </h1>
                    </div>

                    <div className="mt-5 h-[10rem] lg:h-[80%] flex justify-center">
                      {/* <GraficaTipoVisita id_equipo={id} /> */}
                    </div>
                  </div>

                  <div className=" sm:w-full h-[15rem] md:h-[100%] bg-white p-6 rounded-xl md:col-span-2 relative w-[90vw] ">
                    <div className="flex justify-between items-center">
                      <h1 className="text-lg text-gray-400 font-bold">
                        Incidencias
                      </h1>

                      {/* <ButtonMensajeAdd
                      texto={"Agregar Incidencia"}
                      ruta={`/operador-problemas/${id}`}
                      add={true}
                    /> */}
                    </div>

                    <section className="mt-3 overflow-scroll   h-full">
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

            {/* Ubicacion */}
            <div className="w-[20rem] h-screen fixed right-0 bg-white hidden lg:flex justify-end flex-col shadow shadow-gray-300">
              <div className="rounded-xl flex justify-end mb-16">
                <img
                  src="../angeles-monterrey.JPG"
                  className="w-[17rem] rounded-s-lg"
                  alt=""
                />
              </div>
              <div className="h-[10rem] flex px-16">
                <div>
                  <div className="flex">
                    <IconMapPin2 className="-ml-10 mr-4" />
                    <p className="text-gray-500 text-sm mb-2">Ubicacion</p>
                  </div>
                  <p className="text-gray-500 text-bassic">
                    Av. Cto. Frida Kahlo 180, Valle Oriente, 66260 San Pedro
                    Garza García, N.L.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Deseas Cerrar Sesion?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, cierra sesion!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      logout();
                    }
                  });
                }}
                className="h-20 bg-gray-300 text-gray-400 w-full flex items-center justify-center space-x-2"
              >
                <div>Cerrar Sesion</div>
                <div>
                  <IconLogout2 />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
