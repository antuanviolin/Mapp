import { Stack } from 'expo-router';
import UserProvider from './context/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "" }} />
        <Stack.Screen name="login" options={{ title: "Авторизация" }} />
        <Stack.Screen name="register" options={{ title: "Регистрация нового аккаунта" }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ title: "Профиль" }} />
      </Stack>
    </UserProvider>
  );
}
