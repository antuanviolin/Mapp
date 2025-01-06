import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Подключаем страницы
import MapScreen from './maps';
import AddPlaceScreen from './add-place';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'AddPlace') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Карта' }} />
        <Tab.Screen name="AddPlace" component={AddPlaceScreen} options={{ title: 'Добавить место' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Личный кабинет' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
