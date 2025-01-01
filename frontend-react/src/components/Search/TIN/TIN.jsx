import React, { useState, useEffect } from 'react';

const TIN = ({ companyTIN, setCompanyTIN }) => {

    const [error, setError] = useState('');

    const validTIN = (inn) => {
        let errorObj = { code: 0, message: '' };
        let result = false;

        if (typeof inn === 'number') {
          inn = inn.toString();
        } else if (typeof inn !== 'string') {
          inn = '';
        }

        if (!inn.length) {
          errorObj.code = 1;
          errorObj.message = 'Обязательное поле';
        } else if (/[^0-9]/.test(inn)) {
          errorObj.code = 2;
          errorObj.message = 'Введите корректные данные';
        } else if ([10, 12].indexOf(inn.length) === -1) {
          errorObj.code = 3;
          errorObj.message = 'Введите корректные данные';
        } else {
          const checkDigit = (inn, coefficients) => {
            let n = 0;
            for (let i = 0; i < coefficients.length; i++) {
              n += coefficients[i] * inn[i];
            }
            return parseInt(n % 11 % 10, 10);
          };

          switch (inn.length) {
            case 10:
              var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
              if (n10 === parseInt(inn[9], 10)) {
                result = true;
              }
              break;
            case 12:
              var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
              var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
              if ((n11 === parseInt(inn[10], 10)) && (n12 === parseInt(inn[11], 10))) {
                result = true;
              }
              break;
          };

          if (!result) {
            errorObj.code = 4;
            errorObj.message = 'Введите корректные данные';
          };
        };
        setError(errorObj.message);
        return result;
      };

      useEffect(() => {
        validTIN(companyTIN);
      }, [companyTIN]);

      return(
        <div className="search-form__section search-form__section_item-1">
            <label className="paragraph-18" htmlFor="companyTIN">ИНН компании<span className="paragraph-25-500">*</span></label>
            <input
                className="search-form__input sf_el paragraph-14"
                placeholder="10 цифр"
                maxLength="10"
                type="text"
                id="companyTIN"
                name="companyTIN"
                value={companyTIN}
                onChange={(e) => setCompanyTIN(e.target.value)}
                onFocus={() => validTIN(companyTIN)}
             />
             {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
        </div>
    );
};

export default TIN;