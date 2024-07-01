import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { RotateInDownLeft } from 'react-native-reanimated';

export default function QuizCompletionScreen() {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace('/home'); // Substitua '/HomeScreen' pela tela inicial da sua aplicação
  };

  return (
    <View style={styles.container}>

    <Image source={require('../../assets/images/limaoking.png')} style={styles.reactLogo} />

      <Text style={styles.text}>Quiz Completed Successfully!</Text>
      <TouchableOpacity style={styles.confirmButton} onPress={handleGoHome}>
        <Text style={styles.confirmButtonText}>Go to Home</Text>
      </TouchableOpacity>
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
  text: {
    color: '#05203C',
    fontSize: 18,
    fontFamily: 'Poppins_300Light',
    marginBottom: 20,
  },
  confirmButton: {
    width: '90%',
    height: 50,
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#05203C',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins_300Light',
  },
  reactLogo: {
    height: '40%',
    width: '50%',
    resizeMode: 'contain',
  },
});
