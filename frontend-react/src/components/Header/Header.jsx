import React from 'react';
import logoHeader from '../../assets/images/main/logo-header.png';
import userPhoto from '../../assets/images/main/user-nav.png';
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
                        <ul className="nav__list nav__list-header"> {/* доп.класс добавлен, т.к. в футере список пропадает */}
                            <li><a className="anchor paragraph-14" href="#!">Главная</a></li>
                            <li><a className="anchor paragraph-14" href="#!">Тарифы</a></li>
                            <li><a className="anchor paragraph-14" href="#!">FAQ</a></li>
                        </ul>

                        {/* Использовано компаний, лимит по категориям */}
                        <div className="header__info">
                            <p className="paragraph-10">Использовано компаний: <span className="header-info__span header-info__span_first-value paragraph-14-700">34</span></p>
                            <p className="paragraph-10">Лимит по компаниям: <span className="header-info__span header-info__span_second-value paragraph-14-700">100</span></p>
                        </div>

                        {/* Учётная запись пользователя */}
                        <div className="header__user">
                            <div className="header__user-info">
                                <p className="header__user-info_paragraph-username paragraph-14">Алексей А.</p>
                                <a className="anchor-gray paragraph-10" href="#!">Выйти</a>
                            </div>
                            <div className="user__logo">
                                <a className="user__logo user__logo_image" href="#!"><img src={userPhoto} alt="user profile" /></a>
                            </div>
                        </div>

                        {/* Секция "Зарегистирироваться | Войти" */}
                        <ul className="nav__login nav__login-header none">
                            <li><a  className="anchor-gray nav__login_btn nav__login_btn-registration" href="#!">Зарегистрироваться</a></li>
                            <li></li> {/* Пустой item для отображения вертикальной черты между пунктами списка */}
                            <li><a className="btn nav__login_btn nav__login_btn-login" href="#!">Войти</a></li>
                        </ul>

                        {/* Бургер-меню */}
                        <button type="button" className="nav__toggle none">
                            <div className="menu-icon-wrapper">
                                <div className="menu-icon"></div>
                            </div>
                        </button>

                         {/* Спиннер (Loader) */}
                        {/* <img src={Spinner} alt="СКАН loader spinner" /> */}
                    </nav>
                </div>
            </div>
        </header>
    )
};

export default Header;