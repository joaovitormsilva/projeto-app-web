import {Image, View, Text, StyleSheet, Button} from 'react-native'
import React from 'react'
import {Link, router} from "expo-router"

export default function CreateAccountScreen() {


  function limparNavegacao(){
    router.replace("/home")
  }

  return (
    <View style={styles.container}>

      <Image source={require('../../assets/images/SquizzyLogo2.png')}
      style={styles.reactLogo}
      />


        <Text>
            Create an account
        </Text>

        <Text> Enter your email to sign up for this app</Text>

        <Text>User</Text>
        
        <Link href="/createQuizz" style={{backgroundColor:"yellow"}}>Create quizz BOTÃO </Link>
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
    },
    reactLogo: {
        height: '30%',
        width: '50%',
      },
  })