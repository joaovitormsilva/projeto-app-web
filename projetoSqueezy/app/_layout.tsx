import {Stack} from "expo-router"
import 'react-native-gesture-handler';
import React from 'react';
import { UserProvider } from '../scripts/UserContext'; // Importando o UserProvider
import {QuizProvider} from '../scripts/QuizContext';

export default function RootLayout() {


  return (
    <UserProvider>
        <QuizProvider>

        <Stack    initialRouteName="telaInicial/index"
          screenOptions={{
            headerTitleAlign:'center'
          }}
          >
          <Stack.Screen name="index" options={{title:"telaInicial", headerShown: false}}/>
          <Stack.Screen name="SignIn/index" options={{title:"SignIn", headerShown: false}}/>
          <Stack.Screen name="CreateAccount/index" options={{title:"Create account", headerShown: false}}/>
          <Stack.Screen name="createQuizz" options={{title:"Create Quiz", headerShown: false}}/>
          <Stack.Screen name="categories/index" options={{title:"Categories", headerShown: true}}/>
          <Stack.Screen name="finishQuiz" options={{title:"Finish Quiz", headerShown: true}}/>
          <Stack.Screen name="createQuestions" options={{title:"Create Questions", headerShown: true}}/>


    
          <Stack.Screen name="quizJogavel/index" options={{title:"Quiz", headerShown: true}} />
          <Stack.Screen name="quizJogavelPerguntas/index" options={{title:"Perguntas", headerShown: false}} />
          <Stack.Screen name="(tabs)" options={{title:"tabs", headerShown: false}}/>
          <Stack.Screen name="quizDefaultPerguntas/index" options={{title:"Quiz Questions", headerShown: true}} />

          <Stack.Screen name="categories/tech/index" options={{title:"Tech", headerShown: true}}/>
          <Stack.Screen name="categories/entertainment/index" options={{title:"Entertainment", headerShown: true}}/>
          <Stack.Screen name="categories/science/index" options={{title:"Science", headerShown: true}}/>
          <Stack.Screen name="categories/history/index" options={{title:"History", headerShown: true}}/>
          <Stack.Screen name="categories/sports/index" options={{title:"Sports", headerShown: true}}/>
          <Stack.Screen name="categories/geography/index" options={{title:"Geography", headerShown: true}}/>

          <Stack.Screen name="categories/others/index" options={{title:"Others", headerShown: true}}/>

      </Stack>
        
      </QuizProvider>
    </UserProvider>
  )
}