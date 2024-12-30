import React, { useRef, useEffect, useState } from 'react';
import { formatDate, combineDataByDate } from '../../../utils/Result/SummaryTableFormat'; // форматирование данных

import Spinner from '../../UI/Spinner';

const SummaryTable = ({ searchData, isLoading, isError }) => {
    const [combinedData, setCombinedData] = useState([]);
    const [totalDataCount, setTotalDataCount] = useState(0);

    const tableRow = useRef(null); // tableWrapperRef

    // Управление прокруткой элемента
    useEffect(() => {
        if (tableRow.current) {
            tableRow.current.scrollLeft = 0;
        }
    }, [combinedData]);

    useEffect(() => {
        if (searchData && !isError) {
            // Получаем данные из общего количества документов
            const totalDocuments = searchData.data.find(histogram => histogram.histogramType === 'totalDocuments');
            // Если totalDocuments найден
            if (totalDocuments) {
                const total = totalDocuments.data.reduce((acc, item) => acc + item.value, 0); // суммируем значения item.value
                setTotalDataCount(total); // устанавливаем общее количество в состояние для дальнейшего использования в компоненте.
            }

            const combined = combineDataByDate(searchData.data); // объединяем данные
            setCombinedData(combined); // устанавливаем объединенные данные в состояние для дальнейшего использования
        }
    }, [searchData, isError]);

    // Управление горизонтальной прокруткой элемента таблицы
    const scrollTable = (direction) => {
        const scrollAmount = direction === 'left' ? -300 : 300; // определяем величину прокрутки
        if (tableRow.current) {
            tableRow.current.scrollLeft += scrollAmount; // прокрутка элемента
        }
    };

    return (
        <section className="summary">
            <div className="summary__column">
                <h3 className="summary__title paragraph-30">Общая сводка</h3>
                <p className="summary__paragraph paragraph-18-300">Найдено {totalDataCount} вариантов</p>

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
                                <div className="loading-container">
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