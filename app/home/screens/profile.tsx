// app/screens/profile.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useUser } from '../../context/UserContext';
import { useRouter } from 'expo-router';
import { Profile } from '../../types/Profile';

export default function ProfileScreen() {
  const { token, logout } = useUser();
  const router = useRouter();
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v0/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProfileData({
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
          });
        } else {
          if (data.error) {
            console.error('Ошибка:', data.error);
            Alert.alert('Ошибка', data.error);
          } else {
            console.error('Неизвестная ошибка:', data);
          }
        }
      } catch (error) {
        console.error('Ошибка сети:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить профиль. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchProfileData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="tomato" />
        <Text>Загрузка...</Text>
      </View>
    );
  }

  if (!profileData) {
    // Если нет данных о профиле
    return (
      <View style={styles.container}>
        <Text style={styles.info}>Не удалось загрузить данные профиля</Text>
        <Text style={styles.info}>Пожалуйста, повторите попытку или выйдите из аккаунта</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Выйти</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Если все ок, показываем профиль
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Имя: {profileData.firstName}</Text>
      <Text style={styles.info}>Фамилия: {profileData.lastName}</Text>
      <Text style={styles.info}>Email: {profileData.email}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
}

// Стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 16,
  },
  info: {
    fontSize: 18,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
