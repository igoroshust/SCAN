import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

import Navigation from './Navigation/Navigation';
import HeaderInfo from './HeaderInfo/HeaderInfo';
import HeaderUser from './HeaderUser/HeaderUser';
import HeaderRegister from './HeaderRegister/HeaderRegister';
import Burger from './Burger/Burger';

import logoHeader from '../../assets/images/main/logo-header.png';

const Header = React.memo(({ isLoggedIn, userName, userLogo, setUserName, setUserLogo }) => {

    const { setIsLoggedIn } = useAuth(); // аутентификация

    // Проверяем срок истечения токена
    useEffect(() => {
    const checkTokenExpiration = () => {
      const tokenExpire = localStorage.getItem('tokenExpire'); // получаем время истечения токена из localStorage
      const now = new Date(); // получаем текущее время

     // Если токен истёк или отсутствует
      if (!tokenExpire || new Date(tokenExpire) <= now) {
        setIsLoggedIn(false); // Устанавливаем состояние "не залогинен"
        localStorage.removeItem('accessToken'); // Удаляем токен доступа из localStorage
        localStorage.removeItem('tokenExpire'); // Удаляем информацию о времени истечения токена
      }
    };

    // Проверяем каждые 60 секунд, истёк ли токен доступа
    const interval = setInterval(checkTokenExpiration, 1000 * 60);
    return () => clearInterval(interval);
  }, [setIsLoggedIn]);


    return (
        <header className="header">
            <div className="container">
                <div className="header__top">
                    <nav className="nav nav-header">
                        <div className="nav__logo nav__logo_logo-header">
                            <img src={logoHeader} alt="Логотип компании СКАН" />
                        </div>

                        {/* Главная, тарифы, FAQ */}
                        <Navigation />

                        {isLoggedIn ? (

                        <>

                        {/* Использовано компаний, лимит по категориям */}
                        <HeaderInfo
                            isLoggedIn={isLoggedIn}
                        />

                        {/* Учётная запись пользователя */}
                        <HeaderUser
                            isLoggedIn={isLoggedIn}
                            userName="Александр А."
                            userLogo={userLogo}
                            setUserName={setUserName}
                            setUserLogo={setUserLogo}
                         />

                        </>

                        ) : (

                        <>

                        {/* Секция "Зарегистирироваться | Войти" */}
                        <HeaderRegister />

                        </>

                        )}

                        {/* Бургер-меню */}
                        <Burger />

                         {/* Спиннер (Loader) */}
                        {/* <img src={Spinner} alt="СКАН loader spinner" /> */}
                    </nav>
                </div>
            </div>
        </header>
    )
});

export default Header;