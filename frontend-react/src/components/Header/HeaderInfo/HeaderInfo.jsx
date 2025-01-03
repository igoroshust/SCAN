import React, { useState, useEffect } from 'react';
import { fetchCompanyInfo } from '../../../API/fetchCompanyInfo';
import '../../../scripts/customscript.js';
import Spinner from '../../UI/Spinner';

const HeaderInfo = ({ isLoggedIn }) => {

    const [usedCompanyCount, setUsedCompanyCount] = useState(0); // Использовано компаний
    const [companyLimit, setCompanyLimit] = useState(0); // Лимит по компаниям
    const [isLoading, setIsLoading] = useState(false);

    /* Вызываем функцию для получения информации о компаниях */
   useEffect(() => {

        // Вызываем функцию для получения информации о компаниях
        fetchCompanyInfo(setIsLoading, setUsedCompanyCount, setCompanyLimit);

        const intervalId = setInterval(() => {
            fetchCompanyInfo(setIsLoading, setUsedCompanyCount, setCompanyLimit);
        }, 60000); // Интервал для повторного запроса каждые 60 секунд
        return () => clearInterval(intervalId); // Очищаем интервал при размонтировании документа
    }, []); // Эффект выполнится только один раз при монтировании компонента

    return(
        <div className="header__info">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <p className="paragraph-10">Использовано компаний: <span className="header-info__span header-info__span_first-value paragraph-14-700">{usedCompanyCount}</span></p>
                    <p className="paragraph-10">Лимит по компаниям: <span className="header-info__span header-info__span_second-value paragraph-14-700">{companyLimit}</span></p>
                </>
            )}
        </div>
    );
};

export default HeaderInfo;