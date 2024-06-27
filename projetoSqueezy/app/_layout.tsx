import {Stack} from "expo-router"
import 'react-native-gesture-handler';
import React from 'react';
import { UserProvider } from '../scripts/UserContext'; // Importando o UserProvider
import {QuizProvider} from '../scripts/QuizContext';

export default function RootLayout() {


  return (
    <UserProvider>
      <QuizProvider>

        <Stack 
          screenOptions={{
            headerTitleAlign:'center'
          }}
          >
          <Stack.Screen name="index" options={{title:"Squizzy", headerShown: false}}/>
          <Stack.Screen name="SignIn/index" options={{title:"Log in app", headerShown: false}}/>
          <Stack.Screen name="CreateAccount/index" options={{title:"Create Account", headerShown: false}}/>
          <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
          <Stack.Screen name="createQuizz" options={{title:'Create Quiz', headerShown:false}}/>
          <Stack.Screen name="createQuestions" options={{title:'Create Questions', headerShown:false}}/>
          <Stack.Screen name="finishQuiz" options={{title:'Finish Quiz', headerShown:false}}/>

    
      </Stack>
        
      </QuizProvider>
    </UserProvider>
  )
}