// В этом файле создаём контекст для управления состоянием аутентификации пользователя в приложении
import React, { createContext, useContext, useState, useEffect } from 'react';

// Cоздаём контекст для передачи данных о состоянии аутентификации через дерево компонентов
const AuthContext = createContext();

// Создаём компонент для предоставления доступа другим компонентам к контексту аутентификации
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // вошёл ли пользователь в систему

  // Проверка статуса аутентификации
  const checkAuthStatus = () => {
    const accessToken = localStorage.getItem('accessToken'); // наличие токена
    const tokenExpire = localStorage.getItem('tokenExpire'); // срок действия токена

    // Если токен отсутствует или истёк срок действия
    const now = new Date();
    if (!accessToken || !tokenExpire || new Date(tokenExpire) <= now) {
      console.log("Токен не найден или истёк срок его действия.");
      setIsLoggedIn(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tokenExpire');
    } else {
      setIsLoggedIn(true);
    }
  };

  // Вызываем функцию при первом рендере компонена AuthProvider
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

// Кастомный хук, позволяющий другим компонентам получать доступ к контексту аутентификации
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth необходимо использовать внутри AuthProvider');
  }
  return context;
};