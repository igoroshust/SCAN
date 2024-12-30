import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import '../../../scripts/customscript.js';

const HeaderRegister = () => {

    const { setIsLoggedIn } = useAuth(); // аутентификация
    const navigate = useNavigate(); // маршрутизация
    const location = useLocation(); // локация (сведения о текущем URL)

    // Обработка логики навигации (перенаправление на страницу аутентификации)
    const handleLoginClick = useCallback(() => {
        const fromPath = location ? location.pathname : '/'; // Устанавливаем значение по умолчанию
        navigate('/auth', { state: { from: fromPath } });
    }, [navigate, location]);

    return(
        <ul className="nav__login nav__login-header">
            <li><a className="anchor-gray nav__login_btn nav__login_btn-registration" href="/auth">Зарегистрироваться</a></li>
            <li></li>
            <li><button className="btn nav__login_btn nav__login_btn-login" href="#!" id="loginButton" onClick={handleLoginClick}>Войти</button></li>
        </ul>
    );
};

export default HeaderRegister;