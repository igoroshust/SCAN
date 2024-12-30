import React from 'react';
import '../../../scripts/customscript.js';

const Navigation = () => {

    return(
        <ul className="nav__list nav__list-header">
            <li><a className="anchor paragraph-14" href="#!">Главная</a></li>
            <li><a className="anchor paragraph-14" href="#!">Тарифы</a></li>
            <li><a className="anchor paragraph-14" href="#!">FAQ</a></li>
        </ul>
    );
};

export default Navigation;