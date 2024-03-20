import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children,onToggle }) => (
  <Link
    to={to}
    onClick={onToggle}
    className="flex items-center p-2 bg-gray-200 rounded-lg group"
  >
    {children}
  </Link>
);
