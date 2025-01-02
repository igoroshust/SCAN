import React, { useState, useEffect } from 'react';
import { validTIN } from '../../../utils/Search/FormValidation';

const TIN = ({ companyTIN, setCompanyTIN }) => {
    const [error, setError] = useState('');

    // Валидация
    useEffect(() => {
        const { errorMessage } = validTIN(companyTIN);
        setError(errorMessage);
    }, [companyTIN]);

    return (
        <div className="search-form__section search-form__section_item-1">
            <label className="paragraph-18" htmlFor="companyTIN">
                ИНН компании<span className="paragraph-25-500">*</span>
            </label>
            <input
                className="search-form__input sf_el paragraph-14"
                placeholder="10 цифр"
                maxLength="10"
                type="text"
                id="companyTIN"
                name="companyTIN"
                value={companyTIN}
                onChange={(e) => setCompanyTIN(e.target.value)} // Устанавливаем новое значение
            />
            {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>} {/* Отображаем ошибку */}
        </div>
    );
};

export default TIN;