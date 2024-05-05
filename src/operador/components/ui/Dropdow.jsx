import { useEffect, useState } from "react";

const Dropdown = ({ options,onChange,texto,areaValue}) => {
  const [selectedValue, setSelectedValue] = useState(areaValue);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  useEffect(() => {
    setSelectedValue(areaValue);
 }, [areaValue]);

  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      required
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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

export default Dropdown;
