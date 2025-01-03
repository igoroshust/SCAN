import axios from 'axios';

// Авторизация пользователя (отправка данных)
export async function authAPI(username, password, navigate, setIsLoggedIn, setUsernameError, setPasswordError) {
    try {
        const response = await axios.post('https://gateway.scan-interfax.ru/api/v1/account/login', {
            login: username,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        // Если запрос успешен, сохраняем токен и перенаправляем пользователя
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('tokenExpire', response.data.expire);
        setIsLoggedIn(true);
        navigate('/');

    } catch (error) {
        // Обработка ошибок
        console.error('Ошибка аутентификации:', error);
        setUsernameError(true);
        setPasswordError(true);

        // Если ошибка связана с ответом сервера, можно вывести сообщение
        if (error.response && error.response.data) {
            console.error('Сообщение об ошибке:', error.response.data.message);
        }
    }
}