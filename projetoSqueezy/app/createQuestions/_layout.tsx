import {Stack} from "expo-router"


export default function LayoutCreateQuestions() {


  return (
    <Stack 

    screenOptions={
        {
            headerStyle:{
              backgroundColor:'#fff'
            },
            headerShadowVisible:false,
            headerTitleAlign:'center'
        }
        
    }>
      <Stack.Screen name="index" options={{title:"Create Questions", headerShown: false}}/>

      </Stack>
  )
}