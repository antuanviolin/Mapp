// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="login" options={{ title: "Авторизация" }} />
      <Stack.Screen name="register" options={{ title: "Регистрация нового аккаунта" }} />
    </Stack>
  );
}
