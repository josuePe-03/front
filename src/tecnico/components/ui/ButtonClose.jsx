import React from 'react'
import { useUiNavbarStore } from '../../../hooks';

export default function ButtonClose() {

  const { isNavbarOpen,openNavbar, closeNavbar } = useUiNavbarStore();
  
  return (
    <button
    className="flex sm:hidden items-center p-2 bg-gray-200 rounded-lg group"
    onClick={()=>{closeNavbar()}}
    >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-[20px] h-[20px] text-gray-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25"
      />
    </svg>
  </button>
  )
}
