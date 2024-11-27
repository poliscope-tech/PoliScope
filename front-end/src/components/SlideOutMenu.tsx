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
        <li>
          {/* "About Us" links to an external website */}
          <a
            href="https://willfrancisco.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Us
          </a>
        </li>
        <li>
          {/* "Contact" opens the user's default email client */}
          <a
            href="mailto:wmisiasz@gmail.com?subject=Inquiry%20to%20PoliScope"
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};