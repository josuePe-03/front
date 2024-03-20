import { Navbar, Titulo } from "../components";
export default function AdminEquiposPage() {
  return (
    <div className="w-full h-screen  bg-gray-200">
      <Navbar />

      <div className="w-full sm:pl-[3rem] pt-[2rem] sm:pt-0 ">
        <div className="px-12 pt-4 ">
          <div className="h-[10vh]">
            <Titulo texto={"Administrador de Equipos"} />
          </div>

          <section className="bg-white rounded-xl p-3 shadow ">
            <div className="relative overflow-x-auto  rounded-xl">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-400   ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-xs border-b text-gray-900 font-medium">
                    <td className="px-6 py-4 ">Apple MacBook Pro 17"</td>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">$2999</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
