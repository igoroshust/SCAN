import React from 'react';
import '../../../scripts/customscript.js';

const Burger = () => {

    return(
        <button type="button" className="nav__toggle none">
            <div className="menu-icon-wrapper">
                <div className="menu-icon"></div>
            </div>
        </button>
    );
};

export default Burger;