
// HamburgerIcon.tsx

import React from 'react';

type HamburgerIconProps = {
    onClick: () => void;
};

export const HamburgerIcon: React.FC<HamburgerIconProps> = ({ onClick }) => {
    return (
        <div className="hamburger-icon" onClick={onClick}>
            ☰
        </div>
    );
};
