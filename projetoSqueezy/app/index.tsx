import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import {Link} from 'expo-router'

export default function SquizzyScreen() {
  return (
    <View style={styles.container}>
      <Text>Your favorite quiz app </Text>
      <Text>Create an account to start squizzying!</Text>


      <Link href={"/SignIn"}> Sign In</Link>
      <Link href={"/CreateAccount"}> Create Account</Link>
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