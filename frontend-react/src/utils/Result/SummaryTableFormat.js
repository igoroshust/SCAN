// Преобразование даты в формат для русского языка
export const formatDate = (dateString) => {
    const date = new Date(dateString); // передаём строку с датой
    return date.toLocaleDateString("ru-RU", { // форматируем дату в соответствии с русскими стандартами
        day: '2-digit', // двухзначный вид
        month: '2-digit',
        year: 'numeric', // числовой формат
    });
};

// Группировка данных по датам, суммируя значения
export const combineDataByDate = (data) => {
    const combinedData = {}; // хранение объединённых данных по датам

    data.forEach(histogram => {
        histogram.data.forEach(item => {
            const dateKey = item.date.split('T')[0]; // оставляем только дату (без времени)
            if (!combinedData[dateKey]) {
                combinedData[dateKey] = { period: formatDate(dateKey), total: 0, risks: 0 };
            }
            if (histogram.histogramType === 'totalDocuments') {
                combinedData[dateKey].total += item.value;
            } else if (histogram.histogramType === 'riskFactors') {
                combinedData[dateKey].risks += item.value;
            }
        });
    });

     // возвращаем массив значений, отсортированный по дате (периоду)
    return Object.values(combinedData).sort((a, b) => new Date(a.period) - new Date(b.period));
};

// Функция для форматирования числа
export const formatNumber = (num) => {
    if (num > 9999) {
        const strNum = num.toString();
        return `${strNum.slice(0, 2)} ${strNum.slice(2)}`; // добавляем пробел между первыми двумя цифрами и остальными
    }
    return num.toString(); // возвращаем число как строку, если оно меньше или равно 9999
};