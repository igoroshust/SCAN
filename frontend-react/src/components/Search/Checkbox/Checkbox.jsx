import React from 'react';

const Checkbox = ({ checkboxState, handleCheckboxChange }) => {

    const labels = {
        maxCompletenessSign: 'Признак максимальной полноты',
        businessContextMentions: 'Упоминания в бизнес-контексте',
        leadingRole: 'Главная роль в публикации',
        riskFactorsPublicationsOnly: 'Публикации только с риск факторами',
        addTechnicalNews: 'Включать технические новости рынков',
        addAnnouncements: 'Включать анонсы и календари',
        addNewsBulletins: 'Включать сводки новостей',
    };

    return (
            <div className="search-form__checkboxes__column">
                {Object.keys(checkboxState).map((key) => (
                    <div key={key} className={`check check${key}`}>
                        <input
                         type="checkbox"
                         className="checkbox"
                         id={`checkbox${key}`}
                         name={key}
                         onChange={handleCheckboxChange}
                         checked={checkboxState[key]}
                         />

                        <label className="label" for={`checkbox${key}`}>
                            <span className="checkmark"></span>
                            <span className="label-text paragraph-18">{ labels[key] }</span>
                        </label>
                    </div>
                ))}
            </div>
    );
};

export default Checkbox;