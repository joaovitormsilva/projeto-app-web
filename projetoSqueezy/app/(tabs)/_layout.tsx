import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import {Tabs} from "expo-router"
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Layout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs       
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: false,
      headerShadowVisible: false
     }}>
      <Tabs.Screen name="home/index" options={{title:'home',
        headerShown: false,
        tabBarIcon:({color, focused}) =>(
          <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
        )
        }}/>
      <Tabs.Screen name="history/index" options={{
        title:'History',headerShown: false,
        tabBarIcon:({color, focused}) =>(
          <TabBarIcon name={focused ? 'hourglass' : 'hourglass-outline' } color={color}/>
        )
      }}/>
      <Tabs.Screen name="ranking/index" options={{
        title:'Ranking',headerShown: false,
        tabBarIcon:({color, focused}) =>(
          <TabBarIcon name={focused ? 'cellular' : 'cellular-outline'} color={color}/>
        )
        }}/>
      <Tabs.Screen name="profile/index" options={{
        title:'Profile',headerShown: false,
        tabBarIcon:({color, focused}) =>(
          <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color}/>
        )
        }}/>

    </Tabs>
  )
}