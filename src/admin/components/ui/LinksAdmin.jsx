import {  IconUsers,IconDeviceImac,IconTools,IconCalendarEvent, IconSettings} from "@tabler/icons-react";
import { ButtonLink } from "./ButtonLink";
import { useUiNavbarStore } from "../../../hooks";

export default function LinksAdmin() {

  const { closeNavbar } = useUiNavbarStore();

  return (
    <>
      <li className="">
        <ButtonLink onToggle={closeNavbar} to="/">
          <svg
            className="w-[20px] h-[20px]  transition duration-75 text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 21"
          >
            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
          </svg>
        </ButtonLink>
      </li>
      <li className="">
        <ButtonLink onToggle={closeNavbar} to="/equipos">
          <IconDeviceImac className="text-gray-600" size={20}/>
        </ButtonLink>
      </li>
      <li>
        <ButtonLink onToggle={closeNavbar} to="/operadores">
          <IconUsers className="text-gray-600" size={20} />
        </ButtonLink>
      </li>
      <li>
        <ButtonLink onToggle={closeNavbar} to="/tecnicos">
          <IconTools   className="text-gray-600"size={20} />
        </ButtonLink>
      </li>
      <li>
        <ButtonLink  onToggle={closeNavbar} to="/admin-agenda">
          <IconCalendarEvent   className="text-gray-600"size={20} />
        </ButtonLink>
      </li>
      <li>
        <ButtonLink  onToggle={closeNavbar} to="/admin-incidencias">
          <IconSettings   className="text-gray-600"size={20} />
        </ButtonLink>
      </li>
    </>
  )
}
