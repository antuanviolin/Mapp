// app/login.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { useUser } from './context/UserContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    const userData = { email, password };
    await login(userData);
    router.push('/home');

    /*
    setLoading(true); // Начинаем загрузку

    try {
      // Здесь указывается URL вашего API для авторизации
      const response = await fetch('https://your-api-url.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = { email, password };
        // Если авторизация успешна
        await login(userData);
        // Перенаправляем на главную страницу после успешной авторизации
        router.push('/home');
      } else {
        // Если авторизация не удалась
        Alert.alert('Ошибка', data.message || 'Не удалось авторизоваться. Проверьте введенные данные.');
      }
    } catch (error) {
      // Обработка ошибок сети или других проблем
      Alert.alert('Ошибка', 'Произошла ошибка при авторизации. Попробуйте позже.');
    } finally {
      setLoading(false); // Останавливаем загрузку
    }
    */
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Войти</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.registerText}>У вас нет аккаунта?{' '}</Text>
        <Link href="/register" style={styles.link}>Зарегистрироваться</Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  registerText: {
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    fontSize: 16,
  },
});
