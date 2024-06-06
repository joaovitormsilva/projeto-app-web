import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {Link} from "expo-router"
export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <Text>SignIn</Text>


      <Link href={"/home"}> ir tela home</Link>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }


})