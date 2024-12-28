import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Search = () => {

    const [companyTIN, setCompanyTIN] = useState('');
    const [tonality, setTonality] = useState('Любая');
    const [documentsCount, setDocumentsCount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [checkboxState, setCheckhoxState] = useState({

        maxCompletenessSign: false,
        businessContextMentions: false,
        leadingRole: false,
        riskFactorsPublicationsOnly: false,
        addTechnicalNews: true,
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
        const isValid = companyTIN && documentsCount && startDate && endDate && checkboxState;
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
      // Затем перенаправляем пользователя на страницу с резальтатами
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
              excludeTechNews: !checkboxState.includeMarketNews,
              excludeAnnouncements: !checkboxState.includeAnnouncements,
              excludeDigests: !checkboxState.includeNewsSummaries,
            },

            // Максимальное количество возвращаемых документов
            limit: Number(documentCount),

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
            <section class="search">
                <div class="container">
                    <div class="search__row">
                                <form class="search-form" onSubmit={handleSubmit}>
                                        <div class="search-form__row">

                                            {/* Колонка инпутов */}
                                            <div class="search-form__inputs">

                                                <div class="search-form__section search-form__section_item-1">
                                                    <label class="paragraph-18" for="inn">ИНН компании<span class="paragraph-25-500">*</span></label><br>
                                                    <input class="search-form__input paragraph-14" placeholder="10 цифр" maxlength="10" type="text" id="inn" name="inn">
                                                </div>

                                                <div class="search-form__section search-form__section_item-2">
                                                    <label class="paragraph-18" for="tonality">Тональность</label><br>
                                                    <select class="search-form__select-big search-form__select-big_item-1" id="tonality">
                                                        <option class="search-form__select-big_option search-form__select-big_option-0" value="Любая">Любая</option>
                                                        <option class="search-form__select-big_option search-form__select-big_option-1" value="Значение-1">Значение 1</option>
                                                        <option class="search-form__select-big_option search-form__select-big_option-2" value="Значение-2">Значение 2</option>
                                                        <option class="search-form__select-big_option search-form__select-big_option-3" value="Значение-3">Значение 3</option>
                                                    </select>
                                                </div>

                                                <div class="search-form__section search-form__section_item-3">
                                                    <label class="paragraph-18" for="documents_count">Количество документов в выдаче<span class="paragraph-25-500">*</span></label><br>
                                                    <input class="search-form__input paragraph-14" placeholder="От 1 до 1000" maxlength="4" type="text" id="documents_count" name="documents_count">
                                                </div>

                                                <div class="search-form__section search-form__section_item-4">
                                                    <label class="paragraph-18" for="searchSelect-small-1">Диапазон поиска<span class="paragraph-25-500">*</span></label><br>
                                                    <div class="search-form_section__row">
                                                        <select class="search-form__select-small search-form__select-small_item-1 paragraph-14" id="searchSelect-small-1">
                                                            <option class="search-form__select-small_option search-form__select-small_option-1" value="Дата начала">Дата начала</option>
                                                            <option class="search-form__select-small_option search-form__select-small_option-2" value="Значение 1">Значение 1</option>
                                                            <option class="search-form__select-small_option search-form__select-small_option-3" value="Значение 2">Значение 2</option>
                                                            <option class="search-form__select-small_option search-form__select-small_option-4" value="Значение 3">Значение 3</option>
                                                        </select>

                                                        <select class="search-form__select-small search-form__select-small_item-2 paragraph-14" id="searchSelect-small-2">
                                                            <option class="search-form__select-small_option search-form__select-small_option-0" value="Дата конца">Дата конца</option>
                                                            <option class="search-form__select-small_option search-form__select-small_option-1" value="Значение 1">Значение 1</option>
                                                            <option class="search-form__select-small_option search-form__select-small_option-2" value="Значение 2">Значение 2</option>
                                                            <option class="search-form__select-small_option search-form__select-small_option-3" value="Значение 3">Значение 3</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Колонка чек-боксов -->
                                            <div class="search-form__checkboxes">
                                                <div class="search-form__checkboxes__column">
                                                    <!-- Оборачиваем checkbox в label для увеличения области кликабельности -->

                                                    <div class="check check-0">
                                                        <input type="checkbox" name="option0" value="option0" class="checkbox" id="checkbox0" checked>
                                                        <label class="label" for="checkbox0">
                                                            <span class="checkmark"></span>
                                                            <span class="label-text paragraph-18">Признак максимальной полноты</span>
                                                        </label>
                                                    </div>

                                                    <div class="check check-1">
                                                        <input type="checkbox" name="option1" value="option1" class="checkbox" id="checkbox1" checked>
                                                        <label class="label" for="checkbox1">
                                                            <span class="checkmark"></span>
                                                            <span class="label-text paragraph-18">Упоминания в бизнес-контексте</span>
                                                        </label>
                                                    </div>

                                                    <div class="check check-2">
                                                        <input type="checkbox" name="option2" value="option2" class="checkbox" id="checkbox2" checked>
                                                        <label class="label" for="checkbox2">
                                                            <span class="checkmark"></span>
                                                            <span class="label-text paragraph-18">Главная роль в публикации</span>
                                                        </label>
                                                    </div>

                                                    <div class="check check-3">
                                                        <input type="checkbox" name="option3" value="option3" class="checkbox" id="checkbox3">
                                                        <label class="label" for="checkbox3">
                                                            <span class="checkmark"></span>
                                                            <span class="label-text paragraph-18">Публикации только с риск-факторами</span>
                                                        </label>
                                                    </div>

                                                    <div class="check check-4">
                                                        <input type="checkbox" name="option4" value="option4" class="checkbox" id="checkbox4">
                                                        <label class="label" for="checkbox4">
                                                            <span class="checkmark"></span>
                                                            <span class="label-text paragraph-18">Включать технические новости рынков и всякое такое там ещё текст какой-то</span>
                                                        </label>
                                                    </div>

                                                    <div class="check check-5">
                                                        <input type="checkbox" name="option5" value="option5" class="checkbox" id="checkbox5" checked>
                                                        <label class="label" for="checkbox5">
                                                            <span class="checkmark"></span>
                                                            <span class="label-text paragraph-18">Включать анонсы и календари</span>
                                                        </label>
                                                    </div>

                                                    <div class="check check-6">
                                                        <input type="checkbox" name="option6" value="option6" class="checkbox" id="checkbox6">
                                                        <label class="label" for="checkbox6">
                                                            <span class="checkmark"></span>
                                                            <span class="label-text paragraph-18">Включать сводки новостей</span>
                                                        </label>
                                                    </div>
                                                </div>
                                              </div>

                                            <!-- Кнопка "Поиск" -->
                                            <div class="search-button__button">
                                                    <button class="btn auth-btn__btn-login search-btn paragraph-22-500" name="searchButton" disabled>Поиск</button>
                                                        <div class="search-paragraph-container">
                                                            <p class="search-paragraph paragraph-14-300">* Обязательные к заполнению поля</p>
                                                        </div>
                                                  </div>
                                        </div>
                                </form>
                            </div>

                            <div class="search__secret-img none">
                                <img src="./img/search/man-search.png" alt="СКАН поиск данных">
                            </div>
                        </div>

                        <div class="search__img">
                            <img src="./img/search/man-search.png" alt="СКАН поиск данных">
                        </div>
                    </div>
                </div>
    </section>
        );
};

export default Search;