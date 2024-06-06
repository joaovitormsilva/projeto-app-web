import { View, Text } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'

export default function SquizzyScreen() {
  return (
    <View>
      <Text>Your favorite quiz app </Text>
      <Text>Create an account to start squizzying!</Text>
      
      <Link href="(app)/start"> tela index da pasta app ISSO É UM LINK</Link>
    </View>
  )
}