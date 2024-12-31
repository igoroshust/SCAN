import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchResults } from '../../API/fetchResults';

import SummaryTable from './SummaryTable/SummaryTable';
import DocumentCardList from './DocumentCardList/DocumentCardList';
import womenResult from '../../assets/images/result/women-result.png';

const Result = () => {

    const location = useLocation(); // текущее местоположение в приложении
    const { isLoggedIn } = useAuth(); // аутентификация
    const navigate = useNavigate(); // маршрутизация

    const [isLoading, setIsLoading] = useState(true);
    const [searchData, setSearchData] = useState(null);
    const [documentsData, setDocumentsData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
          navigate('/auth');
        }
    }, [isLoggedIn, navigate]);

    // useCallback - мемоизируем функцию, чтобы она не пересоздавалась при каждом рендере компонента
    const fetchResult = useCallback(async () => {
        const searchParams = location.state?.searchParams; // получение параметров поиска
        // Проверка наличия параметров поиска
        if (!searchParams) {
          console.error('Параметры поиска отсутствуют.');
          setIsLoading(false); // устанавливаем состояние
          return;
    }
        setIsLoading(true);
        setIsError(false);

        // Вызов функции API для получения данных
        await fetchResults(searchParams, setSearchData, setDocumentsData, setIsError, setIsLoading, setIsAllDataLoaded);
    }, [location.state]);

  // Автоматическая загрузка данных при монтировании компонента или изменении параметров поиска
  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

return (
    <div class="results">
    <div className="container">
        {isLoading && (
            <section className="result">
                <div className="result__row">
                    <div className="result__content">
                        <h2 className="result__title paragraph-40">ИЩЕМ. СКОРО БУДУТ РЕЗУЛЬТАТЫ</h2>
                        <div className="result__text">
                            <p className="result__paragraph paragraph-20">
                                Поиск может занять некоторое время, <br />
                                просим сохранять терпение.
                            </p>
                        </div>
                    </div>
                    <div className="result__img">
                        <img src={womenResult} alt="СКАН Результаты поиска" />
                    </div>
                </div>
            </section>
        )}

        <SummaryTable searchData={searchData} isLoading={isLoading} isError={isError} />

        {isError ? (
            <p className="error-message">Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.</p>
        ) : (
            <>
                {!isLoading && isAllDataLoaded && (
                    <>
                        <DocumentCardList documentsData={documentsData} />
                    </>
                )}
            </>
        )}
    </div>
</div>
);

};

export default Result;