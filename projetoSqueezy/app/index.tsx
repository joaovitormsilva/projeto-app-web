import { Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import {Link} from 'expo-router'
import "@fontsource/poppins"
import{useFonts, Poppins_100Thin,Poppins_300Light, Poppins_900Black_Italic} from "@expo-google-fonts/poppins"


export default function SquizzyScreen() {
  let [fonts] = useFonts({Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic});
  return (
    <View style={styles.container}>

      <Image source={require('../assets/images/SquizzyLogo3.png')}
      style={styles.reactLogo}
      />


      <Text style={styles.text}>Your favorite quiz app </Text>
      <Text style={styles.text}>Create an account to start squizzying!</Text>


      <TouchableOpacity style={[styles.box, styles.BoxCreateAccount, {marginBottom: '10%', marginTop: '20%'}]}>
        <Link href={"/CreateAccount"} style={[styles.text, {color:"#05203C"}]}>

         Create Account
         </Link>
      </TouchableOpacity> 

      <Text style={styles.text}>Already have an account?</Text>
     
      <TouchableOpacity style={[styles.box, styles.BoxSignIn]}>
      
        <Link href={"/SignIn"} style={[styles.text, {color:"#05203C"}]}> Sign In</Link>
   
      </TouchableOpacity>
     
      
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: '65%',
    height: '5%',
    borderRadius: 8,
    margin:8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container:{
    flex:1,
    backgroundColor: '#05203C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    color: '#fff',
    fontSize: 18,
    fontFamily: "Poppins_300Light"
  },

  BoxCreateAccount:{
    backgroundColor:'#FCC307',
  },

  BoxSignIn:{
    backgroundColor:'#FFFFFF',
  },
  fullAreaLink:{
    width:'100%',
    height: '100%',   
    borderRadius: 8,
  },
  reactLogo: {
    height: '40%',
    width: '60%',
    
  },
})