import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import {Link, router} from "expo-router"


export default function SignInScreen() {

  function limparNavegacao(){
    router.replace("/home")
  }

  return (
    <View style={styles.container}>
      <Text>SignIn</Text>


      <Button title="Ir pra home" onPress={limparNavegacao}/>

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