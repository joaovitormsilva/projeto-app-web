import { Image, View, Text, StyleSheet, Button, SafeAreaView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from "expo-router";
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic } from '@expo-google-fonts/poppins';



export default function SignInScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function limparNavegacao(){
    router.replace("/home")
  }

  return (
    
  <View style={styles.container}>
      <Image
        source={require('../../assets/images/SquizzyLogo2.png')}
        style={styles.reactLogo}
      />

      <Text style={styles.headerText}>Sign in to your account</Text>
      <Text style={styles.subHeaderText}>Enter your email and password to sign in</Text>

      <SafeAreaView>
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="email@domain.com"
          secureTextEntry={false}
        />

        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={limparNavegacao}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </SafeAreaView>
      
      </View>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactLogo: {
    height: '30%',
    width: '50%',
  },
  inputFields: {
    width: '90%',
  },
  input: {
    height: 40,
    marginBottom: 16,
    marginTop: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#E0E0E0',
    color: '#828282'
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Poppins_300Light',
    marginTop: '2%',
  },
  subHeaderText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Poppins_300Light',
    marginBottom: 15,
  },
  labelText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Poppins_300Light',
  },
  button: {
      backgroundColor: '#05203C', // Cor do botão
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
  },
  buttonText: {
      color: '#fff', // Cor do texto do botão
      fontSize: 14,
      fontFamily: 'Poppins_300Light',
  },

});