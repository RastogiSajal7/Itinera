import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from './components/Register';
import Home from './components/Home';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import BottomNavigation from './components/BottomNavigation';
import { CartProvider } from './components/CartContext';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <CartProvider>
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#004721" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#004721',
            },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen name="Home" component={Home} options={{ headerShown: true }} />
          <Stack.Screen name="SignUp" component={Register} options={{ headerShown: true }} />
          <Stack.Screen name="MainPage" component={BottomNavigation} options={{ headerShown: true }} />
        </Stack.Navigator>
      </SafeAreaView>
    </GestureHandlerRootView>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#004721',
  },
});
