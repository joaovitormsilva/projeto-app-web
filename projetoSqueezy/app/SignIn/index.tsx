import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic } from '@expo-google-fonts/poppins';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  const signIn = async () => {
    setLoading(true);
    try {
      const userDataJson = await AsyncStorage.getItem('user');
      if (userDataJson) {
        const userData = JSON.parse(userDataJson);
        if (userData.email === email) {
          if (userData.password === password) {
            router.replace("/home");
          } else {
            Alert.alert("Invalid Credentials", "The password you entered is incorrect.");
          }
        } else {
          Alert.alert("Email Not Found", "No account found with this email.");
        }
      } else {
        Alert.alert("No Users", "No user data found.");
      }
    } catch (error) {
      console.error('Failed to sign in', error);
      Alert.alert("Error", "An error occurred while trying to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign In</Text>
      <SafeAreaView style={styles.inputFields}>
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
        <TouchableOpacity style={styles.button} onPress={signIn}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
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
  labelText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Poppins_300Light',
  },
  button: {
    backgroundColor: '#05203C',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins_300Light',
  },
});
