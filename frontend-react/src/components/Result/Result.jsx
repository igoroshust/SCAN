import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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

    // Выполняем запросы к API
    try {

      // Получаем гистрограммы
      const histogramResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // извлекаем токен доступа из localStorage
        },
        body: JSON.stringify(searchParams), // сериализуем searchParams в JSON и передаём в теле запроса
        credentials: 'omit',
      });

      // Проверяем ответ на успешность
      if (!histogramResponse.ok) {
        throw new Error(`Ошибка HTTP! Статус: ${histogramResponse.status}`);
      }

      // Получение данных гистограммы
      const histogramData = await histogramResponse.json(); // ответ преобразуется в JSON

      // Получение идентификаторов публикаций
      const publicationIdsResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(searchParams),
        credentials: 'omit',
      });

      // Проверка ответа на успешность
      if (!publicationIdsResponse.ok) {
        throw new Error(`Ошибка HTTP! Статус: ${publicationIdsResponse.status}`);
      }

      // Извлечение идентификаторов публикаций
      const publicationIdsData = await publicationIdsResponse.json(); // преобразуем ответ в JSON
      const publicationIds = publicationIdsData.items.map(item => item.encodedId); // сохраняем идентификаторы публикаций
      console.log("Количество публикаций:", publicationIds.length);

      // Проверка наличия идентификаторов публикаций
      if (publicationIds.length === 0) {
        console.error('Публикации с указанными ID не найдены.');
        setIsError(true);
        setIsLoading(false);
        return;
      }

      // Получение списка документов
      const documentsResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ ids: publicationIds }), // используем идентификатор публикаций для получения документов
        credentials: 'omit',
      });

      // Проверяем документ на успешность
      if (!documentsResponse.ok) {
        throw new Error(`Ошибка HTTP! Статус: ${documentsResponse.status}`);
      }

      // Извлечение данных документов
      const documentsData = await documentsResponse.json(); // Преобразуем ответ от API в JSON

      // Устанавливаем состояние с полученными данными
      setSearchData(histogramData); // Фиксируем состояние, используя данные гистограммы из первого запроса
      setDocumentsData(documentsData); // Фиксируем состояние, используя данные документов из третьего запроса
      setIsAllDataLoaded(true); // Фиксируем состояние, указывающее, что все данные были успешно загружены
    }
    // Обработка ошибок
    catch (error) {
      console.error("Ошибка при выполнении запроса:", error.message);
      setIsError(true);
    }
    // Завершение загрузки
    finally {
      setIsLoading(false);
    }
  }, [location.state?.searchParams]);

  // Автоматическая загрузка данных при монтировании компонента или изменении параметров поиска
  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  return (
    <div className="container">
        <section className="result">
            {isLoading && (
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
            )}
        </section>

        <section className="summary">
            <div className="summary__column">
                <h3 className="summary__title paragraph-30">Общая сводка</h3>
                <p className="summary__paragraph paragraph-18-300">
                    Найдено {searchData ? searchData.totalCount : 0} вариантов
                </p>

                <div className="table-section">
                    <div className="table">
                        <div className="table__header paragraph-20-500">
                            <div>Период</div>
                            <div>Всего</div>
                            <div>Риски</div>
                        </div>
                        <div className="table__row paragraph-20">
                            {searchData && searchData.histogram.map((item, index) => (
                                <div className="table__data" key={index}>
                                    <div>{item.period}</div>
                                    <div>{item.total}</div>
                                    <div>{item.risks}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="documents">
            <h3 className="documents__title paragraph-30">Список документов</h3>
            <div className="documents__column">
                {isError ? (
                    <p className="error-message">Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.</p>
                ) : (
                    <>
                        {!isLoading && isAllDataLoaded && (
                            <>
                                <DocumentCardList documentsData={documentsData} />
                                <button className="btn documents__btn documents__btn_show-more paragraph-22-500-white">Показать больше</button>
                            </>
                        )}
                    </>
                )}
            </div>
        </section>
    </div>
);

};

export default Result;