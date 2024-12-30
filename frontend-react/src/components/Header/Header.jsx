import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatName } from '../../utils/Main/formatName';
import Navigation from './Navigation/Navigation';
import HeaderInfo from './HeaderInfo/HeaderInfo';
import HeaderUser from './HeaderUser/HeaderUser';
import HeaderRegister from './HeaderRegister/HeaderRegister';
import Burger from './Burger/Burger';
import userPhotoDefault from '../../assets/images/main/user-nav.png';
import logoHeader from '../../assets/images/main/logo-header.png';

const Header = React.memo(({ isLoggedIn, userName, userLogo, setUserName, setUserLogo }) => {

    const [isLoadingActions, setIsLoadingActions] = useState(true);
    const { setIsLoggedIn } = useAuth(); // аутентификация

    // Загрузка обработанных данных о пользователе
    useEffect(() => {
        setIsLoadingActions(true);
        setTimeout(() => {
            const userData = {
                name: 'Игорь Ошуsadasdст',
                picture: userPhotoDefault
            };
            setUserName(formatName(userData.name));
            setUserLogo(userData.picture);
            setIsLoadingActions(false);
        }, 2000);
    }, [setUserName, setUserLogo]);

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
                            userName={userName}
                            userLogo={userLogo}
                            setUserName={setUserName}
                            setUserLogo={setUserLogo}
                            isLoading={isLoadingActions}
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

                    </nav>
                </div>
            </div>
        </header>
    )
});

export default Header;