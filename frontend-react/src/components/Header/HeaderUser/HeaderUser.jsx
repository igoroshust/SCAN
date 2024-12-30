import React from 'react';
import '../../../scripts/customscript.js';
import userPhoto from '../../../assets/images/main/user-nav.png';

const HeaderUser = () => {

    return(
        <div className="header__user">
            <div className="header__user-info">
                <p className="header__user-info_paragraph-username paragraph-14">Алексей А.</p>
                <a className="anchor-gray paragraph-10" href="#!">Выйти</a>
            </div>
            <div className="user__logo">
                <a className="user__logo user__logo_image" href="#!"><img src={userPhoto} alt="user profile" /></a>
            </div>
        </div>
    );
};

export default HeaderUser;