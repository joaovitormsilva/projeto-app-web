import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic } from '@expo-google-fonts/poppins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../scripts/UserContext'; // Certifique-se de que o caminho está correto
import uuid from 'react-native-uuid'; // Importe a função para gerar UUID

export default function CreateAccountScreen() {
  const { setUser } = useUser(); // Certifique-se de acessar setUser corretamente
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUserChange = (text: React.SetStateAction<string>) => setUserName(text);
  const handleEmailChange = (text: React.SetStateAction<string>) => setEmail(text);
  const handlePasswordChange = (text: React.SetStateAction<string>) => setPassword(text);

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  const saveUserData = async () => {
    const userData = {
      id: uuid.v4(), // Gerando um ID único
      username: userName, // Certifique-se de armazenar o nome do usuário
      email,
      password, // Armazene a senha
      quizzes: [],
    };

    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData); // Utilize setUser para atualizar o contexto
      router.replace("/home");
    } catch (error) {
      console.error('Failed to save user data', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/SquizzyLogo2.png')} style={styles.reactLogo} />
      <Text style={styles.headerText}>Create an account</Text>
      <Text style={styles.subHeaderText}>Enter your email to sign up for this app</Text>

      <SafeAreaView style={styles.inputFields}>
        <Text style={styles.labelText}>User</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleUserChange}
          value={userName}
          placeholder="Enter your username"
          secureTextEntry={false}
        />
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleEmailChange}
          value={email}
          placeholder="email@domain.com"
          secureTextEntry={false}
        />
        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={handlePasswordChange}
          value={password}
          placeholder="Enter your password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={saveUserData}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
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
    color: '#828282',
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
