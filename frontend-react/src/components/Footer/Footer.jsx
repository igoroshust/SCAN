import React from 'react';
import logoFooter from '../../img/main/logo-footer.png';

const Footer = () => {
    return(
        <footer className="footer">
            <div className="container">
                <div className="nav nav-footer">

                    <div className="nav__logo nav__logo_logo-footer">
                            <img src={logoFooter} alt="Логотип компании СКАН" title="Логотип компании СКАН"/>
                    </div>

                    <ul className="nav__footer paragraph-14">
                        <li>г.Москва, Цветной б-р, 40</li>
                        <li><a href="tel:+74957712111">+7 495 771 21 11</a></li>
                        <li><a href="mailto:info@skan.ru">info@skan.ru</a></li>
                        <li>Copyright, 2025</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;