// app/index.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useUser } from './context/UserContext'; // Импортируем useUser

const PlaceholderImage = require('@/assets/images/Micon.png');

export default function Index() {
  const { user } = useUser(); // Получаем состояние пользователя из контекста
  const router = useRouter();

  const handleLogout = () => {
    if (user) {
      // Если пользователь авторизован, перенаправляем на /home
      router.push('/home');
    } else {
      // Иначе на экран авторизации
      router.push('/login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>
      <Text style={styles.title}>Добро пожаловать в Маршрутчик!</Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.enterButton} onPress={handleLogout}>
          <Text style={styles.loginButtonText}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Равномерное распределение элементов
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  imageContainer: {
    flex: 2, // Занимает больше места на экране
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 18,
  },
  footer: {
    width: '100%', // Кнопка занимает всю ширину экрана
    alignItems: 'center',
    justifyContent: 'flex-end', // Кнопка по центру внизу
    marginBottom: 20,
  },
  enterButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 5,
    width: '80%', // Кнопка не на всю ширину
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
