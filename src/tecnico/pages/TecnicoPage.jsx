import { Navbar, Titulo } from "../components";
import { useAuthStore } from "../../hooks/useAuthStore";
import { IconLogout2, IconMapPin2 } from "@tabler/icons-react";
import Swal from "sweetalert2";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
  AreaChart,
  Area,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function TecnicoPage() {
  const { startLogout } = useAuthStore();

  return (
    <div className="w-full ">
      <Navbar />

      <div className="w-full sm:pl-[3rem]  lg:pr-[20rem] pt-[2rem] sm:pt-0">
        <div className="p-4 lg:pr-[20rem]">
          <div className="h-[10vh]">
            <Titulo texto={"Dashboard Tecnico"} />
          </div>
          <section className="h-[85vh] w-full relative z-20">
            <div className="lg:grid lg:grid-rows-2 lg:grid-cols-2 lg:h-full space-y-4 lg:space-y-none lg:gap-y-6 pb-8">
              <div className="col-span-1 h-[20rem] lg:h-full flex justify-center items-center px-6 pb-8 lg:m-4 bg-white shadow shadow-gray-300 rounded-xl">
                <ResponsiveContainer width="100%" height="80%" className="">
                  <h1 className="font-medium text-gray-400 text-xl mb-4">
                    Equipo con mas incidencias
                  </h1>
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="uv"
                      stroke="#82ca9d"
                      strokeDasharray="3 4 5 2"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="col-span-1 h-[20rem] lg:h-full flex justify-center items-center px-6 pb-8 lg:m-4 bg-white shadow shadow-gray-200 rounded-xl">
                <ResponsiveContainer width="100%" height="80%">
                  <h1 className="font-medium text-gray-400 text-xl mb-4">
                    Incidencias por mes
                  </h1>
                  <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="pv"
                      fill="#8884d8"
                      activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                    <Bar
                      dataKey="uv"
                      fill="#82ca9d"
                      activeBar={<Rectangle fill="gold" stroke="purple" />}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="col-span-2 h-[20rem] lg:h-full flex justify-center items-center  px-6 pb-8 lg:m-4 bg-white rounded-xl shadow shadow-gray-200">
                <ResponsiveContainer width="100%" height="80%">
                  <h1 className="font-medium text-gray-400 text-xl mb-4">
                    Control de Viáticos
                  </h1>
                  <AreaChart
                    width={500}
                    height={200}
                    data={data}
                    syncId="anyId"
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>

        {/* UBICACION */}
        <div className="w-[20rem] h-screen fixed top-0 right-0 bg-white hidden lg:flex justify-end flex-col shadow shadow-gray-300">
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
                Av. Cto. Frida Kahlo 180, Valle Oriente, 66260 San Pedro Garza
                García, N.L.
              </p>
            </div>
          </div>
          <button
            onClick={()=>{startLogout()}}
            className="h-20 bg-gray-300 text-gray-400 w-full flex items-center justify-center space-x-2"
          >
            <div>
              <p className="font-medium">Cerrar Sesion</p>
            </div>
            <div>
              <IconLogout2 />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
