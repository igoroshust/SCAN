import React, { useState, useEffect } from 'react';
import { validDocument } from '../../../utils/Search/FormValidation';

const Document = ({ documentsCount, setDocumentsCount }) => {

    const [error, setError] = useState('');

    // Валидация
    useEffect(() => {
        const validationError = validDocument(documentsCount);
        setError(validationError);
    }, [documentsCount]);

    return(
        <div className="search-form__section search-form__section_item-3">
            <label className="paragraph-18" htmlFor="documentsCount">Количество документов в выдаче<span className="paragraph-25-500">*</span></label>
            <input
                className="search-form__input sf_el paragraph-14"
                type="number"
                id="documentsCount"
                name="documentsCount"
                value={documentsCount}
                placeholder="От 1 до 1000"
                maxLength="4"
                onChange={(e) => {
                    const newValue = e.target.value;
                    setDocumentsCount(newValue);
                    validDocument();
                }}
                onBlur={validDocument}
            />
            {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
        </div>
    );
};

export default Document;