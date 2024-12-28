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
        maxCompleteness: false,
        businessMentions: false,
        mainRole: false,
        riskFactorsOnly: false,
        includeMarketNews: true,
        includeAnnouncements: true,
        includeNewsSummaries: true,
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

            limit: Number(documentCount), // Максимальное количество возвращаемых документов
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