import { Sidebar } from "../components";

export default function SuperAdminPage() {
  return (
    <div className="bg-[#f3faf3] h-screen pl-0 sm:pl-[14rem]">
      <Sidebar />
      <header className="p-4 ">
        <h1 className="text-4xl text-[#16351b] font-bold">SuperAdmin</h1>
      </header>

    </div>
  );
}
