import axios from 'axios';

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
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`, // добавляем токен авторизации из localStorage
            },
        });

        // Обновляем состояние с полученными данными
        if (response.data.eventFiltersInfo) {
            setUsedCompanyCount(response.data.eventFiltersInfo.usedCompanyCount); // Количество использованных компаний
            setCompanyLimit(response.data.eventFiltersInfo.companyLimit); // Лимит компаний
        } else {
            console.log("Неверная структура данных: ", response.data);
        }

    } catch (error) {
        console.error("Ошибка при получении информации о компаниях:", error);
    } finally {
        setIsLoading(false);
    }
}