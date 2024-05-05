import { useState,useEffect } from "react";
export default function Dropdown  ({ options, onChange, texto, clearValue,areaValue }) {
  const [selectedValue, setSelectedValue] = useState(areaValue);
 
  const handleChange = (event) => {
     setSelectedValue(event.target.value);
     onChange(event.target.value);
  };
 
  // Función para limpiar el valor seleccionado
  const clearSelectedValue = () => {
     setSelectedValue("");
     onChange(""); // Asegúrate de que el valor vacío también se maneje en el onChange del padre
  };
 
  // Llamar a clearValue si se pasa como prop
  useEffect(() => {
    setSelectedValue(areaValue);

     if (clearValue) {
       clearSelectedValue();
     }
  }, [clearValue,areaValue]);
 

  return (
     <select
       value={selectedValue}
       onChange={handleChange}
       required
       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 "
     >
       <option value="" disabled>
         {texto}
       </option>
       {options.map((option, index) => (
         <option key={index} value={option.value}>
           {option.label}
         </option>
       ))}
     </select>
  );
 };
 