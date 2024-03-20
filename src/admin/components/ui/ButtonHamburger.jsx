import { IconMenu2 } from "@tabler/icons-react";
import { useUiNavbarStore } from "../../../hooks/useUiNavbarStore";

export default function ButtonHamburger({ onToggle }) {
  const { isNavbarOpen, openNavbar, closeNavbar } = useUiNavbarStore();


  return (
    <button
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      aria-controls="default-sidebar"
      type="button"
      className="inline-flex items-center text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 "
      onClick={() => {
        isNavbarOpen ? closeNavbar() : openNavbar()
      }}
    >
      <span className="sr-only">Open sidebar</span>
      <IconMenu2 size={30} />
    </button>
  );
}
