// app/context/UserContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        if (savedToken) {
          setToken(savedToken);
        }
      } catch (error) {
        console.error('Ошибка при загрузке токена из AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = async (newToken) => {
    try {
      await AsyncStorage.setItem('token', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Ошибка при сохранении токена в AsyncStorage:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
    } catch (error) {
      console.error('Ошибка при удалении токена из AsyncStorage:', error);
    }
  };

  return (
    <UserContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
