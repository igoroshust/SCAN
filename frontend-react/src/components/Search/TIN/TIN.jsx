import React, { useState, useEffect } from 'react';

const TIN = ({ companyTIN, setCompanyTIN }) => {

    const [error, setError] = useState('');

    const validTIN = (tin) => {
        let errorObj = { code: 0, message: '' };
        let result = false;

        if (typeof tin === 'number') {
          tin = tin.toString();
        } else if (typeof tin !== 'string') {
          tin = '';
        }

        if (!tin.length) {
          errorObj.code = 1;
          errorObj.message = 'Обязательное поле';
        } else if (/[^0-9]/.test(tin)) {
          errorObj.code = 2;
          errorObj.message = 'Введите корректные данные';
        } else if ([10, 12].indexOf(tin.length) === -1) {
          errorObj.code = 3;
          errorObj.message = 'Введите корректные данные';
        } else {
          const checkDigit = (tin, coef) => {
            let n = 0;
            for (let i = 0; i < coef.length; i++) {
              n += coef[i] * tin[i];
            }
            return parseInt(n % 11 % 10, 10);
          };

          switch (tin.length) {
            case 10:
              var n10 = checkDigit(tin, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
              if (n10 === parseInt(tin[9], 10)) {
                result = true;
              }
              break;
            case 12:
              var n11 = checkDigit(tin, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
              var n12 = checkDigit(tin, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
              if ((n11 === parseInt(tin[10], 10)) && (n12 === parseInt(tin[11], 10))) {
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
            <label className="paragraph-18" for="companyTIN">ИНН компании<span className="paragraph-25-500">*</span></label><br />
            <input
                className="search-form__input paragraph-14"
                placeholder="10 цифр"
                maxlength="10"
                type="text"
                id="companyTIN"
                name="companyTIN"
                value={companyTIN}
                onChange={(e) => setCompanyTIN(e.target.value)}
                onBlur={() => validTIN(companyTIN)}
             />
        </div>
    );
};

export default TIN;