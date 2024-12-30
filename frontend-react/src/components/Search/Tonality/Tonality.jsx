import React from 'react';

const Tonality = ({ tonality, setTonality }) => {

    return (
        <div className="search-form__section search-form__section_item-2">
            <label className="paragraph-18" htmlFor="tonality">Тональность</label><br />
            <select
                className="search-form__select-big search-form__select-big_item-1"
                id="tonality"
                name="tonality"
                value={tonality}
                onChange={(e) => setTonality(e.target.value)}
            >
                <option className="search-form__select-big_option search-form__select-big_option-0" value="Любая">Любая</option>
                <option className="search-form__select-big_option search-form__select-big_option-1" value="Позитивная">Позитивная</option>
                <option className="search-form__select-big_option search-form__select-big_option-2" value="Негативная">Негативная</option>
            </select>
        </div>
    );
};

export default Tonality;