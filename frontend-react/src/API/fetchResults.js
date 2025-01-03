import axios from 'axios';

// Получаем данные о постах на основании запроса
export async function fetchResults(searchParams, setSearchData, setDocumentsData, setIsError, setIsLoading, setIsAllDataLoaded) {
    try {
        // Получаем гистограммы
        const histogramResponse = await axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', searchParams, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });

        const histogramData = histogramResponse.data;

        // Получение идентификаторов публикаций
        const publicationIdsResponse = await axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch', searchParams, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });

        const publicationIdsData = publicationIdsResponse.data;
        const publicationIds = publicationIdsData.items.map(item => item.encodedId);

        if (publicationIds.length === 0) {
            console.error('Публикации с указанными ID не найдены.');
            setIsError(true);
            return;
        }

        // Получение списка документов
        const documentsResponse = await axios.post('https://gateway.scan-interfax.ru/api/v1/documents', { ids: publicationIds }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });

        const documentsData = documentsResponse.data;

        // Устанавливаем состояние с полученными данными
        setSearchData(histogramData);
        setDocumentsData(documentsData);
        setIsAllDataLoaded(true);

    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error.message);
        setIsError(true);
    } finally {
        setIsLoading(false);
    }
};