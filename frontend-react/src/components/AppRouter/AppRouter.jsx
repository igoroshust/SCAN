import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/styles.css';
import userPhotoDefault from '../../assets/images/main/user-nav.png';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

/* Ленивая подгрузка компонентов */
const Main = lazy(() => import('../Main/Main'));
const Auth = lazy(() => import('../Auth/Auth'));
const Search = lazy(() => import('../Search/Search'));
const Result = lazy(() => import('../Result/Result'));

const AppRouter = () => {

    const { isLoggedIn, checkAuthStatus } = useAuth();
    const [userRate] = useState('beginner');
    const [userName, setUserName] = useState('');
    const [userLogo, setUserLogo] = useState(userPhotoDefault);

    // Проверка статуса пользователя (авторизован или нет)
    useEffect(() => {
        if (!isLoggedIn) {
          console.log("Пользователь не авторизован!");
        }
     }, [isLoggedIn]);

    // Проверка статуса аутентификации пользователя
    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    // Изменение заголовка страницы в зависимости от текущего маршрута
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                document.title = 'СКАН - Сервис по поиску публикаций о компании';
                break;
            case '/auth':
                document.title = 'СКАН - Авторизация';
                break;
            case '/search':
                document.title = 'СКАН - Поиск информации о компании';
                break;
            case '/results':
                document.title = 'СКАН - Результаты поиска';
                break;
            default:
                document.title = 'СКАН - Сервис по поиску публикаций о компании';
        }
    }, [location]);

    return(
               <>
                   <Header
                    isLoggedIn={isLoggedIn}
                    userName={userName}
                    setUserName={setUserName}
                    userLogo={userLogo}
                    setUserLogo={setUserLogo}

                />

                <Suspense fallback={<div>Загрузка...</div>}>

                <Routes>
                    <Route path="/" element={<Main isLoggedIn={isLoggedIn} userRate={userRate} />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/search" element={isLoggedIn ? <Search /> : <Auth redirectBack="/search" />} />
                    <Route path="/results" element={isLoggedIn ? <Result /> : <Auth redirectBack="/results" />} />
                </Routes>

                </Suspense>
                <Footer />

                </>
    );
};

export default AppRouter;