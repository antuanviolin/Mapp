// app/login.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Логика для входа
    console.log('Email:', email, 'Password:', password);
    // После успешного входа можно перенаправить
    // router.push('/home') или куда угодно
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
