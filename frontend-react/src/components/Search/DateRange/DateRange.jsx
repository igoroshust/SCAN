import React, { useState, useEffect } from 'react';

const DateRange = ({ startDate, setStartDate, endDate, setEndDate }) => {

    const [error, setError] = useState('');
    const [startValue, setStartValue] = useState('text');
    const [endValue, setEndValue] = useState('text');

    // Валидация поля "Диапазон Поиска"
    const validDateRange = () => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (!startDate || !endDate) {
            setError("Обязательное поле");
        } else if (new Date(startDate) > new Date(endDate)) {
            setError("Введите корректные данные");
        } else if (new Date(startDate) > currentDate || new Date(endDate) > currentDate) {
            setError("Невалидное значение")
        } else {
            setError("");
        }
    };

     useEffect(() => {
        validDateRange();
    }, [startDate, endDate]);

    return(
        <div className="search-form__section search-form__section_item-4">
            <label className="paragraph-18" htmlFor="startDate">Диапазон поиска<span className="paragraph-25-500">*</span></label>
            <div className="search-form_section__row">
                <input
                    className="search-form__select-small search-form__select-small_item-1 sf_el paragraph-14"
                    type={startValue}
                    onFocus={() => setStartValue('date')}
                    onBlur={() => {
                        validDateRange();
                        if (!startDate) setStartValue('text');
                    }}
                    id="startDate"
                    name="startDate"
                    placeholder="Дата начала"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                 />

                <input
                    className="search-form__select-small search-form__select-small_item-2 sf_el paragraph-14"
                    type={endValue}
                    onFocus={() => setEndValue('date')}
                    onBlur={() => {
                        validDateRange();
                        if (!endDate) setEndValue('text');
                    }}
                    id="endDate"
                    name="endDate"
                    placeholder="Дата конца"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                 />

            </div>
            {error && <div style={{ color: 'red', fontSize: '12px', textAlign: 'left'}}>{error}</div>}
        </div>
    );
};

export default DateRange;