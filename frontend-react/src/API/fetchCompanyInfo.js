// Получаем информацию о компаниях
export async function fetchCompanyInfo(setIsLoading, setUsedCompanyCount, setCompanyLimit) {
    setIsLoading(true); // устанавливаем состояние загрузки
    const url = 'https://gateway.scan-interfax.ru/api/v1/account/info';

    const token = localStorage.getItem('accessToken');
    if (!token) {
        console.error("Токен отсутствует");
        setIsLoading(false);
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`, // добавляем токен авторизации из localStorage
            },
        });

        // Проверяем, успешен ли ответ
        if (!response.ok) {
            throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
        }

        // Парсим ответ как JSON
        const data = await response.json();

        // Обновляем состояние с полученными данными
        if (data.eventFiltersInfo) {
            setUsedCompanyCount(data.eventFiltersInfo.usedCompanyCount); // Количество использованных компаний
            setCompanyLimit(data.eventFiltersInfo.companyLimit); // Лимит компаний
        } else {
            console.log("Неверная структура данных: ", data);
        }

    } catch (error) {
        console.error("Ошибка при получении информации о компаниях:", error);
    } finally {
        setIsLoading(false);
    }
}