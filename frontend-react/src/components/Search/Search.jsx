import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Checkbox from './Checkbox/Checkbox';
import TIN from './TIN/TIN';
import Tonality from './Tonality/Tonality';
import Document from './Document/Document';
import DateRange from './DateRange/DateRange';

import manSearch from '../../assets/images/search/man-search.png';

const Search = () => {

    const [companyTIN, setCompanyTIN] = useState('');
    const [tonality, setTonality] = useState('Любая');
    const [documentsCount, setDocumentsCount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [checkboxState, setCheckboxState] = useState({

        maxCompletenessSign: false,
        businessContextMentions: false,
        leadingRole: false,
        riskFactorsPublicationsOnly: false,
        addTechNews: true,
        addAnnouncements: true,
        addNewsBulletins: true,
    });

    // Объявляем зависимости
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // Если пользователь не авторизован, перенаправляем его на страницу '/auth'
    useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, navigate]);

    // Хранение состояния валидности формы
    const [isFormValid, setIsFormValid] = useState(false);

    // Все обязательные поля должны быть заполнены
    useEffect(() => {
        const isValid = companyTIN && documentsCount && startDate && endDate;
        setIsFormValid(isValid);
    }, [companyTIN, documentsCount, startDate, endDate, checkboxState]);

    // Обработчик изменения состояния чек-бокса
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxState(prevState => ({
            ...prevState, // spread operator, копируем все предыдущие значения состояния
            [name]: checked, // динамическое добавление или обновление свойства в объекте состояния
        }));
    };

    // Обработчик отправки формы
    const handleSubmit = async (event) => {
        event.preventDefault(); // предотвращение отправки формы по умолчанию (нужно управлять отправкой вручную)

        let apiTonality; // переменная хранит значение из селекта, соответствующее выбранной тональности

        switch (tonality) {
          case 'Любая':
            apiTonality = 'any';
            break;
          case 'Позитивная':
            apiTonality = 'positive';
            break;
          case 'Негативная':
            apiTonality = 'negative';
            break;
          default:
            apiTonality = 'any';
        }

      // Если форма валидна, формируем объект searchParams, содержащий параметры для запроса;
      // Затем перенаправляем пользователя на страницу с результатами
      if (isFormValid) {

          const searchParams = {
           // Объект, содержащий начальную и конечную даты
            issueDateInterval: {
              startDate: `${startDate}T00:00:00+03:00`,
              endDate: `${endDate}T23:59:59+03:00`
            },

            // Объект, содержащий информацию о том, что именно нужно искать
            searchContext: {
              // Целевые сущности для поиска (ИНН)
              targetSearchEntitiesContext: {
                targetSearchEntities: [{
                  type: "company",
                  inn: companyTIN,
                  maxFullness: checkboxState.maxCompleteness,
                }],
                // Указываем, нужно ли искать только по основной роли
                onlyMainRole: checkboxState.mainRole,
                // Указываем значение тональности
                tonality: apiTonality,
                // Указываем, нужно ли искать только с рисковыми факторами
                onlyWithRiskFactors: checkboxState.riskFactorsOnly,
              }
            },

            // Фильтры для атрибутов
            attributeFilters: {
              // Нужно ли исключать определённые типы новостей (значения берутся из состояния чек-боксов)
              excludeTechNews: !checkboxState.addTechNews,
              excludeAnnouncements: !checkboxState.addAnnouncements,
              excludeDigests: !checkboxState.addNewsBulletins,
            },

            // Максимальное количество возвращаемых документов
            limit: Number(documentsCount),

            // Сортировка и группировка результатов
            sortType: "sourceInfluence",
            sortDirectionType: "desc",
            intervalType: "month",
            histogramTypes: ["totalDocuments", "riskFactors"]
          };

          console.log('Отправка запроса на сервер с данными:', searchParams);

          navigate('/results', { state: { searchParams: searchParams } });
        } else {
          console.log('Форма не валидна, перенаправление не выполнено.');
        }
};

        return(
            <section className="search">
                <div className="container">
                    <div className="search__row">

                        <div className="search__content">
                            <h2 className="search__title paragraph-40">НАЙДИТЕ НЕОБХОДИМЫЕ <br /> ДАННЫЕ В ПАРУ КЛИКОВ.</h2>
                            <div className="search__text">
                                <p className="search__paragraph paragraph-20">Задайте параметры поиска. <br /> Чем больше заполните, тем точнее поиск</p>
                            </div>

                            <div className="search__form">
                                <form className="search-form" onSubmit={handleSubmit}>
                                        <div className="search-form__row">

                                            {/* Колонка инпутов */}
                                            <div className="search-form__inputs">

                                                <TIN companyTIN={companyTIN} setCompanyTIN={setCompanyTIN} />

                                                <Tonality tonality={tonality} setTonality={setTonality} />

                                                <Document documentsCount={documentsCount} setDocumentsCount={setDocumentsCount} />

                                                <DateRange startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />

                                            </div>

                                            {/* Колонка чек-боксов */}
                                            <div className="search-form__checkboxes">
                                                <Checkbox checkboxState={checkboxState} handleCheckboxChange={handleCheckboxChange} />
                                             </div>

                                            {/* Кнопка "Поиск" */}
                                            <div className="search-button__button">
                                                    <button
                                                        className="btn auth-btn__btn-login search-btn paragraph-22-500"
                                                        type="submit"
                                                        name="searchButton"
                                                        style={{
                                                            opacity: isFormValid ? 1 : 0.5,
                                                            pointerEvents: isFormValid ? 'auto' : 'none',
                                                        }}
                                                        >
                                                        Поиск
                                                        </button>
                                                        <div className="search-paragraph-container">
                                                            <p className="search-paragraph paragraph-14-300">* Обязательные к заполнению поля</p>
                                                        </div>
                                            </div>
                                        </div>
                                </form>
                            </div>

                            <div className="search__secret-img none">
                                <img src={manSearch} alt="СКАН поиск данных" />
                            </div>
                        </div>

                            <div className="search__img">
                                <img src={manSearch} alt="СКАН поиск данных" />
                            </div>
                        </div>
                </div>
    </section>
        );
};

export default Search;