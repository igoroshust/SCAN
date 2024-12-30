import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import keyAuth from '../../assets/images/auth/key.png';
import googleAuth from '../../assets/images/auth/google.svg';
import facebookAuth from '../../assets/images/auth/facebook.svg';
import yandexAuth from '../../assets/images/auth/yandex.svg';

const Auth = () => {

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const isButtonActive = password.trim().length > 0;

    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth(); // получаем контекст

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault(); // предотвращение перезагрузки страницы по умолчанию

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

  const validateUsername = (input) => {
    setUsernameError(false);
  };

  const validatePassword = (input) => {
    setPasswordError(false);
  };

  const handleUsernameChange = (e) => {
    const input = e.target.value;
    setUsername(input);
    validateUsername(input);
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    validatePassword(input);
  };

    return (
        <section className="auth">
            <div className="container">
                <div className="auth__row">

                    <div className="auth__content">
                        <h2 className="auth__title paragraph-40">ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ НА ТАРИФ, НЕОБХОДИМО АВТОРИЗОВАТЬСЯ.</h2>
                            <div className="auth__img">
                                <img src={keyAuth} alt="СКАН Авторизация Регистрация Оформление подписки на тариф" />
                            </div>
                    </div>

                    <div className="auth__form">
                        <form className="authorization-form" onSubmit={handleLogin}>
                            <div className="authorization-form__container">

                                <div className="authorization-form__navigation">
                                    <button className="authorization-form__btn authorization-form__btn-login paragraph-16">Войти</button>
                                    <button
                                        className="authorization-form__btn authorization-form__btn-signup paragraph-16-200"
                                        title="Недоступно для перехода"
                                    >Зарегистрироваться</button>
                                </div>

                                <div className="authorization-form__content">
                                    <div className="authorization-form__content authorization-form__content_input_login">
                                        <label className="authorization-form__label paragraph-16-gray" htmlFor="login">Логин или номер телефона:</label>
                                        <input
                                            className="authorization-form__input"
                                            type="text"
                                            id="login"
                                            name="login"
                                            value={username}
                                            onChange={handleUsernameChange}
                                            required
                                            style={{ borderColor: usernameError ? 'red' : ''}}
                                        />
                                        {usernameError && <div style={{ color: 'red' }}>Введите корректные данные</div>}
                                    </div>

                                    <div className="authorization-form__content authorization-form__content_input_password">
                                        <label className="authorization-form__label paragraph-16-gray" htmlFor="password">Пароль: </label>
                                        <input
                                            className="authorization-form__input"
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            autoComplete="current-password"
                                            required
                                            style={{ borderColor: passwordError ? 'red' : ''}}
                                        />
                                        {passwordError && <div style={{ color: 'red' }}>Введите правильный пароль</div>}
                                    </div>

                                <div className="authorization-form__content authorization-form__content_btn-login">
                                    <button
                                        className="btn auth-btn__btn-login paragraph-22"
                                        type="submit"
                                        name="authButton"
                                        disabled={!isButtonActive} // Делаем кнопку неактивной, если поля не заполнены
                                        style={{ opacity: isButtonActive ? 1 : 0.5 }}
                                    >Войти</button>

                                    <a
                                        className="auth-btn__btn-recovery paragraph-14"
                                        href="#!"
                                        title="Опция недоступна"
                                        role="button"
                                    >Восстановить пароль</a>
                                </div>

                                <div className="authorization-form__oauth">
                                    <p className="authorization-form__oauth-paragraph paragraph-16-300">Войти через:</p>

                                    <div className="oauth__btns">
                                        <a className="btn oauth__btn oauth__btn-google" href="#!"><img src={googleAuth} alt="СКАН войти через google" /></a>
                                        <a className="btn oauth__btn oauth__btn-facebook" href="#!"><img src={facebookAuth} alt="СКАН войти через facebook" /></a>
                                        <a className="btn oauth__btn oauth__btn-yandex" href="#!"><img src={yandexAuth} alt="СКАН войти через yandex" /></a>
                                    </div>

                                </div>
                              </div>
                           </div>
                        </form>
                    </div>

                    <div className="under__image none">
                        <img src={keyAuth} alt="СКАН Авторизация Регистрация Оформление подписки на тариф" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Auth;