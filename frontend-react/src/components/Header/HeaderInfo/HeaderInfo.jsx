import React from 'react';
import '../../../scripts/customscript.js';

const HeaderInfo = () => {

    return(
        <div className="header__info">
            <p className="paragraph-10">Использовано компаний: <span className="header-info__span header-info__span_first-value paragraph-14-700">34</span></p>
            <p className="paragraph-10">Лимит по компаниям: <span className="header-info__span header-info__span_second-value paragraph-14-700">100</span></p>
        </div>
    );
};

export default HeaderInfo;