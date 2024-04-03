import React, { useState, useRef, useEffect } from "react";
import { useUiStore } from "../../../hooks";

export default function TdOptions({ items, content ,ref:contentRef}) {
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const {isIncidenciaOptionsOpen,toogleIncidenciasOption} = useUiStore()

  const dropdownRef = useRef(null);

 
  const openOptions = (itemId) => {
     if (activeDropdownId === itemId) {
       setActiveDropdownId(null);
     } else {
       setActiveDropdownId(itemId);
     }

     toogleIncidenciasOption()

  };
 


useEffect(() => {
  const handleClickOutside = (event) => {
     // Verifica si el clic ocurrió fuera del menú desplegable y fuera del contenido
     if (dropdownRef.current && !dropdownRef.current.contains(event.target) && contentRef.current && !contentRef.current.contains(event.target)) {
       setActiveDropdownId(null);
       toogleIncidenciasOption();
     }
  };
 
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
     document.removeEventListener('mousedown', handleClickOutside);
  };
 }, [activeDropdownId, dropdownRef, contentRef]);


  return (
    <td className="px-4 py-3 flex items-center justify-end">
      <button
        id={`apple-iphone-14-dropdown-button-${items._id}`}
        data-dropdown-toggle={`apple-iphone-14-dropdown-${items._id}`}
        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
        type="button"
        onClick={() => openOptions(items._id)}
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewbox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </button>
      <div
        ref={dropdownRef}
        id={`apple-iphone-14-dropdown-${items._id}`}
        className={`fixed mt-32 z-50 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 ${
          activeDropdownId === items._id && isIncidenciaOptionsOpen ? "" : "hidden"
        }`}
      >
        {content}
      </div>
    </td>
  );
}
