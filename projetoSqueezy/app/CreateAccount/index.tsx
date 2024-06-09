import { Image, View, Text, StyleSheet, Button, SafeAreaView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from "expo-router";
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic } from '@expo-google-fonts/poppins';

export default function CreateAccountScreen() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_900Black_Italic,
  });

  function limparNavegacao() {
    router.replace("/home");
  }

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/SquizzyLogo2.png')}
        style={styles.reactLogo}
      />

      <Text style={styles.headerText}>Create an account</Text>
      <Text style={styles.subHeaderText}>Enter your email to sign up for this app</Text>

      <SafeAreaView style={styles.inputFields}>
        <Text style={styles.labelText}>User</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUser}
          value={user}
          placeholder="Enter your username"
          secureTextEntry={false}
        />

        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="email@domain.com"
          secureTextEntry={false}
        />

<<<<<<< HEAD
        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={limparNavegacao}>
          <Text style={styles.buttonText}>Sign up with email</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
=======
        <Text>User</Text>
        
        <Link href="/createQuizz" style={{backgroundColor:"yellow"}}>Create quizz BOTÃO </Link>
        <Button title="Ir pra home" onPress={limparNavegacao}/>
      
      </View>
  )
>>>>>>> 4b252bb2dde39eb8d7870f1b96c3561631c87230
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
