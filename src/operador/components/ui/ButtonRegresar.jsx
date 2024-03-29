import React from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonRegresar({children}) {
  const navigate = useNavigate();

  return (
    <button
      className="w-[10rem] relative z-30 rounded-3xl  p-1.5 flex items-center"
      onClick={() => navigate(-1)}
    >
      {children}
    </button>
  );
}
