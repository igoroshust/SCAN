import React, { useState, useEffect } from 'react';

const Document = ({ documentsCount, setDocumentsCount }) => {

    const [error, setError] = useState('');

    const validDocument = () => {
        const count = parseInt(documentsCount, 10);

        if (!documentsCount) {
            setError("Обязательное поле");
        } else if (isNaN(count) || count < 1) {
            setError("Введите корректные данные");
        } else if (count > 1000) {
            setError("Введите корректные данные");
        } else {
            setError("");
        }
    };

    useEffect(() => {
        validDocument();
    }, [documentsCount]);

    return(
        <div className="search-form__section search-form__section_item-3">
            <label className="paragraph-18" for="documentsCount">Количество документов в выдаче<span className="paragraph-25-500">*</span></label><br />
            <input
                className="search-form__input paragraph-14"
                type="number"
                id="documentsCount"
                name="documentsCount"
                value={documentsCount}
                placeholder="От 1 до 1000"
                maxlength="4"
                onChange={(e) => {
                    const newValue = e.target.value;
                    setDocumentsCount(newValue);
                    validDocument();
                }}
                onBlur={validDocument}
            />
            {error && <div style={{ color: 'red' }}>{ error }</div>}
        </div>
    );
};

export default Document;