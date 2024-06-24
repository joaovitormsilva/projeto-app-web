import {Stack} from "expo-router"


export default function LayoutFinishQuestions() {


  return (
    <Stack 

    screenOptions={
        {
            headerStyle:{
              backgroundColor:'#F8FAF4'
            },
            headerShadowVisible:false,
            headerTitleAlign:'center'
        }
        
    }>
      <Stack.Screen name="index" options={{title:"Finish Questions", headerShown: true}}/>

      </Stack>
  )
}