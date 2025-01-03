import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Checkbox from './Checkbox/Checkbox';
import TIN from './TIN/TIN';
import Tonality from './Tonality/Tonality';
import Document from './Document/Document';
import DateRange from './DateRange/DateRange';
import manSearch from '../../assets/images/search/man-search.png';
import { validTIN } from '../../utils/Search/FormValidation';

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

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/auth');
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const { isValid } = validTIN(companyTIN); // Проверяем валидность ИНН
        const isValidDocumentsCount = documentsCount !== '';
        const isValidStartDate = startDate !== '';
        const isValidEndDate = endDate !== '';

        // Все обязательные поля должны быть заполнены и ИНН должен быть валидным
        setIsFormValid(isValid && isValidDocumentsCount && isValidStartDate && isValidEndDate && companyTIN.trim() !== '');
    }, [companyTIN, documentsCount, startDate, endDate, checkboxState]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxState(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let apiTonality;
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

        if (isFormValid) {
            const searchParams = {
                issueDateInterval: {
                    startDate: `${startDate}T00:00:00+03:00`,
                    endDate: `${endDate}T23:59:59+03:00`
                },
                searchContext: {
                    targetSearchEntitiesContext: {
                        targetSearchEntities: [{
                            type: "company",
                            inn: companyTIN,
                            maxFullness: checkboxState.maxCompleteness,
                        }],
                        onlyMainRole: checkboxState.mainRole,
                        tonality: apiTonality,
                        onlyWithRiskFactors: checkboxState.riskFactorsOnly,
                    }
                },
                attributeFilters: {
                    excludeTechNews: !checkboxState.addTechNews,
                    excludeAnnouncements: !checkboxState.addAnnouncements,
                    excludeDigests: !checkboxState.addNewsBulletins,
                },
                limit: Number(documentsCount),
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

    return (
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