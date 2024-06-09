import {Stack} from "expo-router"


export default function LayoutCreate() {


  return (
    <Stack screenOptions={
        {
            headerTitleAlign:'center'
        }
    }>
      <Stack.Screen name="index" options={{title:"Create Quiz", headerShown: true}}/>

      </Stack>
  )
}