// app/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from './context/UserContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Index() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/home/homeScreen');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
