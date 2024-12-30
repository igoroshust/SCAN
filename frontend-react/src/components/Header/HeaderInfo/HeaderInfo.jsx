import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import '../../../scripts/customscript.js';
import Spinner from '../../../assets/images/UI/spinner.svg';

const HeaderInfo = ({ isLoggedIn }) => {

    const { setIsLoggedIn } = useAuth();

    const [usedCompanyCount, setUsedCompanyCount] = useState(0); // Использовано компаний
    const [companyLimit, setCompanyLimit] = useState(0); // Лимит по компаниям
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {

        // Получаем информацию о компаниях
        const fetchCompanyInfo = async () => {
            setIsLoading(true); // устанавливаем состояние загрузки
            const url = 'https://gateway.scan-interfax.ru/api/v1/account/info';
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // добавляем токен авторизации из localStorage
                    },
                });

                // Проверяем, успешен ли ответ
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
                }

                // Парсим ответ как JSON
                const data = await response.json();

                // Обновляем состояние с полученными данными
                if (data.eventFiltersInfo) {
                    setUsedCompanyCount(data.eventFiltersInfo.usedCompanyCount); // Количество использованых компаний
                    setCompanyLimit(data.eventFiltersInfo.companyLimit); // Лимит компаний
                } else {
                    console.log("Неверная структура данных: ", data);
                }

            } catch (error) {
                console.error("Ошибка при получении информации о компаниях:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Вызываем функцию для получения информации о компаниях
        fetchCompanyInfo();

         const intervalId = setInterval(fetchCompanyInfo, 60000); // Интервал для повторного запроса каждые 60 секунд
         return () => clearInterval(intervalId); // Очищаем интервал при размонтировании документа
    }, []); // Эффект выполнится только один раз при монтировании компонента

    return(
        <div className="header__info">
            {isLoading ? (
                <img src={Spinner} alt="СКАН loader spinner" />
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