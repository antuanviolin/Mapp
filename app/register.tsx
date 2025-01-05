// app/register.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter(); // Хук для навигации

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    // Логика регистрации
    console.log('Регистрация:', firstName, lastName, email, password);

    alert('Вы успешно зарегистрированы');
    router.push('/login'); // Перенаправление на экран входа
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Имя"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Фамилия"
          value={lastName}
          onChangeText={setLastName}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Распределение элементов по экрану
    padding: 16,
  },
  formContainer: {
    flex: 1, // Заполняет оставшееся пространство
    justifyContent: 'center', // Центрирует поля
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
