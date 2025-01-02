// Валидация поля ИНН
export const validTIN = (inn) => {
    let errorMessage = '';
    let result = false;

    // Преобразование входных данных
    if (typeof inn === 'number') {
        inn = inn.toString();
    } else if (typeof inn !== 'string') {
        inn = '';
    }

    // Проверка на пустое значение
    if (!inn.length) {
        errorMessage = 'Обязательное поле';
      // Проверка на корректность данных
    } else if (/[^0-9]/.test(inn)) {
        errorMessage = 'Введите корректные данные';
    } else if ([10, 12].indexOf(inn.length) === -1) {
        errorMessage = 'Введите корректные данные';
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
            default:
                errorMessage = 'Введите корректные данные';
                break;
        }
        if (!result) {
            errorMessage = 'Введите корректные данные';
        }
    }
    return { isValid: result, errorMessage }; // Возвращаем объект с результатом и сообщением об ошибке
};

// Валидация поля "Количество документов"
export const validDocument = (documentsCount) => {
    const count = parseInt(documentsCount, 10);

    if (!documentsCount) {
        return "Обязательное поле";
    } else if (isNaN(count) || count < 1) {
        return "Введите корректные данные";
    } else if (count > 1000) {
        return "Введите корректные данные";
    } else {
        return "";
    }
};

// Валидация полей "Дата начала" и "Дата конца"
export const validateDateRange = (startDate, endDate) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (!startDate || !endDate) {
        return "Обязательное поле";
    } else if (new Date(startDate) > new Date(endDate)) {
        return "Введите корректные данные";
    } else if (new Date(startDate) > currentDate || new Date(endDate) > currentDate) {
        return "Невалидное значение";
    } else {
        return "";
    }
};
