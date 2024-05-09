import { useAuthStore } from "../../hooks";
import { IconMapPin2,IconLogout2 } from "@tabler/icons-react";

export default function BarraDatos() {

    const {startLogout} = useAuthStore()
    
  return (
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
  )
}
