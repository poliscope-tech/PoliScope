// HamburgerIcon.tsx

import React from 'react';

// Include the isOpen prop in the type
type HamburgerIconProps = {
    onClick: () => void;
    isOpen: boolean;  // Add this line
};

export const HamburgerIcon: React.FC<HamburgerIconProps> = ({ onClick, isOpen }) => {
    // Apply classes conditionally based on isOpen
    const iconClass = isOpen ? 'hamburger-icon open' : 'hamburger-icon';

    return (
        <div className={iconClass} onClick={onClick}>
            ☰
        </div>
    );
};
