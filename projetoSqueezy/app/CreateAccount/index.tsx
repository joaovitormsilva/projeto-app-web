import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import {Link} from "expo-router"

export default function CreateAccountScreen() {
  return (
    <View style={styles.container}>
      <Text>Create Account</Text>


      <Link href={"/home"}> Pagina home</Link>
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