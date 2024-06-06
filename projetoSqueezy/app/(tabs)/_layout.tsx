import {Tabs} from "expo-router"



export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="home/index" options={{headerShown: false}}/>
      <Tabs.Screen name="history/index" options={{headerShown: false}}/>
      <Tabs.Screen name="ranking/index" options={{headerShown: false}}/>
      <Tabs.Screen name="profile/index" options={{headerShown: false}}/>


    </Tabs>
  )
}