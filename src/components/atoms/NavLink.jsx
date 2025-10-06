// src/components/atoms/NavLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ to, children }) => {
  return (
    <li>
      <Link to={to} className="hover:text-orange-standard">
        {children}
      </Link>
    </li>
  );
};

export default NavLink;