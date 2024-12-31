// Авторизация пользователя (отправка данных)
export async function AuthAPI(username, password, navigate, setIsLoggedIn, setUsernameError, setPasswordError) {

    try {
      const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          login: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('tokenExpire', data.expire);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        throw new Error(data.message || 'Ошибка при входе');
      }
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
      setUsernameError(true);
      setPasswordError(true);
    }
  };
