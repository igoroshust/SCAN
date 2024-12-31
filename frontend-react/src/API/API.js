// API.js
export async function fetchResults(searchParams, setSearchData, setDocumentsData, setIsError, setIsLoading, setIsAllDataLoaded) {
    try {
        // Получаем гистограммы
        const histogramResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(searchParams),
            credentials: 'omit',
        });

        if (!histogramResponse.ok) {
            throw new Error(`Ошибка HTTP! Статус: ${histogramResponse.status}`);
        }

        const histogramData = await histogramResponse.json();

        // Получение идентификаторов публикаций
        const publicationIdsResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(searchParams),
            credentials: 'omit',
        });

        if (!publicationIdsResponse.ok) {
            throw new Error(`Ошибка HTTP! Статус: ${publicationIdsResponse.status}`);
        }

        const publicationIdsData = await publicationIdsResponse.json();
        const publicationIds = publicationIdsData.items.map(item => item.encodedId);

        if (publicationIds.length === 0) {
            console.error('Публикации с указанными ID не найдены.');
            setIsError(true);
            return;
        }

        // Получение списка документов
        const documentsResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({ ids: publicationIds }),
            credentials: 'omit',
        });

        if (!documentsResponse.ok) {
            throw new Error(`Ошибка HTTP! Статус: ${documentsResponse.status}`);
        }

        const documentsData = await documentsResponse.json();

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