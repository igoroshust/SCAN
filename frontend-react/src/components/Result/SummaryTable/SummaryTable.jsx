import React, { useRef, useEffect, useState } from 'react';
import { formatDate, formatNumber, combineDataByDate } from '../../../utils/Result/SummaryTableFormat'; // форматирование данных
import Spinner from '../../UI/Spinner';

const SummaryTable = ({ searchData, isLoading, isError }) => {
    const [combinedData, setCombinedData] = useState([]);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const tableRow = useRef(null);

    /* Обаботка данных поиска документов */
    useEffect(() => {
        if (searchData && !isError) {
            // Поиск данных на соотстветствие
            const totalDocuments = searchData.data.find(histogram => histogram.histogramType === 'totalDocuments');
            if (totalDocuments) {
                // Расчёт общего количества документов
                const total = totalDocuments.data.reduce((acc, item) => acc + item.value, 0);
                setTotalDataCount(total);
            }
            // Комбинирование данных по дате
            const combined = combineDataByDate(searchData.data);
            setCombinedData(combined);
        }
    }, [searchData, isError]);

    // Управление горизонтальной прокруткой элемента таблицы
    const scrollTable = (direction) => {
        const rootStyles = getComputedStyle(document.documentElement);
        const scrollAmount = direction === 'left'
            ? -parseInt(rootStyles.getPropertyValue('--scroll-amount-left'))
            : parseInt(rootStyles.getPropertyValue('--scroll-amount-right'));

        if (tableRow.current) {
            tableRow.current.scrollLeft += scrollAmount; // прокрутка элемента
        }
    };

    return (
        <section className="summary">
            <div className="summary__column">
                <h3 className="summary__title paragraph-30">Общая сводка</h3>
                <p className="summary__paragraph paragraph-18-300">Найдено {formatNumber(totalDataCount)} вариантов</p>

                <div className="table-section">
                    <div className="table">
                        {/* Заголовок таблицы (Период, Всего, Риски) */}
                        <div className="table__header paragraph-20-500">
                            <div>Период</div>
                            <div>Всего</div>
                            <div>Риски</div>
                        </div>

                        {/* Класс для выравнивания ячеек в линию и расположению стрелочек */}
                        <div className="table__row paragraph-20" ref={tableRow}>
                            {isLoading ? (
                                <div className="loading-container" style={{ textAlign: 'center' }}>
                                    <Spinner />
                                    <p>Загружаем данные...</p>
                                </div>
                            ) : isError ? (
                                <p>Ошибка сервера. Попробуйте позже или проверьте свой тариф</p>
                            ) : (
                                combinedData.map((item, index) => (
                                    <div className="table__data" key={index}>
                                        <div>{item.period}</div>
                                        <div>{item.total}</div>
                                        <div>{item.risks}</div>
                                    </div>
                                ))
                            )}
                        </div>
                        <button className="carousel-button left" onClick={() => scrollTable('left')}></button>
                        <button className="carousel-button right" onClick={() => scrollTable('right')}></button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SummaryTable;