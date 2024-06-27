import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './(tabs)/home';
import CreateQuizScreen from './createQuizz';
import ProfileScreen from './(tabs)/profile';
import SquizzyScreen from './telaInicial';
import CreateAccountScreen from './CreateAccount';
import SignInScreen from './SignIn';
import { UserProvider } from '../scripts/UserContext';
import { QuizProvider } from '../scripts/QuizContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <UserProvider>
        <QuizProvider>
          <Stack.Navigator initialRouteName="telaInicial/Index">
            <Stack.Screen name="telaInicial" component={SquizzyScreen} options={{title:"Squizzy", headerShown: false}}/>
            <Stack.Screen name="home" component={HomeScreen} options={{title:"home", headerShown: true}}/>
            <Stack.Screen name="createQuizz" component={CreateQuizScreen} options={{title:"create quiz", headerShown: true}} />
            <Stack.Screen name="profile" component={ProfileScreen} options={{title:"profile", headerShown: true}} />
            <Stack.Screen name="createAccount" component={CreateAccountScreen} options={{title:"Create Account", headerShown: true}} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{title:"SignIn", headerShown: true}} />
          </Stack.Navigator>
        </QuizProvider>
      </UserProvider>
  );
}
