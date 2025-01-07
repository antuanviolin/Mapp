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
  ActivityIndicator,
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

    setLoading(true);
    try {
      const response = await fetch('https://localhost:8080/api/v0/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { 'auth-token': authToken, error } = data;

        if (authToken) {
          await login(authToken);
          router.push('/home/homeScreen');
        } else if (error) {
          Alert.alert('Ошибка', error);
        } else {
          Alert.alert('Ошибка', 'Неизвестный формат ответа сервера.');
        }
      } else {
        if (data.error) {
          Alert.alert('Ошибка', data.error);
        } else {
          Alert.alert('Ошибка', 'Не удалось авторизоваться. Проверьте введенные данные.');
        }
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка при авторизации. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
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
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Войти</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.registerText}>У вас нет аккаунта?{' '}</Text>
        <Link href="/register" style={styles.link}>Зарегистрироваться</Link>
      </View>
    </KeyboardAvoidingView>
  );
}

// Стили
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    fontSize: 16,
    marginBottom: 10,
  },
});
