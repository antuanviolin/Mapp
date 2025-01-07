// app/home/_layout.tsx
import { Stack, Redirect } from 'expo-router';
import { useUser } from '../context/UserContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function HomeLayout() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }

  if (!user) {
    // Если пользователь не аутентифицирован, перенаправляем на логин
    // Можно использовать useRouter внутри компонента, но здесь лучше отобразить сообщение или иной контент
    return <Redirect href="/login" />;
  }

  return <Stack>{
    <Stack.Screen name="homeScreen" options={{ headerShown: false }} />
  }</Stack>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});