import {Stack} from "expo-router"


export default function LayoutCreateQuestions() {


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
      <Stack.Screen name="index" options={{title:"Create Questions", headerShown: false}}/>

      </Stack>
  )
}