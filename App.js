import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { colors } from './src/theme';
import { HomeScreen, AboutScreen, CoursesScreen, CourseDetailScreen, FeesScreen, ContactScreen } from './src/screens';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const CoursesStack = createNativeStackNavigator();
const opts = { headerShown: false };

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={opts}>
    <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    <HomeStack.Screen name="About" component={AboutScreen} />
  </HomeStack.Navigator>
);
const CoursesStackScreen = () => (
  <CoursesStack.Navigator screenOptions={opts}>
    <CoursesStack.Screen name="CoursesList" component={CoursesScreen} />
    <CoursesStack.Screen name="CourseDetail" component={CourseDetailScreen} />
  </CoursesStack.Navigator>
);

const icons = { Home: 'home-outline', Courses: 'book-outline', Fees: 'calculator-outline', Contact: 'chatbubble-outline' };

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#e9e2d4', alignItems: 'center' }}><View style={{ flex: 1, width: '100%', maxWidth: 480, backgroundColor: '#fdf6ec' }}><NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.teal,
          tabBarInactiveTintColor: '#666',
          tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} />,
        })}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Courses" component={CoursesStackScreen} />
        <Tab.Screen name="Fees" component={FeesScreen} />
        <Tab.Screen name="Contact" component={ContactScreen} />
      </Tab.Navigator>
    </NavigationContainer></View></View>
  );
}
