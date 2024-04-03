import { IconLogout } from "@tabler/icons-react";
import Swal from "sweetalert2";
import { useAuthStore } from "../../../hooks";

export default function ButtonLogoutNavbar() {
  const { startLogout } = useAuthStore();

  return (
    <button
      onClick={() => {
        startLogout();
      }}
      className="flex items-center p-2 bg-gray-200 rounded-lg  group"
    >
      <IconLogout className="text-gray-600" size={20} />
    </button>
  );
}

