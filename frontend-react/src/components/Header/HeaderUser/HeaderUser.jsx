import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import '../../../scripts/customscript.js';
import Spinner from '../../UI/Spinner';

const HeaderUser = ({ isLoggedIn, userName, userLogo, setUserName, setUserLogo, isLoading }) => {

    const { setIsLoggedIn } = useAuth(); // аутентификация

    // Выход из системы
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken'); // удаляем токен из localStorage
        localStorage.removeItem('tokenExpire'); // удаляем информацию о времени истечения токена
    };

    return(
        <div className="header__user">
            <div className="header__user-info">
                <p className="header__user-info_paragraph-username paragraph-14">{ userName }</p>
                <a className="anchor-gray paragraph-10" href="#!" onClick={handleLogout}>Выйти</a>
            </div>
            <div className="user__logo">
                {isLoading ? (
                    <Spinner />
                ) : (
                    <a className="user__logo user__logo_image" href="#!"><img src={userLogo} alt="СКАН профиль пользователя" /></a>
                )}
            </div>
        </div>
    );
};

export default HeaderUser;