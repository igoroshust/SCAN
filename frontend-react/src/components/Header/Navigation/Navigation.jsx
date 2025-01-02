import React, { memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navigation = memo(() => {

    const navigate = useNavigate();

    /* Переход на главную страницу при клике на якорную ссылку */
    const handleAnchorClick = (anchor) => {
        navigate('/', { state: { anchor } });
    };

    return (
        <ul className="nav__list nav__list-header">
            <li>
                <NavLink to="/" className={"anchor paragraph-14"}>
                    Главная
                </NavLink>
            </li>
            <li>
                <a className="anchor paragraph-14" onClick={() => handleAnchorClick('rate')}>Тарифы</a>
            </li>
            <li>
                <a className="anchor paragraph-14" onClick={() => handleAnchorClick('factoids')}>FAQ</a>
            </li>
        </ul>
    );
});

export default Navigation;