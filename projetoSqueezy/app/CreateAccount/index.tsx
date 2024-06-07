import {Image, View, Text, StyleSheet} from 'react-native'
import React from 'react'
import {Link} from "expo-router"

export default function CreateAccountScreen() {
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
    },
    reactLogo: {
        height: '30%',
        width: '50%',
      },
  })