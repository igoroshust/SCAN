import React, { useState, useEffect } from 'react';
import { validateDateRange } from '../../../utils/Search/FormValidation';

const DateRange = ({ startDate, setStartDate, endDate, setEndDate }) => {
    const [error, setError] = useState('');

    // Валидация
    useEffect(() => {
        const validationError = validateDateRange(startDate, endDate);
        setError(validationError);
    }, [startDate, endDate]);

    return (
        <div className="search-form__section search-form__section_item-4">
            <label className="paragraph-18" htmlFor="startDate">
                Диапазон поиска<span className="paragraph-25-500">*</span>
            </label>
            <div className="search-form_section__row">
                <input
                    className="search-form__select-small search-form__select-small_item-1 sf_el paragraph-14"
                    type="date"
                    id="startDate"
                    name="startDate"
                    placeholder="Дата начала"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    onClick={(e) => e.target.showPicker()} // Способствует отображению в Firefox
                />

                <input
                    className="search-form__select-small search-form__select-small_item-2 sf_el paragraph-14"
                    type="date"
                    id="endDate"
                    name="endDate"
                    placeholder="Дата конца"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    onClick={(e) => e.target.showPicker()}
                />
            </div>
            {error && <div style={{ color: 'red', fontSize: '12px', textAlign: 'left' }}>{error}</div>}
        </div>
    );
};

export default DateRange;