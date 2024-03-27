import { Navbar, Titulo } from "../components";

export default function TecnicoVisitas() {
  return (
    <div className="w-full h-screen bg-gray-200 ">
      <Navbar />

      <div className="w-full sm:pl-[3rem]  lg:pr-[20rem] pt-[2rem] sm:pt-0">
        <div className="p-4 lg:pr-[20rem]">
          <div className="h-[10vh]">
            <Titulo texto={"Visitas"} />
          </div>
        </div>

      </div>
    </div>
  )
}
