import {Stack} from "expo-router"


export default function LayoutCreate() {


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
      <Stack.Screen name="index" options={{title:"Create Quiz", headerShown: true}}/>

      </Stack>
  )
}