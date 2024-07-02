import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './(tabs)/home';
import CreateQuizScreen from './createQuizz';
import CategoriesScreen from './categories'
import ProfileScreen from './(tabs)/profile';
import SquizzyScreen from './telaInicial';
import CreateAccountScreen from './CreateAccount';
import SignInScreen from './SignIn';
import { UserProvider } from '../scripts/UserContext';
import { QuizProvider } from '../scripts/QuizContext';
import QuizJogavelScreen from './quizJogavel';
import quizQuestions from './createQuestions';
import QuizJogavelPerguntasScreen from './quizDefaultPerguntas';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <UserProvider>
        <QuizProvider>
          


          <Stack.Navigator initialRouteName="telaInicial/Index">

            <Stack.Screen name="telaInicial/index" component={SquizzyScreen} options={{title:"Squizzy", headerShown: false}}/>
            <Stack.Screen name="home" component={HomeScreen} options={{title:"home", headerShown: false}}/>
            <Stack.Screen name="createQuizz" component={CreateQuizScreen} options={{title:"create quiz", headerShown: false}} />
            <Stack.Screen name="(tabs)/profile" component={ProfileScreen} options={{title:"profile", headerShown: false}} />
            <Stack.Screen name="createAccount" component={CreateAccountScreen} options={{title:"Create Account", headerShown: false}} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{title:"SignIn", headerShown: false}} />
            <Stack.Screen name="quizQuestions" component={quizQuestions} options={{title:"quizQuestions", headerShown: false}}/>
            <Stack.Screen name="quizJogavel/index" component={QuizJogavelScreen} options={{title:"Quiz jogavel", headerShown: false}} />
            <Stack.Screen name="quizDefaultPerguntas/index" component={QuizJogavelPerguntasScreen} options={{title:"Quiz Default Perguntas", headerShown: false}} />

          </Stack.Navigator>

        </QuizProvider>
      </UserProvider>
  );
}
