// SlideOutMenu.tsx

import React from 'react';

type SlideOutMenuProps = {
  isOpen: boolean;
};

export const SlideOutMenu: React.FC<SlideOutMenuProps> = ({ isOpen }) => {
  const menuClass = isOpen ? "menu open" : "menu";

  return (
    <div className={menuClass}>
      <ul>
        <br></br>
        <li>Supervisors</li>
        <li>Districts</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};
