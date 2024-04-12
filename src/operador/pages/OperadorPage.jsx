import { Navbar, ProximaVisita, Titulo } from "../components";
import { useAuthStore, useVisitaTecnicaStore } from "../../hooks";
import { IconLogout2, IconMapPin2, IconArrowRight } from "@tabler/icons-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function OperadorPage() {
  const { startLogout, user } = useAuthStore();

  const { visitaProxima, startLoadingVisitasTecnicasProxima } =
    useVisitaTecnicaStore();

  useEffect(() => {
    startLoadingVisitasTecnicasProxima(user.uid);
    // Función que se ejecutará cada 5 segundos
    const interval = setInterval(() => {
      startLoadingVisitasTecnicasProxima(user.uid);
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full  md:h-screen sm:flex bg-gray-200 ">
      <Navbar mensaje={true} />

      <div className="w-full sm:pl-[3.9rem] lg:pr-[20rem]">
        <div className="w-full font-semibold">
          <div className="w-full flex ">
            <div className=" w-full  ">
              <div className="mt-8 sm:mt-0 p-6 lg:pt-5 w-full">
                <div className="w-full">
                  <div className="pt-3 pb-1 grid lg:grid-cols-2 lg:mb-2">
                    <div className="lg:flex items-center lg:items-start xl:flex-col xl:w-6/12">
                      <div className="lg:mr-2 xl:mr-0  xl:mb-2 ">
                        <Titulo texto={"Dashboard"}/>
                      </div>
                    </div>
                  </div>

                  {/* Incidencias proximas */}
                  <div className="">
                    <h1 className="text-xl text-gray-400 font-bold mb-2">
                      Visitas Tecnicas Proximas
                    </h1>
                    <div className="p-4  bg-white shadow-xl shadow-gray-300 rounded-3xl">
                      <div>
                          {visitaProxima != "Sin Visitas"
                          ? visitaProxima.map((items, i) => (
                              <ProximaVisita key={i} items={items} />
                            ))
                          : "Sin visitas proximas"}  
                      </div>
                    </div>
                  </div>

                  {/* Equipos */}
                  <div className="mt-4">
                    <div className="flex justify-between  my-10">
                      <h1 className="text-xl text-gray-400 font-bold">
                        Equipos Medicos
                      </h1>
                      <Link to="/equipos" className="text-gray-600  flex">
                        Ver Equipos <IconArrowRight className="ml-1" />
                      </Link>
                    </div>
                    <div className="grid lg:grid-cols-4 gap-4">
                      <div className="p-5 flex flex-col h-[14rem] justify-between items-center  bg-white rounded-xl">
                        <div>imagen</div>
                        <div>
                          <p>Mastografos</p>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col h-[14rem] justify-between items-center  bg-white rounded-xl">
                        <div>imagen</div>
                        <div>
                          <p>Tomografo</p>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col h-[14rem] justify-between items-center  bg-white rounded-xl">
                        <div>imagen</div>
                        <div>
                          <p>Ultrasonido</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MENSAJES */}
            <div className="w-[20rem] h-screen fixed right-0 bg-white hidden lg:flex justify-end flex-col shadow shadow-gray-300">
              <div className="rounded-xl flex justify-end mb-16">
                <img
                  src="./angeles-monterrey.JPG"
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
                  startLogout();
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
