import React from 'react';

const NavLink = ({ href, children }) => {
  return (
    <li>
      <a href={href} className="hover:text-orange-standard">
        {children}
      </a>
    </li>
  );
};

export default NavLink;