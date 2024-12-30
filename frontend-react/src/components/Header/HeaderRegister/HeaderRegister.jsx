import React from 'react';
import '../../../scripts/customscript.js';

const HeaderRegister = () => {

    return(
        <ul class="nav__login nav__login-header none">
            <li><a  class="anchor-gray nav__login_btn nav__login_btn-registration" href="#!">Зарегистрироваться</a></li>
            <li></li>
            <li><a class="btn nav__login_btn nav__login_btn-login" href="#!">Войти</a></li>
        </ul>
    );
};

export default HeaderRegister;