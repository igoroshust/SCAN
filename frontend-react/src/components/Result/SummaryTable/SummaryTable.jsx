import React, { useRef, useEffect, useState } from 'react';
import SummaryTableFormat from '../../../utils/Result/SummaryTableFormat';

import spinner from '../../../assets/images/UI/spinner.svg';

const SummaryTable = ({ searchData, isLoading, isError }) => {
    const [combinedData, setCombinedData] = useState([]);
    const [totalDataCount, setTotalDataCount] = useState(0);

    const tableWrapper = useRef(null);

    // Управление прокруткой элемента
    useEffect(() => {
        if (tableWrapper.current) {
            tableWrapper.current.scrollLeft = 0;
            }
        }, [combinedData]);


      useEffect(() => {
      if (searchData && !isError) {

          // Получаем данные из общего количество документов
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
          if (tableWrapper.current) {
              tableWrapper.current.scrollLeft += scrollAmount; // прокрутка элемента
          }
  };


    return (

    );
};

export default SummaryTable;