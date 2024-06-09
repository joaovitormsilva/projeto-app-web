import {Stack} from "expo-router"


export default function RootLayout() {


  return (
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
    </Stack>
  )
}