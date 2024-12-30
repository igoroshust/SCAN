import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import '../../../scripts/customscript.js';

const Navigation = memo(() => {

    return(
        <ul className="nav__list nav__list-header">
            <li>
               <NavLink to="/" className={"anchor paragraph-14"}>
                    Главная
                </NavLink>
            </li>

            <li><a className="anchor paragraph-14" href="#!">Тарифы</a></li>
            <li><a className="anchor paragraph-14" href="#!">FAQ</a></li>
        </ul>
    );
});

export default Navigation;