import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Email и пароль можно передать через состояние или глобальный контекст
  const userEmail = 'user@example.com'; // Пример
  const userPassword = 'password123';  // Пример

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('https://your-api-url.com/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setProfileData(data);
        } else {
          console.error('Ошибка:', data.message);
        }
      } catch (error) {
        console.error('Ошибка сети:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="tomato" />
        <Text>Загрузка...</Text>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text>Не удалось загрузить данные профиля</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Личный кабинет</Text>
      <Text style={styles.info}>Имя: {profileData.firstName}</Text>
      <Text style={styles.info}>Фамилия: {profileData.lastName}</Text>
      <Text style={styles.info}>Email: {profileData.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
});
