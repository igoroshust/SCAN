import React from 'react';

import Navigation from './Navigation/Navigation';
import HeaderInfo from './HeaderInfo/HeaderInfo';
import HeaderUser from './HeaderUser/HeaderUser';
import HeaderRegister from './HeaderRegister/HeaderRegister';
import Burger from './Burger/Burger';

import logoHeader from '../../assets/images/main/logo-header.png';
import Spinner from '../../assets/images/UI/spinner.svg';

const Header = () => {
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

                        {/* Использовано компаний, лимит по категориям */}
                        <HeaderInfo />

                        {/* Учётная запись пользователя */}
                        <HeaderUser />

                        {/* Секция "Зарегистирироваться | Войти" */}
                        <HeaderRegister />

                        {/* Бургер-меню */}
                        <Burger />

                         {/* Спиннер (Loader) */}
                        {/* <img src={Spinner} alt="СКАН loader spinner" /> */}
                    </nav>
                </div>
            </div>
        </header>
    )
};

export default Header;