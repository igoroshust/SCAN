import React from 'react';
import '../../../scripts/customscript.js';

const HeaderRegister = () => {

    return(
        <ul className="nav__login nav__login-header">
            <li>
                <a className="anchor-gray nav__login_btn nav__login_btn-registration" href="/auth">
                    Зарегистрироваться
                </a>
            </li>
            <li></li>
            <li>
                <a className="btn nav__login_btn nav__login_btn-login" href="/auth" id="loginButton">
                    Войти
                </a>
            </li>
        </ul>
    );
};

export default HeaderRegister;